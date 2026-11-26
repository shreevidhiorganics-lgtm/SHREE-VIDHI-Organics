/**
 * Fast2SMS Gateway Client for Indian Mobile Numbers
 * Docs: https://docs.fast2sms.com/
 */

export interface SMSResponse {
  success: boolean;
  message?: string;
  requestId?: string;
}

/**
 * Sends a 6-digit verification OTP using Fast2SMS pre-approved OTP route
 */
export async function sendOtpSMS(phone: string, otp: string): Promise<SMSResponse> {
  const cleanPhone = phone.replace(/\D/g, "").slice(-10);
  const apiKey = process.env.FAST2SMS_API_KEY?.trim();

  // If Fast2SMS is not configured yet, log safely for development & testing
  if (!apiKey || apiKey === "your_fast2sms_api_key_here") {
    console.log(`[SMS:MOCK] OTP for +91 ${cleanPhone} is ${otp} (Fast2SMS API key not set).`);
    return {
      success: true,
      message: `[MOCK] Verification code ${otp} logged to console for testing.`,
    };
  }

  try {
    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variables_values: otp,
        route: "otp",
        numbers: cleanPhone,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (data.return === true) {
      console.log(`[SMS:FAST2SMS] OTP dispatched successfully to +91 ${cleanPhone}. Request ID: ${data.request_id}`);
      return {
        success: true,
        message: "OTP sent successfully via Fast2SMS.",
        requestId: data.request_id,
      };
    }

    // Fallback to Fast2SMS Quick SMS route ("q") if OTP route is not yet enabled on the account
    console.warn("[SMS:FAST2SMS] OTP route returned error, trying Quick SMS fallback:", data);
    const quickRes = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Your Shree Vidhi Organics verification code is ${otp}. Valid for 10 minutes.`,
        route: "q",
        numbers: cleanPhone,
      }),
    });

    const quickData = await quickRes.json().catch(() => ({}));
    if (quickData.return === true) {
      console.log(`[SMS:FAST2SMS] OTP dispatched via Quick SMS to +91 ${cleanPhone}. Request ID: ${quickData.request_id}`);
      return {
        success: true,
        message: "OTP sent successfully via Fast2SMS.",
        requestId: quickData.request_id,
      };
    }

    console.error("[SMS:FAST2SMS] Dispatch error response:", quickData);
    return {
      success: false,
      message: Array.isArray(quickData.message)
        ? quickData.message.join(", ")
        : quickData.message || (Array.isArray(data.message) ? data.message.join(", ") : data.message) || "Failed to send SMS.",
    };
  } catch (err: any) {
    console.error("[SMS:FAST2SMS] Network error sending OTP:", err);
    return {
      success: false,
      message: err?.message || "Fast2SMS network connection failure.",
    };
  }
}

/**
 * Sends order confirmation SMS to customer
 */
export async function sendOrderConfirmationSMS(
  phone: string,
  orderNumber: string,
  total: number
): Promise<SMSResponse> {
  const cleanPhone = phone.replace(/\D/g, "").slice(-10);
  const apiKey = process.env.FAST2SMS_API_KEY?.trim();

  const textMessage = `Namaste! Your Shree Vidhi Organics order ${orderNumber} for Rs. ${total} has been confirmed. Track: https://shreevidhiorganics.com/track-order?orderNumber=${orderNumber}`;

  if (!apiKey || apiKey === "your_fast2sms_api_key_here") {
    console.log(`[SMS:MOCK] Order confirmation sent to +91 ${cleanPhone}: "${textMessage}"`);
    return { success: true };
  }

  try {
    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: textMessage,
        route: "q",
        numbers: cleanPhone,
      }),
    });

    const data = await response.json().catch(() => ({}));
    return { success: Boolean(data.return) };
  } catch (err) {
    console.error("[SMS:FAST2SMS] Error sending order confirmation SMS:", err);
    return { success: false };
  }
}

/**
 * Sends dispatch & tracking SMS with live tracking number
 */
export async function sendOrderDispatchedSMS(
  phone: string,
  orderNumber: string,
  trackingNumber: string,
  trackingUrl?: string
): Promise<SMSResponse> {
  const cleanPhone = phone.replace(/\D/g, "").slice(-10);
  const apiKey = process.env.FAST2SMS_API_KEY?.trim();

  const trackingLink = trackingUrl || `https://shreevidhiorganics.com/track-order?orderNumber=${orderNumber}`;
  const textMessage = `Your Shree Vidhi Organics order ${orderNumber} has been dispatched from Varanasi! AWB/Tracking: ${trackingNumber}. Track live: ${trackingLink}`;

  if (!apiKey || apiKey === "your_fast2sms_api_key_here") {
    console.log(`[SMS:MOCK] Order dispatched SMS sent to +91 ${cleanPhone}: "${textMessage}"`);
    return { success: true };
  }

  try {
    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: textMessage,
        route: "q",
        numbers: cleanPhone,
      }),
    });

    const data = await response.json().catch(() => ({}));
    return { success: Boolean(data.return) };
  } catch (err) {
    console.error("[SMS:FAST2SMS] Error sending dispatch SMS:", err);
    return { success: false };
  }
}
