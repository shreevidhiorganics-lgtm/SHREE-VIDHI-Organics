import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { getCurrentUser } from "@/lib/auth/auth";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { ensureDatabaseHydrated } from "@/lib/db/server-sync";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const rateLimit = checkRateLimit(`return_req:${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before submitting again." },
        { status: 429 }
      );
    }

    await ensureDatabaseHydrated({ force: true });

    const { orderNumber, phone, reason, items, pickupAddress } = await req.json();

    if (!orderNumber || !reason) {
      return NextResponse.json(
        { error: "Order number and return reason are required." },
        { status: 400 }
      );
    }

    const order = dataStore.getOrderByNumber(orderNumber);
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // OWASP A01: Order Ownership Verification
    const currentUser = await getCurrentUser();
    const cleanRequesterPhone = phone ? String(phone).replace(/\D/g, "").slice(-10) : "";
    const cleanOrderPhone = order.shippingAddress.phone.replace(/\D/g, "").slice(-10);

    const isOwner = Boolean(
      currentUser &&
        (currentUser.userId === order.userId ||
          (currentUser.email &&
            order.guestEmail &&
            currentUser.email.toLowerCase() === order.guestEmail.toLowerCase()))
    );
    const isPhoneMatched = Boolean(
      cleanRequesterPhone.length === 10 &&
        cleanOrderPhone.length === 10 &&
        cleanRequesterPhone === cleanOrderPhone
    );

    if (!isOwner && !isPhoneMatched) {
      return NextResponse.json(
        { error: "Verification required. Please provide the mobile number associated with this order." },
        { status: 403 }
      );
    }

    // Generate Return Request Reference
    const returnRequestId = `RET-${order.orderNumber}-${Math.floor(1000 + Math.random() * 9000)}`;

    console.log(
      `[Shipping:Return] Return pickup requested for Order #${order.orderNumber}. Ref: ${returnRequestId}. Reason: ${reason}`
    );

    return NextResponse.json({
      success: true,
      returnRequestId,
      status: "REQUEST_RECEIVED",
      message:
        "Your return pickup request has been received. Our logistics partner will schedule doorstep inspection within 24-48 business hours.",
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to process return request." }, { status: 500 });
  }
}
