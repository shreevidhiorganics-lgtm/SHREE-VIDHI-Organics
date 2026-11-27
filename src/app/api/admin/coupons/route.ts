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

  return NextResponse.json({ coupons: dataStore.getCoupons() });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    if (!body?.code || !body?.discountType || body?.discountValue === undefined) {
      return NextResponse.json({ error: "Coupon code, type, and value are required." }, { status: 400 });
    }

    const created = dataStore.createCoupon({
      code: String(body.code),
      description:
        body.description ||
        `${body.discountType === "PERCENTAGE" ? `${body.discountValue}% OFF` : `₹${body.discountValue} OFF`} above ₹${body.minCartValue || 0}`,
      discountType: body.discountType,
      discountValue: Number(body.discountValue),
      minCartValue: Number(body.minCartValue || 0),
      validFrom: body.validFrom || new Date().toISOString(),
      validUntil: body.validUntil || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: body.isActive ?? true,
    });

    return NextResponse.json({ success: true, coupon: created, coupons: dataStore.getCoupons() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to create coupon." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Coupon id is required." }, { status: 400 });
    }

    const deleted = dataStore.deleteCoupon(id);
    if (!deleted) {
      return NextResponse.json({ error: "Coupon not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, coupons: dataStore.getCoupons() });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to delete coupon." }, { status: 500 });
  }
}
