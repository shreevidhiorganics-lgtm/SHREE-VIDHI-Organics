import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { getCurrentUser } from "@/lib/auth/auth";
import { resolveOrderCustomer, attachSessionCookie } from "@/lib/auth/order-account";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { createRazorpayOrder, getRazorpayConfig } from "@/lib/razorpay";
import { createSignedToken } from "@/lib/auth/token";
import { ensureDatabaseHydrated } from "@/lib/db/server-sync";

export async function POST(req: NextRequest) {
  try {
    await ensureDatabaseHydrated({ force: true });
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

    if (!currentUser) {
      return NextResponse.json(
        { error: "Please sign in to your account before proceeding to payment." },
        { status: 401 }
      );
    }
    const {
      guestEmail,
      guestPhone,
      shippingAddress,
      items,
      couponCode,
    } = body;

    if (!shippingAddress || typeof shippingAddress !== "object" || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid checkout details. Shipping address and items are required." },
        { status: 400 }
      );
    }

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

    // 1. Validate cart & compute server-side total WITHOUT creating an order yet
    // Order is only created in /api/payment/razorpay/verify after payment is PAID
    const quote = dataStore.quoteOrder({
      shippingAddress,
      items,
      couponCode,
    });

    if (!quote.success) {
      return NextResponse.json(
        { error: quote.error || "Invalid checkout items or shipping address." },
        { status: 400 }
      );
    }

    const { userId, sessionToken } = await resolveOrderCustomer({
      currentUser,
      guestEmail,
      guestPhone,
      shippingAddress,
    });

    const config = getRazorpayConfig();
    const pendingReceipt = `SVO-PRE-${Date.now().toString().slice(-8)}`;

    // 2. Create Razorpay Order via REST API
    const rzpOrder = await createRazorpayOrder({
      amountInRupees: quote.total,
      receipt: pendingReceipt,
      notes: {
        userId: userId || currentUser.userId,
        guestEmail: (currentUser.email || guestEmail || "").trim(),
      },
    });

    // 3. Sign checkout payload so /verify creates the order only after payment is captured
    const checkoutToken = await createSignedToken(
      {
        userId: userId || currentUser.userId,
        guestEmail: currentUser.email || guestEmail?.trim(),
        guestPhone: currentUser.phone || guestPhone?.trim(),
        shippingAddress,
        items,
        couponCode: quote.couponCode,
        razorpayOrderId: rzpOrder.id,
      },
      60 * 60 * 1000
    );

    const response = NextResponse.json({
      success: true,
      keyId: config.keyId,
      razorpayOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      checkoutToken,
      prefill: {
        name: shippingAddress.fullName || "Customer",
        email: (guestEmail || shippingAddress.email || currentUser.email || "customer@shreevidhiorganics.com").trim(),
        contact: (guestPhone || shippingAddress.phone || "").replace(/\D/g, "").slice(-10),
      },
    });
    attachSessionCookie(response, sessionToken);
    return response;
  } catch (error: any) {
    console.error("Razorpay initiate error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal error initiating Razorpay payment." },
      { status: 500 }
    );
  }
}
