import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { ensureDatabaseHydrated } from "@/lib/db/server-sync";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const rateLimit = checkRateLimit(`coupon_val:${clientIp}`, 15, 5 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many coupon attempts. Please wait a moment." },
        { status: 429 }
      );
    }

    await ensureDatabaseHydrated();

    const { code, subtotal } = await req.json();
    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Coupon code is required." }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();
    const numericSubtotal = Number(subtotal || 0);
    if (!Number.isFinite(numericSubtotal) || numericSubtotal < 0) {
      return NextResponse.json({ error: "Invalid cart subtotal." }, { status: 400 });
    }
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

    return NextResponse.json({
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        maxDiscount: coupon.maxDiscount,
        minCartValue: coupon.minCartValue,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to validate coupon." }, { status: 500 });
  }
}
