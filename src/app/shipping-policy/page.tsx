import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, MapPin, Sparkles } from "lucide-react";

export const metadata = {
  title: "Shipping & Delivery Policy | Shree Vidhi Organics",
  description: "Express shipping timelines, standard shipping fee, and courier tracking details for Shree Vidhi Organics.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl bg-white/90 p-8 sm:p-14 rounded-3xl sm:rounded-[2.5rem] border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-10">
        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8C6D32] block">
            Fulfillment Guidelines
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18231C]">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs text-[#6C766F] font-light">
            Last Updated: January 2026 • Dispatches from Varanasi, Uttar Pradesh
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light">
          <section className="space-y-3">
            <h2 className="font-serif font-normal text-lg sm:text-xl text-[#18231C]">
              1. Standard Shipping Fee
            </h2>
            <p>
              We apply a nominal flat <strong className="font-medium text-[#18231C]">₹49 Express Courier Shipping</strong> fee on all domestic prepaid and Cash on Delivery orders across all serviceable pin codes in India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-normal text-lg sm:text-xl text-[#18231C]">
              2. Dispatch & Delivery Timelines
            </h2>
            <p>
              Every Shree Vidhi preparation is packaged in fresh small batches in Varanasi. Orders placed before 1:00 PM IST are prepared and dispatched on the same business day.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="font-medium text-[#18231C]">Metro Hubs (Delhi NCR, Mumbai, Bengaluru, Kolkata, Chennai):</strong> 2 to 4 business days.</li>
              <li><strong className="font-medium text-[#18231C]">Rest of India (Tier 2 & 3 Cities):</strong> 3 to 5 business days.</li>
              <li><strong className="font-medium text-[#18231C]">North-East & Remote Hill Regions:</strong> 5 to 7 business days.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-normal text-lg sm:text-xl text-[#18231C]">
              3. Courier Logistics & Tracking
            </h2>
            <p>
              All shipments are dispatched via top-tier express courier logistics including Delhivery, BlueDart, and DTDC. You will receive an SMS and email notification with your tracking link as soon as your package departs our Varanasi sanctuary.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
