import { SubscriptionFrequency, SubscriptionItem } from "@/types";

export const SUBSCRIPTION_DISCOUNT = 10; // 10% off for recurring auto-replenishment

export function calculateNextRenewalDate(frequency: SubscriptionFrequency): string {
  const now = new Date();
  let daysToAdd = 30;
  if (frequency === "EVERY_60_DAYS") daysToAdd = 60;
  if (frequency === "EVERY_90_DAYS") daysToAdd = 90;

  now.setDate(now.getDate() + daysToAdd);
  return now.toISOString();
}

export function formatFrequencyLabel(freq: SubscriptionFrequency): string {
  switch (freq) {
    case "EVERY_30_DAYS":
      return "Every 1 Month (Recommended for daily powders)";
    case "EVERY_60_DAYS":
      return "Every 2 Months";
    case "EVERY_90_DAYS":
      return "Every 3 Months (Quarterly ritual)";
    default:
      return "Every 30 Days";
  }
}
