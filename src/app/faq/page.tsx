"use client";

import React, { useState } from "react";
import { Search, ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { faqs } from "@/lib/data/initial-data";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>("faq-1");

  const categories = ["All", "Products", "Orders & Shipping", "Payments", "Ayurveda & Usage"];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-4 py-1.5 rounded-full border border-[#C5A872]/40 shadow-[0_4px_16px_-2px_rgba(24,35,28,0.2),0_0_12px_rgba(197,168,114,0.12)]">
            <HelpCircle className="w-3.5 h-3.5 text-[#D8B980]" />
            <span>Knowledge Base & Ritual Guides</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#18231C] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light">
            Everything you need to know regarding product safety, botanical sourcing in Varanasi, delivery schedules, and dosage guidance.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto">
          <Search className="w-4 h-4 text-[#8C6D32] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. shipping, expiry, kapur kachri, refund)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/90 border border-[#EDE7DD] rounded-full pl-11 pr-5 py-3.5 text-xs sm:text-sm text-[#18231C] placeholder:text-[#A3ADA5] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-normal transition-all ${
                selectedCategory === cat
                  ? "bg-[#1C3F26] text-[#FAF8F5] shadow-sm"
                  : "bg-white/80 text-[#3D463F] border border-[#EDE7DD] hover:border-[#D5CDC1]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="bg-white/90 rounded-3xl p-6 sm:p-10 border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] divide-y divide-[#F0ECE4]">
          {filteredFaqs.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#6C766F] font-light">
              No answers match &quot;{searchQuery}&quot;. Try another query or reach out to our team in Varanasi.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = expandedId === faq.id;

              return (
                <div key={faq.id} className="py-5 first:pt-0 last:pb-0">
                  <button
                    onClick={() => setExpandedId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between text-left gap-4 py-1.5 group"
                  >
                    <span className="font-serif font-normal text-base sm:text-lg text-[#18231C] group-hover:text-[#8C6D32] transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8C6D32] transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pt-3 pb-2 text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
