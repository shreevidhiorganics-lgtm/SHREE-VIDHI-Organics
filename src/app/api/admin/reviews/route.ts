import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { dataStore } from "@/lib/db/data-store";
import "@/lib/db/server-sync";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return NextResponse.json({ reviews: dataStore.getAllReviews() });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { reviewId } = await req.json();
    if (!reviewId) {
      return NextResponse.json({ error: "reviewId is required." }, { status: 400 });
    }

    const updated = dataStore.toggleReviewApproval(reviewId);
    if (!updated) {
      return NextResponse.json({ error: "Review not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, review: updated, reviews: dataStore.getAllReviews() });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to update review." }, { status: 500 });
  }
}
