import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { dataStore } from "@/lib/db/data-store";
import { createShiprocketOrder } from "@/lib/shipping/shiprocket";
import { sendOrderDispatchedSMS } from "@/lib/notifications/sms";
import { sendShippingDispatchedEmail } from "@/lib/notifications/email";
import { sendOrderDispatchedWhatsApp } from "@/lib/notifications/whatsapp";
import "@/lib/db/server-sync";

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin();

    // Restricted strictly to Admin
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 403 });
    }

    const { orderId } = await req.json();
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required." }, { status: 400 });
    }

    const order = dataStore.getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Call Shiprocket order dispatch
    const shipResult = await createShiprocketOrder(order);

    if (!shipResult.success) {
      return NextResponse.json(
        { error: shipResult.error || "Failed to dispatch via Shiprocket." },
        { status: 500 }
      );
    }

    // Update internal order with shipping metadata
    order.trackingNumber = shipResult.awbCode || order.trackingNumber;
    order.trackingUrl = shipResult.trackingUrl || order.trackingUrl;
    order.courierName = shipResult.courierName;
    order.shiprocketOrderId = shipResult.orderId;
    order.shiprocketShipmentId = shipResult.shipmentId;

    dataStore.updateOrderStatus(order.id, "SHIPPED", undefined, order.trackingNumber);

    // Asynchronously dispatch Dispatch SMS, Email & WhatsApp notifications to customer
    Promise.allSettled([
      sendOrderDispatchedSMS(
        order.shippingAddress.phone,
        order.orderNumber,
        order.trackingNumber || shipResult.awbCode || "",
        order.trackingUrl
      ),
      sendShippingDispatchedEmail(order),
      sendOrderDispatchedWhatsApp(
        order,
        order.trackingNumber || shipResult.awbCode || "",
        order.trackingUrl || ""
      ),
    ]).catch((err) => console.error("[Dispatch Notification] Error sending alerts:", err));

    return NextResponse.json({
      success: true,
      message: `Order ${order.orderNumber} successfully dispatched via ${order.courierName}!`,
      trackingNumber: order.trackingNumber,
      trackingUrl: order.trackingUrl,
      courierName: order.courierName,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to process shipping dispatch." },
      { status: 500 }
    );
  }
}

