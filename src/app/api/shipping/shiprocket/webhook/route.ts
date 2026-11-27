import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { OrderStatus } from "@/types";
import { ensureDatabaseHydrated, flushDatabaseSync } from "@/lib/db/server-sync";

/**
 * Shiprocket Webhook Receiver
 * Triggered automatically by Shiprocket on tracking scan changes
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    service: "shiprocket-webhook",
    message: "Shiprocket webhook endpoint is active.",
  });
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    if (!rawBody || !rawBody.trim()) {
      return NextResponse.json({ success: true, message: "Webhook test ping acknowledged." });
    }

    let body: Record<string, any> = {};
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ success: true, message: "Non-JSON test ping acknowledged." });
    }

    const orderNumber = body.order_id || body.channel_order_id;
    const currentStatus = (body.current_status || body.status || "").toUpperCase();
    const awb = body.awb || body.awb_code;
    const courierName = body.courier_name;

    if (!orderNumber) {
      return NextResponse.json({
        success: true,
        ignored: true,
        message: "Webhook ping acknowledged (no order_id in payload).",
      });
    }

    await ensureDatabaseHydrated({ force: true });

    const order = dataStore.getOrderById(String(orderNumber));
    if (!order) {
      return NextResponse.json({
        success: true,
        ignored: true,
        message: `Order ${orderNumber} not found in local store; webhook acknowledged.`,
      });
    }

    // Verify webhook secret on real order updates (fail closed in production)
    const configuredSecret = process.env.SHIPROCKET_WEBHOOK_SECRET?.trim();
    if (!configuredSecret && process.env.NODE_ENV === "production") {
      console.error("[SECURITY] SHIPROCKET_WEBHOOK_SECRET is not configured in production.");
      return NextResponse.json({ error: "Webhook authentication not configured." }, { status: 401 });
    }
    if (configuredSecret) {
      const incomingSecret =
        req.headers.get("x-api-key") ||
        req.headers.get("x-shiprocket-token") ||
        req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

      if (!incomingSecret || incomingSecret !== configuredSecret) {
        console.warn("[SECURITY] Blocked unauthenticated Shiprocket webhook request.");
        return NextResponse.json({ error: "Invalid webhook secret." }, { status: 401 });
      }
    }

    // Map Shiprocket Status string to internal OrderStatus
    let targetStatus: OrderStatus | null = null;
    if (currentStatus.includes("DELIVERED")) {
      targetStatus = "DELIVERED";
    } else if (currentStatus.includes("OUT FOR DELIVERY")) {
      targetStatus = "OUT_FOR_DELIVERY";
    } else if (currentStatus.includes("SHIPPED") || currentStatus.includes("IN TRANSIT") || currentStatus.includes("PICKED UP")) {
      targetStatus = "SHIPPED";
    } else if (currentStatus.includes("CANCEL")) {
      targetStatus = "CANCELLED";
    }

    const updatedAwb = awb ? String(awb).trim() : undefined;
    dataStore.updateOrderShippingDetails(order.id, {
      status: targetStatus || undefined,
      trackingNumber: updatedAwb,
      trackingUrl: updatedAwb ? `https://shiprocket.co/tracking/${updatedAwb}` : undefined,
      courierName: courierName ? String(courierName).trim() : undefined,
    });
    await flushDatabaseSync();

    return NextResponse.json({
      success: true,
      message: `Shiprocket tracking updated for ${orderNumber}`,
      status: targetStatus || order.status,
    });
  } catch (error: any) {
    console.error("[Shiprocket Webhook] Error processing event:", error);
    return NextResponse.json(
      { error: error?.message || "Webhook processing error." },
      { status: 500 }
    );
  }
}

