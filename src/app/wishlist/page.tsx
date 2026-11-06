"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItemToCart = useCartStore((state) => state.addItem);
  const { addToast, openCartDrawer } = useUIStore();

  const handleMoveToCart = (item: (typeof items)[0]) => {
    const res = addItemToCart(item.product);
    if (res.success) {
      removeItem(item.productId);
      addToast(`Moved ${item.product.name} to cart.`, "success");
      openCartDrawer();
    } else {
      addToast(res.message, "error");
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-20 sm:py-28 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md bg-white/90 p-10 sm:p-14 rounded-3xl border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#18231C] border border-[#C5A872]/40 shadow-[0_0_18px_rgba(197,168,114,0.22)] flex items-center justify-center text-[#D8B980] mx-auto">
            <Heart className="w-7 h-7 stroke-[1.5]" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#18231C]">
            Your Saved Rituals is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#6C766F] font-light leading-relaxed">
            Preserve your favorite botanical preparations here to revisit or purchase later during your self-care rituals.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium text-xs sm:text-sm py-3.5 px-8 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] transition-all"
            >
              <span>Explore The Apothecary</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-[#EDE7DD] pb-6">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#8C6D32] uppercase font-medium block mb-1">
              Personal Sanctum
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18231C]">
              Saved Botanical Preparations ({items.length})
            </h1>
          </div>

          <button
            onClick={clearWishlist}
            className="text-xs font-normal text-[#8C6D32] hover:text-[#18231C] underline self-start sm:self-auto transition-colors"
          >
            Clear Entire Wishlist
          </button>
        </div>

        {/* Grid of Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white/90 rounded-3xl border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] overflow-hidden flex flex-col justify-between hover:shadow-[0_12px_36px_-6px_rgba(28,37,30,0.06)] hover:border-[#DED5C7] transition-all duration-300"
            >
              <div className="relative aspect-square bg-[#FAF8F5] overflow-hidden">
                <Image
                  src={
                    item.product.images[0]?.url ||
                    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80"
                  }
                  alt={item.product.name}
                  fill
                  className="object-cover object-center"
                />
                <button
                  onClick={() => removeItem(item.productId)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-[#18231C]/90 text-[#D8B980] hover:text-red-400 hover:border-red-400/50 shadow-md border border-[#C5A872]/40 backdrop-blur-md transition-all hover:scale-105"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#7D9980] block">
                    {item.product.categoryName}
                  </span>
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="font-serif font-normal text-base text-[#18231C] hover:text-[#8C6D32] transition-colors line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="font-medium text-base text-[#18231C]">
                      {formatPrice(item.product.salePrice)}
                    </span>
                    {item.product.mrp > item.product.salePrice && (
                      <span className="text-xs text-[#9DA69F] line-through font-light">
                        {formatPrice(item.product.mrp)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleMoveToCart(item)}
                  className="w-full bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-2.5 px-4 rounded-full text-xs flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(28,63,38,0.2)] transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D8B980]" />
                  <span>Move to Ritual Bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
