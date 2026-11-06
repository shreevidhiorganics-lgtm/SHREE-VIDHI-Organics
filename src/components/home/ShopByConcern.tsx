"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Flower2, Sun, Droplets, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const concerns = [
  {
    title: "Hormone Balance & PCOS",
    badge: "Doctor Recommended",
    icon: Flower2,
    desc: "Natural 2-phase seed rotation to support regular periods, ease cramps & restore calm.",
    products: "Seed Cycling Kit",
    href: "/product/shree-vidhi-seed-cycling-kit",
    color: "from-amber-50 to-orange-50/50",
    iconBg: "bg-amber-100/70 text-amber-800",
    accent: "text-amber-800",
  },
  {
    title: "Tan Removal & Glowing Skin",
    badge: "Customer Favorite",
    icon: Sun,
    desc: "Non-staining wild turmeric, chandan & herbal clays to gently clear sun tan & brighten skin.",
    products: "Natural Ubtan & Beetroot Powder",
    href: "/shop?category=ubtan-face-packs",
    color: "from-rose-50 to-pink-50/50",
    iconBg: "bg-rose-100/70 text-rose-800",
    accent: "text-rose-800",
  },
  {
    title: "Hair Fall & Scalp Health",
    badge: "100% Herbal Root",
    icon: Droplets,
    desc: "Pure aromatic Kapur Kachri to stimulate roots, strengthen follicles, and add natural volume.",
    products: "Kapur Kachri Root Powder",
    href: "/shop?category=hair-care",
    color: "from-emerald-50 to-teal-50/50",
    iconBg: "bg-emerald-100/70 text-emerald-800",
    accent: "text-emerald-800",
  },
  {
    title: "Acne & Excess Oil",
    badge: "Deep Detox",
    icon: ShieldCheck,
    desc: "Ayurvedic Multani Mitti, Neem & Kasturi Turmeric to clear active acne and purify pores.",
    products: "Multani Mitti Neem Turmeric Blend",
    href: "/shop?category=skin-care",
    color: "from-lime-50 to-yellow-50/50",
    iconBg: "bg-lime-100/70 text-lime-800",
    accent: "text-lime-800",
  },
];

export function ShopByConcern() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden border-b border-[#EDE7DD]">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-3.5 py-1.5 rounded-full border border-[#C5A872]/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B980]" />
            <span>TARGETED NATURAL SOLUTIONS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 tracking-tight">
            Shop by Concern
          </h2>

          <p className="text-sm text-forest-900/70 leading-relaxed font-light">
            Simple, chemical-free Ayurvedic care designed for your specific skin, hair, and wellness goals.
          </p>
        </ScrollReveal>

        {/* 4 Concern Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {concerns.map((concern, idx) => {
            const Icon = concern.icon;
            return (
              <ScrollReveal
                key={concern.title}
                direction="up"
                delay={idx * 0.08}
                duration={0.6}
                className="h-full flex flex-col"
              >
                <Link
                  href={concern.href}
                  className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE7DD] shadow-[0_4px_20px_-2px_rgba(28,37,30,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(28,37,30,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div className="space-y-4">
                    {/* Top: Icon & Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${concern.iconBg}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-semibold text-forest-800 bg-[#FAF8F5] border border-[#E8E2D6] px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {concern.badge}
                      </span>
                    </div>

                    {/* Concern Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-forest-950 group-hover:text-[#1C3F26] transition-colors leading-snug">
                      {concern.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-forest-900/70 font-light leading-relaxed">
                      {concern.desc}
                    </p>
                  </div>

                  {/* Bottom: Recommended Product & Action */}
                  <div className="pt-5 mt-5 border-t border-[#F0ECE4] flex items-center justify-between">
                    <span className="text-[11px] font-medium text-forest-900/80">
                      {concern.products}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C6D32] group-hover:text-[#5E4720] group-hover:translate-x-1 transition-all duration-300">
                      Shop Now <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

