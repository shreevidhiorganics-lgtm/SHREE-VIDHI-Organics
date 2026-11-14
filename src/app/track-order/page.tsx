"use client";

import React, { useState, useEffect } from "react";
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
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Order, OrderStatus, TrackingResult } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";

const TIMELINE_STEPS: { status: OrderStatus; label: string; desc: string }[] = [
  { status: "PLACED", label: "Order Received", desc: "Order recorded and verified by our Varanasi team" },
  { status: "CONFIRMED", label: "Herb Allocation Confirmed", desc: "Batch allocated from botanical storage" },
  { status: "PROCESSING", label: "Handcrafted Compounding", desc: "Herbs freshly compounded & sealed in small batches" },
  { status: "PACKED", label: "Quality Sealed", desc: "Protective packaging secured for dispatch" },
  { status: "SHIPPED", label: "Dispatched via Shiprocket", desc: "Handed over to express courier associate" },
  { status: "OUT_FOR_DELIVERY", label: "Out for Doorstep Delivery", desc: "In transit with regional delivery partner" },
  { status: "DELIVERED", label: "Sacred Delivery Complete", desc: "Received at your home sanctuary" },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderNumber = searchParams.get("orderNumber") || "";

  const [orderQuery, setOrderQuery] = useState(initialOrderNumber);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const performTrack = async (query: string) => {
    const clean = query.trim();
    if (!clean) {
      setError("Please enter an order number or AWB code.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/shipping/track?orderNumber=${encodeURIComponent(clean)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || `No shipment record found for "${clean}". Please verify your order number.`);
        setSearchedOrder(null);
        setTrackingResult(null);
      } else {
        setSearchedOrder(data.order);
        setTrackingResult(data.tracking);
      }
    } catch {
      setError("Unable to connect to live tracking server. Please verify your connection.");
      setSearchedOrder(null);
      setTrackingResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderNumber) {
      performTrack(initialOrderNumber);
    }
  }, [initialOrderNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performTrack(orderQuery);
  };

  const getStepIndex = (status: OrderStatus): number => {
    const idx = TIMELINE_STEPS.findIndex((s) => s.status === status);
    return idx >= 0 ? idx : 0;
  };

  const currentStepIdx = trackingResult ? getStepIndex(trackingResult.status) : 0;

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-4 py-1.5 rounded-full border border-[#C5A872]/40 shadow-[0_4px_16px_-2px_rgba(24,35,28,0.2),0_0_12px_rgba(197,168,114,0.12)]">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B980]" />
            <span>Shiprocket Live Dispatch Tracking</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18231C]">
            Track Your Sacred Order
          </h1>
          <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light">
            Real-time live express logistics tracking for your Ayurvedic herbal preparations from our Varanasi center to your doorstep.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white/90 p-6 sm:p-8 rounded-3xl border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)]">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C6D32] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. SVO-2026-XXXX) or AWB Tracking Number"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-full pl-11 pr-4 py-3 text-xs sm:text-sm uppercase placeholder:normal-case font-mono text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#1C3F26] hover:bg-[#16331F] disabled:opacity-60 text-[#FAF8F5] font-medium py-3 px-8 rounded-full text-xs sm:text-sm shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#D8B980]" />
                  <span>Tracking...</span>
                </>
              ) : (
                <span>Track Ritual</span>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3.5 bg-[#FAF0ED] border border-[#F2D7CE] rounded-2xl text-xs text-[#A64F35] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#A64F35] shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Prompt when no order is searched */}
        {!searchedOrder && !isLoading && !error && (
          <div className="bg-white/80 p-10 rounded-3xl border border-[#EDE7DD] text-center space-y-2">
            <Package className="w-9 h-9 text-[#8C6D32] mx-auto opacity-70" />
            <h3 className="font-serif font-normal text-lg text-[#18231C]">
              Live Express Logistics Network
            </h3>
            <p className="text-xs text-[#6C766F] font-light max-w-sm mx-auto">
              Powered by Shiprocket multi-carrier network (Blue Dart, Delhivery, DTDC). Enter your order number or AWB code above to view live scan events.
            </p>
          </div>
        )}

        {/* Order Details & Timeline Card */}
        {searchedOrder && trackingResult && (
          <div className="bg-white/90 p-6 sm:p-10 rounded-3xl border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-8 animate-fadeIn">
            {/* Top Info Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0ECE4]">
              <div>
                <span className="text-[11px] text-[#6C766F] font-light block">Order Reference</span>
                <span className="font-mono text-xl font-medium text-[#18231C]">
                  {searchedOrder.orderNumber}
                </span>
                <span className="text-xs text-[#7D9980] block font-medium mt-0.5">
                  {trackingResult.currentStatusText}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="bg-[#EBF1EB] text-[#2D5A38] font-medium px-3.5 py-1 rounded-full border border-[#D5E3D5]">
                  Status: {trackingResult.status.replace(/_/g, " ")}
                </div>
                {trackingResult.estimatedDelivery && (
                  <div className="bg-[#F7F3E9] text-[#8C6D32] font-medium px-3.5 py-1 rounded-full border border-[#EDE5D3] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Est. Delivery: {trackingResult.estimatedDelivery}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Courier & AWB Banner */}
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EDE7DD] text-xs text-[#4A544E] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#7D9980] shrink-0" />
                <div>
                  <span className="text-[#18231C] font-medium block">
                    Courier Partner: <strong className="font-sans font-semibold text-[#1C3F26]">{trackingResult.courierName}</strong>
                  </span>
                  <span className="text-[11px] text-[#6C766F] font-mono">
                    AWB: {trackingResult.trackingNumber}
                  </span>
                </div>
              </div>

              {trackingResult.trackingUrl && (
                <a
                  href={trackingResult.trackingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#1C3F26] font-medium hover:underline text-xs"
                >
                  <span>Track on Shiprocket</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Route Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white border border-[#EDE7DD] text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8C6D32] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C6D32] block font-medium">Origin</span>
                  <span className="text-[#18231C] font-light">{trackingResult.origin}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2D5A38] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#2D5A38] block font-medium">Destination</span>
                  <span className="text-[#18231C] font-light">{trackingResult.destination}</span>
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
                      {/* Step Circle */}
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
                              Current Status
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

            {/* Live Checkpoint Scans */}
            {trackingResult.scans && trackingResult.scans.length > 0 && (
              <div className="space-y-3 pt-6 border-t border-[#F0ECE4]">
                <h4 className="font-serif font-normal text-base text-[#18231C] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8C6D32]" />
                  <span>Verified Carrier Checkpoint Scans</span>
                </h4>
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EDE7DD] space-y-3">
                  {trackingResult.scans.map((scan, i) => (
                    <div key={i} className="flex items-start justify-between text-xs pb-2 border-b border-[#EDE7DD] last:border-0 last:pb-0">
                      <div>
                        <span className="font-medium text-[#18231C] block">{scan.activity}</span>
                        <span className="text-[11px] text-[#6C766F] font-light flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#8C6D32]" />
                          <span>{scan.location}</span>
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8C6D32] font-mono shrink-0 pl-2">{scan.date}</span>
                    </div>
                  ))}
                </div>
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
