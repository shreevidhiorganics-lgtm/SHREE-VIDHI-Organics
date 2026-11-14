"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Leaf, Star, ShieldCheck } from "lucide-react";

interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
  featuredHerb: string;
  image: string;
}

const slides: HeroSlide[] = [
  {
    id: "glow",
    badge: "100% PURE AYURVEDA • HANDMADE IN VARANASI",
    title: "Pure Ayurveda for\nGlowing Skin & Hair.",
    description: "Traditional herbal remedies crafted in small batches. Zero chemicals, zero artificial perfumes — just honest, natural recipes that deliver visible results.",
    primaryCta: "Shop Best Sellers",
    primaryHref: "/shop",
    secondaryCta: "Our Story",
    secondaryHref: "/our-story",
    featuredHerb: "Multani Mitti + Neem + Turmeric",
    image: "/pictures/banners/hero_banner_shreevidhi.png",
  },
  {
    id: "haircare",
    badge: "ANCIENT ROOT RITUAL • ZERO CHEMICALS",
    title: "Dense, Strong Hair\nFrom The Roots.",
    description: "Formulated with wild Himalayan Kapur Kachri rhizome, Sarva Kesh blend, and triple-milled Amla Reetha Shikakai. Stimulates micro-circulation and arrests excessive hair fall.",
    primaryCta: "Shop Hair Care",
    primaryHref: "/shop?category=hair-care",
    secondaryCta: "Explore Ingredients",
    secondaryHref: "/ingredients",
    featuredHerb: "Pure Kapur Kachri & Sarva Kesh Blend",
    image: "/pictures/banners/hero_banner_shreevidhi.png",
  },
  {
    id: "ubtan",
    badge: "100% BOTANICAL • WOMEN EMPOWERMENT",
    title: "Clear Sun Tan & Acne\nIn Just 2 Weeks.",
    description: "Made with non-staining wild turmeric, cooling sandalwood, and mineral clays. Gently removes dead skin, unclogs pores, and restores a natural golden glow.",
    primaryCta: "Shop Face Care from ₹99",
    primaryHref: "/shop?category=ubtan-face-packs",
    secondaryCta: "See Customer Reviews",
    secondaryHref: "#customer-reviews",
    featuredHerb: "Pure Jangali Haldi & Natural Ubtan",
    image: "/pictures/banners/hero_banner_ubtan.png",
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] bg-[#FAF8F5] text-forest-950 overflow-hidden flex items-center border-b border-[#EDE7DC]">
      {/* Fixed Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pictures/banners/hero_banner_shreevidhi.png"
          alt="Shree Vidhi Organics Pure Ayurveda"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Atmospheric Soft Light Gradients for clean text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent z-[1] w-full md:w-3/5 lg:w-1/2" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5]/80 via-transparent to-transparent z-[1] sm:hidden" />

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-14 sm:py-20">
        <div className="max-w-xl space-y-6">
          {/* Eyebrow badge */}
          <motion.div
            key={`badge-${currentSlide}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#18231C] border border-[#C5A872]/40 rounded-full py-1.5 px-3 sm:px-3.5 shadow-sm max-w-full"
          >
            <span className="w-2 h-2 rounded-full bg-[#C5A872] animate-pulse shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider sm:tracking-[0.18em] text-[#FAF8F5] uppercase truncate">
              {slide.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`headline-${currentSlide}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-forest-950 leading-[1.12] whitespace-pre-line">
                {slide.title}
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-forest-900/80 leading-relaxed font-light"
            >
              {slide.description}
            </motion.p>
          </AnimatePresence>

          {/* Featured Herb Pill */}
          <div className="inline-flex items-center gap-2 text-xs text-forest-950 bg-white/90 border border-[#EDE7DD] px-3.5 py-1.5 rounded-full shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-[#1C3F26] shrink-0" />
            <span className="text-forest-900/80 text-[11px] sm:text-xs">
              <strong>Key Ingredients:</strong> {slide.featuredHerb}
            </span>
          </div>

          {/* Minimalist CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href={slide.primaryHref}
              className="group inline-flex items-center gap-2 bg-[#1C3F26] hover:bg-[#14301D] text-white font-medium text-xs sm:text-sm py-3.5 px-7 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{slide.primaryCta}</span>
              <ArrowRight className="w-4 h-4 text-[#D8C7A3] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={slide.secondaryHref}
              className="inline-flex items-center gap-2 bg-white/80 hover:bg-white text-forest-950 border border-[#18231C]/20 hover:border-[#8C6D32] font-medium text-xs sm:text-sm py-3.5 px-6 rounded-full transition-all duration-300 shadow-sm"
            >
              <span>{slide.secondaryCta}</span>
            </Link>
          </div>

          {/* Quick Rating & Assurance */}
          <div className="pt-4 border-t border-[#E8E2D6]/80 flex flex-wrap items-center gap-5 text-xs text-forest-900/75">
            <div className="flex items-center gap-1.5 font-medium">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-500" />
                ))}
              </div>
              <span className="font-semibold text-forest-950">4.9 / 5</span>
              <span className="text-forest-800/60 font-light">(2,400+ reviews)</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1C3F26]" />
              <span>Authentic Classical Formula</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Switcher Controls */}
      <div className="absolute bottom-6 right-4 sm:right-8 z-20 flex items-center gap-2 bg-[#18231C]/90 backdrop-blur-md border border-[#2D3E32] p-1.5 rounded-full shadow-lg">
        {slides.map((s, idx) => {
          const isActive = idx === currentSlide;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 font-medium ${
                isActive
                  ? "bg-[#25372B] text-white border border-[#C5A872]/50 shadow-sm"
                  : "text-[#A8B4AC] hover:text-white"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            >
              0{idx + 1}
            </button>
          );
        })}
      </div>
    </section>
  );
}
