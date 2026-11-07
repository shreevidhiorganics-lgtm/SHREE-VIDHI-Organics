"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag, Star, Check } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";

interface ProductCardProps {
  product: Product;
}

function getCardTitle(name: string, slug: string): string {
  if (slug.includes("natural-ubtan")) return "Pure & Natural Ubtan Powder (100g)";
  if (slug.includes("beetroot-powder")) return "Pure & Natural Beetroot Powder (100g)";
  if (slug.includes("jangali-haldi")) return "Pure Wild Jangali Haldi Powder (50g)";
  if (slug.includes("kapur-kachri")) return "Kapur Kachri Hair Root Powder (50g)";
  if (slug.includes("multani-neem")) return "Multani Mitti Neem Turmeric Blend (100g)";
  if (slug.includes("vedic-blend")) return "Vedic Blend 15 Herbs Mask & Wash (50g)";
  if (slug.includes("aloe-vera-gel")) return "100% Pure Aloe Vera Gel (200ml)";
  if (slug.includes("sarva-kesh")) return "Sarva Kesh Complete Hair Mask (100g)";
  if (slug.includes("amla-reetha-shikakai")) return "Amla Reetha Shikakai Hair Cleanser (100g)";
  if (slug.includes("natural-scrub")) return "Natural Scrub Exfoliating Blend (100g)";
  if (slug.includes("shagun-haldi")) return "Shagun Haldi Bridal Glow Blend (100g)";
  if (slug.includes("multani-mitti")) return "Pure Multani Mitti Powder (100g)";
  if (slug.includes("chandan")) return "Pure Chandan Sandalwood Powder (50g)";
  if (slug.includes("neem")) return "Pure Neem Leaf Powder (50g)";
  if (slug.includes("tulsi")) return "Pure Tulsi Holy Basil Powder (50g)";
  if (slug.includes("aloe-vera-powder")) return "Pure Aloe Vera Leaf Powder (50g)";
  if (slug.includes("moringa")) return "Pure Moringa Superfood Powder (100g)";
  if (slug.includes("amla-powder")) return "Pure Amla Gooseberry Powder (100g)";
  if (slug.includes("reetha-powder")) return "Pure Reetha Soapnut Powder (100g)";
  if (slug.includes("hibiscus")) return "Pure Hibiscus Flower Powder (100g)";
  if (slug.includes("henna")) return "Pure Sojat Rajasthani Henna (100g)";
  if (slug.includes("rose")) return "Pure Desi Rose Petal Powder (50g)";
  if (slug.includes("orange-peel")) return "Pure Orange Peel Vitamin C Powder (50g)";
  if (slug.includes("methi")) return "Pure Methi Fenugreek Powder (50g)";
  if (slug.includes("kaolin-clay")) return "Pure Kaolin White Clay Powder (100g)";
  if (slug.includes("french-green-clay")) return "Pure French Green Clay Powder (100g)";
  if (slug.includes("mulethi")) return "Pure Mulethi Licorice Root Powder (50g)";
  if (slug.includes("sea-buckthorn")) return "Himalayan Sea Buckthorn Pulp (500ml)";
  const clean = name.replace(/^Shree\s+vidhi\s+/i, "");
  return clean.split(" - ")[0].split(" | ")[0];
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [heartPulsing, setHeartPulsing] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { openQuickView, addToast, openCartDrawer } = useUIStore();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = calculateDiscount(product.mrp, product.salePrice);

  const primaryImage = product.images[0]?.url || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80";
  const hoverImage = product.images[1]?.url || primaryImage;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const result = addItem(product);
    if (result.success) {
      setAddedAnimation(true);
      addToast(result.message, "success");
      setTimeout(() => setAddedAnimation(false), 1600);
      openCartDrawer();
    } else {
      addToast(result.message, "error");
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHeartPulsing(true);
    setTimeout(() => setHeartPulsing(false), 500);

    const added = toggleWishlist(product);
    addToast(
      added ? `Added ${product.name} to wishlist.` : `Removed from wishlist.`,
      added ? "success" : "info"
    );
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      className="group relative bg-white rounded-3xl border border-[#EDE7DD] overflow-hidden shadow-[0_4px_20px_-2px_rgba(28,37,30,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(28,37,30,0.06)] transition-all duration-500 flex flex-col h-full luxury-card-glow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Right: Badges */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1">
        {(product.isAddOn || product.slug.includes("sea-buckthorn")) && (
          <span className="bg-[#1C3F26] text-[#D8B980] border border-[#C5A872]/40 text-[9px] font-bold tracking-wider px-2 py-0.5 rounded uppercase shadow-sm pointer-events-none">
            Add-On
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-[#B88746] text-white text-[10px] font-medium tracking-wide px-2 py-0.5 rounded shadow-sm pointer-events-none">
            Sale
          </span>
        )}
      </div>

      {/* Top Left: Wishlist Heart */}
      <motion.button
        animate={heartPulsing ? { scale: [1, 1.3, 0.9, 1] } : { scale: 1 }}
        transition={{ duration: 0.35 }}
        onClick={handleToggleWishlist}
        className={`absolute top-3 left-3 z-20 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm backdrop-blur-md ${
          isFavorited
            ? "opacity-100 bg-[#18231C] text-[#C5A872] border border-[#C5A872] shadow-sm"
            : "opacity-80 sm:opacity-0 sm:group-hover:opacity-100 bg-[#18231C]/80 text-[#D8B980] hover:bg-[#18231C] hover:text-white border border-[#C5A872]/30"
        }`}
        aria-label="Toggle wishlist"
      >
        <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-current" : ""}`} />
      </motion.button>

      {/* Image Container with Cross-Dissolve and Subtle Zoom */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-square bg-[#FBF9F5] overflow-hidden">
        {/* Primary Image */}
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-contain p-4 sm:p-5 object-center transition-all duration-700 ease-out group-hover:scale-105 ${
            isHovered && hoverImage !== primaryImage ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Secondary Image with cross-fade */}
        {hoverImage !== primaryImage && (
          <>
            <Image
              src={hoverImage}
              alt={`${product.name} back ingredient label`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-contain p-4 sm:p-5 object-center transition-all duration-700 ease-out group-hover:scale-105 absolute inset-0 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
            {/* Subtle Back Label Pill Indicator on Hover */}
            <span className="absolute bottom-2.5 left-2.5 z-10 text-[9px] font-semibold tracking-wider uppercase bg-[#18231C]/90 text-[#EAD8B8] px-2 py-0.5 rounded-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-[#C5A872]/40 shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A872] inline-block" />
              Back Label
            </span>
          </>
        )}

        {/* Quick View Button Hover Action */}
        <div className="absolute inset-x-3.5 bottom-3.5 z-10 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickView}
            className="w-full py-2 bg-[#18231C]/95 hover:bg-[#18231C] text-[#FAF8F5] rounded-xl font-medium text-xs shadow-md flex items-center justify-center gap-2 transition-all backdrop-blur-md border border-[#C5A872]/40 hover:border-[#C5A872] hover:shadow-[0_0_12px_rgba(197,168,114,0.25)] cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#D8B980]" />
            <span>Quick View</span>
          </button>
        </div>
      </Link>

      {/* Card Content Base */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5 h-4">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-[#55755A]">
              {product.categoryName || "Ayurvedic Care"}
            </span>

            {product.rating > 0 && (
              <div className="flex items-center gap-1 text-[#8C6D32] font-semibold text-[11px]">
                <Star className="w-3 h-3 fill-[#C5A872] text-[#C5A872]" />
                <span>{product.rating}</span>
                {product.reviewCount > 0 && (
                  <span className="text-muted-foreground font-normal text-[10px]">
                    ({product.reviewCount})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Product Title: Clean, recognizable & fixed height for perfect horizontal row alignment */}
          <Link href={`/product/${product.slug}`} className="block group/title">
            <div className="h-11 sm:h-12 flex items-center">
              <h3 className="font-serif font-bold text-forest-950 text-sm sm:text-base leading-snug group-hover/title:text-forest-700 transition-colors line-clamp-2">
                {getCardTitle(product.name, product.slug)}
              </h3>
            </div>
          </Link>

          {/* Short description: Uniform 2-line height */}
          <div className="h-9 sm:h-10 mt-1 overflow-hidden">
            <p className="text-xs text-forest-900/65 line-clamp-2 leading-relaxed font-light">
              {product.shortDesc}
            </p>
          </div>
        </div>

        {/* Pinned Price and Add to Bag Section */}
        <div className="pt-3.5 mt-auto border-t border-[#F0ECE4] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-forest-950">
                {formatPrice(product.salePrice)}
              </span>
              {product.mrp > product.salePrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.mrp)}
                </span>
              )}
            </div>
            {product.variants.length > 0 && (
              <span className="text-[10px] text-[#55755A] font-medium tracking-wide">
                Net Wt: {product.variants[0].title}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`py-2 px-3.5 sm:px-4 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 shrink-0 ${
              product.stock <= 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : addedAnimation
                ? "bg-[#2A5C38] text-white"
                : "bg-[#1C3F26] hover:bg-[#14301D] text-white hover:shadow-card cursor-pointer"
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : product.stock <= 0 ? (
              <span>Sold Out</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#D8C7A3]" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
