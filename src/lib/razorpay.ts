import crypto from "crypto";

export interface RazorpayConfig {
  keyId: string;
  keySecret: string;
  webhookSecret: string;
}

export function getRazorpayConfig(): RazorpayConfig {
  const keyId = (
    process.env.RAZORPAY_KEY_ID ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    ""
  ).trim();
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
  const webhookSecret = (process.env.RAZORPAY_WEBHOOK_SECRET || "").trim();

  return { keyId, keySecret, webhookSecret };
}

export function isRazorpayConfigured(config = getRazorpayConfig()): boolean {
  return Boolean(
    config.keyId &&
      config.keySecret &&
      !config.keyId.includes("placeholder") &&
      !config.keySecret.includes("placeholder")
  );
}

export interface CreateRazorpayOrderInput {
  amountInRupees: number;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
}

export async function createRazorpayOrder(
  input: CreateRazorpayOrderInput
): Promise<RazorpayOrderResponse> {
  const config = getRazorpayConfig();
  if (!isRazorpayConfigured(config)) {
    throw new Error(
      "Razorpay credentials (NEXT_PUBLIC_RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET) are not configured."
    );
  }

  const amountPaise = Math.round(Number(input.amountInRupees) * 100);
  if (!Number.isFinite(amountPaise) || amountPaise < 100) {
    throw new Error("Order amount must be at least ₹1.00 for Razorpay.");
  }

  const auth = Buffer.from(`${config.keyId}:${config.keySecret}`).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountPaise,
      currency: "INR",
      receipt: input.receipt.slice(0, 40),
      notes: input.notes || {},
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.id) {
    throw new Error(
      data?.error?.description || data?.message || "Failed to create Razorpay order."
    );
  }

  return data as RazorpayOrderResponse;
}

function timingSafeHexEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a.toLowerCase(), "utf8");
  const bufB = Buffer.from(b.toLowerCase(), "utf8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function verifyRazorpayPaymentSignature(
  params: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  },
  keySecret: string
): boolean {
  if (
    !params.razorpay_order_id ||
    !params.razorpay_payment_id ||
    !params.razorpay_signature ||
    !keySecret
  ) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${params.razorpay_order_id}|${params.razorpay_payment_id}`)
    .digest("hex");

  return timingSafeHexEqual(expected, params.razorpay_signature);
}

export function verifyRazorpayWebhookSignature(
  rawBody: string,
  signature: string,
  webhookSecret: string
): boolean {
  if (!rawBody || !signature || !webhookSecret) return false;

  const expected = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  return timingSafeHexEqual(expected, signature);
}
