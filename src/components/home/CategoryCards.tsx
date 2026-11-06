"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const mainCategories = [
  {
    id: "face-care",
    title: "Face & Skin Care",
    desc: "Gentle ubtans, non-staining wild turmeric, and herbal clays for glowing, blemish-free skin.",
    image: "/products/natural-ubtan.png",
    href: "/shop?category=ubtan-face-packs",
    tag: "From ₹99",
  },
  {
    id: "hair-care",
    title: "Hair & Scalp Care",
    desc: "Pure Kapur Kachri root powder to strengthen roots, control hair fall, and soothe the scalp.",
    image: "/products/kapur-kachri.png",
    href: "/shop?category=hair-care",
    tag: "100% Herbal",
  },
  {
    id: "wellness",
    title: "Hormone Health & Seeds",
    desc: "Natural 2-phase Seed Cycling Kit to support regular periods, ease PMS, and boost energy.",
    image: "/products/seed-cycling-kit-hires.png",
    href: "/product/shree-vidhi-seed-cycling-kit",
    tag: "Best Seller",
  },
];

export function CategoryCards() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden border-b border-[#EDE7DD]">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-3.5 py-1.5 rounded-full border border-[#C5A872]/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B980]" />
            <span>EXPLORE OUR COLLECTIONS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 tracking-tight">
            Shop by Category
          </h2>

          <p className="text-sm text-forest-900/70 leading-relaxed font-light">
            Every product is freshly packed in Varanasi using 100% pure botanical ingredients.
          </p>
        </ScrollReveal>

        {/* 3 Main Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {mainCategories.map((cat, idx) => (
            <ScrollReveal
              key={cat.id}
              direction="up"
              delay={idx * 0.1}
              duration={0.6}
              className="h-full flex flex-col"
            >
              <Link
                href={cat.href}
                className="group relative bg-white rounded-3xl overflow-hidden border border-[#EDE7DD] shadow-[0_4px_20px_-2px_rgba(28,37,30,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(28,37,30,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-[380px] sm:h-[420px]"
              >
                {/* Top Image Window */}
                <div className="relative flex-1 bg-[#FBF9F5] overflow-hidden p-6 flex items-center justify-center">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-106"
                  />

                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-[#18231C] text-[#FAF8F5] text-[10px] font-semibold tracking-wider px-3 py-1 rounded-full uppercase shadow-sm border border-[#C5A872]/30">
                      {cat.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 bg-white border-t border-[#F0ECE4] space-y-2">
                  <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-[#1C3F26] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-forest-900/70 font-light leading-relaxed line-clamp-2">
                    {cat.desc}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#8C6D32] group-hover:text-[#5E4720]">
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
