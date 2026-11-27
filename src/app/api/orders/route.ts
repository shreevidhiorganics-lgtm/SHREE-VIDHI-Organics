import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { getCurrentUser } from "@/lib/auth/auth";
import { resolveOrderCustomer, attachSessionCookie } from "@/lib/auth/order-account";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { createShiprocketOrder, isShiprocketConfigured } from "@/lib/shipping/shiprocket";
import { sendOrderConfirmationSMS } from "@/lib/notifications/sms";
import { sendOrderConfirmationEmail } from "@/lib/notifications/email";
import { sendOrderConfirmationWhatsApp } from "@/lib/notifications/whatsapp";
import { ensureDatabaseHydrated, flushDatabaseSync } from "@/lib/db/server-sync";

export async function POST(req: NextRequest) {
  try {
    await ensureDatabaseHydrated({ force: true });
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const rateLimit = checkRateLimit(`order_create:${clientIp}`, 10, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many order attempts. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Please sign in to your account before placing an order." },
        { status: 401 }
      );
    }

    const {
      guestEmail,
      guestPhone,
      shippingAddress,
      items,
      paymentMethod,
      couponCode,
    } = body;

    // Strict validation of order payload
    if (!shippingAddress || typeof shippingAddress !== "object") {
      return NextResponse.json(
        { error: "Valid shipping address is required." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one valid item." },
        { status: 400 }
      );
    }

    // Validate item structure and quantities (strict integers 1-100)
    for (const item of items) {
      if (
        !item?.productId ||
        typeof item.productId !== "string" ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 100
      ) {
        return NextResponse.json(
          { error: "Invalid item quantity or product ID in cart." },
          { status: 400 }
        );
      }
    }

    if (paymentMethod && paymentMethod !== "COD") {
      return NextResponse.json(
        { error: "Online payments must be initiated through the payment gateway endpoint." },
        { status: 400 }
      );
    }

    // Ensure customer has an account and auto-login new visitors
    const { userId, sessionToken } = await resolveOrderCustomer({
      currentUser,
      guestEmail,
      guestPhone,
      shippingAddress,
    });

    // Call dataStore createOrder which validates products, stock, coupons, and recalculates totals server-side
    const result = dataStore.createOrder({
      userId,
      guestEmail: currentUser.email || guestEmail?.trim(),
      guestPhone: currentUser.phone || guestPhone?.trim(),
      shippingAddress,
      items,
      paymentMethod: "COD",
      couponCode: couponCode ? String(couponCode).trim() : undefined,
    });

    if (!result.success || !result.order) {
      return NextResponse.json(
        { error: result.error || "Failed to create order." },
        { status: 400 }
      );
    }

    const createdOrder = result.order;

    // Automatically push order to Shiprocket when configured (awaited for serverless reliability)
    if (isShiprocketConfigured()) {
      try {
        const shipRes = await createShiprocketOrder(createdOrder);
        if (shipRes.success) {
          dataStore.updateOrderShippingDetails(createdOrder.id, {
            trackingNumber: shipRes.awbCode || createdOrder.trackingNumber,
            trackingUrl: shipRes.trackingUrl || createdOrder.trackingUrl,
            courierName: shipRes.courierName,
            shiprocketOrderId: shipRes.orderId,
            shiprocketShipmentId: shipRes.shipmentId,
          });
        } else {
          console.error("[Shiprocket] Auto-create order failed:", shipRes.error);
        }
      } catch (err) {
        console.error("[Shiprocket] Auto-create error:", err);
      }
    }

    // Dispatch Order Confirmation SMS, Email, and WhatsApp before response closes
    await Promise.allSettled([
      sendOrderConfirmationSMS(
        createdOrder.shippingAddress.phone,
        createdOrder.orderNumber,
        createdOrder.total
      ),
      sendOrderConfirmationEmail(createdOrder),
      sendOrderConfirmationWhatsApp(createdOrder),
    ]);

    await flushDatabaseSync();

    const response = NextResponse.json({
      success: true,
      order: createdOrder,
      orderNumber: createdOrder.orderNumber,
    });
    attachSessionCookie(response, sessionToken);
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error creating order." },
      { status: 500 }
    );
  }
}

// OWASP A01: Broken Access Control & IDOR Protection on Order Retrieval
export async function GET(req: NextRequest) {
  try {
    await ensureDatabaseHydrated({ force: true });
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required to view order history." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const requestedUserId = searchParams.get("userId") || undefined;

    // Admin can view all orders or filter by any user
    if (
      currentUser.role === "ADMIN" &&
      currentUser.email?.toLowerCase().trim() === "shreevidhiorganics@gmail.com"
    ) {
      const orders = dataStore.getOrders(requestedUserId);
      return NextResponse.json({ orders });
    }

    // Normal customer can strictly ONLY view their own orders
    const customerOrders = dataStore.getOrders(currentUser.userId);
    return NextResponse.json({ orders: customerOrders });
  } catch (_error: any) {
    return NextResponse.json(
      { error: "Failed to retrieve orders." },
      { status: 500 }
    );
  }
}
