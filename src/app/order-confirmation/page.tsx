"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { CheckCircle2, AlertCircle, PackageCheck, Truck, ArrowRight, Home, Sparkles, RefreshCw, PhoneCall } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);

  const orderNumber = searchParams.get("orderNumber") || searchParams.get("orderId") || "";
  const status = searchParams.get("status") || "success";
  const txnid = searchParams.get("txnid");
  const payuid = searchParams.get("payuid");
  const errorMessage = searchParams.get("error");
  const method = searchParams.get("method") || (txnid ? "PAYU" : "COD");

  const isFailed = status.toLowerCase() === "failed";

  useEffect(() => {
    if (!isFailed) {
      clearCart();
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#1C3F26", "#C5A872", "#7D9980", "#FAF8F5"],
        });
      } catch {}
    }
  }, [isFailed, clearCart]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="bg-white/90 p-8 sm:p-12 rounded-3xl sm:rounded-[2.5rem] border border-[#EDE7DD] shadow-[0_12px_40px_-8px_rgba(28,37,30,0.06)] text-center space-y-7">
          
          {/* Top Status Icon */}
          {isFailed ? (
            <div className="w-20 h-20 rounded-full bg-[#FAF0ED] border-2 border-[#E08A72] flex items-center justify-center text-[#A64F35] mx-auto shadow-sm">
              <AlertCircle className="w-10 h-10 text-[#A64F35]" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#18231C] border-2 border-[#C5A872] flex items-center justify-center text-[#D8B980] mx-auto shadow-[0_0_25px_rgba(197,168,114,0.3)]">
              <CheckCircle2 className="w-10 h-10 text-[#D8B980]" />
            </div>
          )}

          {/* Heading Section */}
          <div className="space-y-3">
            {isFailed ? (
              <>
                <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#A64F35] bg-[#FAF0ED] px-4 py-1.5 rounded-full border border-[#F2D7CE]">
                  <span>Payment Incomplete</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18231C]">
                  Payment Could Not Be Completed
                </h1>
                <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed max-w-md mx-auto font-light">
                  {errorMessage || "Your bank or payment provider did not confirm this transaction. No money was deducted."}
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-4 py-1.5 rounded-full border border-[#C5A872]/40 shadow-[0_4px_16px_-2px_rgba(24,35,28,0.2),0_0_12px_rgba(197,168,114,0.12)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D8B980]" />
                  <span>Order Confirmed • Dhanyawad</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18231C]">
                  Your Ritual Order is Placed!
                </h1>
                <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed max-w-md mx-auto font-light">
                  Our herbalists in Varanasi are now carefully handcrafting and packing your fresh Ayurvedic preparations.
                </p>
              </>
            )}
          </div>

          {/* Order Details Badge */}
          <div className="p-5 sm:p-6 bg-[#FAF8F5] rounded-2xl border border-[#EDE7DD] text-left space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE7DD] text-xs">
              <span className="text-[#6C766F] font-light">Order Reference:</span>
              <strong className="font-mono text-sm text-[#18231C] font-medium">{orderNumber}</strong>
            </div>

            {txnid && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6C766F] font-light">PayU Transaction ID:</span>
                <span className="font-mono text-[11px] text-[#18231C]">{txnid}</span>
              </div>
            )}

            {payuid && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6C766F] font-light">PayU Reference (MIHPAYID):</span>
                <span className="font-mono text-[11px] text-[#18231C]">{payuid}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6C766F] font-light">Payment Mode:</span>
              <span className="font-medium text-[#18231C]">
                {method === "PAYU" ? "PayU Live Gateway (Verified)" : "Cash on Delivery (COD)"}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6C766F] font-light">Current State:</span>
              <span className={`font-medium px-2.5 py-0.5 rounded-full text-[11px] ${
                isFailed
                  ? "text-[#A64F35] bg-[#FAF0ED] border border-[#F2D7CE]"
                  : "text-[#2D5A38] bg-[#EBF1EB] border border-[#D5E3D5]"
              }`}>
                {isFailed ? "Payment Failed" : "Order Confirmed • In Preparation"}
              </span>
            </div>

            {!isFailed && (
              <>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6C766F] font-light">Estimated Delivery:</span>
                  <span className="font-medium text-[#18231C]">3 - 5 Business Days</span>
                </div>

                <div className="flex items-center gap-2 pt-2 text-[11px] text-[#6C766F] font-light">
                  <Truck className="w-4 h-4 text-[#7D9980] shrink-0" />
                  <span>You will receive dispatch tracking updates via SMS & email as your package leaves Varanasi.</span>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            {isFailed ? (
              <>
                <Link
                  href="/checkout"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-3.5 px-6 rounded-full shadow-md text-xs sm:text-sm transition-all"
                >
                  <RefreshCw className="w-4 h-4 text-[#D8B980]" />
                  <span>Retry Payment / Change Mode</span>
                </Link>

                <Link
                  href="/contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white/80 hover:bg-[#FAF8F5] border border-[#EDE7DD] text-[#18231C] font-medium py-3.5 px-6 rounded-full text-xs sm:text-sm transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-[#8C6D32]" />
                  <span>Contact Support</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={`/track-order?orderNumber=${encodeURIComponent(orderNumber)}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-3.5 px-6 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] text-xs sm:text-sm transition-all"
                >
                  <PackageCheck className="w-4 h-4 text-[#D8B980]" />
                  <span>Track Order Status</span>
                </Link>

                <Link
                  href="/shop"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white/80 hover:bg-[#FAF8F5] border border-[#EDE7DD] text-[#18231C] font-medium py-3.5 px-6 rounded-full text-xs sm:text-sm transition-all"
                >
                  <Home className="w-4 h-4 text-[#8C6D32]" />
                  <span>Continue Exploring</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] py-24 text-center text-xs text-muted-foreground">Verifying ritual order...</div>}>
      <OrderConfirmationContent />
    </React.Suspense>
  );
}
