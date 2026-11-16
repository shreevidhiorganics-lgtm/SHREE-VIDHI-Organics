"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Cookie, X } from "lucide-react";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("shree_vidhi_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      "shree_vidhi_cookie_consent",
      JSON.stringify({ necessary: true, analytics: true, marketing: true, date: new Date().toISOString() })
    );
    setIsVisible(false);
  };

  const handleDeclineOptional = () => {
    localStorage.setItem(
      "shree_vidhi_cookie_consent",
      JSON.stringify({ necessary: true, analytics: false, marketing: false, date: new Date().toISOString() })
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Privacy & Cookie Preferences"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:max-w-md z-50 bg-stone-900/95 backdrop-blur-md text-stone-100 p-5 rounded-2xl shadow-2xl border border-stone-800 text-xs animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-emerald-900/60 border border-emerald-700/40 text-emerald-300 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-1.5">
          <h4 className="font-semibold text-sm text-stone-100 flex items-center gap-1.5">
            Your Privacy & Ayurvedic Trust
          </h4>
          <p className="text-stone-300 leading-relaxed text-[11px]">
            We use essential cookies to maintain your shopping bag and optional analytics to personalize traditional Ayurvedic recommendations. We never sell your personal data.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          onClick={handleDeclineOptional}
          className="px-3 py-1.5 rounded-lg text-stone-400 hover:text-white transition-colors text-[11px]"
        >
          Essential Only
        </button>
        <button
          onClick={handleAcceptAll}
          className="bg-emerald-700 hover:bg-emerald-600 text-white font-medium px-4 py-1.5 rounded-lg shadow-sm transition-colors text-[11px]"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
