import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { checkRateLimit } from "@/lib/security/rate-limit";
import "@/lib/db/server-sync";

export async function POST(req: NextRequest) {
  try {
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
    const rateLimitKey = `otp_send:${clientIp}:${cleanPhone}`;
    const rateLimit = checkRateLimit(rateLimitKey, 3, 10 * 60 * 1000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many verification requests. Please wait ${rateLimit.resetInSec} seconds before requesting a new code.`,
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

    // OWASP A09 Server Logging & A07 Protection:
    // Never leak OTP in production JSON responses. Log server-side for audit trail.
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
