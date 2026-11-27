import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { computeAdminAnalytics } from "@/lib/analytics/bi";
import { ensureDatabaseHydrated } from "@/lib/db/server-sync";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await ensureDatabaseHydrated({ force: true });

    const { searchParams } = new URL(req.url);
    const range = (searchParams.get("range") || "last30days") as any;

    const analytics = computeAdminAnalytics(range);

    return NextResponse.json({ analytics });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to generate analytics." }, { status: 500 });
  }
}
