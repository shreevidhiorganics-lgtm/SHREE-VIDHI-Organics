"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#FAF8F5] px-4 py-20">
      <div className="max-w-md w-full bg-white/90 rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 border border-[#EDE7DD] shadow-[0_12px_40px_-8px_rgba(28,37,30,0.06)] text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#FAF0ED] text-[#A64F35] border border-[#F2D7CE] flex items-center justify-center mx-auto shadow-sm">
          <AlertCircle className="w-7 h-7 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-normal text-[#18231C]">
            Something Encountered A Disturbance
          </h2>
          
          <p className="text-[#6C766F] text-xs sm:text-sm font-light leading-relaxed">
            We encountered an unexpected disturbance in the flow. Please rest assured our herbal sanctuary is intact.
          </p>
        </div>

        {error.digest && (
          <p className="text-[10px] text-[#8C6D32] bg-[#FAF8F5] border border-[#EDE7DD] py-1 px-3 rounded-full font-mono">
            Ref: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1C3F26] text-[#FAF8F5] font-medium text-xs hover:bg-[#16331F] transition-all shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)]"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#D8B980]" />
            <span>Try Again</span>
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#EDE7DD] bg-white/80 text-[#18231C] font-medium text-xs hover:bg-[#FAF8F5] transition-all"
          >
            <Home className="w-3.5 h-3.5 text-[#8C6D32]" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
