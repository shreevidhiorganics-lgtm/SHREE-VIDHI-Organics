"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShoppingBag, Sparkles, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { dataStore } from "@/lib/db/data-store";

export function SeedCyclingSpotlight() {
  const [addedAnimation, setAddedAnimation] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { openCartDrawer, addToast } = useUIStore();

  const seedProduct = dataStore.getProductBySlug("shree-vidhi-seed-cycling-kit");

  const handleQuickAdd = () => {
    if (!seedProduct) return;
    const res = addItem(seedProduct);
    if (res.success) {
      setAddedAnimation(true);
      addToast("Added Seed Cycling Kit to your bag!", "success");
      setTimeout(() => setAddedAnimation(false), 1600);
      openCartDrawer();
    } else {
      addToast(res.message, "error");
    }
  };

  return (
    <section id="seed-cycling" className="py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden border-b border-[#EDE7DD]">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Product Image & Highlights (5 cols) */}
          <ScrollReveal direction="right" duration={0.8} className="lg:col-span-5">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EDE7DD] flex items-center justify-center group">
              <Image
                src="/pictures/products/seed-cycling-kit-hires.png"
                alt="Shree Vidhi Seed Cycling Kit Jars"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 z-10 bg-[#18231C] text-[#FAF8F5] text-[10px] font-semibold tracking-wider px-3 py-1.5 rounded-full border border-[#C5A872]/40 shadow-sm flex items-center gap-1.5">
                <Heart className="w-3 h-3 text-[#D8B980] fill-current" />
                <span>PCOS &amp; CYCLE SUPPORT</span>
              </div>

              {/* Bottom Discount Tag */}
              <div className="absolute bottom-4 right-4 z-10 bg-[#D48B28] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                Save ₹301
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: 2-Step Visual Guide & Easy E-Commerce Actions (7 cols) */}
          <ScrollReveal direction="left" duration={0.8} delay={0.15} className="lg:col-span-7 space-y-6">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-3.5 py-1.5 rounded-full border border-[#C5A872]/40 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D8B980]" />
                <span>EASY 2-PHASE RITUAL</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-forest-950">
                How Seed Cycling Works
              </h2>

              <p className="text-sm sm:text-base text-forest-900/75 font-light leading-relaxed">
                Formulated by founder <strong>Aditi Singh</strong> after reversing chronic PCOS naturally. Seed cycling syncs with your monthly cycle in two simple phases:
              </p>
            </div>

            {/* 2 Visual Phase Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Phase 1 */}
              <div className="bg-white rounded-2xl p-5 border border-[#EDE7DD] shadow-sm space-y-2 hover:border-[#C5A872] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white bg-[#1C3F26] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Days 1–14
                  </span>
                  <span className="text-[11px] font-semibold text-[#8C6D32]">Phase 1</span>
                </div>
                <h4 className="font-serif font-bold text-forest-950 text-base">
                  Pumpkin &amp; Flax Seeds
                </h4>
                <p className="text-xs text-forest-900/70 font-light leading-relaxed">
                  Packed with zinc &amp; omega-3s. Helps support healthy estrogen levels and natural ovulation.
                </p>
              </div>

              {/* Phase 2 */}
              <div className="bg-white rounded-2xl p-5 border border-[#EDE7DD] shadow-sm space-y-2 hover:border-[#C5A872] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white bg-[#D48B28] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Days 15–30
                  </span>
                  <span className="text-[11px] font-semibold text-[#8C6D32]">Phase 2</span>
                </div>
                <h4 className="font-serif font-bold text-forest-950 text-base">
                  Sesame &amp; Sunflower Seeds
                </h4>
                <p className="text-xs text-forest-900/70 font-light leading-relaxed">
                  Rich in selenium &amp; Vitamin E. Boosts natural progesterone, eases PMS cramps &amp; mood swings.
                </p>
              </div>
            </div>

            {/* Daily Usage Tip */}
            <div className="bg-white/80 rounded-2xl p-4 border border-[#E8E2D6] text-xs text-forest-900/80 font-light flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#1C3F26]/10 text-[#1C3F26] flex items-center justify-center shrink-0 font-bold">
                🥄
              </span>
              <span>
                <strong>How to use:</strong> Just 1 scoop (10–15g) daily. Mix into your morning curd, smoothie, oatmeal, or warm water.
              </span>
            </div>

            {/* Price & Immediate Add to Cart */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-forest-950">
                  ₹1,299
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ₹1,600
                </span>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Free Shipping
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleQuickAdd}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-3.5 px-7 rounded-full text-xs sm:text-sm font-medium transition-all shadow-md active:scale-95 ${
                    addedAnimation
                      ? "bg-[#2A5C38] text-white"
                      : "bg-[#1C3F26] hover:bg-[#14301D] text-white hover:shadow-lg"
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D8C7A3]" />
                      <span>Add Kit to Bag — ₹1,299</span>
                    </>
                  )}
                </button>

                <Link
                  href="/product/shree-vidhi-seed-cycling-kit"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-900 hover:text-[#8C6D32] px-4 py-3 rounded-full hover:bg-white transition-colors"
                >
                  <span>Product Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
