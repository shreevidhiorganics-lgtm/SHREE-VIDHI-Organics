"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useUIStore } from "@/store/ui-store";

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-[0_12px_36px_-6px_rgba(24,35,28,0.25)] backdrop-blur-xl flex items-start gap-3 border transition-all animate-slideInRight ${
              isSuccess
                ? "bg-[#18231C]/95 text-[#FAF8F5] border-[#2D3E32]"
                : isError
                ? "bg-[#FAF0ED] text-[#A64F35] border-[#F2D7CE]"
                : "bg-white/95 text-[#18231C] border-[#EDE7DD]"
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-[#D8B980] shrink-0 mt-0.5" />
            ) : isError ? (
              <AlertCircle className="w-4 h-4 text-[#A64F35] shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 text-[#8C6D32] shrink-0 mt-0.5" />
            )}

            <div className="flex-1 text-xs leading-relaxed font-normal">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-full text-white/50 hover:text-white transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
