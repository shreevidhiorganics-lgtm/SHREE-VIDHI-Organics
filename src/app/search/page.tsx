"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { products } from "@/lib/data/initial-data";
import { ProductCard } from "@/components/products/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const query = q.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.shortDesc.toLowerCase().includes(query) ||
        p.categoryName?.toLowerCase().includes(query) ||
        p.ingredientsText?.toLowerCase().includes(query) ||
        p.keyBenefits.some((b) => b.toLowerCase().includes(query))
    );
  }, [q]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 space-y-3">
          <div className="text-xs text-[#6C766F] flex items-center gap-2 font-light">
            <Link href="/" className="hover:text-[#18231C]">Home</Link>
            <span>/</span>
            <span className="text-[#18231C] font-normal">Search Results</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#18231C]">
            {q ? (
              <>
                Search Results for &quot;<span className="italic text-[#8C6D32]">{q}</span>&quot;
              </>
            ) : (
              "Search Shree Vidhi Apothecary"
            )}
          </h1>
          <p className="text-xs sm:text-sm text-[#4A544E] font-light">
            {results.length} {results.length === 1 ? "botanical preparation" : "botanical preparations"} matched your inquiry.
          </p>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white/90 rounded-3xl p-12 text-center border border-[#EDE7DD] space-y-5 max-w-lg mx-auto shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)]">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#EDE7DD] flex items-center justify-center text-[#8C6D32] mx-auto">
              <Search className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl font-normal text-[#18231C]">
              No Exact Matches Found
            </h2>
            <p className="text-xs sm:text-sm text-[#6C766F] leading-relaxed font-light">
              We couldn&apos;t find an Ayurvedic formulation matching &quot;{q}&quot;. Explore our main apothecary categories to find corresponding botanical preparations.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium text-xs sm:text-sm py-3.5 px-8 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] transition-all"
              >
                <span>Browse Entire Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] py-20 text-center text-xs text-muted-foreground font-light">Searching catalog...</div>}>
      <SearchContent />
    </React.Suspense>
  );
}
