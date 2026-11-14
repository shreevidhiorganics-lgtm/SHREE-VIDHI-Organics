import { Order } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";

const RESEND_API_URL = "https://api.resend.com/emails";

export interface EmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Sends order confirmation invoice email via Resend
 */
export async function sendOrderConfirmationEmail(order: Order): Promise<EmailResult> {
  const recipient = order.guestEmail || order.shippingAddress.phone;
  if (!order.guestEmail) {
    console.log(`[Email] No customer email provided for order ${order.orderNumber}. Skipping email receipt.`);
    return { success: true };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.EMAIL_FROM || "Shree Vidhi Organics <orders@shreevidhiorganics.com>";

  if (!apiKey || apiKey === "re_your_resend_api_key_here") {
    console.log(`[Email:MOCK] Order confirmation email logged for ${order.guestEmail} (Order #${order.orderNumber}).`);
    return { success: true, id: `mock-email-${order.orderNumber}` };
  }

  const htmlContent = generateOrderEmailHtml(order);

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [order.guestEmail],
        subject: `Order Confirmed: #${order.orderNumber} - Shree Vidhi Organics`,
        html: htmlContent,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("[Email:Resend] Error response:", data);
      return { success: false, error: data.message || "Failed to send email via Resend." };
    }

    console.log(`[Email:Resend] Confirmation email sent to ${order.guestEmail}. Email ID: ${data.id}`);
    return { success: true, id: data.id };
  } catch (err: any) {
    console.error("[Email:Resend] Network error:", err);
    return { success: false, error: err?.message || "Resend connection error." };
  }
}

/**
 * Sends dispatch & tracking notification email via Resend
 */
export async function sendShippingDispatchedEmail(order: Order): Promise<EmailResult> {
  if (!order.guestEmail) return { success: true };

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.EMAIL_FROM || "Shree Vidhi Organics <orders@shreevidhiorganics.com>";
  const trackingLink = order.trackingUrl || `https://shreevidhiorganics.com/track-order?orderNumber=${order.orderNumber}`;

  if (!apiKey || apiKey === "re_your_resend_api_key_here") {
    console.log(`[Email:MOCK] Dispatch email logged for ${order.guestEmail} (AWB: ${order.trackingNumber}).`);
    return { success: true };
  }

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF8F5; padding: 32px 20px; color: #18231C;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="font-family: Georgia, serif; font-size: 26px; color: #1C3F26; margin: 0; letter-spacing: 0.5px;">SHREE VIDHI</h1>
        <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #8C6D32; margin-top: 4px;">Sacred Care for Timeless Radiance</p>
      </div>

      <div style="background: #ffffff; border-radius: 16px; border: 1px solid #EDE7DD; padding: 28px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
        <h2 style="font-family: Georgia, serif; font-size: 20px; color: #18231C; margin-top: 0;">Your Sacred Formulations are on the Way!</h2>
        <p style="font-size: 13px; line-height: 1.6; color: #4A544E;">
          Namaste <strong>${order.shippingAddress.fullName}</strong>,<br>
          Your Ayurvedic preparations for Order <strong>#${order.orderNumber}</strong> have been mindfully compounded, sealed, and dispatched from our Varanasi center.
        </p>

        <div style="background: #FAF8F5; border-radius: 12px; border: 1px solid #EDE7DD; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 6px 0; font-size: 12px; color: #6C766F;">Courier Partner: <strong style="color: #18231C;">${order.courierName || "Shiprocket Express Partner"}</strong></p>
          <p style="margin: 0; font-size: 12px; color: #6C766F;">AWB / Tracking Number: <strong style="color: #1C3F26; font-family: monospace;">${order.trackingNumber || "Assigned"}</strong></p>
        </div>

        <div style="text-align: center; margin: 28px 0;">
          <a href="${trackingLink}" style="background: #1C3F26; color: #FAF8F5; text-decoration: none; padding: 13px 28px; border-radius: 30px; font-size: 13px; font-weight: 600; display: inline-block;">
            Track Your Dispatch Live
          </a>
        </div>

        <p style="font-size: 11px; color: #8A948C; text-align: center; margin-top: 24px; border-top: 1px solid #F0ECE4; padding-top: 16px;">
          Shree Vidhi Organics • Birdopur, Varanasi, Uttar Pradesh 221010
        </p>
      </div>
    </div>
  `;

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [order.guestEmail],
        subject: `Dispatched: Order #${order.orderNumber} is on its way - Shree Vidhi Organics`,
        html: htmlContent,
      }),
    });

    return { success: response.ok };
  } catch (err) {
    console.error("[Email:Resend] Error sending dispatch email:", err);
    return { success: false };
  }
}

/**
 * Generates clean, responsive HTML invoice receipt
 */
function generateOrderEmailHtml(order: Order): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #F0ECE4; font-size: 13px;">
        <strong style="color: #18231C;">${item.productName}</strong>
        ${item.variantTitle ? `<br><span style="font-size: 11px; color: #6C766F;">${item.variantTitle}</span>` : ""}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #F0ECE4; text-align: center; font-size: 13px; color: #6C766F;">
        ${item.quantity}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #F0ECE4; text-align: right; font-size: 13px; font-weight: 600; color: #1C3F26;">
        ${formatPrice(item.total)}
      </td>
    </tr>
  `
    )
    .join("");

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF8F5; padding: 32px 20px; color: #18231C;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="font-family: Georgia, serif; font-size: 26px; color: #1C3F26; margin: 0; letter-spacing: 0.5px;">SHREE VIDHI</h1>
        <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #8C6D32; margin-top: 4px;">Sacred Care for Timeless Radiance</p>
      </div>

      <div style="background: #ffffff; border-radius: 16px; border: 1px solid #EDE7DD; padding: 28px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
        <div style="border-bottom: 1px solid #F0ECE4; padding-bottom: 16px; margin-bottom: 20px;">
          <span style="font-size: 11px; color: #8C6D32; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Order Confirmed</span>
          <h2 style="font-family: Georgia, serif; font-size: 20px; color: #18231C; margin: 4px 0 0 0;">Thank you, ${order.shippingAddress.fullName}!</h2>
          <p style="font-size: 12px; color: #6C766F; margin: 4px 0 0 0;">Order Reference: <strong>#${order.orderNumber}</strong> • ${formatDate(order.createdAt)}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="border-bottom: 1px solid #EDE7DD;">
              <th style="text-align: left; font-size: 11px; text-transform: uppercase; color: #8C6D32; padding-bottom: 8px;">Formulation</th>
              <th style="text-align: center; font-size: 11px; text-transform: uppercase; color: #8C6D32; padding-bottom: 8px;">Qty</th>
              <th style="text-align: right; font-size: 11px; text-transform: uppercase; color: #8C6D32; padding-bottom: 8px;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="border-top: 1px solid #EDE7DD; padding-top: 14px; font-size: 12px; line-height: 1.8;">
          <div style="display: flex; justify-content: space-between; color: #6C766F;">
            <span>Subtotal:</span>
            <span>${formatPrice(order.subtotal)}</span>
          </div>
          ${
            order.discount > 0
              ? `
          <div style="display: flex; justify-content: space-between; color: #2D5A38;">
            <span>Discount (${order.couponCode || "Coupon"}):</span>
            <span>-${formatPrice(order.discount)}</span>
          </div>`
              : ""
          }
          <div style="display: flex; justify-content: space-between; color: #6C766F;">
            <span>Express Delivery:</span>
            <span>${order.shippingFee === 0 ? "Free" : formatPrice(order.shippingFee)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 15px; font-weight: bold; color: #1C3F26; margin-top: 8px; padding-top: 8px; border-top: 1px dashed #EDE7DD;">
            <span>Total Paid (${order.paymentMethod}):</span>
            <span>${formatPrice(order.total)}</span>
          </div>
        </div>

        <div style="background: #FAF8F5; border-radius: 12px; border: 1px solid #EDE7DD; padding: 14px; margin: 24px 0 16px 0; font-size: 12px;">
          <strong style="color: #18231C; display: block; margin-bottom: 4px;">Delivery Sanctuary:</strong>
          <span style="color: #4A544E; line-height: 1.5;">
            ${order.shippingAddress.fullName}<br>
            ${order.shippingAddress.houseFlat}, ${order.shippingAddress.street}${order.shippingAddress.landmark ? `, ${order.shippingAddress.landmark}` : ""}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pinCode}<br>
            Phone: ${order.shippingAddress.phone}
          </span>
        </div>

        <div style="text-align: center; margin: 24px 0 8px 0;">
          <a href="https://shreevidhiorganics.com/track-order?orderNumber=${order.orderNumber}" style="background: #1C3F26; color: #FAF8F5; text-decoration: none; padding: 12px 28px; border-radius: 30px; font-size: 13px; font-weight: 600; display: inline-block;">
            Track Order Live
          </a>
        </div>

        <p style="font-size: 11px; color: #8A948C; text-align: center; margin-top: 24px; border-top: 1px solid #F0ECE4; padding-top: 16px;">
          Questions about your order? Reach our apothecary at orders@shreevidhiorganics.com<br>
          Shree Vidhi Organics • Birdopur, Varanasi, Uttar Pradesh 221010
        </p>
      </div>
    </div>
  `;
}
