"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Home,
} from "lucide-react";
import { useUIStore } from "@/store/ui-store";

const INDIAN_STATES = [
  "Uttar Pradesh",
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "West Bengal",
  "Rajasthan",
  "Kerala",
  "Madhya Pradesh",
  "Bihar",
  "Punjab",
  "Haryana",
  "Telangana",
  "Andhra Pradesh",
  "Odisha",
  "Assam",
  "Uttarakhand",
  "Himachal Pradesh",
  "Jharkhand",
  "Chhattisgarh",
  "Goa",
  "Jammu & Kashmir",
];

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";
  const { addToast } = useUIStore();

  // Multi-step Flow: 1 = Details, 2 = Mobile OTP, 3 = Delivery Address
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    houseFlat: "",
    street: "",
    landmark: "",
    city: "",
    state: "Uttar Pradesh",
    pinCode: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(0);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Send OTP to Mobile
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Please fill in your name, email, and 10-digit mobile number.");
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, "").slice(-10);
    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send verification OTP.");
      }

      // If mock/demo OTP returned, auto-populate helper
      if (data.otp) {
        setFormData((prev) => ({ ...prev, otp: data.otp }));
      }

      addToast(`OTP dispatched to +91 ${cleanPhone}.`, "info");
      setOtpCountdown(45);
      setStep(2);
    } catch (err: any) {
      setError(err.message || "Failed to dispatch OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify Mobile OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.otp.trim() || formData.otp.trim().length !== 6) {
      setError("Please enter the 6-digit verification code sent to your phone.");
      return;
    }

    // Proceed to Step 3 (Delivery Address)
    setStep(3);
    addToast("Mobile number verified! Please add your delivery address.", "success");
  };

  // Step 3: Complete Sign-In with Delivery Address
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.houseFlat.trim() || !formData.street.trim() || !formData.city.trim() || !formData.pinCode.trim()) {
      setError("Please fill in all required delivery address fields.");
      return;
    }

    if (formData.pinCode.trim().length !== 6 || !/^\d+$/.test(formData.pinCode.trim())) {
      setError("Please enter a valid 6-digit Indian PIN code.");
      return;
    }

    setIsLoading(true);
    try {
      const cleanPhone = formData.phone.replace(/\D/g, "").slice(-10);
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: cleanPhone,
          otp: formData.otp.trim(),
          address: {
            houseFlat: formData.houseFlat.trim(),
            street: formData.street.trim(),
            landmark: formData.landmark.trim(),
            city: formData.city.trim(),
            state: formData.state.trim(),
            pinCode: formData.pinCode.trim(),
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed. Please check your details.");
      }

      addToast(`Welcome to Shree Vidhi, ${data.user.name}! Your account is active.`, "success");
      router.push(redirectUrl);
    } catch (err: any) {
      setError(err.message || "Could not complete sign-in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="bg-white/95 p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] border border-[#EDE7DD] shadow-[0_12px_40px_-8px_rgba(28,37,30,0.06)] space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF1EB] border border-[#D5E3D5] flex items-center justify-center text-[#2D5A38] mx-auto">
              <Sparkles className="w-5 h-5 text-[#2D5A38]" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#18231C]">
              First-Time Visitor Sign-In
            </h1>
            <p className="text-xs text-[#6C766F] font-light max-w-sm mx-auto">
              Create your sanctuary account with verified mobile number and delivery address for authentic Ayurvedic shipments.
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center justify-between px-2 pt-1 border-y border-[#F0ECE4] py-3 text-xs">
            <div className={`flex items-center gap-1.5 font-medium ${step >= 1 ? "text-[#1C3F26]" : "text-[#9FA8A1]"}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? "bg-[#1C3F26] text-white" : "bg-gray-100 text-gray-500"}`}>
                1
              </span>
              <span>Details</span>
            </div>
            <div className="h-[1px] w-8 bg-[#EDE7DD]" />
            <div className={`flex items-center gap-1.5 font-medium ${step >= 2 ? "text-[#1C3F26]" : "text-[#9FA8A1]"}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? "bg-[#1C3F26] text-white" : "bg-gray-100 text-gray-500"}`}>
                2
              </span>
              <span>Mobile OTP</span>
            </div>
            <div className="h-[1px] w-8 bg-[#EDE7DD]" />
            <div className={`flex items-center gap-1.5 font-medium ${step === 3 ? "text-[#1C3F26]" : "text-[#9FA8A1]"}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? "bg-[#1C3F26] text-white" : "bg-gray-100 text-gray-500"}`}>
                3
              </span>
              <span>Address</span>
            </div>
          </div>

          {error && (
            <div className="p-3.5 bg-[#FAF0ED] border border-[#F2D7CE] rounded-2xl text-xs text-[#A64F35] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#A64F35] shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4 animate-fadeIn">
              <div>
                <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C6D32] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Aditi Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl pl-11 pr-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C6D32] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="aditi@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl pl-11 pr-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                  Mobile Number (for SMS OTP verification) *
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-xs font-semibold text-[#18231C] font-mono pointer-events-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    required
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl pl-14 pr-4 py-2.5 text-xs text-[#18231C] font-mono placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
                  />
                </div>
                <span className="text-[11px] text-[#6C766F] font-light mt-1 block">
                  We will send a 6-digit one-time code to verify this number.
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-3.5 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <span>{isLoading ? "Sending OTP..." : "Send Verification OTP →"}</span>
              </button>
            </form>
          )}

          {/* STEP 2: Mobile OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fadeIn">
              <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#EDE7DD] text-xs space-y-1">
                <span className="text-[#6C766F] font-light">Code sent to:</span>
                <div className="flex items-center justify-between font-mono font-medium text-forest-950">
                  <span>+91 {formData.phone}</span>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[11px] text-[#8C6D32] hover:underline font-sans"
                  >
                    Change Number
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                  Enter 6-Digit OTP Code *
                </label>
                <input
                  type="text"
                  name="otp"
                  maxLength={6}
                  required
                  placeholder="e.g. 123456"
                  value={formData.otp}
                  onChange={handleChange}
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
                className="w-full bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-3.5 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D8B980]" />
                <span>Verify OTP &amp; Continue →</span>
              </button>
            </form>
          )}

          {/* STEP 3: Delivery Address */}
          {step === 3 && (
            <form onSubmit={handleCompleteRegistration} className="space-y-4 animate-fadeIn">
              <div className="p-3 bg-[#EBF1EB] border border-[#D5E3D5] rounded-2xl flex items-center gap-2 text-xs text-[#2D5A38]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Mobile number verified. Enter your delivery address below:</span>
              </div>

              <div>
                <label className="text-xs font-medium text-[#2F3832] block mb-1">
                  Flat / House / Apartment / Building No. *
                </label>
                <input
                  type="text"
                  name="houseFlat"
                  required
                  placeholder="e.g. Flat 302, Green Valley Apartments"
                  value={formData.houseFlat}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#2F3832] block mb-1">
                  Street Address / Locality / Sector *
                </label>
                <input
                  type="text"
                  name="street"
                  required
                  placeholder="e.g. Main Ring Road, Kashi Ghat"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#2F3832] block mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  name="landmark"
                  placeholder="e.g. Near Shiv Temple / Behind City Mall"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-[#2F3832] block mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Varanasi"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-3 py-2 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#2F3832] block mb-1">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-3 py-2 text-xs text-[#18231C] focus:outline-none focus:border-[#7D9980] cursor-pointer"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#2F3832] block mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    maxLength={6}
                    required
                    placeholder="221005"
                    value={formData.pinCode}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-3 py-2 text-xs text-[#18231C] font-mono placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-3.5 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#D8B980]" />
                <span>{isLoading ? "Saving Sanctuary Profile..." : "Complete Sign-In & Save Delivery Address"}</span>
              </button>
            </form>
          )}

          {/* Footer link */}
          <div className="text-center text-xs text-[#6C766F] font-light pt-2 border-t border-[#F0ECE4]">
            <span>Already have an account? </span>
            <Link href="/login" className="text-[#18231C] font-medium hover:underline">
              Sign In here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
