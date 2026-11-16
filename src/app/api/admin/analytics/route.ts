import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth";
import { computeAdminAnalytics } from "@/lib/analytics/bi";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN" || user.email?.toLowerCase().trim() !== "shreevidhiorganics@gmail.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const range = (searchParams.get("range") || "last30days") as any;

    const analytics = computeAdminAnalytics(range);

    return NextResponse.json({ analytics });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to generate analytics." }, { status: 500 });
  }
}
