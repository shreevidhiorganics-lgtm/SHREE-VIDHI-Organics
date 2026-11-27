import React from "react";
import { HeroBanner } from "@/components/home/HeroBanner";

import { SeaBuckthornSpotlight } from "@/components/home/SeaBuckthornSpotlight";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { ShopByConcern } from "@/components/home/ShopByConcern";
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
  const seaBuckthornProduct = allProducts.find(
    (p) => p.id === "prod-seabuckthorn-pulp" || p.slug?.includes("sea-buckthorn")
  );

  return (
    <div className="flex flex-col">
      {/* 1. Catchy & Minimalist Hero Section with Fixed Background */}
      <HeroBanner />

      {/* 2. Quick Trust Bar */}




      {/* 4. Complete Catalog: All Ayurvedic Products Listed */}
      <FeaturedSection
        eyebrow="AUTHENTIC VARANASI HERBS"
        title="Our Ayurvedic Collection"
        description="Pure, chemical-free everyday care loved by thousands across India. Handcrafted in Varanasi with 100% natural herbs."
        products={allProducts}
        viewAllHref="/shop"
        viewAllText="Explore All 28 Products"
        bgColor="white"
        limit={allProducts.length}
      />

      {/* 3. Individual Display / Spotlight of Sea Buckthorn Pulp */}
      <SeaBuckthornSpotlight product={seaBuckthornProduct} />

      {/* 5. Interactive Shop by Concern */}
      <ShopByConcern />

      {/* 6. Why Choose Us / Brand Value Proposition */}
      <BrandRangeSection />

      {/* 7. Shop by Category */}
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
