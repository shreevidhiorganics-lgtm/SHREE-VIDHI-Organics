"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight, Phone, Mail, MapPin, User, Heart, Sparkles, LayoutDashboard } from "lucide-react";
import { useUIStore } from "@/store/ui-store";

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const [shopOpen, setShopOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      let active = true;
      fetch("/api/auth/me")
        .then((res) => res.json())
        .then((data) => {
          if (!active) return;
          setIsAdmin(
            Boolean(
              data?.authenticated &&
              data?.user?.email?.toLowerCase() === "shreevidhiorganics@gmail.com"
            )
          );
        })
        .catch(() => {
          if (active) setIsAdmin(false);
        });

      return () => {
        active = false;
      };
    }
  }, [isMobileMenuOpen]);

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
        onClick={closeMobileMenu}
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-sm bg-[#FAF8F5] h-full shadow-[0_20px_60px_rgba(28,37,30,0.15)] flex flex-col z-10 animate-slideInRight border-r border-[#EDE7DD]">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#EDE7DD] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <Image
              src="/pictures/brand/shreevidhi_logo.png"
              alt="Shree Vidhi Organics"
              height={36}
              width={140}
              style={{ width: "auto" }}
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </div>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="p-1.5 rounded-full bg-[#18231C]/5 hover:bg-[#18231C] text-forest-700 hover:text-[#D8B980] border border-transparent hover:border-[#C5A872]/40 transition-all active:scale-95"
            aria-label="Close navigation menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          <div>
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-2.5 font-medium text-xs sm:text-sm text-forest-950 border-b border-[#EDE7DD]"
            >
              <span>Sanctuary Home</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C6D32]" />
            </Link>

            {/* Shop Categories Accordion */}
            <div className="border-b border-[#EDE7DD] py-2">
              <button
                type="button"
                onClick={() => setShopOpen(!shopOpen)}
                className="w-full flex items-center justify-between py-1.5 font-medium text-xs sm:text-sm text-forest-950"
              >
                <span className="flex items-center gap-2">
                  <span>Shop Collections</span>
                  <span className="text-[9px] bg-[#18231C] text-[#D8B980] border border-[#C5A872]/40 px-2 py-0.5 rounded-full font-semibold">
                    ALL
                  </span>
                </span>
                <ChevronRight
                  className={`w-3.5 h-3.5 text-[#8C6D32] transition-transform duration-300 ${
                    shopOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              {shopOpen && (
                <div className="pl-3 mt-2 space-y-2 text-xs text-forest-800/80 animate-fadeIn">
                  <Link
                    href="/shop"
                    onClick={closeMobileMenu}
                    className="block py-1 text-forest-950 font-semibold"
                  >
                    View Entire Catalog
                  </Link>
                  <Link
                    href="/shop?category=hair-care"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#8C6D32]"
                  >
                    Hair Care Rituals
                  </Link>
                  <Link
                    href="/shop?category=skin-care"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#8C6D32]"
                  >
                    Botanical Skin Care
                  </Link>
                  <Link
                    href="/shop?category=ubtan-face-packs"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#8C6D32]"
                  >
                    Vedic Ubtan & Lepana
                  </Link>
                  <Link
                    href="/shop?category=herbal-powders"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#8C6D32]"
                  >
                    Single Herbal Powders
                  </Link>
                  <Link
                    href="/shop?category=wellness"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#8C6D32]"
                  >
                    Wellness & Superfoods
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/shop?category=best-sellers"
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-2.5 font-medium text-xs sm:text-sm text-forest-950 border-b border-[#EDE7DD]"
            >
              <span className="flex items-center gap-2">
                <span>Best Sellers</span>
                <Sparkles className="w-3 h-3 text-[#A8884A]" />
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C6D32]" />
            </Link>

            <Link
              href="/our-story"
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-2.5 font-medium text-xs sm:text-sm text-forest-950 border-b border-[#EDE7DD]"
            >
              <span>Varanasi Roots & Philosophy</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C6D32]" />
            </Link>

            <Link
              href="/ingredients"
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-2.5 font-medium text-xs sm:text-sm text-forest-950 border-b border-[#EDE7DD]"
            >
              <span>Vedic Materia Medica</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C6D32]" />
            </Link>

            <Link
              href="/blog"
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-2.5 font-medium text-xs sm:text-sm text-forest-950 border-b border-[#EDE7DD]"
            >
              <span>Ayurveda Wisdom Journal</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C6D32]" />
            </Link>

            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-2.5 font-medium text-xs sm:text-sm text-forest-950 border-b border-[#EDE7DD]"
            >
              <span>Contact & Apothecary Care</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C6D32]" />
            </Link>

            <Link
              href="/track-order"
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-2.5 font-medium text-xs sm:text-sm text-forest-950 border-b border-[#EDE7DD]"
            >
              <span>Track Your Order</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C6D32]" />
            </Link>
          </div>

          {/* Admin Dashboard Pill (Only for shreevidhiorganics@gmail.com) */}
          {isAdmin && (
            <div className="pt-2">
              <Link
                href="/admin"
                onClick={closeMobileMenu}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#18231C] text-[#D8B980] border border-[#C5A872]/50 text-xs font-semibold shadow-sm hover:bg-[#25372B] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4 text-[#C5A872]" />
                  <span>Admin Dashboard</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A872]" />
              </Link>
            </div>
          )}

          {/* Quick Account Links */}
          <div className="pt-2">
            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              My Sanctuary
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/account"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EDE7DD] text-xs font-medium text-forest-950 shadow-sm"
              >
                <User className="w-3.5 h-3.5 text-forest-700" />
                <span>Account</span>
              </Link>
              <Link
                href="/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EDE7DD] text-xs font-medium text-forest-950 shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>Wishlist</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Contact info footer in drawer */}
        <div className="p-4 bg-[#F5F1E9] border-t border-[#EDE7DD] text-xs text-forest-900/70 space-y-1.5 font-light">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#8C6D32]" />
            <span>care@shreevidhiorganics.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#8C6D32]" />
            <span>Birdopur, Varanasi, UP - 221010</span>
          </div>
        </div>
      </div>
    </div>
  );
}
