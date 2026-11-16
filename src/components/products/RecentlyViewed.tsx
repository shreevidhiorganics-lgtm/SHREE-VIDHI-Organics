"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { products } from "@/lib/data/initial-data";
import { Product } from "@/types";

interface RecentlyViewedProps {
  currentProductId?: string;
}

export default function RecentlyViewed({ currentProductId }: RecentlyViewedProps) {
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("svo_recently_viewed");
      if (stored) {
        const slugs: string[] = JSON.parse(stored);
        const matched = slugs
          .filter((slug) => slug !== currentProductId)
          .map((slug) => products.find((p) => p.slug === slug || p.id === slug))
          .filter(Boolean) as Product[];

        setViewedProducts(matched.slice(0, 4));
      }
    } catch {}
  }, [currentProductId]);

  if (viewedProducts.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-stone-200">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-emerald-800" />
        <h3 className="text-base font-semibold text-stone-900">Recently Viewed by You</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {viewedProducts.map((prod) => (
          <Link
            key={prod.id}
            href={`/product/${prod.slug}`}
            className="group bg-white p-3 rounded-2xl border border-stone-200 hover:border-emerald-600/50 hover:shadow-md transition-all flex flex-col"
          >
            <div className="aspect-square relative rounded-xl overflow-hidden bg-stone-50 border border-stone-100 mb-2.5">
              <Image
                src={prod.images[0]?.url || "/pictures/products/placeholder.png"}
                alt={prod.name}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="text-xs font-medium text-stone-900 group-hover:text-emerald-800 line-clamp-1">
              {prod.name}
            </h4>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs font-bold text-emerald-950">{formatPrice(prod.salePrice)}</span>
              {prod.mrp > prod.salePrice && (
                <span className="text-[10px] text-stone-400 line-through">{formatPrice(prod.mrp)}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
