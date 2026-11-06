import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { getPayUConfig, generatePayUHash, PayUInitiateParams } from "@/lib/payu";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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

    // 1. Create order in dataStore with status PENDING and paymentMethod PAYU
    const orderResult = dataStore.createOrder({
      guestEmail,
      guestPhone,
      shippingAddress,
      items,
      paymentMethod: "PAYU",
      couponCode,
    });

    if (!orderResult.success || !orderResult.order) {
      return NextResponse.json(
        { error: orderResult.error || "Failed to create order for PayU payment." },
        { status: 400 }
      );
    }

    const order = orderResult.order;
    const config = getPayUConfig();

    if (!config.key || !config.salt) {
      console.warn("PayU Live Credentials missing in environment (PAYU_MERCHANT_KEY, PAYU_MERCHANT_SALT). Using placeholder.");
    }

    // 2. Determine base callback URL
    const origin = req.nextUrl.origin;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || origin;
    const callbackUrl = `${baseUrl}/api/payment/payu/callback`;

    // 3. Unique transaction ID for PayU (max 30 chars alphanumeric)
    const cleanOrderNumber = order.orderNumber.replace(/[^a-zA-Z0-9]/g, "");
    const txnid = `TXN-${cleanOrderNumber}-${Date.now().toString().slice(-4)}`;

    // Clean customer info
    const firstName = (shippingAddress.fullName || "Customer").split(" ")[0].replace(/[^a-zA-Z0-9]/g, "");
    const email = (guestEmail || shippingAddress.email || "customer@shreevidhiorganics.com").trim();
    const phone = (guestPhone || shippingAddress.phone || "9999999999").replace(/[^0-9]/g, "").slice(-10);
    const amount = Number(order.total).toFixed(2);
    const productinfo = `ShreeVidhi-${order.orderNumber}`;

    // 4. Build PayU Params
    const payuParams: PayUInitiateParams = {
      key: config.key || "LIVE_PAYU_KEY",
      txnid,
      amount,
      productinfo,
      firstname: firstName,
      email,
      phone,
      surl: callbackUrl,
      furl: callbackUrl,
      udf1: order.id,
      udf2: order.orderNumber,
    };

    // 5. Generate secure SHA-512 hash
    const hash = generatePayUHash(payuParams, config.salt || "LIVE_PAYU_SALT");

    // 6. Update order with generated transaction ID
    dataStore.updateOrderPaymentDetails(order.id, {
      paymentStatus: "PENDING",
      payuTxnId: txnid,
    });

    return NextResponse.json({
      success: true,
      actionUrl: config.paymentUrl,
      orderId: order.id,
      orderNumber: order.orderNumber,
      params: {
        ...payuParams,
        hash,
      },
    });
  } catch (error: any) {
    console.error("PayU initiate error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal error initiating PayU live transaction." },
      { status: 500 }
    );
  }
}

