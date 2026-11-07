"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Heart,
  Truck,
  ArrowRight,
  Tag,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils";
import { products as allCatalogProducts } from "@/lib/data/initial-data";

export function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer } = useUIStore();
  const {
    items,
    updateQuantity,
    removeItem,
    getSubtotal,
    getDiscount,
    getShippingFee,
    getTotal,
    coupon,
    applyCoupon,
    removeCoupon,
    addItem,
  } = useCartStore();
  const { addItem: addToWishlist } = useWishlistStore();
  const { addToast } = useUIStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const seaBuckthornProduct = allCatalogProducts.find(
    (p) => p.id === "prod-seabuckthorn-pulp" || p.slug.includes("sea-buckthorn")
  );
  const hasAddOnInCart = items.some(
    (i) => i.productId === "prod-seabuckthorn-pulp" || i.product?.slug?.includes("sea-buckthorn")
  );

  const handleAddAddOn = (e: React.MouseEvent) => {
    e.preventDefault();
    if (seaBuckthornProduct) {
      const res = addItem(seaBuckthornProduct);
      if (res.success) {
        addToast("Added Sea Buckthorn Pulp Add-On to your bag!", "success");
      }
    }
  };

  if (!isCartDrawerOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shippingFee = getShippingFee();
  const total = getTotal();

  const freeShippingThreshold = 499;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (!couponInput.trim()) return;

    const code = couponInput.trim().toUpperCase();
    if (code === "VIDHI15") {
      const res = applyCoupon({
        id: "coup-1",
        code: "VIDHI15",
        description: "15% OFF above ₹499",
        discountType: "PERCENTAGE",
        discountValue: 15,
        minCartValue: 499,
        maxDiscount: 150,
        validFrom: "",
        validUntil: "",
        usedCount: 0,
        isActive: true,
      });
      if (res.success) {
        addToast(res.message, "success");
        setCouponInput("");
      } else {
        setCouponError(res.message);
      }
    } else if (code === "AYURVEDA50") {
      const res = applyCoupon({
        id: "coup-2",
        code: "AYURVEDA50",
        description: "Flat ₹50 OFF above ₹299",
        discountType: "FIXED",
        discountValue: 50,
        minCartValue: 299,
        validFrom: "",
        validUntil: "",
        usedCount: 0,
        isActive: true,
      });
      if (res.success) {
        addToast(res.message, "success");
        setCouponInput("");
      } else {
        setCouponError(res.message);
      }
    } else {
      setCouponError("Invalid coupon code. Try VIDHI15 or AYURVEDA50");
    }
  };

  const handleMoveToWishlist = (item: (typeof items)[0]) => {
    addToWishlist(item.product);
    removeItem(item.id);
    addToast(`Moved ${item.product.name} to wishlist.`, "info");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
        onClick={closeCartDrawer}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-[0_20px_50px_rgba(28,37,30,0.15)] flex flex-col z-10 animate-slideInRight border-l border-[#EDE7DD]">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#EDE7DD] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-forest-800" />
            <h3 className="font-serif font-bold text-base text-forest-950">Your Ritual Bag</h3>
            <span className="text-[10px] font-semibold bg-[#18231C] text-[#D8B980] border border-[#C5A872]/40 px-2.5 py-0.5 rounded-full shadow-sm">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>

          <button
            onClick={closeCartDrawer}
            className="p-1.5 rounded-full bg-[#18231C]/5 hover:bg-[#18231C] text-forest-700 hover:text-[#D8B980] border border-transparent hover:border-[#C5A872]/40 transition-all"
            aria-label="Close cart drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-5 py-3 bg-[#F7F4EE] border-b border-[#EDE7DD] text-xs">
          <div className="flex items-center gap-2 mb-1.5 font-normal text-forest-900">
            <Truck className="w-3.5 h-3.5 text-[#8C6D32] shrink-0" />
            {amountNeeded > 0 ? (
              <span className="text-[11px]">
                Add <strong className="font-semibold text-forest-950">{formatPrice(amountNeeded)}</strong> more to unlock <strong>FREE Express Shipping</strong>!
              </span>
            ) : (
              <span className="text-forest-900 font-medium flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#55755A]" />
                You unlocked FREE Express Shipping across India!
              </span>
            )}
          </div>
          <div className="w-full bg-[#E5DFD4] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#2A5C38] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#F0ECE4]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#18231C] border border-[#C5A872]/40 shadow-[0_0_18px_rgba(197,168,114,0.22)] flex items-center justify-center text-[#D8B980]">
                <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-forest-950 text-base">Your ritual bag is empty</h4>
                <p className="text-xs text-forest-900/60 mt-1 max-w-xs font-light leading-relaxed">
                  Discover authentic Ayurvedic powders, restorative hair lepa, and revitalizing botanical face masks.
                </p>
              </div>
              <button
                onClick={() => {
                  closeCartDrawer();
                }}
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-[#1C3F26] hover:bg-[#14301D] text-white text-xs font-medium py-2.5 px-6 rounded-full shadow-soothe transition-all"
                >
                  <span>Explore Best Sellers</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D8C7A3]" />
                </Link>
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-3.5">
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-2xl bg-[#F7F4EE] overflow-hidden shrink-0 border border-[#EDE7DD]">
                  <Image
                    src={
                      item.product.images[0]?.url ||
                      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80"
                    }
                    alt={item.product.name}
                    fill
                    className="object-contain p-1 object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={closeCartDrawer}
                        className="font-serif font-bold text-xs sm:text-sm text-forest-950 hover:text-forest-700 line-clamp-2 leading-snug"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 p-0.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.variantTitle && (
                      <span className="text-[10px] text-muted-foreground font-light block mt-0.5">
                        Size: {item.variantTitle}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#C5A872]/40 rounded-full overflow-hidden bg-[#18231C] shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 hover:bg-[#202E24] text-[#D8B980] hover:text-[#FAF8F5] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-[#FAF8F5] font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 hover:bg-[#202E24] text-[#D8B980] hover:text-[#FAF8F5] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    {/* Price and Wishlist */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleMoveToWishlist(item)}
                        className="text-[10px] text-forest-700/60 hover:text-forest-950 flex items-center gap-1 transition-colors"
                        title="Save for later"
                      >
                        <Heart className="w-3 h-3" />
                        <span className="hidden sm:inline">Save</span>
                      </button>

                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-bold text-forest-950">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[9px] text-muted-foreground block">
                            {formatPrice(item.price)} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Featured Sea Buckthorn Pulp Add-On Recommendation */}
          {!hasAddOnInCart && seaBuckthornProduct && items.length > 0 && (
            <div className="mx-2 mt-4 p-3 rounded-2xl bg-[#F6F2E9] border border-[#E5DCB8] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#8C6D32] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#C5A872]" />
                  <span>Featured Wellness Add-On</span>
                </span>
                <span className="text-[9px] bg-[#1C3F26] text-[#D8B980] border border-[#C5A872]/40 font-semibold px-2 py-0.5 rounded-full">
                  Save 40%
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-11 h-11 rounded-xl bg-white p-1 border border-[#EDE7DD] shrink-0 overflow-hidden flex items-center justify-center">
                    <Image
                      src="/pictures/products/seabuckthorn-pulp.png"
                      alt="Sea Buckthorn Pulp Add-on"
                      width={38}
                      height={38}
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-serif font-bold text-forest-950 truncate">
                      Sea Buckthorn Pulp (500ml)
                    </h4>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#1C3F26]">{formatPrice(899)}</span>
                      <span className="text-[10px] text-muted-foreground line-through">{formatPrice(1499)}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddAddOn}
                  className="shrink-0 bg-[#1C3F26] hover:bg-[#14301D] text-white text-[11px] font-medium px-3.5 py-1.5 rounded-full border border-[#C5A872]/30 shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  + Add
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer (Only when items exist) */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#EDE7DD] bg-[#FAF8F5] space-y-3">
            {/* Coupon Code Input */}
            {coupon ? (
              <div className="p-2.5 bg-[#EBF1EB] border border-[#D5E2D5] rounded-2xl flex items-center justify-between text-xs text-forest-950">
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-[#2A5C38]" />
                  <span>
                    Coupon <strong>{coupon.code}</strong> applied ({formatPrice(discount)} off)
                  </span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-red-600 hover:underline font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. VIDHI15)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-white border border-[#E2DBD0] rounded-full px-3.5 py-2 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#C5A872]"
                />
                <button
                  type="submit"
                  className="bg-[#1C3F26] hover:bg-[#14301D] text-white text-xs font-medium px-4 py-2 rounded-full transition-colors shadow-sm"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-forest-900 font-light">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-forest-950">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2A5C38] font-medium">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-[#2A5C38] font-semibold">FREE</strong> : formatPrice(shippingFee)}</span>
              </div>
              <div className="pt-2 border-t border-[#E8E2D6] flex justify-between items-baseline text-sm font-bold text-forest-950">
                <span>Estimated Total</span>
                <span className="text-base text-forest-950">{formatPrice(total)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-1 flex flex-col gap-2">
              <Link
                href="/checkout"
                onClick={closeCartDrawer}
                className="w-full bg-[#1C3F26] hover:bg-[#14301D] text-white font-medium py-3 px-4 rounded-full text-center text-xs sm:text-sm shadow-soothe flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#D8C7A3]" />
              </Link>
              <Link
                href="/cart"
                onClick={closeCartDrawer}
                className="w-full text-center text-xs text-forest-800 hover:text-forest-950 font-medium py-1 hover:underline"
              >
                Review Full Bag Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
