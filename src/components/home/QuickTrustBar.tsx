"use client";

import React from "react";
import { Truck, ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";

const trustItems = [
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On all orders ₹499+",
  },
  {
    icon: Sparkles,
    title: "100% Pure & Natural",
    subtitle: "Zero chemicals or fillers",
  },
  {
    icon: ShieldCheck,
    title: "AYUSH & FSSAI Certified",
    subtitle: "100% safe & lab-tested",
  },
  {
    icon: HeartHandshake,
    title: "Made in Varanasi",
    subtitle: "By rural women artisans",
  },
];

export function QuickTrustBar() {
  return (
    <section className="bg-white border-y border-[#EDE7DD] py-5 sm:py-6 relative z-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-2 rounded-xl transition-all duration-300 hover:bg-[#FAF8F5]"
              >
                <div className="w-10 h-10 rounded-full bg-[#1C3F26]/5 border border-[#1C3F26]/15 flex items-center justify-center shrink-0 text-[#1C3F26]">
                  <Icon className="w-5 h-5 text-[#1C3F26]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-xs sm:text-sm text-forest-950 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-forest-900/65 font-light truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

