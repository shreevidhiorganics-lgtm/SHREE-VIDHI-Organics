import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, createSessionToken } from "@/lib/auth/auth";
import { dataStore } from "@/lib/db/data-store";
import { checkRateLimit, resetRateLimit } from "@/lib/security/rate-limit";
import { dbVerifyOtp, isMySQLConfigured } from "@/lib/db/mysql";
import { ensureDatabaseHydrated } from "@/lib/db/server-sync";

export async function POST(req: NextRequest) {
  try {
    await ensureDatabaseHydrated({ force: true });
    const body = await req.json();
    const { email, password, phone, otp } = body;
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";

    // Flow 1: Phone + OTP Sign In
    if (phone && otp) {
      const cleanPhone = phone.replace(/\D/g, "").slice(-10);

      // Rate limit OTP verification attempts (Max 5 attempts per 15 mins)
      const otpLimit = checkRateLimit(`otp_verify:${cleanPhone}`, 5, 15 * 60 * 1000);
      if (!otpLimit.allowed) {
        return NextResponse.json(
          { error: `Too many invalid attempts. Please wait ${otpLimit.resetInSec} seconds before trying again.` },
          { status: 429 }
        );
      }

      let isValid = dataStore.verifyOtp(cleanPhone, otp);
      if (!isValid && isMySQLConfigured()) {
        isValid = await dbVerifyOtp(cleanPhone, otp);
      }
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid or expired verification code." },
          { status: 401 }
        );
      }

      const existingUser = dataStore.getUserByPhone(cleanPhone);
      if (!existingUser) {
        return NextResponse.json(
          { error: "No account found with this phone. Please sign in as a first-time visitor." },
          { status: 404 }
        );
      }

      // Successful login resets rate limit
      resetRateLimit(`otp_verify:${cleanPhone}`);

      const token = await createSessionToken({
        userId: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        phone: existingUser.phone,
        role: existingUser.role,
        address: existingUser.address,
      });

      const response = NextResponse.json({
        success: true,
        user: existingUser,
      });

      response.cookies.set({
        name: "svo_session_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    // Flow 2: Email & Password (Admin Login)
    if (!email || !password) {
      return NextResponse.json(
        { error: "Please provide either email/password or phone/OTP." },
        { status: 400 }
      );
    }

    // Rate limit password login attempts (Max 5 attempts per IP per 15 mins)
    const loginLimit = checkRateLimit(`login_pass:${clientIp}`, 5, 15 * 60 * 1000);
    if (!loginLimit.allowed) {
      return NextResponse.json(
        { error: `Too many login attempts. Access temporarily restricted. Try again in ${loginLimit.resetInSec} seconds.` },
        { status: 429 }
      );
    }

    const sessionData = await authenticateUser(email, password);
    if (!sessionData) {
      console.warn(`[SECURITY] Failed admin authentication attempt from IP: ${clientIp} for email: ${email}`);
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Successful admin login resets the limiter
    resetRateLimit(`login_pass:${clientIp}`);
    console.log(`[SECURITY] Successful admin authentication for ${email} from ${clientIp}`);

    const token = await createSessionToken(sessionData);

    const response = NextResponse.json({
      success: true,
      user: sessionData,
    });

    response.cookies.set({
      name: "svo_session_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Internal authentication error." },
      { status: 500 }
    );
  }
}
