"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function OurBlogsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] relative overflow-hidden border-b border-[#EDE7DD]">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal direction="up" className="mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-forest-950 uppercase">
            OUR BLOGS
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ScrollReveal direction="up" delay={0.1}>
            <Link
              href="/blog/vedic-blend-ayurvedic-rituals"
              className="group block bg-white rounded-3xl overflow-hidden border border-[#EDE7DD] shadow-[0_4px_20px_-2px_rgba(28,37,30,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(28,37,30,0.06)] transition-all duration-300"
            >
              <div className="relative aspect-[4/3] bg-[#FAF8F5] overflow-hidden flex items-center justify-center p-6">
                <Image
                  src="/pictures/blog/blog-vedic-blend.png"
                  alt="Vedic blend blog post"
                  width={200}
                  height={240}
                  className="object-contain max-h-56 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 space-y-2.5">
                <h3 className="font-serif font-bold text-lg text-forest-950 group-hover:text-forest-700 transition-colors">
                  Vedic blend | Blog post
                </h3>
                <p className="text-xs text-forest-900/70 font-light leading-relaxed line-clamp-3">
                  An excerpt from the most recommended Vedic blend, which describes 3 best combinations of the unique amla &amp; hibiscus shampoo, Neem Tulsi blend, and ancestral haircare secrets.
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#8C6D32] group-hover:text-[#5E4720]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
