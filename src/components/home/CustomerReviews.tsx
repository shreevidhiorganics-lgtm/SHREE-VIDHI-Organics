"use client";

import React from "react";
import { Star, CheckCircle, Quote, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const reviews = [
  {
    name: "Pooja Sharma",
    location: "Mumbai",
    product: "Sea Buckthorn Pulp (500ml)",
    rating: 5,
    date: "Verified Buyer • 2 weeks ago",
    comment:
      "Adding this Sea Buckthorn pulp to my morning warm water has been a game-changer! My energy levels are way up, and my skin has developed a natural dewy glow. The pure tart berry flavor proves there are zero added sugars.",
  },
  {
    name: "Sneha Mukherjee",
    location: "Bengaluru",
    product: "Pure Natural Ubtan Powder",
    rating: 5,
    date: "Verified Buyer • 3 weeks ago",
    comment:
      "Unlike market face packs that leave a weird yellow stain or dry out the skin, this ubtan is so gentle. My beach tan and stubborn dark spots noticeably faded in just 14 days. My skin feels fresh and soft.",
  },
  {
    name: "Ritu Verma",
    location: "Lucknow",
    product: "Kapur Kachri Root Powder",
    rating: 5,
    date: "Verified Buyer • 1 month ago",
    comment:
      "Pure botanical powder with an authentic earthy herbal fragrance. It calmed my itchy scalp and reduced my hair fall within 3 washes. I love that it is 100% natural and made by women artisans in Varanasi.",
  },
];

export function CustomerReviews() {
  return (
    <section id="customer-reviews" className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-[#EDE7DD]">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-3.5 py-1.5 rounded-full border border-[#C5A872]/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B980]" />
            <span>REAL RESULTS • VERIFIED REVIEWS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 tracking-tight">
            Loved by 2,000+ Customers
          </h2>

          <p className="text-sm text-forest-900/70 leading-relaxed font-light">
            Read how everyday people transformed their skin, hair, and hormonal health with pure Ayurveda.
          </p>
        </ScrollReveal>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, idx) => (
            <ScrollReveal
              key={rev.name}
              direction="up"
              delay={idx * 0.1}
              duration={0.6}
            >
              <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-7 border border-[#EDE7DD] shadow-sm flex flex-col justify-between h-full relative group hover:border-[#C5A872] transition-colors">
                <div className="space-y-4">
                  {/* Top: Stars & Product Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                      ))}
                    </div>
                    <span className="text-[10px] font-medium text-[#1C3F26] bg-[#1C3F26]/10 px-2.5 py-0.5 rounded-full">
                      {rev.product}
                    </span>
                  </div>

                  {/* Comment Quote */}
                  <p className="text-xs sm:text-sm text-forest-900/80 font-light leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-5 mt-5 border-t border-[#E8E2D6] flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-forest-950">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-forest-800/60 font-light">
                      {rev.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

