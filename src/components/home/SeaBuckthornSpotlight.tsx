"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Droplets,
  Heart,
  Star,
  Check,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

interface SeaBuckthornSpotlightProps {
  product?: Product;
}

export function SeaBuckthornSpotlight({ product }: SeaBuckthornSpotlightProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { addToast, openCartDrawer } = useUIStore();
  const [added, setAdded] = useState(false);

  const price = product?.salePrice ?? 899;
  const mrp = product?.mrp ?? 1499;
  const discountPercent = Math.round(((mrp - price) / mrp) * 100);

  const handleAddToCart = () => {
    if (!product) return;
    const res = addItem(product);
    if (res.success) {
      setAdded(true);
      addToast("Added Sea Buckthorn Pulp to your bag!", "success");
      setTimeout(() => setAdded(false), 1600);
      openCartDrawer();
    } else {
      addToast(res.message, "error");
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] border-y border-[#EDE7DD] relative overflow-hidden">
      {/* Subtle background ambient elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E8DEC7]/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#D5E2D5]/30 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-white rounded-3xl lg:rounded-[2.5rem] border border-[#E5DCB8] shadow-[0_8px_40px_-12px_rgba(28,37,30,0.08)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left: Product Imagery Showcase */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#FAF6EE] to-[#F1E8D5] p-6 sm:p-10 lg:p-12 flex flex-col items-center justify-center relative min-h-[340px] sm:min-h-[420px] border-b lg:border-b-0 lg:border-r border-[#EDE7DD]">
              {/* Badges */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-1.5 z-10">
                <span className="bg-[#1C3F26] text-[#D8B980] border border-[#C5A872]/40 text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#C5A872]" />
                  <span>Featured Superfood</span>
                </span>
                <span className="bg-[#C5A872] text-[#18231C] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm self-start">
                  Save {discountPercent}%
                </span>
              </div>

              {/* Product Bottle Render */}
              <div className="relative w-56 h-64 sm:w-64 sm:h-80 transition-transform duration-500 hover:scale-105">
                <Image
                  src={product?.images[0]?.url || "/pictures/products/seabuckthorn-pulp.png"}
                  alt="Shree Vidhi 100% Pure Himalayan Sea Buckthorn Pulp 500ml"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
                />
              </div>

              {/* Quick specs pill */}
              <div className="mt-4 inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-[#EDE7DD] px-4 py-1.5 rounded-full text-xs text-forest-900 shadow-xs">
                <span className="font-semibold text-[#1C3F26]">500 ML</span>
                <span className="text-[#EDE7DD]">|</span>
                <span className="font-light">Wild Himalayan Harvest</span>
                <span className="text-[#EDE7DD]">|</span>
                <span className="font-semibold text-[#8C6D32]">100% Pure Pulp</span>
              </div>
            </div>

            {/* Right: Product Narrative, Nutrients & Direct Buy */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6">
              {/* Rating & Origin */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0ECE4] pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-forest-950">4.96 / 5.0</span>
                  <span className="text-xs text-muted-foreground font-light">(62 verified reviews)</span>
                </div>
                <span className="text-xs text-forest-900/70 font-light flex items-center gap-1">
                  🌿 <span>Certified Classical Formula</span>
                </span>
              </div>

              {/* Main Headline */}
              <div>
                <span className="text-[11px] font-bold text-[#8C6D32] uppercase tracking-[0.2em] block mb-1.5">
                  Himalayan Golden Superberry Elixir
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-forest-950 leading-tight">
                  100% Pure Himalayan Sea Buckthorn Pulp
                </h2>
                <p className="text-xs sm:text-sm text-forest-900/75 mt-2.5 font-light leading-relaxed">
                  Wild-harvested from high altitudes in the Himalayas. Known as the &ldquo;Holy Fruit of the Himalayas,&rdquo; it delivers over 190 bioactive nutrients, the world&apos;s rarest Omega 7 fatty acids, and 12 times the natural Vitamin C of oranges for comprehensive cellular vitality.
                </p>
              </div>

              {/* Key Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DD]">
                  <Droplets className="w-4 h-4 text-[#8C6D32] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-forest-950 font-medium block">Rare Omega 7, 3, 6 & 9</strong>
                    <span className="text-muted-foreground text-[11px] font-light">Deep cell membrane & skin hydration</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DD]">
                  <Sparkles className="w-4 h-4 text-[#C5A872] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-forest-950 font-medium block">12x Vitamin C of Oranges</strong>
                    <span className="text-muted-foreground text-[11px] font-light">Potent natural immunity & collagen booster</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DD]">
                  <Heart className="w-4 h-4 text-[#A64F35] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-forest-950 font-medium block">Gut & Metabolic Health</strong>
                    <span className="text-muted-foreground text-[11px] font-light">Soothes mucosal lining & digestion</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DD]">
                  <CheckCircle2 className="w-4 h-4 text-[#2A5C38] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-forest-950 font-medium block">Zero Additives or Sugar</strong>
                    <span className="text-muted-foreground text-[11px] font-light">100% cold-pressed unadulterated pulp</span>
                  </div>
                </div>
              </div>

              {/* Pricing & Call to Action Bar */}
              <div className="pt-4 border-t border-[#F0ECE4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
                      {formatPrice(price)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(mrp)}
                    </span>
                    <span className="text-xs font-semibold text-[#2A5C38] bg-[#EBF1EB] px-2 py-0.5 rounded-full">
                      Save {formatPrice(mrp - price)}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#6C766F] font-light mt-0.5">
                    Inclusive of all taxes • Free express shipping nationwide
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`py-3.5 px-6 sm:px-8 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-soothe active:scale-95 cursor-pointer ${
                      added
                        ? "bg-[#2A5C38] text-white"
                        : "bg-[#1C3F26] hover:bg-[#14301D] text-white hover:shadow-card"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#D8C7A3]" />
                        <span>Add to Bag • {formatPrice(price)}</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/product/${product?.slug || "shree-vidhi-sea-buckthorn-pulp-500ml"}`}
                    className="p-3.5 rounded-full border border-[#EDE7DD] hover:border-[#C5A872] bg-white text-forest-900 hover:text-[#8C6D32] transition-colors"
                    title="View Full Product Details"
                    aria-label="View product details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Bottom Assurance */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-muted-foreground font-light">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2A5C38]" />
                  <span>100% Quality Assured</span>
                </span>
                <span>•</span>
                <span>Dispatches within 24h</span>
                <span>•</span>
                <span>Pure vegetarian Ayurvedic formulation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

