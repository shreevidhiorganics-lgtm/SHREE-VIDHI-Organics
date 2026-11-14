import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth";
import { dataStore } from "@/lib/db/data-store";
import { createShiprocketOrder } from "@/lib/shipping/shiprocket";
import "@/lib/db/server-sync";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    // Restricted strictly to Admin
    if (!user || user.role !== "ADMIN" || user.email?.toLowerCase().trim() !== "shreevidhiorganics@gmail.com") {
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

