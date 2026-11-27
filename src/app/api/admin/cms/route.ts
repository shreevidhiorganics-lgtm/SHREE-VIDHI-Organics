import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { dataStore } from "@/lib/db/data-store";
import { ensureDatabaseHydrated, flushDatabaseSync } from "@/lib/db/server-sync";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await ensureDatabaseHydrated({ force: true });
  return NextResponse.json({ settings: dataStore.getSettings() });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    await ensureDatabaseHydrated({ force: true });
    const body = await req.json();
    const updated = dataStore.updateSettings(body);
    await flushDatabaseSync();
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to update settings." }, { status: 500 });
  }
}
