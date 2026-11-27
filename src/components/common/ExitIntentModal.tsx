"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, X, Gift, Check, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { items } = useCartStore();

  useEffect(() => {
    const STORAGE_KEY = "svo_exit_intent_dismissed_at";
    const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

    try {
      const dismissedAt = Number(localStorage.getItem(STORAGE_KEY) || "0");
      if (dismissedAt && Date.now() - dismissedAt < COOLDOWN_MS) {
        return;
      }
    } catch {
      return;
    }

    const mountTime = Date.now();
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger after 5s on site, and only once per 7 days
      if (Date.now() - mountTime < 5000) return;
      if (e.clientY <= 0) {
        setIsOpen(true);
        try {
          localStorage.setItem(STORAGE_KEY, String(Date.now()));
        } catch {}
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("WELCOME10");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Special Ayurvedic Welcome Offer"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-gradient-to-b from-stone-50 to-amber-50/50 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-amber-200/80 shadow-2xl relative text-center">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          aria-label="Close offer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-800 text-amber-200 flex items-center justify-center shadow-lg border border-amber-300/40 mb-4">
          <Gift className="w-7 h-7" />
        </div>

        <span className="text-[11px] font-semibold tracking-widest text-emerald-900 uppercase bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200">
          Varanasi Artisan Blessing
        </span>

        <h3 className="text-xl font-bold font-serif text-stone-900 mt-3">
          Wait! Experience Pure Ayurveda with 10% Off
        </h3>

        <p className="text-xs text-stone-600 mt-2 leading-relaxed">
          Crafted in small batches with zero chemicals or artificial fragrances. Take 10% off your entire first order today.
        </p>

        {/* Promo code box */}
        <div className="mt-5 p-3 rounded-2xl bg-white border border-dashed border-amber-400 flex items-center justify-between shadow-sm">
          <div className="text-left pl-2">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Coupon Code</span>
            <span className="font-mono font-bold text-base text-emerald-900 tracking-wider">WELCOME10</span>
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Copied!
              </>
            ) : (
              "Copy Code"
            )}
          </button>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 w-full bg-amber-700 hover:bg-amber-800 text-amber-50 text-xs font-semibold py-3 rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5"
        >
          <span>Claim Offer & Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[10px] text-stone-400 mt-3">Valid on orders above ₹499 • Pan-India Express Delivery</p>
      </div>
    </div>
  );
}
