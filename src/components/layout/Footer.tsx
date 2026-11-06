"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Leaf,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Send,
  ShieldCheck,
  Sparkles,
  Heart,
  CheckCircle2,
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#18231C] text-[#D8D2C6] border-t border-[#26352B] pt-16 pb-10">
      {/* Trust Badges Banner above Footer */}
      <div className="container mx-auto px-4 sm:px-6 mb-16 pb-12 border-b border-[#28382D]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#0F1712] border-2 border-[#C5A872]/40 shadow-[0_0_18px_rgba(197,168,114,0.22)] flex items-center justify-center text-[#D8C7A3] mb-3 transition-transform duration-300 hover:scale-108">
              <Leaf className="w-5 h-5 text-[#D8C7A3]" />
            </div>
            <h4 className="font-serif font-bold text-[#FAF8F5] text-sm sm:text-base">100% Botanical Pure</h4>
            <p className="text-xs text-[#9FA89F] mt-1 max-w-[200px] font-light leading-relaxed">
              No parabens, sulfates, artificial scents, or chemical fillers.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#0F1712] border-2 border-[#C5A872]/40 shadow-[0_0_18px_rgba(197,168,114,0.22)] flex items-center justify-center text-[#D8C7A3] mb-3 transition-transform duration-300 hover:scale-108">
              <Sparkles className="w-5 h-5 text-[#D8C7A3]" />
            </div>
            <h4 className="font-serif font-bold text-[#FAF8F5] text-sm sm:text-base">Varanasi Heritage</h4>
            <p className="text-xs text-[#9FA89F] mt-1 max-w-[200px] font-light leading-relaxed">
              Handcrafted in Kashi following sacred Ayurvedic Vidhi treatises.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#0F1712] border-2 border-[#C5A872]/40 shadow-[0_0_18px_rgba(197,168,114,0.22)] flex items-center justify-center text-[#D8C7A3] mb-3 transition-transform duration-300 hover:scale-108">
              <ShieldCheck className="w-5 h-5 text-[#D8C7A3]" />
            </div>
            <h4 className="font-serif font-bold text-[#FAF8F5] text-sm sm:text-base">Ethically Sourced</h4>
            <p className="text-xs text-[#9FA89F] mt-1 max-w-[200px] font-light leading-relaxed">
              Directly supporting Indian wildcraft harvesters and women artisans.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#0F1712] border-2 border-[#C5A872]/40 shadow-[0_0_18px_rgba(197,168,114,0.22)] flex items-center justify-center text-[#D8C7A3] mb-3 transition-transform duration-300 hover:scale-108">
              <Heart className="w-5 h-5 text-[#E08A72]" />
            </div>
            <h4 className="font-serif font-bold text-[#FAF8F5] text-sm sm:text-base">Eco-Conscious Packs</h4>
            <p className="text-xs text-[#9FA89F] mt-1 max-w-[200px] font-light leading-relaxed">
              Recyclable and sustainable apothecary packaging materials.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#28382D]">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/pictures/brand/shreevidhi_logo.png"
                alt="Shree Vidhi Organics"
                height={44}
                width={205}
                style={{ width: "auto" }}
                className="h-11 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="text-xs sm:text-sm text-[#B4ADA1] leading-relaxed max-w-sm font-light">
              Founded by Aditi Singh as a government-funded social enterprise in Varanasi. Shree Vidhi Organics revives sacred Ayurvedic Vidhi for modern wellness while creating an ecosystem of dignity and empowerment for rural women and farmers.
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#9FA89F] font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A872] shrink-0 mt-0.5" />
                <span>N15/170 A Badi Gaibi Chauraha, Birdopur, Varanasi, Uttar Pradesh - 221010, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#C5A872] shrink-0" />
                <span>+91 6393600430, +91 7752905694 (Mon–Sat, 10 AM – 7 PM IST)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#C5A872] shrink-0" />
                <span>shreevidhiorganics@gmail.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com/shreevidhiorganics"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#0F1712] border border-[#C5A872]/30 flex items-center justify-center text-[#D8C7A3] hover:text-[#FAF8F5] hover:border-[#C5A872] hover:shadow-[0_0_15px_rgba(197,168,114,0.35)] hover:scale-105 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com/shreevidhiorganics"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#0F1712] border border-[#C5A872]/30 flex items-center justify-center text-[#D8C7A3] hover:text-[#FAF8F5] hover:border-[#C5A872] hover:shadow-[0_0_15px_rgba(197,168,114,0.35)] hover:scale-105 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com/@shreevidhiorganics"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#0F1712] border border-[#C5A872]/30 flex items-center justify-center text-[#D8C7A3] hover:text-[#FAF8F5] hover:border-[#C5A872] hover:shadow-[0_0_15px_rgba(197,168,114,0.35)] hover:scale-105 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="space-y-3">
            <h4 className="text-[#FAF8F5] font-serif font-bold text-sm sm:text-base tracking-wide">
              Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#B4ADA1] font-light">
              <li>
                <Link href="/shop?category=hair-care" className="hover:text-[#D8C7A3] transition-colors">
                  Hair Care Rituals
                </Link>
              </li>
              <li>
                <Link href="/shop?category=skin-care" className="hover:text-[#D8C7A3] transition-colors">
                  Botanical Skin Care
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ubtan-face-packs" className="hover:text-[#D8C7A3] transition-colors">
                  Vedic Ubtan & Lepana
                </Link>
              </li>
              <li>
                <Link href="/shop?category=herbal-powders" className="hover:text-[#D8C7A3] transition-colors">
                  Single Herbal Powders
                </Link>
              </li>
              <li>
                <Link href="/shop?category=wellness" className="hover:text-[#D8C7A3] transition-colors">
                  Himalayan Superfoods
                </Link>
              </li>
              <li>
                <Link href="/shop?category=best-sellers" className="hover:text-[#D8C7A3] transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Company */}
          <div className="space-y-3">
            <h4 className="text-[#FAF8F5] font-serif font-bold text-sm sm:text-base tracking-wide">
              Sanctuary
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#B4ADA1] font-light">
              <li>
                <Link href="/track-order" className="hover:text-[#D8C7A3] transition-colors">
                  Track Your Ritual
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#D8C7A3] transition-colors">
                  Care & FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-[#D8C7A3] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-[#D8C7A3] transition-colors">
                  Returns & Care
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-[#D8C7A3] transition-colors">
                  Varanasi Origins
                </Link>
              </li>
              <li>
                <Link href="/ingredients" className="hover:text-[#D8C7A3] transition-colors">
                  Materia Medica
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D8C7A3] transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-[#FAF8F5] font-serif font-bold text-sm sm:text-base tracking-wide">
              The Vedic Circle
            </h4>
            <p className="text-xs text-[#B4ADA1] leading-relaxed font-light">
              Receive seasonal harvest notices, classical wellness treatises, and exclusive private offerings.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#202E24] border border-[#C5A872]/40 rounded-xl text-xs text-[#D8C7A3] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A872] shrink-0" />
                <span>Namaste! You have joined the circle. Use code <strong>VIDHI15</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-[#202E24] border border-[#2F4234] rounded-full py-2.5 pl-4 pr-10 text-xs text-white placeholder-[#879388] focus:outline-none focus:border-[#C5A872]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-[#C5A872] hover:bg-[#B5965E] text-[#18231C] rounded-full transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-[10px] text-[#879388] block font-light">
                  Unsubscribe anytime. We honor your tranquility.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#879388] font-light">
          <div>
            <p>
              © {new Date().getFullYear()} Shree Vidhi Organics. Handcrafted in Varanasi, Uttar Pradesh, India.
            </p>
            <p className="text-[11px] text-[#A8884A] mt-0.5">
              Government-Funded Social Enterprise • AYUSH Lic. RJ-1032-AYU • FSSAI Lic. 12221036000261
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/privacy-policy" className="hover:text-[#D8C7A3] transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-[#D8C7A3] transition-colors">
              Terms
            </Link>
            <span>·</span>
            <Link href="/shipping-policy" className="hover:text-[#D8C7A3] transition-colors">
              Shipping
            </Link>
            <span>·</span>
            <Link href="/admin" className="text-[#C5A872]/80 hover:text-[#C5A872] transition-colors font-medium">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
