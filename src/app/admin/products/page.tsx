"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, Star, Package } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { formatPrice } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

export default function AdminProductsPage() {
  const { addToast } = useUIStore();
  const [products, setProducts] = useState(dataStore.getProducts());
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      dataStore.deleteProduct(id);
      setProducts(dataStore.getProducts());
      addToast(`Deleted ${name}`, "info");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-forest-950">
            Apothecary Product Catalog
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your organic and Ayurvedic preparations, prices, stock levels, and badges.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-forest-800"
          />
        </div>

        <span className="text-xs text-muted-foreground font-semibold">
          Total: {filtered.length} products
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-muted-foreground uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 font-semibold">Product</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Price / MRP</th>
                <th className="py-3 px-4 font-semibold">Stock</th>
                <th className="py-3 px-4 font-semibold">Rating</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-ayur-cream relative overflow-hidden shrink-0 border border-gray-200">
                        <img src={p.images[0]?.url} alt="" className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <span className="font-bold text-forest-950 block">{p.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {p.sku} {p.isBestseller && "• Bestseller"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{p.categoryName}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-forest-900">{formatPrice(p.salePrice)}</span>
                    <span className="text-muted-foreground text-[10px] line-through block">
                      {formatPrice(p.mrp)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                        p.stock <= 10
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {p.stock} units
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 font-semibold text-gold-600">
                      <Star className="w-3 h-3 fill-gold-500" />
                      <span>{p.rating}</span>
                      <span className="text-muted-foreground text-[10px]">({p.reviewCount})</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/product/${p.slug}`}
                        target="_blank"
                        className="p-1.5 text-gray-400 hover:text-forest-900"
                        title="View Live PDP"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 text-gray-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
