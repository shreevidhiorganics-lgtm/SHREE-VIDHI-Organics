"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, ShieldCheck, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

interface ProductComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  productsToCompare: Product[];
}

export default function ProductComparisonModal({
  isOpen,
  onClose,
  productsToCompare,
}: ProductComparisonModalProps) {
  const { addItem } = useCartStore();

  if (!isOpen || productsToCompare.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ayurvedic Product Comparison"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Ayurvedic Product Comparison
            </h3>
            <p className="text-xs text-stone-500">Compare verified botanical ingredients and benefits</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
            aria-label="Close Comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-6 overflow-y-auto overflow-x-auto flex-1">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="p-3 text-stone-400 font-medium uppercase tracking-wider text-[10px] w-1/4">
                  Feature
                </th>
                {productsToCompare.map((p) => (
                  <th key={p.id} className="p-3 text-center align-top">
                    <div className="w-20 h-20 mx-auto relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200 mb-2">
                      <Image
                        src={p.images[0]?.url || "/pictures/products/placeholder.png"}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Link
                      href={`/product/${p.slug}`}
                      className="font-semibold text-stone-900 hover:text-emerald-800 line-clamp-1"
                    >
                      {p.name}
                    </Link>
                    <div className="text-emerald-950 font-bold mt-0.5">{formatPrice(p.salePrice)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              <tr>
                <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Primary Category</td>
                {productsToCompare.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    {p.categoryName || "Herbal Care"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Key Ingredients</td>
                {productsToCompare.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    {p.ingredientsList?.map((i) => i.name).slice(0, 3).join(", ") ||
                      p.ingredientsText ||
                      "100% Ayurvedic Herbs"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Core Benefit</td>
                {productsToCompare.map((p) => (
                  <td key={p.id} className="p-3 text-center leading-relaxed">
                    {p.keyBenefits[0] || "Natural revitalization"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Chemical Free</td>
                {productsToCompare.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold text-[11px]">
                      <Check className="w-3.5 h-3.5" /> 100% Pure
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Origin</td>
                {productsToCompare.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    Varanasi, UP
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Action</td>
                {productsToCompare.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    <button
                      onClick={() => {
                        addItem(p);
                        onClose();
                      }}
                      className="bg-emerald-900 hover:bg-emerald-800 text-white font-medium px-3.5 py-1.5 rounded-xl text-xs transition-colors inline-flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
