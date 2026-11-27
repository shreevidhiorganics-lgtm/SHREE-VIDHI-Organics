import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { getCurrentUser } from "@/lib/auth/auth";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getRazorpayConfig, verifyRazorpayPaymentSignature } from "@/lib/razorpay";
import { createShiprocketOrder, isShiprocketConfigured } from "@/lib/shipping/shiprocket";
import { sendOrderConfirmationSMS } from "@/lib/notifications/sms";
import { sendOrderConfirmationEmail } from "@/lib/notifications/email";
import { sendOrderConfirmationWhatsApp } from "@/lib/notifications/whatsapp";
import "@/lib/db/server-sync";

export async function POST(req: NextRequest) {
  try {
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
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing Razorpay payment verification parameters." },
        { status: 400 }
      );
    }

    const order = dataStore.getOrderById(String(orderId));
    if (!order) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    const isAdmin =
      currentUser.role === "ADMIN" &&
      currentUser.email?.toLowerCase().trim() === "shreevidhiorganics@gmail.com";
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

    if (order.razorpayOrderId !== razorpay_order_id) {
      console.error("Razorpay Security Alert: Order ID mismatch for order:", orderId);
      return NextResponse.json(
        { error: "Razorpay order mismatch." },
        { status: 400 }
      );
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

    const config = getRazorpayConfig();
    if (!config.keySecret) {
      return NextResponse.json(
        { error: "Razorpay secret key is not configured." },
        { status: 500 }
      );
    }

    const isValid = verifyRazorpayPaymentSignature(
      { razorpay_order_id, razorpay_payment_id, razorpay_signature },
      config.keySecret
    );

    if (!isValid) {
      console.error("Razorpay Security Alert: Signature mismatch for order:", orderId);
      dataStore.updateOrderPaymentDetails(order.id, {
        paymentStatus: "FAILED",
        razorpayPaymentId: razorpay_payment_id,
        razorpayStatus: "SIGNATURE_VERIFICATION_FAILED",
      });
      return NextResponse.json(
        { error: "Payment signature verification failed." },
        { status: 400 }
      );
    }

    dataStore.updateOrderPaymentDetails(orderId, {
      status: "CONFIRMED",
      paymentStatus: "PAID",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpayStatus: "CAPTURED",
    });

    if (isShiprocketConfigured()) {
      createShiprocketOrder(order)
        .then((shipRes) => {
          if (shipRes.success) {
            order.trackingNumber = shipRes.awbCode || order.trackingNumber;
            order.trackingUrl = shipRes.trackingUrl || order.trackingUrl;
            order.courierName = shipRes.courierName;
            order.shiprocketOrderId = shipRes.orderId;
            order.shiprocketShipmentId = shipRes.shipmentId;
            dataStore.updateOrderStatus(order.id, order.status, undefined, order.trackingNumber);
          } else {
            console.error("[Shiprocket] Auto-create prepaid order failed:", shipRes.error);
          }
        })
        .catch((err) => console.error("[Shiprocket] Auto-create prepaid error:", err));
    }

    if (order) {
      Promise.allSettled([
        sendOrderConfirmationSMS(order.shippingAddress.phone, order.orderNumber, order.total),
        sendOrderConfirmationEmail(order),
        sendOrderConfirmationWhatsApp(order),
      ]).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      orderId,
      orderNumber: order?.orderNumber || orderId,
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
