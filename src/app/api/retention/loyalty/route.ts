import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth";
import { calculateTier, getTierPerks, generateReferralCode } from "@/lib/retention/loyalty";
import { dataStore } from "@/lib/db/data-store";
import { ensureDatabaseHydrated } from "@/lib/db/server-sync";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureDatabaseHydrated({ force: true });

    // Calculate customer lifetime points based on confirmed/delivered orders
    const orders = dataStore.getOrders(user.userId);
    const validOrders = orders.filter((o) => o.status !== "CANCELLED");
    const lifetimeSpent = validOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const lifetimePoints = Math.floor(lifetimeSpent / 10);
    const pointsBalance = lifetimePoints; // In full model, minus redeemed
    const tier = calculateTier(lifetimePoints);
    const perks = getTierPerks(tier);
    const referralCode = generateReferralCode(user.name);

    return NextResponse.json({
      loyalty: {
        userId: user.userId,
        pointsBalance,
        lifetimePoints,
        tier,
        perks,
        referralCode,
        totalOrders: validOrders.length,
        lifetimeSpent,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch loyalty profile." }, { status: 500 });
  }
}
