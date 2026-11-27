import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { getRazorpayConfig, verifyRazorpayWebhookSignature } from "@/lib/razorpay";
import "@/lib/db/server-sync";

/**
 * Razorpay Server-to-Server Webhook
 * Handles payment.captured, payment.failed, and order.paid events.
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    service: "razorpay-webhook",
    message: "Razorpay webhook endpoint is active.",
  });
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";
    const config = getRazorpayConfig();

    const hasConfiguredWebhookSecret = Boolean(
      config.webhookSecret && !config.webhookSecret.includes("placeholder")
    );

    if (hasConfiguredWebhookSecret) {
      const isValid = verifyRazorpayWebhookSignature(rawBody, signature, config.webhookSecret);
      if (!isValid) {
        console.error("Razorpay Webhook Alert: Invalid x-razorpay-signature.");
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
      }
    } else if (process.env.NODE_ENV === "production") {
      console.error("Razorpay Webhook Alert: RAZORPAY_WEBHOOK_SECRET is not configured in production.");
      return NextResponse.json({ error: "Webhook verification not configured" }, { status: 500 });
    }

    const event = JSON.parse(rawBody || "{}");
    const eventType: string = event.event || "";
    const paymentEntity = event.payload?.payment?.entity;
    const orderEntity = event.payload?.order?.entity;

    const rzpOrderId: string | undefined = paymentEntity?.order_id || orderEntity?.id;
    const rzpPaymentId: string | undefined = paymentEntity?.id;
    const internalOrderId: string | undefined =
      paymentEntity?.notes?.orderId || orderEntity?.notes?.orderId;

    // Locate internal order by note orderId or matching razorpayOrderId
    let targetOrder = internalOrderId ? dataStore.getOrderById(internalOrderId) : null;
    if (!targetOrder && rzpOrderId) {
      targetOrder =
        dataStore.getOrders().find((o) => o.razorpayOrderId === rzpOrderId) || null;
    }

    if (targetOrder) {
      if (eventType === "payment.captured" || eventType === "order.paid") {
        const paidPaise = Number(paymentEntity?.amount || orderEntity?.amount_paid || 0);
        const expectedPaise = Math.round(targetOrder.total * 100);
        if (paidPaise > 0 && Math.abs(paidPaise - expectedPaise) > 100) {
          console.error(
            `[SECURITY] Razorpay webhook amount mismatch for order ${targetOrder.orderNumber}: paid=${paidPaise}, expected=${expectedPaise}`
          );
          return NextResponse.json({ error: "Amount mismatch." }, { status: 400 });
        }

        dataStore.updateOrderPaymentDetails(targetOrder.id, {
          status: "CONFIRMED",
          paymentStatus: "PAID",
          razorpayOrderId: rzpOrderId,
          razorpayPaymentId: rzpPaymentId,
          razorpayStatus: "CAPTURED",
        });
      } else if (eventType === "payment.failed" && targetOrder.paymentStatus !== "PAID") {
        dataStore.updateOrderPaymentDetails(targetOrder.id, {
          paymentStatus: "FAILED",
          razorpayOrderId: rzpOrderId,
          razorpayPaymentId: rzpPaymentId,
          razorpayStatus: "FAILED",
        });
      }
    }

    return NextResponse.json({ status: "acknowledged", received: true });
  } catch (error: any) {
    console.error("Razorpay webhook error:", error);
    return NextResponse.json(
      { error: error?.message || "Webhook processing error" },
      { status: 500 }
    );
  }
}
