"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { ScrollReveal } from "@/components/common/ScrollReveal";

interface FeaturedSectionProps {
  title: string;
  eyebrow?: string;
  description?: string;
  products: Product[];
  viewAllHref: string;
  viewAllText?: string;
  bgColor?: "ivory" | "white" | "cream";
  limit?: number;
}

export function FeaturedSection({
  title,
  eyebrow,
  description,
  products,
  viewAllHref,
  viewAllText = "View Entire Collection",
  bgColor = "white",
  limit = 12,
}: FeaturedSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  if (products.length === 0) return null;

  const filterTabs = [
    { id: "all", label: "All Products" },
    { id: "bestsellers", label: "Best Sellers" },
    { id: "face", label: "Skin & Face Care" },
    { id: "hair", label: "Hair Care" },
    { id: "wellness", label: "Wellness & Superfoods" },
  ];

  const filtered = products.filter((p) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "bestsellers") return p.isBestseller;
    if (selectedCategory === "face") return p.categoryId === "cat-facepacks" || p.categoryId === "cat-skin";
    if (selectedCategory === "hair") return p.categoryId === "cat-hair";
    if (selectedCategory === "wellness") return p.categoryId === "cat-wellness";
    return true;
  });

  const displayedProducts = limit ? filtered.slice(0, limit) : filtered;

  const bgClasses = {
    ivory: "bg-[#FAF8F5]",
    white: "bg-white",
    cream: "bg-[#F7F4EE]/70",
  }[bgColor];

  return (
    <section className={`py-16 sm:py-24 ${bgClasses} relative overflow-hidden border-b border-[#EDE7DD]/60`}>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="space-y-2 max-w-xl">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-3.5 py-1.5 rounded-full border border-[#C5A872]/40 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D8B980]" />
                <span>{eyebrow}</span>
              </div>
            )}
            
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-forest-950 tracking-tight">
              {title}
            </h2>

            {description && (
              <p className="text-xs sm:text-sm text-forest-900/70 leading-relaxed font-light">
                {description}
              </p>
            )}
          </div>

          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 text-xs font-medium text-forest-950 hover:text-white group shrink-0 transition-all py-2.5 px-5 rounded-full border border-[#18231C]/25 hover:border-[#C5A872] bg-[#18231C]/5 hover:bg-[#18231C] shadow-sm"
          >
            <span>{viewAllText}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8C6D32] group-hover:text-[#D8B980] group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 max-w-6xl mx-auto">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`py-2 px-4 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#18231C] text-white shadow-md border border-[#C5A872]/50 scale-[1.02]"
                    : "bg-[#F7F4EE] hover:bg-[#EFE9DF] text-forest-900/80 border border-[#EDE7DD]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid: Perfectly balanced 3-column layout on desktop, 2-column on tablet, 1-column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {displayedProducts.map((product, idx) => (
            <ScrollReveal
              key={product.id}
              direction="up"
              delay={idx * 0.05}
              duration={0.5}
              className="h-full flex flex-col"
            >
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
