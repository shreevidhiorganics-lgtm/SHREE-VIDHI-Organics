"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, CheckCircle2, Trash2 } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { formatDate } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

export default function AdminReviewsPage() {
  const { addToast } = useUIStore();
  const [reviews, setReviews] = useState(dataStore.getAllReviews());

  const handleToggleApproval = (id: string) => {
    const rev = reviews.find((r) => r.id === id);
    if (rev) {
      rev.isApproved = !rev.isApproved;
      setReviews([...reviews]);
      addToast(
        rev.isApproved ? "Review published." : "Review hidden from public storefront.",
        "info"
      );
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-forest-950">
          Customer Review Moderation
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Moderate verified buyer feedback, ratings, and testimonials.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < r.rating ? "fill-gold-500 text-gold-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <h3 className="font-serif font-bold text-base text-forest-950">
                  {r.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {r.isVerifiedPurchase && (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Verified Purchase</span>
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  {formatDate(r.createdAt)}
                </span>
              </div>
            </div>

            <p className="text-xs text-forest-800/90 leading-relaxed font-normal">
              &quot;{r.comment}&quot;
            </p>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-muted-foreground">Customer: </span>
                <strong className="text-forest-950">{r.userName}</strong>
                <span className="text-muted-foreground ml-3">Product: </span>
                <span className="font-semibold text-forest-900">{r.productName}</span>
              </div>

              <button
                onClick={() => handleToggleApproval(r.id)}
                className={`text-xs font-bold px-3 py-1 rounded-lg transition-colors ${
                  r.isApproved
                    ? "bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {r.isApproved ? "Approved (Live)" : "Pending Approval"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
