"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Sparkles, HeartHandshake, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const benefits = [
  {
    title: "100% Pure & Natural",
    desc: "Clean botanicals and wild herbs. Zero preservatives, parabens, or artificial colors.",
    icon: Leaf,
  },
  {
    title: "Real Results, Time-Tested",
    desc: "Ancient Ayurvedic recipes formulated for real everyday results you can see within 2–4 weeks.",
    icon: Sparkles,
  },
  {
    title: "Handmade in Varanasi",
    desc: "Crafted in small batches by rural women artisans, directly supporting women-led livelihoods.",
    icon: HeartHandshake,
  },
  {
    title: "Vedic Purity & Testing",
    desc: "Rigorous laboratory testing to ensure top purity, authentic potency, and consumer safety.",
    icon: ShieldCheck,
  },
];

export function BrandRangeSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-[#EDE7DD]">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Two-Column: Why Choose Us Narrative & Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          {/* Left Column: Narrative */}
          <ScrollReveal direction="right" duration={0.8} className="space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-3.5 py-1.5 rounded-full border border-[#C5A872]/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D8B980]" />
              <span>HONEST AYURVEDA</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-forest-950">
              Clean Beauty &amp; Wellness Made Simple.
            </h2>

            <p className="text-sm sm:text-base text-forest-900/80 leading-relaxed font-light">
              No complicated routines. No harsh chemicals. At <strong>Shree Vidhi Organics</strong>, we make pure Ayurvedic care accessible, easy to use, and genuinely effective.
            </p>

            {/* Clear Checklist */}
            <div className="space-y-3 pt-1">
              {[
                "Face Care: Gentle herbal ubtan, clay packs, and pure wild turmeric from ₹99",
                "Hair Care: Aromatic Kapur Kachri root powder for scalp detox & volume",
                "Superfood Add-Ons: Pure Himalayan Sea Buckthorn pulp rich in Omega 7 & Vitamin C",
                "100% Transparency: Every ingredient listed, zero hidden additives or perfumes",
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-forest-900/85 font-light">{bullet}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#1C3F26] hover:bg-[#14301D] text-white text-xs sm:text-sm font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4 text-[#D8C7A3]" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Right Column: Visual Showcase */}
          <ScrollReveal direction="left" duration={0.8} delay={0.15}>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#FAF8F5] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EDE7DD] flex items-center justify-center group">
              <Image
                src="/pictures/brand/shreevidhi_brand_showcase.jpg"
                alt="Shree Vidhi Complete Product Lineup"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-2 transition-transform duration-700 group-hover:scale-103"
                priority
              />
            </div>
          </ScrollReveal>
        </div>

        {/* 4 Clean Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-[#EDE7DD]">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <ScrollReveal
                key={b.title}
                direction="up"
                delay={idx * 0.08}
                className="text-center space-y-2.5 p-4 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DD] group hover:border-[#C5A872] transition-colors h-full flex flex-col justify-start"
              >
                <div className="w-11 h-11 rounded-full border border-[#C5A872]/40 bg-white flex items-center justify-center mx-auto text-[#8C6D32] group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Icon className="w-5 h-5 text-[#8C6D32]" />
                </div>
                <h3 className="font-serif text-base font-bold text-forest-950">
                  {b.title}
                </h3>
                <p className="text-xs text-forest-900/70 font-light leading-relaxed">
                  {b.desc}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
