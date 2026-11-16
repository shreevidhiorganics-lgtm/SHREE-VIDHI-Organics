import crypto from "crypto";

export interface EcomProduct {
  id: string;
  name: string;
  category?: string;
  price: number;
  quantity?: number;
}

/**
 * SHA-256 normalizer for Meta CAPI compliance
 */
function hashString(val: string): string {
  return crypto.createHash("sha256").update(val.trim().toLowerCase()).digest("hex");
}

/**
 * Server-side Meta Conversions API (CAPI) event dispatcher with event deduplication
 */
export async function sendMetaCAPIEvent(
  eventName: "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase",
  eventId: string,
  eventSourceUrl: string,
  userData: {
    email?: string;
    phone?: string;
    clientIp?: string;
    clientUserAgent?: string;
  },
  customData?: {
    value?: number;
    currency?: string;
    content_name?: string;
    content_ids?: string[];
    num_items?: number;
  }
) {
  const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken || accessToken === "your_meta_capi_token_here") {
    // Development fallback
    return { success: true, simulated: true };
  }

  try {
    const hashedUserData: Record<string, string> = {};
    if (userData.email) hashedUserData.em = hashString(userData.email);
    if (userData.phone) hashedUserData.ph = hashString(userData.phone);
    if (userData.clientIp) hashedUserData.client_ip_address = userData.clientIp;
    if (userData.clientUserAgent) hashedUserData.client_user_agent = userData.clientUserAgent;

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId, // Used by Meta to deduplicate against client-side browser pixel
          event_source_url: eventSourceUrl,
          action_source: "website",
          user_data: hashedUserData,
          custom_data: {
            currency: "INR",
            ...customData,
          },
        },
      ],
    };

    const res = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return { success: res.ok };
  } catch (err) {
    console.warn("[Meta:CAPI] Dispatch error:", err);
    return { success: false };
  }
}

/**
 * Client-side browser event tracking helpers
 */
export function trackClientEvent(
  eventName: "view_item" | "add_to_cart" | "begin_checkout" | "purchase",
  data: any,
  eventId?: string
) {
  if (typeof window === "undefined") return;

  // 1. Google Analytics 4
  const gtag = (window as any).gtag;
  if (typeof gtag === "function") {
    gtag("event", eventName, {
      ...data,
      send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    });
  }

  // 2. Meta Pixel (Mapped to Standard Meta Events with eventId deduplication)
  const fbq = (window as any).fbq;
  if (typeof fbq === "function") {
    const metaEventMap: Record<string, string> = {
      view_item: "ViewContent",
      add_to_cart: "AddToCart",
      begin_checkout: "InitiateCheckout",
      purchase: "Purchase",
    };
    const metaEvent = metaEventMap[eventName] || eventName;
    if (eventId) {
      fbq("track", metaEvent, data, { eventID: eventId });
    } else {
      fbq("track", metaEvent, data);
    }
  }
}
