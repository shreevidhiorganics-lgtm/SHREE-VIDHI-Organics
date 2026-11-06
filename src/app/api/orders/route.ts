import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      guestEmail,
      guestPhone,
      shippingAddress,
      items,
      paymentMethod,
      couponCode,
    } = body;

    if (!shippingAddress || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order data. Please check shipping address and items." },
        { status: 400 }
      );
    }

    // Call dataStore createOrder which validates products, stock, coupons, and recalculates totals server-side
    const result = dataStore.createOrder({
      guestEmail,
      guestPhone,
      shippingAddress,
      items,
      paymentMethod: paymentMethod || "COD",
      couponCode,
    });

    if (!result.success || !result.order) {
      return NextResponse.json(
        { error: result.error || "Failed to create order." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      order: result.order,
      orderNumber: result.order.orderNumber,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error creating order." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || undefined;
  const orders = dataStore.getOrders(userId);
  return NextResponse.json({ orders });
}
