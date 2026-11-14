"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils";
import { products as allCatalogProducts } from "@/lib/data/initial-data";

const INDIAN_STATES = [
  "Uttar Pradesh",
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "West Bengal",
  "Rajasthan",
  "Kerala",
  "Madhya Pradesh",
  "Bihar",
  "Punjab",
  "Haryana",
  "Telangana",
  "Andhra Pradesh",
  "Odisha",
  "Assam",
  "Uttarakhand",
  "Himachal Pradesh",
  "Jharkhand",
  "Chhattisgarh",
  "Goa",
  "Jammu & Kashmir",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDiscount, getShippingFee, getTotal, coupon, clearCart, addItem } = useCartStore();
  const { addToast } = useUIStore();

  const seaBuckthornProduct = allCatalogProducts.find(
    (p) => p.id === "prod-seabuckthorn-pulp" || p.slug.includes("sea-buckthorn")
  );
  const hasAddOnInCart = items.some(
    (i) => i.productId === "prod-seabuckthorn-pulp" || i.product?.slug?.includes("sea-buckthorn")
  );

  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Contact & Address State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    houseFlat: "",
    street: "",
    landmark: "",
    city: "",
    state: "Uttar Pradesh",
    pinCode: "",
    paymentMethod: "PAYU" as "PAYU" | "COD",
  });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          const u = data.user;
          const a = u.address;
          setFormData((prev) => ({
            ...prev,
            fullName: u.name || prev.fullName,
            email: u.email || prev.email,
            phone: u.phone ? u.phone.replace("+91 ", "") : prev.phone,
            houseFlat: a?.houseFlat || prev.houseFlat,
            street: a?.street || prev.street,
            landmark: a?.landmark || prev.landmark,
            city: a?.city || prev.city,
            state: a?.state || prev.state,
            pinCode: a?.pinCode || prev.pinCode,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shippingFee = getShippingFee();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-24 flex items-center justify-center">
        <div className="bg-white/90 p-10 rounded-3xl border border-[#EDE7DD] text-center max-w-md space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h2 className="font-serif text-2xl font-normal text-[#18231C]">Your Cart is Empty</h2>
          <p className="text-xs text-[#6C766F] font-light leading-relaxed">
            Select authentic Ayurvedic preparations to begin your mindful checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium text-xs py-3 px-8 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] transition-all"
          >
            Explore Apothecary
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName || !formData.email || !formData.phone || !formData.street || !formData.city || !formData.pinCode) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (formData.pinCode.length !== 6 || !/^\d+$/.test(formData.pinCode)) {
      setErrorMessage("Please enter a valid 6-digit Indian PIN code.");
      return;
    }

    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const shippingAddress = {
        fullName: formData.fullName,
        phone: formData.phone,
        houseFlat: formData.houseFlat,
        street: formData.street,
        landmark: formData.landmark,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
      };

      const itemsPayload = items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
      }));

      // --- PAYU LIVE GATEWAY FLOW ---
      if (formData.paymentMethod === "PAYU") {
        const res = await fetch("/api/payment/payu/initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guestEmail: formData.email,
            guestPhone: formData.phone,
            shippingAddress,
            items: itemsPayload,
            couponCode: coupon?.code,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to initiate PayU payment. Please check your details.");
        }

        addToast("Connecting to PayU Secure Payment Gateway...", "info");

        // Clear cart now as order is initiated and tracking has begun
        clearCart();

        // Dynamically build and auto-submit hidden POST form directly to PayU
        const form = document.createElement("form");
        form.method = "POST";
        form.action = data.actionUrl;

        for (const [key, value] of Object.entries(data.params)) {
          if (value !== undefined && value !== null) {
            const hiddenField = document.createElement("input");
            hiddenField.type = "hidden";
            hiddenField.name = key;
            hiddenField.value = String(value);
            form.appendChild(hiddenField);
          }
        }

        document.body.appendChild(form);
        form.submit();
        return;
      }

      // --- CASH ON DELIVERY (COD) FLOW ---
      const orderPayload = {
        guestEmail: formData.email,
        guestPhone: formData.phone,
        shippingAddress,
        items: itemsPayload,
        paymentMethod: "COD" as const,
        couponCode: coupon?.code,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process order.");
      }

      // Clear local cart
      clearCart();
      addToast("Order placed successfully with Cash on Delivery!", "success");

      // Redirect to Order Confirmation
      router.push(`/order-confirmation?orderNumber=${data.orderNumber}&orderId=${data.order?.id || ""}&method=COD`);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE7DD] pb-6">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#8C6D32] font-medium uppercase block mb-1">
              Mindful Checkout
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18231C]">
              Complete Your Ritual Order
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-normal text-[#FAF8F5] bg-[#18231C] px-4 py-2 rounded-full border border-[#C5A872]/40 shadow-[0_4px_16px_rgba(24,35,28,0.2),0_0_12px_rgba(197,168,114,0.12)]">
            <Lock className="w-3.5 h-3.5 text-[#D8B980]" />
            <span>256-Bit SSL Encrypted Verification</span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-12 max-w-md mx-auto text-xs font-normal">
          <div className={`flex items-center gap-2.5 ${step >= 1 ? "text-[#18231C] font-semibold" : "text-[#9DA69F]"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${step >= 1 ? "bg-[#18231C] text-[#D8B980] border border-[#C5A872]/60 shadow-[0_0_10px_rgba(197,168,114,0.25)]" : "bg-[#EDE7DD] text-[#717C74]"}`}>
              1
            </span>
            <span>Delivery Destination</span>
          </div>

          <div className="w-12 h-[1px] bg-[#EDE7DD]" />

          <div className={`flex items-center gap-2.5 ${step >= 2 ? "text-[#18231C] font-semibold" : "text-[#9DA69F]"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${step >= 2 ? "bg-[#18231C] text-[#D8B980] border border-[#C5A872]/60 shadow-[0_0_10px_rgba(197,168,114,0.25)]" : "bg-[#EDE7DD] text-[#717C74]"}`}>
              2
            </span>
            <span>Payment & Review</span>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-8 p-4 bg-[#FAF0ED] border border-[#F2D7CE] rounded-2xl text-xs text-[#A64F35] flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#A64F35] shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 2 Column Layout: Form & Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
          {/* Form Side */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 ? (
              <form onSubmit={handleProceedToPayment} className="bg-white/90 p-6 sm:p-10 rounded-3xl border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-6">
                <h2 className="font-serif font-normal text-xl text-[#18231C] pb-3 border-b border-[#F0ECE4] flex items-center gap-2">
                  <span>1. Contact & Shipping Address</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Pooja Verma"
                      className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      Mobile Number (for delivery tracking) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 9876543210"
                      className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      Email Address (for tax invoice and dispatch notifications) *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. pooja.verma@example.com"
                      className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      Flat / House No. / Building *
                    </label>
                    <input
                      type="text"
                      name="houseFlat"
                      value={formData.houseFlat}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Flat 402, Ganga Heights"
                      className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      Street / Road / Area *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Assi Ghat Road"
                      className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      placeholder="e.g. Near Sankat Mochan Temple"
                      className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Varanasi"
                      className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] focus:outline-none focus:border-[#7D9980] cursor-pointer"
                    >
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      maxLength={6}
                      value={formData.pinCode}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 221005"
                      className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] font-mono focus:outline-none focus:border-[#7D9980]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-3.5 px-8 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] text-xs sm:text-sm flex items-center gap-2 transition-all"
                  >
                    <span>Continue to Payment Method</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white/90 p-6 sm:p-10 rounded-3xl border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE4]">
                  <h2 className="font-serif font-normal text-xl text-[#18231C]">
                    2. Select Payment Mode
                  </h2>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-[#8C6D32] hover:underline font-medium"
                  >
                    Edit Shipping Address
                  </button>
                </div>

                {/* Delivery summary badge */}
                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EDE7DD] text-xs text-[#4A544E] flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#7D9980] shrink-0" />
                  <div>
                    <strong className="text-[#18231C] font-medium">Shipping to:</strong> {formData.fullName}, {formData.houseFlat}, {formData.street}, {formData.city}, {formData.state} - {formData.pinCode}
                    <div className="text-[11px] text-[#6C766F] mt-0.5">
                      Estimated Dispatch: Within 24 hours from our Varanasi sanctuary.
                    </div>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-3">
                  {/* PayU Live Option */}
                  <label
                    className={`p-5 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                      formData.paymentMethod === "PAYU"
                        ? "border-[#1C3F26] bg-[#FAF8F5] shadow-sm"
                        : "border-[#EDE7DD] hover:border-[#D5CDC1] bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="PAYU"
                      checked={formData.paymentMethod === "PAYU"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "PAYU" })}
                      className="mt-1 text-[#1C3F26] accent-[#1C3F26]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-medium text-sm text-[#18231C] flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#7D9980]" />
                          <span>Pay Online with PayU (Instant UPI / Cards / Net Banking)</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-semibold bg-[#EBF1EB] text-[#2D5A38] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Recommended
                          </span>
                          <span className="text-[10px] font-medium bg-[#FAF0ED] text-[#A64F35] px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Instant
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-[#6C766F] mt-1 font-light">
                        Pay securely with UPI (Google Pay, PhonePe, Paytm, BHIM, Cred), Debit/Credit Cards (Visa, RuPay, Master), 50+ Net Banking, or LazyPay.
                      </p>
                    </div>
                  </label>

                  {/* Cash on Delivery Option */}
                  <label
                    className={`p-5 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                      formData.paymentMethod === "COD"
                        ? "border-[#1C3F26] bg-[#FAF8F5] shadow-sm"
                        : "border-[#EDE7DD] hover:border-[#D5CDC1] bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "COD" })}
                      className="mt-1 text-[#1C3F26] accent-[#1C3F26]"
                    />
                    <div className="flex-1">
                      <span className="font-medium text-sm text-[#18231C] flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#7D9980]" />
                        <span>Cash on Delivery (COD)</span>
                      </span>
                      <p className="text-xs text-[#6C766F] mt-1 font-light">
                        Pay cash directly to the courier executive upon safe doorstep delivery.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4 border-t border-[#F0ECE4]">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-normal text-[#6C766F] hover:text-[#18231C]"
                  >
                    ← Back to Destination
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-3.5 px-8 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] text-xs sm:text-sm flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Connecting to PayU Live Gateway...</span>
                    ) : formData.paymentMethod === "PAYU" ? (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#D8B980]" />
                        <span>Pay {formatPrice(total)} with PayU →</span>
                      </>
                    ) : (
                      <>
                        <Banknote className="w-4 h-4 text-[#D8B980]" />
                        <span>Confirm Order (COD) • {formatPrice(total)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="bg-white/90 rounded-3xl p-6 sm:p-8 border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-6 sticky top-24">
            <h3 className="font-serif font-normal text-lg text-[#18231C] pb-3 border-b border-[#F0ECE4]">
              Ritual Selection ({items.length})
            </h3>

            {/* Items list */}
            <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1 divide-y divide-[#F0ECE4]">
              {items.map((item) => (
                <div key={item.id} className="pt-3.5 first:pt-0 flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl bg-[#FAF8F5] overflow-hidden shrink-0 border border-[#EDE7DD]">
                    <Image
                      src={
                        item.product.images[0]?.url ||
                        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=200&q=80"
                      }
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-xs">
                    <h4 className="font-serif font-medium text-[#18231C] line-clamp-1">
                      {item.product.name}
                    </h4>
                    <span className="text-[#6C766F] block text-[11px] font-light">
                      Qty: {item.quantity} {item.variantTitle && `• ${item.variantTitle}`}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[#18231C]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* 1-Click Sea Buckthorn Add-On Offer */}
            {!hasAddOnInCart && seaBuckthornProduct && (
              <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC7] flex items-center justify-between gap-3">
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
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] font-bold text-[#8C6D32] uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#C5A872]" /> Add-On
                      </span>
                      <span className="text-[9px] bg-[#1C3F26] text-[#D8B980] border border-[#C5A872]/40 px-1.5 py-0.2 rounded-full font-semibold">
                        ₹899
                      </span>
                    </div>
                    <div className="text-xs font-medium text-[#18231C] truncate">
                      Sea Buckthorn Pulp (500ml)
                    </div>
                    <div className="text-[10px] text-[#6C766F] truncate">
                      Himalayan Vitamin C Immunity Elixir
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addItem(seaBuckthornProduct);
                    addToast("Added Sea Buckthorn Pulp to your order!", "success");
                  }}
                  className="shrink-0 bg-[#1C3F26] hover:bg-[#14301D] text-[#FAF8F5] text-xs font-medium px-3 py-1.5 rounded-full border border-[#C5A872]/40 shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  + Add
                </button>
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-2.5 text-xs text-[#2F3832] pt-4 border-t border-[#F0ECE4]">
              <div className="flex justify-between font-light">
                <span className="text-[#6C766F]">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2D5A38] font-medium">
                  <span>Coupon ({coupon?.code})</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-light">
                <span className="text-[#6C766F]">Express Delivery</span>
                <span>{shippingFee === 0 ? <strong className="text-[#2D5A38] font-medium">FREE</strong> : formatPrice(shippingFee)}</span>
              </div>
              <div className="pt-3.5 border-t border-[#EDE7DD] flex justify-between items-baseline text-base font-normal text-[#18231C]">
                <span>Total Due</span>
                <span className="text-xl font-medium text-[#1C3F26]">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EDE7DD] text-[11px] text-[#4A544E] leading-relaxed font-light">
              🌿 <strong className="font-medium text-[#18231C]">Shree Vidhi Purity Promise:</strong> Every jar and pouch is prepared and sealed in Varanasi following strict classical Ayurvedic hygiene benchmarks.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
