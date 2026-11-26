import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-IN")}.00`;
}

export function calculateDiscount(mrp: number, salePrice: number): number {
  if (!mrp || mrp <= salePrice) return 0;
  return Math.round(((mrp - salePrice) / mrp) * 100);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (_err) {
    return dateStr;
  }
}

export function getSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || "https://shreevidhiorganics.com").trim();
  if (!raw) return "https://shreevidhiorganics.com";
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}
