"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  Phone,
  ArrowRight,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useUIStore } from "@/store/ui-store";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";
  const isAdminParam = searchParams.get("admin") === "true" || redirectUrl.startsWith("/admin");
  const { addToast } = useUIStore();

  // Mode: "phone" (default for customers) | "admin" (strictly when ?admin=true or redirect=/admin)
  const [loginMode, setLoginMode] = useState<"phone" | "admin">(isAdminParam ? "admin" : "phone");

  // Keep in sync if searchParams change
  useEffect(() => {
    if (isAdminParam) {
      setLoginMode("admin");
    } else {
      setLoginMode("phone");
    }
  }, [isAdminParam]);

  // Phone Login State
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);

  // Admin Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [notRegistered, setNotRegistered] = useState(false);

  // Countdown timer for resending OTP
  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  // Step 1: Send OTP to verify registered mobile number in database
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotRegistered(false);

    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, checkExisting: true }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.isNewUser) {
          setNotRegistered(true);
        }
        throw new Error(data.error || "Failed to verify mobile number in database.");
      }

      if (data.otp) {
        setOtp(data.otp);
      }

      setOtpSent(true);
      setOtpCountdown(45);
      addToast(`Verification code dispatched to +91 ${cleanPhone}.`, "info");
    } catch (err: any) {
      setError(err.message || "Failed to send verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP and sign in
  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!otp.trim() || otp.trim().length !== 6) {
      setError("Please enter the 6-digit code received on your phone.");
      return;
    }

    setIsLoading(true);
    try {
      const cleanPhone = phone.replace(/\D/g, "").slice(-10);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, otp: otp.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid verification code.");
      }

      addToast(`Welcome back, ${data.user.name}!`, "success");
      router.push(redirectUrl);
    } catch (err: any) {
      setError(err.message || "Sign-in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Admin Password Login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email.toLowerCase().trim() !== "shreevidhiorganics@gmail.com") {
      setError("Unauthorized admin email. Only the authorized administrator email can access this portal.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid admin credentials.");
      }

      addToast(`Welcome to Admin Panel!`, "success");
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to authenticate admin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white/95 p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] border border-[#EDE7DD] shadow-[0_12px_40px_-8px_rgba(28,37,30,0.06)] space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF1EB] border border-[#D5E3D5] flex items-center justify-center text-[#2D5A38] mx-auto">
              {loginMode === "admin" ? (
                <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
              ) : (
                <UserCheck className="w-5 h-5 stroke-[1.75]" />
              )}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#18231C]">
              {loginMode === "admin" ? "Administrative Authentication" : "Sign In to Shree Vidhi"}
            </h1>
            <p className="text-xs text-[#6C766F] font-light">
              {loginMode === "admin"
                ? "Sign in with the authorized administrator email."
                : "Verify your mobile number to access your orders and saved sanctuary rituals."}
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-[#FAF0ED] border border-[#F2D7CE] rounded-2xl text-xs text-[#A64F35] space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#A64F35] shrink-0" />
                <span>{error}</span>
              </div>
              {notRegistered && (
                <div className="pt-1">
                  <Link
                    href={`/register?phone=${encodeURIComponent(phone)}&redirect=${encodeURIComponent(redirectUrl)}`}
                    className="inline-flex items-center gap-1 font-semibold text-[#1C3F26] hover:underline"
                  >
                    <span>Register as First-Time Visitor →</span>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* 1. MOBILE NUMBER OTP SIGN-IN (CUSTOMER FLOW) */}
          {loginMode === "phone" && (
            <div className="space-y-4 animate-fadeIn">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      Registered Mobile Number *
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-xs font-semibold text-[#18231C] font-mono pointer-events-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl pl-14 pr-4 py-3 text-xs text-[#18231C] font-mono placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                      />
                    </div>
                    <span className="text-[11px] text-[#6C766F] font-light mt-1.5 block">
                      We will verify your mobile number in our database and send a secure one-time code.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-3.5 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#D8B980]" />
                    <span>{isLoading ? "Verifying Mobile Number..." : "Verify Mobile & Send OTP"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyPhoneOtp} className="space-y-4 animate-fadeIn">
                  <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#EDE7DD] text-xs space-y-1">
                    <span className="text-[#6C766F] font-light">Verification code sent to:</span>
                    <div className="flex items-center justify-between font-mono font-medium text-forest-950">
                      <span>+91 {phone}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setOtp("");
                        }}
                        className="text-[11px] text-[#8C6D32] hover:underline font-sans"
                      >
                        Change Number
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      Enter 6-Digit Verification Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="e.g. 123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full text-center tracking-[0.5em] text-lg font-mono font-bold bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl py-3 text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#6C766F]">
                    <span>Didn&apos;t receive code?</span>
                    {otpCountdown > 0 ? (
                      <span className="font-mono text-[11px]">Resend in {otpCountdown}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-[#8C6D32] hover:underline font-medium flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Resend OTP</span>
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-3.5 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D8B980]" />
                    <span>{isLoading ? "Verifying..." : "Verify OTP & Sign In"}</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 2. ADMIN PASSWORD SIGN-IN */}
          {loginMode === "admin" && (
            <form onSubmit={handleAdminLogin} className="space-y-4 animate-fadeIn">
              <div>
                <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                  Admin Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C6D32] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="shreevidhiorganics@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl pl-11 pr-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                  Admin Master Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C6D32] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl pl-11 pr-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-3.5 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#D8B980]" />
                <span>{isLoading ? "Authenticating..." : "Access Admin Portal"}</span>
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/"
                  className="text-xs text-[#6C766F] hover:text-[#18231C] underline font-light"
                >
                  Return to Storefront
                </Link>
              </div>
            </form>
          )}

          {/* First Time Visitor Sign-Up Callout - Only shown for customers */}
          {loginMode === "phone" && (
            <div className="p-4 bg-[#FAF6EE] border border-[#E8DEC7] rounded-2xl text-xs space-y-2">
              <div className="flex items-center gap-2 text-forest-950 font-medium">
                <Sparkles className="w-4 h-4 text-[#8C6D32]" />
                <span>Visiting for the first time?</span>
              </div>
              <p className="text-[11px] text-[#6C766F] font-light leading-relaxed">
                Sign up with your Name, Mobile Number, OTP verification, and Delivery Address.
              </p>
              <Link
                href={`/register?redirect=${encodeURIComponent(redirectUrl)}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C3F26] hover:underline"
              >
                <span>First-Time Visitor Sign-In with OTP &amp; Address</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
