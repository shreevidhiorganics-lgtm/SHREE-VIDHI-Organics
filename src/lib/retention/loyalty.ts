import { LoyaltyAccount, LoyaltyTransaction, MembershipTier } from "@/types";

const TIER_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 1000,
  GOLD: 3000,
  PLATINUM: 7500,
};

const TIER_PERKS: Record<MembershipTier, { discountBonus: number; pointMultiplier: number; label: string }> = {
  BRONZE: { discountBonus: 0, pointMultiplier: 1.0, label: "Bronze Seeker" },
  SILVER: { discountBonus: 5, pointMultiplier: 1.25, label: "Silver Sadhak" },
  GOLD: { discountBonus: 10, pointMultiplier: 1.5, label: "Gold Acharya" },
  PLATINUM: { discountBonus: 15, pointMultiplier: 2.0, label: "Platinum Vaidya" },
};

/**
 * Derives membership tier from lifetime loyalty points earned
 */
export function calculateTier(lifetimePoints: number): MembershipTier {
  if (lifetimePoints >= TIER_THRESHOLDS.PLATINUM) return "PLATINUM";
  if (lifetimePoints >= TIER_THRESHOLDS.GOLD) return "GOLD";
  if (lifetimePoints >= TIER_THRESHOLDS.SILVER) return "SILVER";
  return "BRONZE";
}

export function getTierPerks(tier: MembershipTier) {
  return TIER_PERKS[tier] || TIER_PERKS.BRONZE;
}

/**
 * Calculates points earned on an order total
 * Rule: 1 Point per ₹10 spent, multiplied by tier bonus
 */
export function calculateEarnedPoints(orderTotal: number, tier: MembershipTier = "BRONZE"): number {
  const basePoints = Math.floor(orderTotal / 10);
  const multiplier = TIER_PERKS[tier].pointMultiplier;
  return Math.floor(basePoints * multiplier);
}

/**
 * Calculates rupee value of points for checkout redemption
 * Rule: 1 Point = ₹0.50 discount
 */
export function calculatePointsRupeeValue(points: number): number {
  return Math.floor(points * 0.5);
}

/**
 * Generates a memorable Ayurvedic referral code
 */
export function generateReferralCode(userName: string): string {
  const prefix = userName
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, 4)
    .toUpperCase() || "VIDHI";
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${randomSuffix}`;
}
