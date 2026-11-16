import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { createSessionToken } from "@/lib/auth/auth";
import { checkRateLimit, resetRateLimit } from "@/lib/security/rate-limit";
import "@/lib/db/server-sync";

export async function POST(req: NextRequest) {
  try {
    const { phone, otp, name, email, address } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { error: "Mobile number and OTP are required." },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/\D/g, "").slice(-10);

    // OWASP A04: Brute-Force Defense on OTP Verification (Max 5 attempts per 15 mins)
    const rateLimit = checkRateLimit(`otp_verify:${cleanPhone}`, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: `Too many incorrect attempts. Please wait ${rateLimit.resetInSec} seconds before trying again.` },
        { status: 429 }
      );
    }

    const isValidOtp = dataStore.verifyOtp(cleanPhone, otp);

    if (!isValidOtp) {
      return NextResponse.json(
        { error: "Invalid or expired OTP. Please enter the correct 6-digit code or request a new one." },
        { status: 400 }
      );
    }

    // Reset rate limiter on successful verification
    resetRateLimit(`otp_verify:${cleanPhone}`);

    // Name and Email required for registration
    if (!name || !email) {
      // If logging in with just phone & OTP, check if user exists
      const existingUser = dataStore.getUserByPhone(cleanPhone);
      if (!existingUser) {
        return NextResponse.json(
          { error: "First-time visitor. Please provide your full name and email to complete registration." },
          { status: 400 }
        );
      }

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

    // Full customer registration with Address
    const user = dataStore.registerCustomer({
      name,
      email,
      phone: cleanPhone,
      address,
    });

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      address: user.address,
    });

    const response = NextResponse.json({
      success: true,
      user,
      message: "Account verified and registered successfully!",
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
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal error verifying OTP." },
      { status: 500 }
    );
  }
}

