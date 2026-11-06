"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Star, ShoppingBag, Plus, Minus, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, calculateDiscount } from "@/lib/utils";

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToast, openCartDrawer } = useUIStore();
  const addItem = useCartStore((state) => state.addItem);

  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const currentVariant = selectedVariantId
    ? quickViewProduct.variants.find((v) => v.id === selectedVariantId)
    : quickViewProduct.variants[0];

  const price = currentVariant ? currentVariant.price : quickViewProduct.salePrice;
  const mrp = currentVariant ? currentVariant.mrp : quickViewProduct.mrp;
  const discountPercent = calculateDiscount(mrp, price);

  const images = quickViewProduct.images.length > 0
    ? quickViewProduct.images
    : [{ id: "def", url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80", alt: quickViewProduct.name }];

  const handleAddToCart = () => {
    const res = addItem(quickViewProduct, currentVariant?.id, quantity);
    if (res.success) {
      setAdded(true);
      addToast(res.message, "success");
      setTimeout(() => setAdded(false), 1500);
      closeQuickView();
      openCartDrawer();
    } else {
      addToast(res.message, "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md animate-fadeIn"
        onClick={closeQuickView}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-[0_24px_60px_rgba(28,37,30,0.14)] overflow-hidden z-10 animate-scaleUp border border-[#EDE7DD] max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#18231C] text-[#D8B980] hover:text-[#FAF8F5] hover:border-[#C5A872] shadow-md transition-all border border-[#C5A872]/40"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 bg-[#FAF8F5] flex flex-col justify-between border-r border-[#EDE7DD]">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-subtle border border-[#EDE7DD]">
            <Image
              src={images[selectedImageIdx]?.url || images[0].url}
              alt={quickViewProduct.name}
              fill
              className="object-contain p-4 object-center"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImageIdx(i)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden border transition-all shrink-0 ${
                    selectedImageIdx === i ? "border-forest-900 shadow-sm scale-105" : "border-[#EDE7DD] opacity-70"
                  }`}
                >
                  <Image src={img.url} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Meta & Purchase Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#55755A] block mb-1">
                {quickViewProduct.categoryName || "Ayurvedic Care"}
              </span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-forest-950 leading-snug">
                {quickViewProduct.name}
              </h2>
            </div>

            {/* Rating */}
            {quickViewProduct.rating > 0 && (
              <div className="flex items-center gap-2 text-xs">
                <div className="flex text-[#C5A872]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(quickViewProduct.rating) ? "fill-[#C5A872] text-[#C5A872]" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-forest-900">{quickViewProduct.rating}</span>
                <span className="text-muted-foreground text-[11px]">({quickViewProduct.reviewCount} verified reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-forest-950">{formatPrice(price)}</span>
              {mrp > price && (
                <span className="text-sm text-muted-foreground line-through">{formatPrice(mrp)}</span>
              )}
              {discountPercent > 0 && (
                <span className="bg-[#FAF0ED] text-[#A64F35] border border-[#F2D7CE] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-forest-900/70 leading-relaxed line-clamp-3 font-light">
              {quickViewProduct.shortDesc}
            </p>

            {/* Variants Selector */}
            {quickViewProduct.variants.length > 1 && (
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-forest-900 uppercase tracking-wider block">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs transition-all ${
                        (selectedVariantId === variant.id || (!selectedVariantId && variant === quickViewProduct.variants[0]))
                          ? "border border-forest-900 bg-forest-900 text-white shadow-sm"
                          : "border border-[#E2DBD0] bg-white text-forest-900 hover:border-gray-400"
                      }`}
                    >
                      {variant.title} - {formatPrice(variant.price)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2 pt-1">
              <label className="text-[10px] font-semibold text-forest-900 uppercase tracking-wider block">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#E2DBD0] rounded-full overflow-hidden bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 px-2.5 hover:bg-[#EDE7DD] text-forest-900 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 text-xs font-semibold text-forest-950">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 px-2.5 hover:bg-[#EDE7DD] text-forest-900 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <span className="text-[11px] text-[#55755A] font-medium">
                  {quickViewProduct.stock > 0 ? "In Stock (Varanasi Apothecary)" : "Sold Out"}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-6 border-t border-[#EDE7DD] space-y-2.5">
            <button
              onClick={handleAddToCart}
              disabled={quickViewProduct.stock <= 0}
              className={`w-full py-3.5 rounded-full font-medium text-xs sm:text-sm shadow-soothe flex items-center justify-center gap-2 transition-all ${
                quickViewProduct.stock <= 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : added
                  ? "bg-[#2A5C38] text-white"
                  : "bg-[#1C3F26] hover:bg-[#14301D] text-white hover:scale-[1.01]"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag</span>
                </>
              ) : quickViewProduct.stock <= 0 ? (
                <span>Out of Stock</span>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#D8C7A3]" />
                  <span>Add to Ritual Bag • {formatPrice(price * quantity)}</span>
                </>
              )}
            </button>

            <Link
              href={`/product/${quickViewProduct.slug}`}
              onClick={closeQuickView}
              className="w-full text-center text-xs text-forest-800 hover:text-forest-950 font-medium py-1.5 flex items-center justify-center gap-1 group"
            >
              <span>View Full Formulations & Verified Reviews</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
