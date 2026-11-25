"use client";

import React, { useState, useEffect } from "react";
import { Tag, Plus, CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Coupon } from "@/types";
import { useUIStore } from "@/store/ui-store";

export default function AdminCouponsPage() {
  const { addToast } = useUIStore();
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const [newCode, setNewCode] = useState("");
  const [discountType, setDiscountType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState(10);
  const [minCartValue, setMinCartValue] = useState(399);

  useEffect(() => {
    fetch("/api/admin/coupons")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.coupons)) setCoupons(data.coupons);
      })
      .catch(() => addToast("Failed to load coupons.", "error"));
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: newCode.trim().toUpperCase(),
          discountType,
          discountValue: Number(discountValue),
          minCartValue: Number(minCartValue),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        addToast(data.error || "Failed to create coupon.", "error");
        return;
      }

      setCoupons(data.coupons || []);
      setNewCode("");
      addToast(`Coupon ${data.coupon.code} created!`, "success");
    } catch {
      addToast("Network error creating coupon.", "error");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-forest-950">
          Coupon & Promotion Engine
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Create, monitor, and restrict promotional codes and seasonal discounts.
        </p>
      </div>

      {/* Create Coupon Form */}
      <form onSubmit={handleCreateCoupon} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2">
          <Tag className="w-4 h-4 text-forest-700" />
          <span>Create New Coupon Code</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-forest-900 block mb-1">
              Coupon Code *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. VARANASI20"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs uppercase font-mono focus:outline-none focus:border-forest-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-forest-900 block mb-1">
              Discount Type *
            </label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value as any)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-forest-800 cursor-pointer"
            >
              <option value="PERCENTAGE">Percentage (%)</option>
              <option value="FIXED">Flat Amount (₹)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-forest-900 block mb-1">
              Discount Value *
            </label>
            <input
              type="number"
              required
              value={discountValue}
              onChange={(e) => setDiscountValue(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-forest-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-forest-900 block mb-1">
              Min Cart Subtotal (₹) *
            </label>
            <input
              type="number"
              required
              value={minCartValue}
              onChange={(e) => setMinCartValue(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-forest-800"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-forest-900 hover:bg-forest-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-card flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Coupon</span>
          </button>
        </div>
      </form>

      {/* Existing Coupons Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 font-serif font-bold text-base text-forest-950">
          Active Promotional Codes
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-muted-foreground uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 font-semibold">Code</th>
                <th className="py-3 px-4 font-semibold">Discount</th>
                <th className="py-3 px-4 font-semibold">Min Subtotal</th>
                <th className="py-3 px-4 font-semibold">Total Redemptions</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-mono font-bold text-forest-950 text-sm">
                    {c.code}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-forest-900">
                    {c.discountType === "PERCENTAGE" ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">
                    {formatPrice(c.minCartValue)}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-forest-950">
                    {c.usedCount} times
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                      ACTIVE
                    </span>
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
