"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { categories } from "@/lib/data/initial-data";
import { useUIStore } from "@/store/ui-store";
import { slugify } from "@/lib/utils";

export default function CreateProductPage() {
  const router = useRouter();
  const { addToast } = useUIStore();

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "cat-hair",
    shortDesc: "",
    description: "",
    ingredientsText: "",
    howToUse: "",
    mrp: 399,
    salePrice: 199,
    stock: 50,
    isFeatured: false,
    isBestseller: false,
    isNewArrival: true,
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const selectedCategory = categories.find((c) => c.id === formData.categoryId);

    const newProd = dataStore.createProduct({
      name: formData.name,
      slug: slugify(formData.name),
      categoryId: formData.categoryId,
      categoryName: selectedCategory?.name || "Herbal Powders",
      shortDesc: formData.shortDesc,
      description: formData.description,
      ingredientsText: formData.ingredientsText,
      howToUse: formData.howToUse,
      mrp: Number(formData.mrp),
      salePrice: Number(formData.salePrice),
      stock: Number(formData.stock),
      isFeatured: formData.isFeatured,
      isBestseller: formData.isBestseller,
      isNewArrival: formData.isNewArrival,
      images: [
        {
          id: `img-${Date.now()}`,
          url: formData.imageUrl,
          alt: formData.name,
          isPrimary: true,
        },
      ],
      keyBenefits: [
        "100% pure Ayurvedic single botanical formulation",
        "Free from synthetic chemicals and artificial perfumes",
        "Sustainably harvested and processed in Varanasi",
      ],
    });

    addToast(`Successfully created ${newProd.name}!`, "success");
    router.push("/admin/products");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/products"
          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-forest-950"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-serif text-2xl font-bold text-forest-950">
            Create New Ayurvedic Product
          </h1>
          <p className="text-xs text-muted-foreground">
            Add a new preparation to your live customer-facing apothecary.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-forest-900 block mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Shree Vidhi Organic Hibiscus Powder"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-forest-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-forest-900 block mb-1">
              Category *
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-forest-800 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-forest-900 block mb-1">
              Image URL *
            </label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-forest-800 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-forest-900 block mb-1">
              MRP (₹) *
            </label>
            <input
              type="number"
              required
              value={formData.mrp}
              onChange={(e) => setFormData({ ...formData, mrp: Number(e.target.value) })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-forest-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-forest-900 block mb-1">
              Sale Price (₹) *
            </label>
            <input
              type="number"
              required
              value={formData.salePrice}
              onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-forest-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-forest-900 block mb-1">
              Initial Stock Units *
            </label>
            <input
              type="number"
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-forest-800"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-forest-900 block mb-1">
            Short Description *
          </label>
          <textarea
            required
            rows={2}
            placeholder="Brief summary displayed on product cards..."
            value={formData.shortDesc}
            onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-800"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-forest-900 block mb-1">
            Ingredients Text
          </label>
          <input
            type="text"
            placeholder="e.g. 100% Pure Organic Dried Herb"
            value={formData.ingredientsText}
            onChange={(e) => setFormData({ ...formData, ingredientsText: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-forest-800"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-forest-900 block mb-1">
            How to Use (Application Ritual)
          </label>
          <textarea
            rows={3}
            placeholder="Step by step preparation and usage instructions..."
            value={formData.howToUse}
            onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-800"
          />
        </div>

        {/* Badges Toggles */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-forest-900 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isBestseller}
              onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
              className="rounded text-forest-900"
            />
            <span>Mark as Bestseller</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-forest-900 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded text-forest-900"
            />
            <span>Showcase in Featured Section</span>
          </label>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
          <Link
            href="/admin/products"
            className="py-2.5 px-5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-forest-900 hover:bg-forest-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-card flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Publish Product</span>
          </button>
        </div>
      </form>
    </div>
  );
}
