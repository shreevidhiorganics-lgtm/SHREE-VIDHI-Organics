import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { dataStore } from "@/lib/db/data-store";
import { createShiprocketOrder } from "@/lib/shipping/shiprocket";
import { sendOrderDispatchedSMS } from "@/lib/notifications/sms";
import { sendShippingDispatchedEmail } from "@/lib/notifications/email";
import { sendOrderDispatchedWhatsApp } from "@/lib/notifications/whatsapp";
import { ensureDatabaseHydrated, flushDatabaseSync } from "@/lib/db/server-sync";

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin();

    // Restricted strictly to Admin
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 403 });
    }

    await ensureDatabaseHydrated({ force: true });

    const { orderId } = await req.json();
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required." }, { status: 400 });
    }

    const order = dataStore.getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    if (order.paymentMethod === "RAZORPAY" && order.paymentStatus !== "PAID") {
      return NextResponse.json(
        { error: "Cannot push an unpaid Razorpay order to Shiprocket. Payment status must be PAID." },
        { status: 400 }
      );
    }

    // Call Shiprocket order dispatch
    const shipResult = await createShiprocketOrder(order);

    if (!shipResult.success) {
      return NextResponse.json(
        { error: shipResult.error || "Failed to dispatch via Shiprocket." },
        { status: 500 }
      );
    }

    // Update internal order with shipping metadata and persist to MySQL before closing
    dataStore.updateOrderShippingDetails(order.id, {
      status: "SHIPPED",
      trackingNumber: shipResult.awbCode || order.trackingNumber,
      trackingUrl: shipResult.trackingUrl || order.trackingUrl,
      courierName: shipResult.courierName,
      shiprocketOrderId: shipResult.orderId,
      shiprocketShipmentId: shipResult.shipmentId,
    });

    // Dispatch Dispatch SMS, Email & WhatsApp notifications to customer
    await Promise.allSettled([
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
    ]);

    await flushDatabaseSync();

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

