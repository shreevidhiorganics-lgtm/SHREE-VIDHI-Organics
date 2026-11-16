import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { trackShiprocketOrder } from "@/lib/shipping/shiprocket";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderNumber = searchParams.get("orderNumber")?.trim();
    const awb = searchParams.get("awb")?.trim();

    if (!orderNumber && !awb) {
      return NextResponse.json(
        { error: "Order Number or Tracking Number is required." },
        { status: 400 }
      );
    }

    // Lookup order by orderNumber or trackingNumber
    let order = orderNumber ? dataStore.getOrderById(orderNumber) : null;
    if (!order && awb) {
      const allOrders = dataStore.getOrders();
      order = allOrders.find((o) => o.trackingNumber === awb) || null;
    }

    if (!order) {
      return NextResponse.json(
        {
          error: `No record found for "${orderNumber || awb}". Please check your order reference.`,
        },
        { status: 404 }
      );
    }

    // Get live tracking status from Shiprocket
    const trackingInfo = await trackShiprocketOrder(order);

    return NextResponse.json({
      success: true,
      tracking: trackingInfo,
      order: {
        orderNumber: order.orderNumber,
        status: order.status,
        createdAt: order.createdAt,
        total: order.total,
        paymentMethod: order.paymentMethod,
        // Privacy Defense: Mask personal address details in public tracking response
        shippingAddress: {
          city: order.shippingAddress.city,
          state: order.shippingAddress.state,
          pinCode: order.shippingAddress.pinCode ? `${order.shippingAddress.pinCode.slice(0, 3)}***` : "",
        },
        items: order.items.map((i) => ({
          productName: i.productName,
          quantity: i.quantity,
          variantTitle: i.variantTitle,
        })),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to retrieve live shipment tracking." },
      { status: 500 }
    );
  }
}

