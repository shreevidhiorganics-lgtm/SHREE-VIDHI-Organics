"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Phone, ShieldCheck, Truck, ChevronRight } from "lucide-react";

const announcements = [
  {
    icon: Truck,
    text: "Free Express Shipping on all orders above ₹499 across India",
    linkText: "Shop Now",
    href: "/shop",
  },
  {
    icon: ShieldCheck,
    text: "100% Pure Chemical-Free & Authentic Ayurvedic Herbs from Varanasi",
    linkText: "Our Story",
    href: "/our-story",
  },
  {
    icon: Sparkles,
    text: "Special Welcome Offer: Use code VIDHI15 for 15% OFF",
    linkText: "Explore",
    href: "/shop",
  },
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = announcements[currentIndex];
  const IconComponent = current.icon;

  return (
    <aside
      aria-label="Store Announcements"
      className="bg-[#F4F0E6] text-forest-950/80 border-b border-[#E7E2D5] text-[11px] py-2 px-4 transition-colors duration-500 font-medium"
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Support Direct Line (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 text-forest-800/70 hover:text-forest-950 transition-colors">
          <Phone className="w-3 h-3 text-[#A8884A]" />
          <span className="tracking-wide">Vedic Care: +91 6393600430 (Varanasi)</span>
        </div>

        {/* Center Rotating Message */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 animate-fadeIn transition-all">
            <IconComponent className="w-3.5 h-3.5 text-[#A8884A] shrink-0" />
            <span className="tracking-wide text-forest-900">{current.text}</span>
            <Link
              href={current.href}
              className="hidden sm:inline-flex items-center gap-0.5 text-[#8F7038] hover:text-[#5E4720] font-semibold underline underline-offset-4 ml-1 transition-colors"
            >
              {current.linkText}
              <ChevronRight className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>

        {/* Right side helper info */}
        <div className="hidden md:flex items-center gap-4 text-forest-800/70 text-[11px]">
          <Link href="/track-order" className="hover:text-forest-950 transition-colors">
            Track Order
          </Link>
          <span className="text-forest-300">·</span>
          <Link href="/faq" className="hover:text-forest-950 transition-colors">
            Help & FAQs
          </Link>
        </div>
      </div>
    </aside>
  );
}
