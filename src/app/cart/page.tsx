"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Heart,
  Truck,
  ArrowRight,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils";
import { products as allCatalogProducts } from "@/lib/data/initial-data";

export default function CartPage() {
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

  const handleAddAddOn = () => {
    if (seaBuckthornProduct) {
      const res = addItem(seaBuckthornProduct);
      if (res.success) {
        addToast("Added Sea Buckthorn Pulp Add-On to your bag!", "success");
      }
    }
  };

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shippingFee = getShippingFee();
  const total = getTotal();

  const freeShippingThreshold = 499;
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

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
    addToast(`Moved ${item.product.name} to your wishlist.`, "info");
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md bg-white p-8 sm:p-12 rounded-3xl border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#18231C] border border-[#C5A872]/40 shadow-[0_0_18px_rgba(197,168,114,0.22)] flex items-center justify-center text-[#D8B980] mx-auto">
            <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
            Your Ritual Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-forest-900/65 leading-relaxed font-light">
            You have not added any sacred herbal preparations yet. Browse our apothecary to find natural remedies tailored for you.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#1C3F26] hover:bg-[#14301D] text-white font-medium text-xs sm:text-sm py-3 px-6 rounded-full shadow-soothe transition-all"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4 text-[#D8C7A3]" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"})
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Review your selected Ayurvedic products before proceeding to secure checkout.
          </p>
        </div>

        {/* Free Shipping Alert Banner */}
        <div className="p-4 bg-white rounded-2xl border border-forest-900/10 shadow-subtle mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-forest-900">
            <Truck className="w-4 h-4 text-forest-700 shrink-0" />
            {amountNeeded > 0 ? (
              <span>
                Add <strong>{formatPrice(amountNeeded)}</strong> more to unlock <strong>FREE Express Shipping</strong>!
              </span>
            ) : (
              <span className="text-forest-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sage-600" />
                You qualify for FREE Express Shipping nationwide! 🎉
              </span>
            )}
          </div>

          <div className="w-full sm:w-48 bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-forest-700 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 2 Column Layout: Items List & Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: Cart Items Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-subtle space-y-6">
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 rounded-2xl bg-ayur-cream overflow-hidden shrink-0 border border-gray-100">
                    <Image
                      src={
                        item.product.images[0]?.url ||
                        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80"
                      }
                      alt={item.product.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-1">
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-serif font-bold text-sm sm:text-base text-forest-950 hover:text-forest-700 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    {item.variantTitle && (
                      <span className="text-xs text-sage-600 font-medium block">
                        Pack Size: {item.variantTitle}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground block">
                      Price: {formatPrice(item.price)}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center border border-[#C5A872]/40 rounded-xl overflow-hidden bg-[#18231C] shadow-sm">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-[#202E24] text-[#D8B980] hover:text-[#FAF8F5] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-[#FAF8F5] font-mono">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-[#202E24] text-[#D8B980] hover:text-[#FAF8F5] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right sm:min-w-[80px]">
                    <span className="font-bold text-sm sm:text-base text-forest-950">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-3 sm:gap-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveToWishlist(item)}
                      className="text-gray-400 hover:text-ayur-terracotta p-1"
                      title="Move to wishlist"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Sea Buckthorn Pulp Add-On Recommendation */}
            {!hasAddOnInCart && seaBuckthornProduct && (
              <div className="pt-6 border-t border-gray-100">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl bg-white p-1.5 border border-[#EDE7DD] shrink-0 overflow-hidden flex items-center justify-center">
                      <Image
                        src="/pictures/products/seabuckthorn-pulp.png"
                        alt="Sea Buckthorn Pulp Add-on"
                        width={56}
                        height={56}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-bold text-[#8C6D32] uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#C5A872]" />
                          Wellness Add-On Special
                        </span>
                        <span className="text-[9px] bg-[#1C3F26] text-[#D8B980] border border-[#C5A872]/40 font-semibold px-2 py-0.5 rounded-full">
                          Save 40%
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-forest-950">
                        Pure Himalayan Sea Buckthorn Pulp (500ml)
                      </h4>
                      <p className="text-xs text-forest-900/65 line-clamp-1">
                        Immunity booster with rare Omega 7, 3, 6, 9 & 12x Vitamin C.
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-sm text-[#1C3F26]">{formatPrice(899)}</span>
                        <span className="text-xs text-muted-foreground line-through">{formatPrice(1499)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddAddOn}
                    className="bg-[#1C3F26] hover:bg-[#14301D] text-white text-xs font-semibold px-5 py-2.5 rounded-full border border-[#C5A872]/30 shadow-soothe transition-all active:scale-95 flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-center cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#D8B980]" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-subtle space-y-6 sticky top-24">
            <h3 className="font-serif font-bold text-lg text-forest-950 pb-3 border-b border-gray-100">
              Order Summary
            </h3>

            {/* Coupon Code Section */}
            <div>
              {coupon ? (
                <div className="p-3 bg-sage-50 border border-sage-200 rounded-2xl flex items-center justify-between text-xs text-forest-900">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-forest-700" />
                    <span>Coupon <strong>{coupon.code}</strong> applied!</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code (VIDHI15)"
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:border-forest-700"
                  />
                  <button
                    type="submit"
                    className="bg-forest-900 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-forest-800 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
            </div>

            {/* Pricing details */}
            <div className="space-y-2 text-xs text-forest-900 pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bag Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-forest-700 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-forest-700">FREE</strong>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline text-base font-bold text-forest-950">
                <span>Total Amount</span>
                <span className="text-xl text-forest-900">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full bg-forest-900 hover:bg-forest-800 text-white font-bold py-3.5 px-6 rounded-xl text-center text-sm shadow-card flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-2 text-center text-xs text-muted-foreground space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-sage-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-forest-700" />
                <span>100% Secure Checkout with Razorpay & COD</span>
              </div>
              <p>Handcrafted in Varanasi • Dispatched in 24h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
