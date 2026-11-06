"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const faqs = [
  {
    q: "How quickly will I see results?",
    a: "Our botanical face packs and ubtans leave your skin visibly softer and cleaner right from the 1st wash, with tan removal and dark spots clearing in 2 to 3 weeks. For our Seed Cycling Kit, most women notice regularized cycles, reduced cramps, and improved energy within 1 to 2 complete menstrual cycles (4–8 weeks).",
  },
  {
    q: "Are Shree Vidhi products 100% natural and chemical-free?",
    a: "Yes! Every formula is crafted with 100% pure herbs and edible-grade seeds. We never use parabens, sulfates, silicones, artificial colors, or chemical fillers. All products are AYUSH and FSSAI certified.",
  },
  {
    q: "How do I use the Seed Cycling Kit?",
    a: "It's super easy! Take 1 tablespoon (10–15g) daily. Days 1 to 14 of your cycle: take Jar 1 (Pumpkin & Flax seed blend). Days 15 to 30: take Jar 2 (Sesame & Sunflower seed blend). Simply mix into curd, morning smoothies, oatmeal, or warm water.",
  },
  {
    q: "What are the shipping charges and delivery timelines?",
    a: "We offer FREE Shipping across India on all orders of ₹499 or more. For smaller orders, a standard fee of ₹49 applies. All orders are packed fresh in Varanasi and dispatched within 24 hours, usually reaching your doorstep within 3–5 business days.",
  },
  {
    q: "Do you offer Cash on Delivery (COD)?",
    a: "Yes! We support Cash on Delivery (COD) across serviceable Indian pincodes, along with secure UPI (Google Pay, PhonePe, Paytm), Credit/Debit cards, and Net Banking.",
  },
];

export function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden border-b border-[#EDE7DD]">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-3.5 py-1.5 rounded-full border border-[#C5A872]/40 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#D8B980]" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 tracking-tight">
            Got Questions? We&rsquo;ve Got Answers.
          </h2>

          <p className="text-sm text-forest-900/70 font-light">
            Everything you need to know about our products, ingredients, and delivery.
          </p>
        </ScrollReveal>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal
                key={idx}
                direction="up"
                delay={idx * 0.05}
                duration={0.5}
              >
                <div className="bg-white rounded-2xl border border-[#EDE7DD] overflow-hidden transition-all duration-200 shadow-sm hover:border-[#C5A872]">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif font-bold text-sm sm:text-base text-forest-950">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8C6D32] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-forest-900/75 font-light leading-relaxed border-t border-[#F0ECE4]">
                      {faq.a}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

