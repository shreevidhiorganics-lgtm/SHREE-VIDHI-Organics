import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal } = await req.json();
    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Coupon code is required." }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();
    const numericSubtotal = Number(subtotal || 0);
    const coupon = dataStore.validateCoupon(cleanCode, numericSubtotal);

    if (!coupon) {
      const existing = dataStore
        .getCoupons()
        .find((c) => c.code.toUpperCase() === cleanCode && c.isActive);
      if (existing && numericSubtotal < existing.minCartValue) {
        return NextResponse.json(
          { error: `Minimum order value for ${existing.code} is ₹${existing.minCartValue}.` },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: "Invalid or expired coupon code." },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true, coupon });
  } catch {
    return NextResponse.json({ error: "Failed to validate coupon." }, { status: 500 });
  }
}
