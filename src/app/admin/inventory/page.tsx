"use client";

import React, { useState } from "react";
import { Layers, AlertTriangle, CheckCircle2, Plus, Minus, Save } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { formatPrice } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

export default function AdminInventoryPage() {
  const { addToast } = useUIStore();
  const [products, setProducts] = useState(dataStore.getProducts());

  const handleUpdateStock = (productId: string, newStock: number) => {
    if (newStock < 0) return;
    dataStore.updateProduct(productId, { stock: newStock });
    setProducts([...dataStore.getProducts()]);
    addToast("Stock level updated successfully.", "success");
  };

  const lowStockCount = products.filter((p) => p.stock <= (p.lowStockAlert || 10)).length;

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-forest-950">
            Apothecary Inventory Control
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitor raw herbs, packaged pouches, and automated low-stock warnings.
          </p>
        </div>

        {lowStockCount > 0 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-2 text-xs text-amber-800 font-semibold">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{lowStockCount} preparations are running low on stock!</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-muted-foreground uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4 font-semibold">SKU</th>
                <th className="py-3.5 px-4 font-semibold">Product Name</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Current Stock</th>
                <th className="py-3.5 px-4 font-semibold">Threshold Alert</th>
                <th className="py-3.5 px-4 font-semibold text-right">Adjust Inventory</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => {
                const isLow = p.stock <= (p.lowStockAlert || 10);

                return (
                  <tr key={p.id} className="hover:bg-gray-50/50">
                    <td className="py-3.5 px-4 font-mono font-bold text-forest-950">
                      {p.sku}
                    </td>
                    <td className="py-3.5 px-4 font-serif font-bold text-forest-950">
                      {p.name}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {p.categoryName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-bold px-2.5 py-1 rounded-full text-xs ${
                          isLow
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      Alert at ≤ {p.lowStockAlert || 10} units
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleUpdateStock(p.id, p.stock - 5)}
                          className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-forest-900 font-bold"
                          title="Reduce by 5"
                        >
                          -5
                        </button>
                        <button
                          onClick={() => handleUpdateStock(p.id, p.stock + 10)}
                          className="p-1 rounded bg-forest-100 hover:bg-forest-200 text-forest-900 font-bold"
                          title="Restock +10"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => handleUpdateStock(p.id, p.stock + 50)}
                          className="py-1 px-2 rounded bg-forest-900 text-white font-bold text-[10px] hover:bg-forest-800"
                          title="Restock batch +50"
                        >
                          +50 Batch
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
