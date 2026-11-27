import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sendOtpSMS } from "@/lib/notifications/sms";
import { ensureDatabaseHydrated, flushDatabaseSync } from "@/lib/db/server-sync";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await ensureDatabaseHydrated({ force: true });
    const { phone, checkExisting } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }

    // OWASP A04 Rate Limiting: Max 3 OTP requests per phone number per 10 minutes
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const phoneRateLimit = checkRateLimit(`otp_send_phone:${cleanPhone}`, 3, 10 * 60 * 1000);
    const ipRateLimit = checkRateLimit(`otp_send_ip:${clientIp}`, 10, 10 * 60 * 1000);

    if (!phoneRateLimit.allowed || !ipRateLimit.allowed) {
      const waitSec = !phoneRateLimit.allowed ? phoneRateLimit.resetInSec : ipRateLimit.resetInSec;
      return NextResponse.json(
        {
          error: `Too many verification requests. Please wait ${waitSec} seconds before requesting a new code.`,
        },
        { status: 429 }
      );
    }

    // If checking database registration for returning login
    if (checkExisting) {
      const existingUser = dataStore.getUserByPhone(cleanPhone);
      if (!existingUser) {
        return NextResponse.json(
          {
            error: `Mobile number +91 ${cleanPhone} is not registered in our database. Please complete first-time registration.`,
            isNewUser: true,
          },
          { status: 404 }
        );
      }
    }

    const result = dataStore.sendOtp(cleanPhone);
    await flushDatabaseSync();

    // Dispatch real SMS via Fast2SMS (with Quick SMS fallback)
    const smsResult = await sendOtpSMS(cleanPhone, result.otp);

    if (!smsResult.success) {
      console.error(`[AUTH] Fast2SMS failed for +91 ${cleanPhone}:`, smsResult.message);
      return NextResponse.json(
        { error: smsResult.message || "Unable to send OTP SMS right now. Please try again." },
        { status: 502 }
      );
    }

    console.log(`[AUTH] Verification code dispatched to +91 ${cleanPhone}.`);

    const responseBody: Record<string, any> = {
      success: true,
      message: `Verification code dispatched to +91 ${cleanPhone}.`,
    };

    // Only attach in local non-production if explicitly configured for testing
    if (process.env.NODE_ENV !== "production" && process.env.EXPOSE_TEST_OTP === "true") {
      responseBody.otp = result.otp;
    }

    return NextResponse.json(responseBody);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to send OTP." },
      { status: 500 }
    );
  }
}
