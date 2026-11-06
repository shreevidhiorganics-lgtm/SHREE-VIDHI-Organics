"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Phone, ArrowRight, Sparkles } from "lucide-react";
import { useUIStore } from "@/store/ui-store";

export default function RegisterPage() {
  const router = useRouter();
  const { addToast } = useUIStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`Account created for ${name}! Please sign in.`, "success");
    router.push("/login");
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white/90 p-8 sm:p-12 rounded-3xl sm:rounded-[2.5rem] border border-[#EDE7DD] shadow-[0_12px_40px_-8px_rgba(28,37,30,0.06)] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#F7F3E9] border border-[#EDE5D3] flex items-center justify-center text-[#8C6D32] mx-auto">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#18231C]">
              Join the Sacred Circle
            </h1>
            <p className="text-xs text-[#6C766F] font-light">
              Create an account for personalized Ayurvedic advice and fast checkout.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8C6D32] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Pooja Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl pl-11 pr-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8C6D32] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl pl-11 pr-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                Create Password *
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
              className="w-full bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-3.5 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-[#6C766F] font-light pt-2 border-t border-[#F0ECE4]">
            <span>Already have an account? </span>
            <Link href="/login" className="text-[#18231C] font-medium hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
