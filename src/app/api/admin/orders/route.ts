import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { dataStore } from "@/lib/db/data-store";
import { OrderStatus } from "@/types";
import "@/lib/db/server-sync";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return NextResponse.json({ orders: dataStore.getOrders() });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { orderId, status } = await req.json();
    if (!orderId || !status) {
      return NextResponse.json({ error: "orderId and status are required." }, { status: 400 });
    }

    const updated = dataStore.updateOrderStatus(orderId, status as OrderStatus);
    if (!updated) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated, orders: dataStore.getOrders() });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to update order." }, { status: 500 });
  }
}
