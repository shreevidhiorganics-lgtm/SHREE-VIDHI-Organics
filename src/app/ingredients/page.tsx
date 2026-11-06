import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Leaf, ArrowRight } from "lucide-react";
import { ingredients, products } from "@/lib/data/initial-data";

export const metadata = {
  title: "Vedic Herb Library & Materia Medica | Shree Vidhi Organics",
  description: "Explore the sacred Ayurvedic herbs, roots, superfruits, and clays powering Shree Vidhi Organics formulations. Sanskrit names, botanical profiles, and traditional usage.",
};

export default function IngredientsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-4 py-1.5 rounded-full border border-[#C5A872]/40 shadow-[0_4px_16px_-2px_rgba(24,35,28,0.2),0_0_12px_rgba(197,168,114,0.12)]">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B980]" />
            <span>Sacred Materia Medica</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#18231C] tracking-tight">
            Botanical Archive & Herb Library
          </h1>
          <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light max-w-2xl mx-auto">
            Transparency is our highest virtue. Explore the botanical taxons, classical Sanskrit origins, and therapeutic actions of the living plants harvested for our Varanasi formulations.
          </p>
        </div>

        {/* Detailed Grid of Ingredients */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {ingredients.map((herb) => {
            const relatedProducts = products.filter(
              (p) =>
                p.name.toLowerCase().includes(herb.name.toLowerCase()) ||
                p.ingredientsText?.toLowerCase().includes(herb.name.toLowerCase())
            );

            return (
              <div
                key={herb.id}
                className="bg-white/90 rounded-3xl p-6 sm:p-8 border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] flex flex-col justify-between space-y-6 hover:shadow-[0_12px_36px_-6px_rgba(28,37,30,0.06)] hover:border-[#DED5C7] transition-all duration-300"
              >
                <div className="space-y-5">
                  {/* Herb Image & Sanskrit Tag */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F5F1EB] border border-[#EDE7DD]">
                    <Image
                      src={herb.image}
                      alt={herb.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {herb.sanskritName && (
                      <div className="absolute top-3 left-3 bg-[#18231C]/90 text-[#D8B980] text-[10px] font-medium px-3.5 py-1 rounded-full uppercase backdrop-blur-md border border-[#C5A872]/20 shadow-sm">
                        Sanskrit: {herb.sanskritName}
                      </div>
                    )}
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-normal text-[#18231C]">
                      {herb.name}
                    </h2>
                    {herb.botanicalName && (
                      <span className="text-xs text-[#7D9980] italic block font-serif mt-0.5">
                        Botanical Taxon: {herb.botanicalName}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light">
                    {herb.fullDesc || herb.shortDesc}
                  </p>

                  {/* Traditional Benefits Checklist */}
                  <div className="space-y-2.5 pt-3 border-t border-[#F0ECE4]">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8C6D32] block">
                      Documented Ayurvedic Actions:
                    </span>
                    <ul className="space-y-2 text-xs text-[#2F3832]">
                      {herb.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Leaf className="w-3.5 h-3.5 text-[#7D9980] shrink-0 mt-0.5" />
                          <span className="font-light">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Traditional Use Section */}
                  {herb.traditionalUse && (
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DD] text-xs text-[#4A544E] font-light leading-relaxed">
                      <strong className="font-medium text-[#18231C]">Classical Ritual Use:</strong> {herb.traditionalUse}
                    </div>
                  )}
                </div>

                {/* Formulations containing this herb */}
                {relatedProducts.length > 0 && (
                  <div className="pt-4 border-t border-[#F0ECE4] space-y-2.5">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8C6D32] block">
                      Found in Sacred Formulations:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {relatedProducts.map((p) => (
                        <Link
                          key={p.id}
                          href={`/product/${p.slug}`}
                          className="inline-flex items-center gap-1.5 bg-[#FAF8F5] hover:bg-[#F0ECE4] text-[#18231C] font-normal text-xs py-1.5 px-3.5 rounded-full border border-[#EDE7DD] transition-all hover:border-[#DED5C7]"
                        >
                          <span>{p.name.split("|")[0].trim()}</span>
                          <ArrowRight className="w-3 h-3 text-[#7D9980]" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
