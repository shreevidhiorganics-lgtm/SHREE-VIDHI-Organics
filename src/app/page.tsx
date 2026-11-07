import React from "react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { QuickTrustBar } from "@/components/home/QuickTrustBar";
import { ShopByConcern } from "@/components/home/ShopByConcern";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { BrandRangeSection } from "@/components/home/BrandRangeSection";
import { CategoryCards } from "@/components/home/CategoryCards";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { OurVisionSection } from "@/components/home/OurVisionSection";
import { OurBlogsSection } from "@/components/home/OurBlogsSection";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { dataStore } from "@/lib/db/data-store";

export const revalidate = 60; // ISR cache revalidation

export default function HomePage() {
  const allProducts = dataStore.getProducts();

  return (
    <div className="flex flex-col">
      {/* 1. Catchy & Minimalist Hero Carousel */}
      <HeroBanner />

      {/* 2. Quick Trust Bar (Free Delivery, 100% Pure, Certified Safe, Varanasi Heritage) */}
      <QuickTrustBar />

      {/* 3. Interactive Shop by Concern (PCOS, Tan & Glow, Hair Fall, Acne) */}
      <ShopByConcern />

      {/* 4. Complete Ayurvedic Collection & Best Sellers */}
      <FeaturedSection
        eyebrow="AUTHENTIC VARANASI HERBS"
        title="Our Ayurvedic Collection"
        description="Pure, chemical-free everyday care loved by thousands across India. Handcrafted in Varanasi with 100% natural herbs."
        products={allProducts}
        viewAllHref="/shop"
        viewAllText="Explore All 28 Products"
        bgColor="white"
        limit={12}
      />

      {/* 5. Why Choose Us / Brand Value Proposition */}
      <BrandRangeSection />

      {/* 7. Shop by Category (Face Care, Hair Care, Hormone Health) */}
      <CategoryCards />

      {/* 8. Real Customer Reviews & Verified Social Proof */}
      <CustomerReviews />

      {/* 9. Founder Story & Varanasi Women Empowerment */}
      <OurVisionSection />

      {/* 10. Ayurvedic Rituals & Knowledge Journal */}
      <OurBlogsSection />

      {/* 11. Frequently Asked Questions Accordion */}
      <HomeFAQ />
    </div>
  );
}
