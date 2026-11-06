import Link from "next/link";
import { Leaf, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#FAF8F5] flex items-center justify-center py-20 px-4">
      <div className="bg-white/90 p-8 sm:p-14 rounded-3xl sm:rounded-[2.5rem] border border-[#EDE7DD] shadow-[0_12px_40px_-8px_rgba(28,37,30,0.06)] text-center max-w-md space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#EBF1EB] border border-[#D5E3D5] flex items-center justify-center text-[#2D5A38] mx-auto">
          <Leaf className="w-7 h-7 stroke-[1.5]" />
        </div>

        <div className="space-y-2.5">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8C6D32] block">
            404 • Pathway Not Found
          </span>
          <h1 className="font-serif text-3xl font-normal text-[#18231C]">
            Sacred Remedy Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light">
            The formulation or pathway you are seeking may have been renamed or returned to nature.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium text-xs py-3.5 px-6 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] transition-all"
          >
            <Home className="w-4 h-4 text-[#D8B980]" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/shop"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-white/80 hover:bg-[#FAF8F5] border border-[#EDE7DD] text-[#18231C] font-medium text-xs py-3.5 px-6 rounded-full transition-all"
          >
            <span>Explore Shop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
