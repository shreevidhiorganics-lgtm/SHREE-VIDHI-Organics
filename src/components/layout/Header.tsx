"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";

export function Header() {
  const pathname = usePathname();
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setCurrentCategory(params.get("category"));
    }
  }, [pathname]);

  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const shopMenuRef = useRef<HTMLDivElement>(null);

  const rawCartCount = useCartStore((state) => state.getItemCount());
  const wishlistItems = useWishlistStore((state) => state.items);
  const { openCartDrawer, openSearch, openMobileMenu } = useUIStore();

  // Prevent SSR hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = mounted ? rawCartCount : 0;
  const wishlistCount = mounted ? wishlistItems.length : 0;

  // Scroll listener for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close Shop dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shopMenuRef.current && !shopMenuRef.current.contains(e.target as Node)) {
        setShopMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShopMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Navigation Links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop", hasMega: true },
    { name: "Hair Rituals", href: "/shop?category=hair-care", categorySlug: "hair-care" },
    { name: "Skin & Face", href: "/shop?category=skin-care", categorySlug: "skin-care" },
    { name: "Materia Medica", href: "/ingredients" },
    { name: "Our Heritage", href: "/our-story" },
    { name: "Journal", href: "/blog" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(28,37,30,0.06)] border-b border-[#E8E2D6] py-2.5 sm:py-3"
          : "bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EDE7DC] py-3.5 sm:py-4"
      }`}
    >
      <div className="container mx-auto px-2.5 xs:px-3 sm:px-6 flex items-center justify-between gap-1.5 xs:gap-2 sm:gap-4 lg:gap-6 max-w-full">
        {/* Mobile Hamburger, Home Button & Mobile Search */}
        <div className="flex items-center gap-0.5 sm:gap-1 lg:hidden shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              openMobileMenu();
            }}
            className="p-1.5 sm:p-2 rounded-full text-forest-900 hover:bg-[#18231C] hover:text-[#D8B980] hover:border-[#C5A872]/40 border border-transparent transition-all active:scale-95"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link
            href="/"
            className={`p-1.5 sm:p-2 rounded-full transition-all active:scale-95 border ${
              pathname === "/"
                ? "bg-[#18231C] text-[#D8B980] border-[#C5A872]/40 shadow-sm"
                : "text-forest-900 hover:bg-[#18231C] hover:text-[#D8B980] hover:border-[#C5A872]/40 border-transparent"
            }`}
            aria-label="Go to home screen"
            title="Home"
          >
            <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              openSearch();
            }}
            className="p-1.5 sm:p-2 rounded-full text-forest-900 hover:bg-[#18231C] hover:text-[#D8B980] hover:border-[#C5A872]/40 border border-transparent transition-all active:scale-95"
            aria-label="Open search modal"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center group shrink-0 min-w-0">
          <div className="relative h-8 xs:h-9 sm:h-10 md:h-11 w-auto transition-transform duration-300 group-hover:scale-102 flex items-center">
            <Image
              src="/pictures/brand/shreevidhi_logo.png"
              alt="Shree Vidhi Organics"
              height={44}
              width={210}
              style={{ width: "auto" }}
              className="h-7 xs:h-8 sm:h-9 md:h-10 max-w-[115px] xs:max-w-[140px] sm:max-w-[180px] md:max-w-[210px] w-auto object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-medium text-forest-900/85">
          {navLinks.map((link) => {
            const isActive = link.categorySlug
              ? pathname === "/shop" && currentCategory === link.categorySlug
              : link.href === "/shop"
              ? pathname === "/shop" && !currentCategory
              : pathname === link.href;

            if (link.hasMega) {
              return (
                <div
                  ref={shopMenuRef}
                  key={link.name}
                  className="relative py-2"
                  onMouseEnter={() => setShopMenuOpen(true)}
                  onMouseLeave={() => setShopMenuOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setShopMenuOpen((prev) => !prev)}
                    className={`flex items-center gap-1.5 py-1 tracking-wide hover:text-forest-950 transition-colors focus:outline-none ${
                      isActive || shopMenuOpen ? "text-forest-950 font-semibold" : ""
                    }`}
                    aria-expanded={shopMenuOpen}
                    aria-haspopup="true"
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-forest-600/70 transition-transform duration-300 ${
                        shopMenuOpen ? "rotate-180 text-forest-950" : ""
                      }`}
                    />
                  </button>

                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#8C6D32] rounded-full transition-transform duration-300 origin-left ${
                      isActive || shopMenuOpen ? "scale-x-100" : "scale-x-0"
                    }`}
                  />

                  {/* Mega Menu Dropdown with safe hover bridge */}
                  {shopMenuOpen && (
                    <div className="absolute top-full -left-6 pt-2 z-50">
                      <div className="w-[340px] bg-[#FFFFFF] rounded-2xl shadow-[0_16px_40px_-6px_rgba(28,37,30,0.12)] border border-[#E8E2D6] p-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C6D32] px-2 mb-2">
                          <span>Sacred Herbal Domains</span>
                          <Sparkles className="w-3 h-3 text-[#C5A872]" />
                        </div>

                        <div className="space-y-1">
                          <Link
                            href="/shop"
                            onClick={() => setShopMenuOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F4EE] text-forest-950 transition-colors group/item"
                          >
                            <div>
                              <div className="font-serif font-bold text-sm text-forest-950 group-hover/item:text-forest-700">
                                All Formulations
                              </div>
                              <div className="text-[11px] text-muted-foreground font-light">
                                Explore full authentic Vedic catalog
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#C5A872] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          </Link>

                          <Link
                            href="/shop?category=hair-care"
                            onClick={() => setShopMenuOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F4EE] text-forest-950 transition-colors group/item"
                          >
                            <div>
                              <div className="font-serif font-bold text-sm text-forest-950 group-hover/item:text-forest-700">
                                Hair Care Rituals
                              </div>
                              <div className="text-[11px] text-muted-foreground font-light">
                                Kapur Kachri Root & Sarva Kesh
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#C5A872] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          </Link>

                          <Link
                            href="/shop?category=skin-care"
                            onClick={() => setShopMenuOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F4EE] text-forest-950 transition-colors group/item"
                          >
                            <div>
                              <div className="font-serif font-bold text-sm text-forest-950 group-hover/item:text-forest-700">
                                Botanical Skin Care
                              </div>
                              <div className="text-[11px] text-muted-foreground font-light">
                                Jangali Haldi & Pure Beetroot
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#C5A872] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          </Link>

                          <Link
                            href="/shop?category=ubtan-face-packs"
                            onClick={() => setShopMenuOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F4EE] text-forest-950 transition-colors group/item"
                          >
                            <div>
                              <div className="font-serif font-bold text-sm text-forest-950 group-hover/item:text-forest-700">
                                Vedic Ubtan & Lepana
                              </div>
                              <div className="text-[11px] text-muted-foreground font-light">
                                Natural Ubtan & Multani Neem Blend
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#C5A872] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          </Link>

                          <Link
                            href="/shop?category=wellness"
                            onClick={() => setShopMenuOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F4EE] text-forest-950 transition-colors group/item"
                          >
                            <div>
                              <div className="font-serif font-bold text-sm text-forest-950 group-hover/item:text-forest-700">
                                Wellness & Superfoods
                              </div>
                              <div className="text-[11px] text-muted-foreground font-light">
                                Pure Himalayan Sea Buckthorn
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#C5A872] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          </Link>
                        </div>

                        <div className="mt-3 pt-3 border-t border-[#EFECE6] px-2 flex items-center justify-between">
                          <Link
                            href="/shop"
                            onClick={() => setShopMenuOpen(false)}
                            className="text-[11px] font-semibold text-forest-900 hover:text-[#8C6D32] flex items-center gap-1 transition-colors"
                          >
                            <span>Browse All 6 Formulations</span>
                            <span>→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative py-1 tracking-wide hover:text-forest-950 transition-colors ${
                  isActive ? "text-forest-950 font-semibold" : ""
                }`}
              >
                <span>{link.name}</span>
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#8C6D32] rounded-full transition-transform duration-300 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons: Search, Account, Wishlist, Cart */}
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2.5 shrink-0">
          {/* Desktop Search Trigger */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              openSearch();
            }}
            className="hidden lg:flex items-center gap-2.5 bg-[#18231C]/5 hover:bg-[#18231C] border border-[#18231C]/15 hover:border-[#C5A872] rounded-full py-1.5 px-3.5 text-xs text-forest-900 hover:text-white transition-all shadow-sm group active:scale-95"
            aria-label="Search herbs, remedies, and products"
          >
            <Search className="w-3.5 h-3.5 text-[#8C6D32] group-hover:text-[#D8B980] transition-colors" />
            <span className="text-[#6C766F] group-hover:text-[#FAF8F5] font-light text-[11px] transition-colors">
              Search rituals...
            </span>
            <kbd className="hidden xl:inline-block bg-white group-hover:bg-[#25372B] text-[9px] text-[#8C6D32] group-hover:text-[#D8B980] px-1.5 py-0.5 rounded font-mono border border-[#EDE7DD] group-hover:border-[#C5A872]/40 transition-colors">
              ⌘K
            </kbd>
          </button>

          {/* User Account (Desktop & Tablet) */}
          <Link
            href="/account"
            className="hidden sm:flex p-2 rounded-full text-forest-900 hover:bg-[#18231C] hover:text-[#D8B980] hover:border-[#C5A872]/40 border border-transparent transition-all shadow-sm active:scale-95"
            aria-label="My Account"
            title="My Account"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="p-1.5 sm:p-2 rounded-full text-forest-900 hover:bg-[#18231C] hover:text-[#D8B980] hover:border-[#C5A872]/40 border border-transparent transition-all shadow-sm relative active:scale-95"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#18231C] text-[#D8B980] border border-[#C5A872]/40 text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Drawer Trigger - Responsive Circle on Mobile, Pill on Tablet/Desktop */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              openCartDrawer();
            }}
            className="flex items-center justify-center gap-1.5 sm:gap-2 bg-[#1C3F26] hover:bg-[#15311E] text-white rounded-full w-8 h-8 xs:w-9 xs:h-9 sm:w-auto sm:h-auto sm:py-1.5 sm:px-3.5 sm:text-xs font-medium shadow-soothe hover:shadow-float active:scale-95 transition-all duration-300 border border-[#C5A872]/30 cursor-pointer shrink-0"
            aria-label="Shopping Cart Bag"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D8C7A3]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#C5A872] text-[#1C3F26] text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline tracking-wide font-medium">
              {cartItemCount > 0 ? `Bag (${cartItemCount})` : "Bag"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
