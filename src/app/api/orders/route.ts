import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { getCurrentUser } from "@/lib/auth/auth";
import { sendOrderConfirmationSMS } from "@/lib/notifications/sms";
import { sendOrderConfirmationEmail } from "@/lib/notifications/email";
import { sendOrderConfirmationWhatsApp } from "@/lib/notifications/whatsapp";
import "@/lib/db/server-sync";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const currentUser = await getCurrentUser();

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

    // Validate item structure and quantities
    for (const item of items) {
      if (!item.productId || typeof item.quantity !== "number" || item.quantity <= 0) {
        return NextResponse.json(
          { error: "Invalid item quantity or product ID in cart." },
          { status: 400 }
        );
      }
    }

    // Call dataStore createOrder which validates products, stock, coupons, and recalculates totals server-side
    const result = dataStore.createOrder({
      guestEmail: guestEmail?.trim() || currentUser?.email,
      guestPhone: guestPhone?.trim() || currentUser?.phone,
      shippingAddress,
      items,
      paymentMethod: paymentMethod || "COD",
      couponCode: couponCode ? String(couponCode).trim() : undefined,
    });

    if (!result.success || !result.order) {
      return NextResponse.json(
        { error: result.error || "Failed to create order." },
        { status: 400 }
      );
    }

    const createdOrder = result.order;

    // Asynchronously dispatch Order Confirmation SMS, Email, and WhatsApp
    Promise.allSettled([
      sendOrderConfirmationSMS(
        createdOrder.shippingAddress.phone,
        createdOrder.orderNumber,
        createdOrder.total
      ),
      sendOrderConfirmationEmail(createdOrder),
      sendOrderConfirmationWhatsApp(createdOrder),
    ]).catch((err) => console.error("[Order Notification] Dispatch error:", err));

    return NextResponse.json({
      success: true,
      order: createdOrder,
      orderNumber: createdOrder.orderNumber,
    });
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
