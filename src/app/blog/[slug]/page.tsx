import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, Calendar, ArrowLeft, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { blogs, products } from "@/lib/data/initial-data";
import { ProductCard } from "@/components/products/ProductCard";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) notFound();

  const relatedProducts = products.slice(0, 3);

  return (
    <article className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-12">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-normal text-[#6C766F] hover:text-[#18231C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Ayurvedic Journal</span>
        </Link>

        {/* Title & Metadata */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#2D5A38] bg-[#EBF1EB] px-3.5 py-1 rounded-full border border-[#D5E3D5]">
              {blog.category}
            </span>
            <span className="text-xs text-[#6C766F] flex items-center gap-1.5 font-light">
              <Clock className="w-3.5 h-3.5 text-[#8C6D32]" />
              {blog.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#18231C] tracking-tight leading-[1.2]">
            {blog.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-[#18231C] pt-2">
            <div className="w-9 h-9 rounded-full bg-[#18231C] text-[#D8B980] flex items-center justify-center font-serif text-xs">
              SV
            </div>
            <div>
              <span className="font-medium block">{blog.author}</span>
              <span className="text-[#6C766F] font-light text-[11px]">Varanasi Ayurvedic Practitioner</span>
            </div>
          </div>
        </div>

        {/* Hero Image Frame */}
        <div className="relative aspect-[16/9] rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-[#EDE7DD] shadow-[0_12px_40px_-8px_rgba(28,37,30,0.06)]">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white/90 p-8 sm:p-14 rounded-3xl sm:rounded-[2.5rem] border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-8 text-sm sm:text-base text-[#3D463F] leading-relaxed font-light">
          <div className="whitespace-pre-line space-y-5 leading-loose">
            {blog.content}
          </div>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="pt-8 border-t border-[#F0ECE4] flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8C6D32] mr-2">
                Botanical Tags:
              </span>
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#FAF8F5] border border-[#EDE7DD] text-[#4A544E] text-xs px-3.5 py-1 rounded-full font-light"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Related Formulations */}
        <div className="space-y-6 pt-8">
          <div className="space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8C6D32] block">
              Sacred Formulations
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#18231C]">
              Related Ayurvedic Preparations
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
