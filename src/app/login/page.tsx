"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { useUIStore } from "@/store/ui-store";

export default function LoginPage() {
  const router = useRouter();
  const { addToast } = useUIStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      addToast(`Welcome back, ${data.user.name}!`, "success");

      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/account");
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in.");
      setIsLoading(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail("admin@shreevidhiorganics.com");
    setPassword("Admin@ShreeVidhi2026");
  };

  const handleFillDemoCustomer = () => {
    setEmail("pooja.verma@example.com");
    setPassword("Customer@123");
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white/90 p-8 sm:p-12 rounded-3xl sm:rounded-[2.5rem] border border-[#EDE7DD] shadow-[0_12px_40px_-8px_rgba(28,37,30,0.06)] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF1EB] border border-[#D5E3D5] flex items-center justify-center text-[#2D5A38] mx-auto">
              <Lock className="w-5 h-5 stroke-[1.75]" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#18231C]">
              Welcome to Shree Vidhi
            </h1>
            <p className="text-xs text-[#6C766F] font-light">
              Sign in to manage your ritual orders, addresses, and wishlist.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-[#FAF0ED] border border-[#F2D7CE] rounded-2xl text-xs text-[#A64F35] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#A64F35] shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Credentials Banner */}
          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EDE7DD] text-xs space-y-2.5">
            <span className="font-medium text-[#18231C] block flex items-center gap-1.5 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D32]" />
              <span>Quick Login (Demo Credentials)</span>
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleFillDemoAdmin}
                className="py-1.5 px-2.5 bg-white hover:bg-[#F2ECE0] rounded-full border border-[#EDE7DD] font-medium text-[#18231C] text-[11px] transition-colors"
              >
                Fill Admin 🛡️
              </button>
              <button
                type="button"
                onClick={handleFillDemoCustomer}
                className="py-1.5 px-2.5 bg-white hover:bg-[#F2ECE0] rounded-full border border-[#EDE7DD] font-medium text-[#18231C] text-[11px] transition-colors"
              >
                Fill Customer 👤
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C6D32] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl pl-11 pr-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-[#2F3832]">
                  Password
                </label>
                <Link
                  href="/contact"
                  className="text-[11px] text-[#8C6D32] hover:underline font-light"
                >
                  Forgot password?
                </Link>
              </div>
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
              className="w-full bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-3.5 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span>{isLoading ? "Authenticating..." : "Sign In to Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-[#6C766F] font-light pt-2 border-t border-[#F0ECE4]">
            <span>Don&apos;t have an account yet? </span>
            <Link href="/register" className="text-[#18231C] font-medium hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
