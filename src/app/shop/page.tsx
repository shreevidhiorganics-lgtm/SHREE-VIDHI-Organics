"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Filter,
  SlidersHorizontal,
  X,
  ChevronDown,
  LayoutGrid,
  List,
  Sparkles,
} from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { categories, products as allProducts } from "@/lib/data/initial-data";
import { formatPrice } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL search params
  const activeCategory = searchParams.get("category") || "all";
  const activeSort = searchParams.get("sort") || "featured";
  const activeSearch = searchParams.get("search") || "";

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategory);
  const [sortBy, setSortBy] = useState<string>(activeSort);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Synchronize category and sort when clicking navbar links (e.g. Hair Rituals, Skin & Face)
  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    setSortBy(activeSort);
  }, [activeSort]);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== "all") {
        if (selectedCategory === "best-sellers") {
          if (!product.isBestseller) return false;
        } else {
          const cat = categories.find((c) => c.slug === selectedCategory);
          if (cat && product.categoryId !== cat.id) return false;
        }
      }

      // Search query
      if (activeSearch) {
        const q = activeSearch.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.shortDesc.toLowerCase().includes(q) ||
          product.ingredientsText?.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Price filter
      if (product.salePrice > maxPrice) return false;

      // In-stock filter
      if (inStockOnly && product.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.salePrice - b.salePrice;
        case "price-desc":
          return b.salePrice - a.salePrice;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "bestselling":
          return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
        default:
          return 0;
      }
    });
  }, [selectedCategory, activeSearch, maxPrice, inStockOnly, sortBy]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`/shop?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setMaxPrice(1000);
    setInStockOnly(false);
    setSortBy("featured");
    router.push("/shop");
  };

  const hasActiveFilters = selectedCategory !== "all" || maxPrice < 1000 || inStockOnly;

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Breadcrumbs & Title */}
        <div className="mb-10 space-y-2.5">
          <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-light">
            <Link href="/" className="hover:text-forest-950 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-forest-950 font-medium">Ayurvedic Apothecary & Shop</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 tracking-tight">
                Authentic Botanical Preparations
              </h1>
              <p className="text-xs sm:text-sm text-forest-900/70 mt-1.5 max-w-2xl leading-relaxed font-light">
                Handcrafted from slow shade-dried herbs in Varanasi. Chemical-free botanical powders, cold-extracted superfruit pulps, and traditional face lepanams.
              </p>
            </div>

            {/* Mobile Filter Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center gap-2 bg-[#18231C] border border-[#C5A872]/40 text-[#FAF8F5] px-4 py-2 rounded-full text-xs font-medium shadow-[0_4px_16px_rgba(24,35,28,0.2)] hover:border-[#C5A872] transition-all"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#D8B980]" />
                <span>Filters {hasActiveFilters && "• Active"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block bg-white p-6 rounded-3xl border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] sticky top-24 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE4]">
              <div className="flex items-center gap-2 font-serif font-bold text-base text-forest-950">
                <div className="w-7 h-7 rounded-full bg-[#18231C] border border-[#C5A872]/40 flex items-center justify-center text-[#D8B980] shadow-sm">
                  <Filter className="w-3.5 h-3.5" />
                </div>
                <span>Apothecary Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-[#C86D51] hover:underline font-medium"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C6D32]">
                Botanical Domain
              </h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`w-full text-left py-2 px-3 rounded-xl transition-all flex items-center justify-between ${
                    selectedCategory === "all"
                      ? "bg-[#1C3F26] text-white font-medium shadow-sm"
                      : "text-forest-900/80 hover:bg-[#FAF8F5]"
                  }`}
                >
                  <span>All Rituals</span>
                  <span className="text-[11px] opacity-75">({allProducts.length})</span>
                </button>

                <button
                  onClick={() => handleCategoryChange("best-sellers")}
                  className={`w-full text-left py-2 px-3 rounded-xl transition-all flex items-center justify-between ${
                    selectedCategory === "best-sellers"
                      ? "bg-[#1C3F26] text-white font-medium shadow-sm"
                      : "text-forest-900/80 hover:bg-[#FAF8F5]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#C5A872]" />
                    <span>Best Sellers</span>
                  </span>
                  <span className="text-[11px] opacity-75">({allProducts.filter((p) => p.isBestseller).length})</span>
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`w-full text-left py-2 px-3 rounded-xl transition-all flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? "bg-[#1C3F26] text-white font-medium shadow-sm"
                        : "text-forest-900/80 hover:bg-[#FAF8F5]"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] opacity-75">
                      ({allProducts.filter((p) => p.categoryId === cat.id).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 pt-4 border-t border-[#F0ECE4]">
              <div className="flex items-center justify-between text-xs font-medium text-forest-950">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Price Ceiling</span>
                <span className="font-semibold">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#1C3F26] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-light">
                <span>₹100</span>
                <span>₹2000+</span>
              </div>
            </div>

            {/* Stock Availability */}
            <div className="pt-4 border-t border-[#F0ECE4]">
              <label className="flex items-center gap-2.5 text-xs text-forest-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-gray-300 text-[#1C3F26] focus:ring-[#1C3F26]"
                />
                <span className="font-light">Ready to dispatch only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3 space-y-6">
            {/* Sorting & Filter summary bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE7DD] shadow-[0_2px_12px_rgba(28,37,30,0.02)] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="font-medium text-forest-900">
                Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "remedy" : "remedies"}
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground font-light">Sort:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-[#FAF8F5] border border-[#E2DBD0] rounded-full px-3.5 py-1.5 text-xs font-medium text-forest-950 focus:outline-none focus:border-[#C5A872] appearance-none pr-8 cursor-pointer"
                    >
                      <option value="featured">Featured First</option>
                      <option value="bestselling">Best Sellers</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">New Arrivals</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-forest-600/70 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center border border-[#C5A872]/30 rounded-full p-0.5 bg-[#18231C] shadow-sm">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-full transition-all ${viewMode === "grid" ? "bg-[#C5A872] text-[#18231C] shadow-[0_0_10px_rgba(197,168,114,0.4)]" : "text-[#A3ADA5] hover:text-[#FAF8F5]"}`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-full transition-all ${viewMode === "list" ? "bg-[#C5A872] text-[#18231C] shadow-[0_0_10px_rgba(197,168,114,0.4)]" : "text-[#A3ADA5] hover:text-[#FAF8F5]"}`}
                    aria-label="List view"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-forest-100 text-forest-900 text-xs px-3 py-1 rounded-full font-semibold">
                    <span>Category: {selectedCategory}</span>
                    <button onClick={() => handleCategoryChange("all")}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {maxPrice < 1000 && (
                  <span className="inline-flex items-center gap-1.5 bg-forest-100 text-forest-900 text-xs px-3 py-1 rounded-full font-semibold">
                    <span>Max: {formatPrice(maxPrice)}</span>
                    <button onClick={() => setMaxPrice(1000)}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1.5 bg-forest-100 text-forest-900 text-xs px-3 py-1 rounded-full font-semibold">
                    <span>In Stock</span>
                    <button onClick={() => setInStockOnly(false)}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-ayur-terracotta hover:underline font-bold ml-1"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Products Listing */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-forest-900/10 space-y-4">
                <p className="font-serif text-xl font-bold text-forest-950">
                  No Ayurvedic remedies match your chosen filters.
                </p>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Try broadening your price range or resetting the filters to explore our full Varanasi catalog.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-forest-900 text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-card"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-over Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 overflow-y-auto z-10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-serif font-bold text-lg text-forest-950">Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Category
              </span>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => {
                    handleCategoryChange("all");
                    setIsMobileFilterOpen(false);
                  }}
                  className="w-full text-left py-2 font-medium"
                >
                  All Products
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      handleCategoryChange(c.slug);
                      setIsMobileFilterOpen(false);
                    }}
                    className="w-full text-left py-2 font-medium"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Max Price */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Max Price: {formatPrice(maxPrice)}
              </span>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#1C3F26]"
              />
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-forest-900 text-white font-bold py-3 rounded-xl text-xs"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] py-20 text-center text-xs text-muted-foreground font-light">Loading rituals...</div>}>
      <ShopContent />
    </React.Suspense>
  );
}
