"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { Order, OrderStatus } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";

const TIMELINE_STEPS: { status: OrderStatus; label: string; desc: string }[] = [
  { status: "PLACED", label: "Order Received", desc: "Order recorded and verified by our Varanasi team" },
  { status: "CONFIRMED", label: "Ritual Confirmed", desc: "Formulation batch allocated from apothecary" },
  { status: "PROCESSING", label: "Handcrafted & Compounded", desc: "Herbs freshly ground & sealed in small batches" },
  { status: "PACKED", label: "Mindfully Packed", desc: "Sustainable protective packaging secured" },
  { status: "SHIPPED", label: "Dispatched from Varanasi", desc: "Handed over to our expedited logistics partner" },
  { status: "OUT_FOR_DELIVERY", label: "Out for Doorstep Delivery", desc: "In transit with regional delivery associate" },
  { status: "DELIVERED", label: "Sacred Delivery Complete", desc: "Received at your home sanctuary" },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderNumber = searchParams.get("orderNumber") || "";

  const [orderQuery, setOrderQuery] = useState(initialOrderNumber);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => {
    if (initialOrderNumber) {
      return dataStore.getOrderById(initialOrderNumber);
    }
    return dataStore.getOrderById("SVO-2026-8812"); // default loaded demo
  });
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!orderQuery.trim()) {
      setError("Please enter an order number.");
      return;
    }

    const order = dataStore.getOrderById(orderQuery.trim());
    if (order) {
      setSearchedOrder(order);
    } else {
      setError(`No order found matching "${orderQuery}". Try "SVO-2026-8812" or "SVO-2026-9045".`);
    }
  };

  const getStepIndex = (status: OrderStatus): number => {
    const idx = TIMELINE_STEPS.findIndex((s) => s.status === status);
    return idx >= 0 ? idx : 0;
  };

  const currentStepIdx = searchedOrder ? getStepIndex(searchedOrder.status) : 0;

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-4 py-1.5 rounded-full border border-[#C5A872]/40 shadow-[0_4px_16px_-2px_rgba(24,35,28,0.2),0_0_12px_rgba(197,168,114,0.12)]">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B980]" />
            <span>Varanasi Dispatch Tracking</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18231C]">
            Track Your Sacred Order
          </h1>
          <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light">
            Follow the journey of your Ayurvedic herbal preparations from our Varanasi facility to your sanctuary.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white/90 p-6 sm:p-8 rounded-3xl border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)]">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C6D32] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. SVO-2026-8812)"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-full pl-11 pr-4 py-3 text-xs sm:text-sm uppercase placeholder:normal-case font-mono text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
              />
            </div>
            <button
              type="submit"
              className="bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-3 px-8 rounded-full text-xs sm:text-sm shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] transition-all"
            >
              Track Ritual
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3.5 bg-[#FAF0ED] border border-[#F2D7CE] rounded-2xl text-xs text-[#A64F35] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#A64F35] shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Order Details & Timeline Card */}
        {searchedOrder && (
          <div className="bg-white/90 p-6 sm:p-10 rounded-3xl border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-8 animate-fadeIn">
            {/* Top Info Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0ECE4]">
              <div>
                <span className="text-[11px] text-[#6C766F] font-light block">Order Reference</span>
                <span className="font-mono text-xl font-medium text-[#18231C]">
                  {searchedOrder.orderNumber}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="bg-[#EBF1EB] text-[#2D5A38] font-medium px-3.5 py-1 rounded-full border border-[#D5E3D5]">
                  Status: {searchedOrder.status.replace(/_/g, " ")}
                </div>
                <div className="text-[#6C766F] font-light flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#8C6D32]" />
                  <span>Placed: {formatDate(searchedOrder.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Visual Step Timeline */}
            <div className="space-y-6">
              <h3 className="font-serif font-normal text-lg text-[#18231C]">
                Dispatch & Delivery Timeline
              </h3>

              <div className="relative pl-7 sm:pl-9 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-[1px] before:bg-[#EDE7DD]">
                {TIMELINE_STEPS.map((step, idx) => {
                  const isCompleted = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={step.status} className="relative flex items-start gap-4">
                      {/* Step Circle - Dark & Highlighted */}
                      <div
                        className={`absolute -left-7 sm:-left-9 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                          isCompleted
                            ? "bg-[#18231C] text-[#FAF8F5] border border-[#C5A872] ring-4 ring-[#C5A872]/20 shadow-[0_0_12px_rgba(197,168,114,0.3)]"
                            : "bg-[#18231C]/10 text-[#6C766F] border border-[#18231C]/20"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#D8B980]" />
                        ) : (
                          <span className="text-[10px] font-medium">{idx + 1}</span>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4
                            className={`font-serif text-sm sm:text-base font-normal ${
                              isCurrent
                                ? "text-[#1C3F26] font-medium"
                                : isCompleted
                                ? "text-[#18231C]"
                                : "text-[#9DA69F]"
                            }`}
                          >
                            {step.label}
                          </h4>
                          {isCurrent && (
                            <span className="bg-[#F7F3E9] text-[#8C6D32] border border-[#EDE5D3] text-[9px] font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                              In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6C766F] font-light">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Courier & Tracking Details */}
            {searchedOrder.trackingNumber && (
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EDE7DD] text-xs text-[#4A544E] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#7D9980] shrink-0" />
                  <div>
                    <span>Courier Tracking: <strong className="text-[#18231C] font-mono">{searchedOrder.trackingNumber}</strong></span>
                    <span className="text-[11px] text-[#6C766F] font-light block">
                      Partner: Delhivery / BlueDart Express Logistics
                    </span>
                  </div>
                </div>

                {searchedOrder.trackingUrl && (
                  <a
                    href={searchedOrder.trackingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#1C3F26] font-medium hover:underline"
                  >
                    <span>Track on Partner Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            {/* Ordered Items Recap */}
            <div className="pt-6 border-t border-[#F0ECE4] space-y-4">
              <h4 className="font-serif font-normal text-base text-[#18231C]">
                Ordered Formulations ({searchedOrder.items.length})
              </h4>
              <div className="divide-y divide-[#F0ECE4]">
                {searchedOrder.items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-medium text-[#18231C]">{item.productName}</span>
                      <span className="text-[#6C766F] block font-light">
                        Qty: {item.quantity} {item.variantTitle && `• ${item.variantTitle}`}
                      </span>
                    </div>
                    <span className="font-medium text-[#1C3F26]">{formatPrice(item.total)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#EDE7DD] flex justify-between text-sm font-normal text-[#18231C]">
                <span>Total Paid ({searchedOrder.paymentMethod}):</span>
                <span className="font-medium text-[#1C3F26] text-base">{formatPrice(searchedOrder.total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] py-20 text-center text-xs text-muted-foreground font-light">Loading tracker...</div>}>
      <TrackOrderContent />
    </React.Suspense>
  );
}
