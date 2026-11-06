"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Award, HeartHandshake } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function OurVisionSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-[#EDE7DD]">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Traditional Varanasi Women Artisans Illustration */}
          <ScrollReveal direction="right" duration={0.8}>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#EDE7DD] bg-[#F7F4EE] group">
              <Image
                src="/shreevidhi_tradition.png"
                alt="Shree Vidhi Ayurvedic Tradition in Varanasi"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18231C]/75 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-light space-y-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B980] font-semibold block">
                  Government-Funded Social Enterprise
                </span>
                <p className="font-serif text-base sm:text-lg text-[#FAF8F5]">
                  Varanasi, Uttar Pradesh • Empowering Rural Women Artisans
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Founder Story & Mission */}
          <ScrollReveal direction="left" duration={0.8} delay={0.15} className="space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-3.5 py-1.5 rounded-full border border-[#C5A872]/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D8B980]" />
              <span>THE SHREE VIDHI STORY</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-forest-950">
              Born from Healing.<br />Handcrafted in Varanasi.
            </h2>

            {/* Founder Healing Story Callout */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D6] space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6D32]">
                <HeartHandshake className="w-4 h-4 text-[#C5A059]" />
                <span>Founder Aditi Singh&rsquo;s Personal Journey</span>
              </div>
              <p className="text-xs sm:text-sm text-forest-900/80 font-light leading-relaxed">
                After reversing chronic PCOD/PCOS through Ayurveda, <strong>Aditi Singh</strong> established Shree Vidhi in Varanasi to share proven, chemical-free herbal remedies with women across India — while creating dignified, skilled employment for local rural women.
              </p>
            </div>

            {/* 2 Simple Mission Statements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-l-2 border-[#C5A059] pl-3.5 space-y-1">
                <strong className="text-forest-950 font-serif font-semibold block text-sm">
                  Pure Ingredients
                </strong>
                <p className="text-xs text-forest-900/70 font-light">
                  Direct from organic farms. 100% natural, certified safe for the whole family.
                </p>
              </div>

              <div className="border-l-2 border-[#1C3F26] pl-3.5 space-y-1">
                <strong className="text-forest-950 font-serif font-semibold block text-sm">
                  Women Empowerment
                </strong>
                <p className="text-xs text-forest-900/70 font-light">
                  Hand-ground, packed, and quality-checked by skilled women in Varanasi.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 bg-[#1C3F26] hover:bg-[#14301D] text-white font-medium text-xs sm:text-sm py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 text-[#D8C7A3]" />
              </Link>
              <div className="flex items-center gap-2 text-xs text-forest-900/70 font-light">
                <Award className="w-4 h-4 text-[#8C6D32]" />
                <span>AYUSH Lic. RJ-1032-AYU • FSSAI Certified</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
