import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { blogs } from "@/lib/data/initial-data";

export const metadata = {
  title: "The Ayurvedic Journal & Botanical Guides | Shree Vidhi Organics",
  description: "Read time-honored Ayurvedic articles, hair care ritual guides, and botanical herbal wellness insights from Shree Vidhi Organics.",
};

export default function BlogListingPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-4 py-1.5 rounded-full border border-[#C5A872]/40 shadow-[0_4px_16px_-2px_rgba(24,35,28,0.2),0_0_12px_rgba(197,168,114,0.12)]">
            <BookOpen className="w-3.5 h-3.5 text-[#D8B980]" />
            <span>The Ayurvedic Journal</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#18231C] tracking-tight">
            Ancient Wisdom for Mindful Living
          </h1>
          <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light max-w-2xl mx-auto">
            Immerse yourself in botanical education, doshic balance guides, and classical Indian beauty traditions curated by our Varanasi practitioners.
          </p>
        </div>

        {/* Featured Hero Article */}
        {blogs[0] && (
          <div className="bg-white/90 rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] hover:shadow-[0_12px_36px_-6px_rgba(28,37,30,0.06)] hover:border-[#DED5C7] transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative aspect-[16/10] lg:h-full w-full bg-[#FAF8F5]">
              <Image
                src={blogs[0].coverImage}
                alt={blogs[0].title}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="p-8 sm:p-12 space-y-5">
              <div className="flex items-center gap-3 text-xs">
                <span className="bg-[#EBF1EB] text-[#2D5A38] font-medium px-3 py-0.5 rounded-full uppercase tracking-wider text-[10px] border border-[#D5E3D5]">
                  {blogs[0].category}
                </span>
                <span className="text-[#6C766F] flex items-center gap-1.5 font-light text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#8C6D32]" />
                  {blogs[0].readTime}
                </span>
              </div>

              <Link href={`/blog/${blogs[0].slug}`}>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#18231C] hover:text-[#8C6D32] transition-colors leading-snug">
                  {blogs[0].title}
                </h2>
              </Link>

              <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light line-clamp-3">
                {blogs[0].excerpt}
              </p>

              <div className="pt-3 flex items-center justify-between border-t border-[#F0ECE4]">
                <div className="flex items-center gap-2.5 text-xs text-[#18231C]">
                  <div className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#EDE7DD] flex items-center justify-center text-[#8C6D32]">
                    <User className="w-3 h-3" />
                  </div>
                  <span className="font-light">{blogs[0].author}</span>
                </div>

                <Link
                  href={`/blog/${blogs[0].slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C3F26] hover:text-[#8C6D32] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(1).map((blog) => (
            <article
              key={blog.id}
              className="bg-white/90 rounded-3xl overflow-hidden border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] hover:shadow-[0_12px_36px_-6px_rgba(28,37,30,0.06)] hover:border-[#DED5C7] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-[#FAF8F5]">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#18231C]/90 text-[#D8B980] text-[10px] font-medium px-3 py-0.5 rounded-full uppercase backdrop-blur-md border border-[#C5A872]/20 shadow-sm">
                  {blog.category}
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-[#6C766F] font-light">
                    <Clock className="w-3 h-3 text-[#8C6D32]" />
                    <span>{blog.readTime}</span>
                    <span>•</span>
                    <span>{blog.author}</span>
                  </div>

                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className="font-serif font-normal text-lg text-[#18231C] hover:text-[#8C6D32] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#4A544E] leading-relaxed font-light line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0ECE4]">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C3F26] hover:text-[#8C6D32] transition-colors"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
