import React from "react";

export const metadata = {
  title: "Terms & Conditions | Shree Vidhi Organics",
  description: "Terms and conditions of purchase for Shree Vidhi Organics.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl bg-white/90 p-8 sm:p-14 rounded-3xl sm:rounded-[2.5rem] border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-8 text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light">
        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8C6D32] block">
            Legal Notice
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18231C]">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#6C766F] font-light">
            Last Updated: January 2026
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif font-normal text-lg sm:text-xl text-[#18231C]">
            1. Nature of Ayurvedic Products
          </h2>
          <p>
            Shree Vidhi Organics products are traditional Ayurvedic and botanical wellness formulations intended for personal grooming, self-care, and wellness rituals. Individual responses may vary based on personal doshic constitution and health factors. A standard skin patch test is recommended prior to initial use.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-normal text-lg sm:text-xl text-[#18231C]">
            2. Pricing & Currency
          </h2>
          <p>
            All listed prices are displayed in Indian Rupees (INR) and are inclusive of applicable goods and services taxes (GST).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-normal text-lg sm:text-xl text-[#18231C]">
            3. Legal Jurisdiction
          </h2>
          <p>
            Any disputes arising in connection with orders or website usage shall be governed by the laws of India and subject to the exclusive jurisdiction of the courts in Varanasi, Uttar Pradesh.
          </p>
        </section>
      </div>
    </div>
  );
}
