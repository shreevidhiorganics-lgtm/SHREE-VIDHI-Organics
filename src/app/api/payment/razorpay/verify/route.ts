import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { getCurrentUser } from "@/lib/auth/auth";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { verifySignedToken } from "@/lib/auth/token";
import { getRazorpayConfig, verifyRazorpayPaymentSignature } from "@/lib/razorpay";
import { createShiprocketOrder, isShiprocketConfigured } from "@/lib/shipping/shiprocket";
import { sendOrderConfirmationSMS } from "@/lib/notifications/sms";
import { sendOrderConfirmationEmail } from "@/lib/notifications/email";
import { sendOrderConfirmationWhatsApp } from "@/lib/notifications/whatsapp";
import { ensureDatabaseHydrated, flushDatabaseSync } from "@/lib/db/server-sync";

export async function POST(req: NextRequest) {
  try {
    await ensureDatabaseHydrated({ force: true });
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const rateLimit = checkRateLimit(`rzp_verify:${clientIp}`, 15, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many payment verification attempts. Please wait a moment." },
        { status: 429 }
      );
    }

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required to verify payment." },
        { status: 401 }
      );
    }

    const {
      orderId,
      checkoutToken,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    if ((!orderId && !checkoutToken) || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing Razorpay payment verification parameters." },
        { status: 400 }
      );
    }

    const config = getRazorpayConfig();
    if (!config.keySecret) {
      return NextResponse.json(
        { error: "Razorpay secret key is not configured." },
        { status: 500 }
      );
    }

    // 1. Verify Razorpay HMAC signature FIRST — never create or mutate an order on invalid signature
    const isValid = verifyRazorpayPaymentSignature(
      { razorpay_order_id, razorpay_payment_id, razorpay_signature },
      config.keySecret
    );

    if (!isValid) {
      console.error("Razorpay Security Alert: Signature mismatch for razorpayOrderId:", razorpay_order_id);
      return NextResponse.json(
        { error: "Payment signature verification failed." },
        { status: 400 }
      );
    }

    const isAdmin =
      currentUser.role === "ADMIN" &&
      currentUser.email?.toLowerCase().trim() === "shreevidhiorganics@gmail.com";

    // Idempotency: if this Razorpay order was already paid and recorded, return it
    let order =
      dataStore.getOrders().find((o) => o.razorpayOrderId === razorpay_order_id) ||
      (orderId ? dataStore.getOrderById(String(orderId)) : null);

    if (order) {
      const isOwner =
        currentUser.userId === order.userId ||
        (currentUser.email &&
          order.guestEmail &&
          currentUser.email.toLowerCase() === order.guestEmail.toLowerCase());
      if (!isOwner && !isAdmin) {
        return NextResponse.json(
          { error: "Unauthorized to verify payment for this order." },
          { status: 403 }
        );
      }
      if (order.razorpayOrderId && order.razorpayOrderId !== razorpay_order_id) {
        return NextResponse.json({ error: "Razorpay order mismatch." }, { status: 400 });
      }
      if (order.paymentStatus === "PAID") {
        return NextResponse.json({
          success: true,
          orderId: order.id,
          orderNumber: order.orderNumber,
          razorpayOrderId: order.razorpayOrderId,
          razorpayPaymentId: order.razorpayPaymentId,
        });
      }
    } else {
      // Create the order ONLY now that payment signature is verified
      if (!checkoutToken || typeof checkoutToken !== "string") {
        return NextResponse.json({ error: "Missing checkout session token." }, { status: 400 });
      }

      const pendingCheckout = await verifySignedToken<{
        userId: string;
        guestEmail?: string;
        guestPhone?: string;
        shippingAddress: any;
        items: { productId: string; variantId?: string; quantity: number }[];
        couponCode?: string;
        razorpayOrderId: string;
      }>(checkoutToken);

      if (!pendingCheckout || pendingCheckout.razorpayOrderId !== razorpay_order_id) {
        return NextResponse.json({ error: "Invalid or expired checkout token." }, { status: 400 });
      }

      if (pendingCheckout.userId !== currentUser.userId && !isAdmin) {
        return NextResponse.json({ error: "Unauthorized checkout session." }, { status: 403 });
      }

      const created = dataStore.createOrder({
        userId: pendingCheckout.userId,
        guestEmail: pendingCheckout.guestEmail || currentUser.email,
        guestPhone: pendingCheckout.guestPhone || currentUser.phone,
        shippingAddress: pendingCheckout.shippingAddress,
        items: pendingCheckout.items,
        paymentMethod: "RAZORPAY",
        couponCode: pendingCheckout.couponCode,
      });

      if (!created.success || !created.order) {
        return NextResponse.json(
          { error: created.error || "Failed to finalize order after payment." },
          { status: 400 }
        );
      }
      order = created.order;
    }

    dataStore.updateOrderPaymentDetails(order.id, {
      status: "CONFIRMED",
      paymentStatus: "PAID",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpayStatus: "CAPTURED",
    });

    if (isShiprocketConfigured()) {
      try {
        const shipRes = await createShiprocketOrder(order);
        if (shipRes.success) {
          dataStore.updateOrderShippingDetails(order.id, {
            trackingNumber: shipRes.awbCode || order.trackingNumber,
            trackingUrl: shipRes.trackingUrl || order.trackingUrl,
            courierName: shipRes.courierName,
            shiprocketOrderId: shipRes.orderId,
            shiprocketShipmentId: shipRes.shipmentId,
          });
        } else {
          console.error("[Shiprocket] Auto-create prepaid order failed:", shipRes.error);
        }
      } catch (err) {
        console.error("[Shiprocket] Auto-create prepaid error:", err);
      }
    }

    await Promise.allSettled([
      sendOrderConfirmationSMS(order.shippingAddress.phone, order.orderNumber, order.total),
      sendOrderConfirmationEmail(order),
      sendOrderConfirmationWhatsApp(order),
    ]);

    await flushDatabaseSync();

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });
  } catch (error: any) {
    console.error("Razorpay verify error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to verify Razorpay payment." },
      { status: 500 }
    );
  }
}
