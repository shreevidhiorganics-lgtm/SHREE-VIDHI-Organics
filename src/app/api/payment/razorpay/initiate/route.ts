import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { getCurrentUser } from "@/lib/auth/auth";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { createRazorpayOrder, getRazorpayConfig } from "@/lib/razorpay";
import "@/lib/db/server-sync";

export async function POST(req: NextRequest) {
  try {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const rateLimit = checkRateLimit(`rzp_init:${clientIp}`, 10, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many payment attempts. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const currentUser = await getCurrentUser();
    const {
      guestEmail,
      guestPhone,
      shippingAddress,
      items,
      couponCode,
    } = body;

    if (!shippingAddress || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid checkout details. Shipping address and items are required." },
        { status: 400 }
      );
    }

    // 1. Create order in dataStore with status PENDING and paymentMethod RAZORPAY
    const orderResult = dataStore.createOrder({
      userId: currentUser?.userId,
      guestEmail: guestEmail?.trim() || currentUser?.email,
      guestPhone: guestPhone?.trim() || currentUser?.phone,
      shippingAddress,
      items,
      paymentMethod: "RAZORPAY",
      couponCode,
    });

    if (!orderResult.success || !orderResult.order) {
      return NextResponse.json(
        { error: orderResult.error || "Failed to create order for Razorpay payment." },
        { status: 400 }
      );
    }

    const order = orderResult.order;
    const config = getRazorpayConfig();

    // 2. Create Razorpay Order via REST API
    const rzpOrder = await createRazorpayOrder({
      amountInRupees: order.total,
      receipt: order.orderNumber,
      notes: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
    });

    // 3. Save Razorpay Order ID on internal order
    dataStore.updateOrderPaymentDetails(order.id, {
      paymentStatus: "PENDING",
      razorpayOrderId: rzpOrder.id,
      razorpayStatus: rzpOrder.status,
    });

    return NextResponse.json({
      success: true,
      keyId: config.keyId,
      orderId: order.id,
      orderNumber: order.orderNumber,
      razorpayOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      prefill: {
        name: shippingAddress.fullName || "Customer",
        email: (guestEmail || shippingAddress.email || "customer@shreevidhiorganics.com").trim(),
        contact: (guestPhone || shippingAddress.phone || "").replace(/\D/g, "").slice(-10),
      },
    });
  } catch (error: any) {
    console.error("Razorpay initiate error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal error initiating Razorpay payment." },
      { status: 500 }
    );
  }
}
