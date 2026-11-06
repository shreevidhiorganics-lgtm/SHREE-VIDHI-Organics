import React from "react";

export const metadata = {
  title: "Privacy Policy | Shree Vidhi Organics",
  description: "Privacy commitments and data handling standards of Shree Vidhi Organics.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl bg-white/90 p-8 sm:p-14 rounded-3xl sm:rounded-[2.5rem] border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-8 text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light">
        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8C6D32] block">
            Data Integrity
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18231C]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#6C766F] font-light">
            Last Updated: January 2026
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif font-normal text-lg sm:text-xl text-[#18231C]">
            1. Information We Collect
          </h2>
          <p>
            Shree Vidhi Organics collects only necessary personal details (name, delivery destination, email, phone number) required strictly for order fulfillment, courier transit, and transactional status updates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-normal text-lg sm:text-xl text-[#18231C]">
            2. Payment Information Security
          </h2>
          <p>
            We never store, see, or process raw credit card or debit card numbers on our servers. All digital payments are handled through PCI-DSS compliant secure payment gateway partners (Razorpay).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-normal text-lg sm:text-xl text-[#18231C]">
            3. Respect for Your Sanctity
          </h2>
          <p>
            We honor the trust you place in our sanctuary. We never sell, trade, or rent personal customer records to third-party telemarketers or external advertising networks.
          </p>
        </section>
      </div>
    </div>
  );
}
