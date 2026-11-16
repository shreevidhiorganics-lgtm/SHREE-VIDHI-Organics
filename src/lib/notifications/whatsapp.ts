import { Order } from "@/types";
import { formatPrice } from "@/lib/utils";

export interface WhatsAppResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

const WHATSAPP_API_URL = "https://graph.facebook.com/v19.0";

/**
 * Builds direct WhatsApp customer support chat link
 */
export function getWhatsAppSupportUrl(message?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT_PHONE || "919876543210";
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const defaultText = message || "Namaste Shree Vidhi Organics, I need assistance with an Ayurvedic order.";
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultText)}`;
}

/**
 * Sends WhatsApp notification via WhatsApp Cloud API or simulated fallback
 */
async function sendWhatsAppTemplateMessage(
  recipientPhone: string,
  templateName: string,
  components: any[]
): Promise<WhatsAppResult> {
  const token = process.env.WHATSAPP_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();

  // Normalize Indian phone numbers: remove non-digits, ensure 91 prefix
  let cleanPhone = recipientPhone.replace(/[^0-9]/g, "");
  if (cleanPhone.length === 10) {
    cleanPhone = `91${cleanPhone}`;
  }

  // Simulated development mode
  if (!token || !phoneNumberId || token === "your_whatsapp_token_here") {
    console.log(
      `[WhatsApp:MOCK] Message sent to +${cleanPhone} | Template: ${templateName} | Components:`,
      JSON.stringify(components)
    );
    return { success: true, messageId: `mock-wa-${Date.now()}` };
  }

  try {
    const response = await fetch(`${WHATSAPP_API_URL}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: cleanPhone,
        type: "template",
        template: {
          name: templateName,
          language: { code: "en_US" },
          components: components,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[WhatsApp:API] Error response:", data);
      return { success: false, error: data?.error?.message || "WhatsApp API error" };
    }

    const messageId = data?.messages?.[0]?.id;
    console.log(`[WhatsApp:API] Successfully sent ${templateName} to +${cleanPhone}. ID: ${messageId}`);
    return { success: true, messageId };
  } catch (err: any) {
    console.error("[WhatsApp:API] Network error:", err);
    return { success: false, error: err?.message || "WhatsApp network error" };
  }
}

/**
 * 1. Order Confirmation Notification via WhatsApp
 */
export async function sendOrderConfirmationWhatsApp(order: Order): Promise<WhatsAppResult> {
  const recipientPhone = order.shippingAddress.phone || order.guestPhone;
  if (!recipientPhone) return { success: true };

  const customerName = order.shippingAddress.fullName || "Customer";
  const itemsSummary = order.items.map((i) => `${i.productName} (x${i.quantity})`).join(", ");

  return sendWhatsAppTemplateMessage(recipientPhone, "order_confirmation_v1", [
    {
      type: "body",
      parameters: [
        { type: "text", text: customerName },
        { type: "text", text: order.orderNumber },
        { type: "text", text: formatPrice(order.total) },
        { type: "text", text: itemsSummary.slice(0, 100) },
      ],
    },
  ]);
}

/**
 * 2. Shipping & Live Tracking Update via WhatsApp
 */
export async function sendOrderDispatchedWhatsApp(
  order: Order,
  trackingNumber: string,
  trackingUrl: string
): Promise<WhatsAppResult> {
  const recipientPhone = order.shippingAddress.phone || order.guestPhone;
  if (!recipientPhone) return { success: true };

  const customerName = order.shippingAddress.fullName || "Customer";
  const courier = order.courierName || "Express Courier";

  return sendWhatsAppTemplateMessage(recipientPhone, "order_shipped_v1", [
    {
      type: "body",
      parameters: [
        { type: "text", text: customerName },
        { type: "text", text: order.orderNumber },
        { type: "text", text: courier },
        { type: "text", text: trackingNumber },
        { type: "text", text: trackingUrl },
      ],
    },
  ]);
}

/**
 * 3. Abandoned Cart Recovery via WhatsApp (with explicit consent)
 */
export async function sendAbandonedCartWhatsApp(
  phone: string,
  customerName: string,
  cartTotal: number,
  recoveryUrl: string
): Promise<WhatsAppResult> {
  return sendWhatsAppTemplateMessage(phone, "abandoned_cart_recovery_v1", [
    {
      type: "body",
      parameters: [
        { type: "text", text: customerName },
        { type: "text", text: formatPrice(cartTotal) },
        { type: "text", text: recoveryUrl },
      ],
    },
  ]);
}

/**
 * 4. Repeat Purchase / Replenishment Reminder via WhatsApp
 */
export async function sendReplenishmentReminderWhatsApp(
  phone: string,
  customerName: string,
  productName: string,
  reorderUrl: string
): Promise<WhatsAppResult> {
  return sendWhatsAppTemplateMessage(phone, "replenishment_reminder_v1", [
    {
      type: "body",
      parameters: [
        { type: "text", text: customerName },
        { type: "text", text: productName },
        { type: "text", text: reorderUrl },
      ],
    },
  ]);
}
