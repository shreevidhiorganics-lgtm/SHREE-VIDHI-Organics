import React from "react";
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FAF8F5] px-4 py-20">
      <div className="relative mb-6">
        <div className="w-14 h-14 rounded-full border-2 border-[#EDE7DD] border-t-[#1C3F26] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-[#8C6D32]">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
      </div>
      
      <p className="font-serif text-lg font-normal text-[#18231C] tracking-wide animate-pulse">
        Blending Sacred Botanicals...
      </p>
      <p className="text-xs text-[#6C766F] font-light mt-1">
        Preparing your serene Ayurvedic ritual
      </p>
    </div>
  );
}
