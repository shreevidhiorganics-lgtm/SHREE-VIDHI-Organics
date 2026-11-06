import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Cancellation & Refund Policy | Shree Vidhi Organics",
  description: "Learn about Shree Vidhi Organics return, refund, and replacement policies for Ayurvedic preparations.",
};

export default function ReturnPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl bg-white/90 p-8 sm:p-14 rounded-3xl sm:rounded-[2.5rem] border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-10">
        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8C6D32] block">
            Customer Assurance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18231C]">
            Cancellation & Return Policy
          </h1>
          <p className="text-xs text-[#6C766F] font-light">
            Last Updated: January 2026
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light">
          <section className="space-y-3">
            <h2 className="font-serif font-normal text-lg sm:text-xl text-[#18231C]">
              1. Purity & Hygiene Standards
            </h2>
            <p>
              Due to the sensitive botanical, chemical-free, and personal-care nature of our Ayurvedic formulations, products once opened cannot be accepted for return or exchange to uphold strict hygiene standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-normal text-lg sm:text-xl text-[#18231C]">
              2. Damaged or Tampered Shipments
            </h2>
            <p>
              If your shipment arrives damaged, leaked, or with a broken seal, please notify our team within <strong className="font-medium text-[#18231C]">48 hours</strong> of receipt along with unboxing photos or video at <a href="mailto:shreevidhiorganics@gmail.com" className="text-[#18231C] underline font-medium">shreevidhiorganics@gmail.com</a> or WhatsApp <a href="tel:+916393600430" className="text-[#18231C] underline font-medium">+91 6393600430</a>. We will dispatch an immediate replacement free of charge.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-normal text-lg sm:text-xl text-[#18231C]">
              3. Order Cancellations
            </h2>
            <p>
              Orders can be cancelled before dispatch directly from your Customer Account dashboard or by reaching out to support. Once dispatched from our Varanasi sanctuary, transit cancellation is no longer possible.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
