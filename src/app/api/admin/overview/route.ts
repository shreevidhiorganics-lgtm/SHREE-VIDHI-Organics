import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { dataStore } from "@/lib/db/data-store";
import { ensureDatabaseHydrated } from "@/lib/db/server-sync";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await ensureDatabaseHydrated({ force: true });
  return NextResponse.json({
    metrics: dataStore.getAdminMetrics(),
    orders: dataStore.getOrders(),
    products: dataStore.getProducts(),
  });
}
