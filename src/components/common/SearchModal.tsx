"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, Sparkles, ArrowRight, Star, Clock } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { products as initialProducts } from "@/lib/data/initial-data";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

const POPULAR_SEARCHES = [
  "Kapur Kachri",
  "Sea Buckthorn",
  "Wild Turmeric",
  "15-Herb Vedic Blend",
  "Pure Ubtan",
  "Beetroot Powder",
  "Hair Growth",
];

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input and load recent searches on open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
      try {
        const saved = localStorage.getItem("svo_recent_searches");
        if (saved) setRecentSearches(JSON.parse(saved));
      } catch {}
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isSearchOpen]);

  // Global keydown shortcut for ⌘K / Ctrl+K, '/', and 'Escape'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const isSlash = e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA";

      if ((isCmdK || isSlash) && !isSearchOpen) {
        e.preventDefault();
        useUIStore.getState().openSearch();
      } else if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  // Real-time search filter
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const matched = initialProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.categoryName?.toLowerCase().includes(q) ||
        p.ingredientsText?.toLowerCase().includes(q) ||
        p.keyBenefits.some((b) => b.toLowerCase().includes(q))
    );
    setResults(matched);
  }, [query]);

  const saveRecentSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem("svo_recent_searches", JSON.stringify(updated));
    } catch {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    saveRecentSearch(query.trim());
    closeSearch();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectTerm = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md animate-fadeIn"
        onClick={closeSearch}
      />

      {/* Search Dialog Box */}
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl shadow-[0_24px_60px_rgba(28,37,30,0.14)] border border-[#EDE7DD] overflow-hidden z-10 animate-scaleUp">
        {/* Search Header Input */}
        <form onSubmit={handleSubmit} className="relative flex items-center p-4 sm:p-5 border-b border-[#EDE7DD] bg-white">
          <div className="w-8 h-8 rounded-full bg-[#18231C] border border-[#C5A872]/40 flex items-center justify-center text-[#D8B980] ml-1 mr-3 shrink-0 shadow-sm">
            <Search className="w-4 h-4" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search remedies, single-origin herbs, or skin rituals..."
            className="w-full bg-transparent text-base sm:text-lg text-forest-950 placeholder-[#9C9388] font-light focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1.5 rounded-full bg-[#18231C]/10 hover:bg-[#18231C] text-forest-800 hover:text-[#D8B980] border border-transparent hover:border-[#C5A872]/40 transition-all mr-2"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={closeSearch}
            className="text-[10px] font-mono font-medium text-forest-800 px-2 py-1 rounded-md bg-[#F4EFEA] border border-[#E5DFD4]"
          >
            ESC
          </button>
        </form>

        {/* Search Body */}
        <div className="max-h-[60vh] overflow-y-auto p-5 sm:p-6 space-y-6">
          {query.trim() === "" ? (
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C6D32] mb-2.5">
                    <Clock className="w-3 h-3" />
                    <span>Recent Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSelectTerm(term)}
                        className="text-xs bg-white hover:bg-[#F2ECE1] text-forest-900 px-3 py-1.5 rounded-full border border-[#E6E0D4] shadow-sm transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C6D32] mb-2.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Popular Sacred Botanicals</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSelectTerm(term)}
                      className="text-xs bg-white hover:bg-[#F2ECE1] text-forest-900 px-3.5 py-1.5 rounded-full border border-[#E6E0D4] shadow-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <div className="text-[11px] font-medium text-muted-foreground">
                Found {results.length} Ayurvedic {results.length === 1 ? "remedy" : "remedies"}
              </div>

              <div className="divide-y divide-[#EDE7DD]">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={closeSearch}
                    className="py-3 flex items-center justify-between gap-4 group hover:bg-white p-2.5 rounded-2xl transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-14 h-14 rounded-xl bg-[#F7F4EE] overflow-hidden shrink-0 border border-[#EDE7DD]">
                        <Image
                          src={
                            product.images[0]?.url ||
                            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=200&q=80"
                          }
                          alt={product.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-[#55755A] block">
                          {product.categoryName}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-forest-950 group-hover:text-forest-700 transition-colors line-clamp-1">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-forest-900">
                            {formatPrice(product.salePrice)}
                          </span>
                          {product.rating > 0 && (
                            <span className="text-[11px] text-[#8C6D32] font-semibold flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-[#C5A872] text-[#C5A872]" />
                              {product.rating}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[#8C6D32] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-[#EDE7DD]">
                <button
                  onClick={handleSubmit}
                  className="w-full py-2.5 text-center text-xs font-semibold text-forest-900 hover:text-[#8C6D32] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View all results for &quot;{query}&quot;</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-2">
              <p className="font-serif text-base text-forest-950">No Ayurvedic products found for &quot;{query}&quot;</p>
              <p className="text-xs text-muted-foreground font-light">
                Try searching for Kapur Kachri, Sea Buckthorn, Turmeric, or Ubtan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
