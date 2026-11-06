import type { Metadata } from "next";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/common/SearchModal";
import { QuickViewModal } from "@/components/products/QuickViewModal";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ToastContainer } from "@/components/common/ToastContainer";
import { ScrollProgressBar } from "@/components/common/ScrollProgressBar";
import { AmbientGlow } from "@/components/common/AmbientGlow";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://shreevidhiorganics.com"),
  title: {
    default: "Shree Vidhi Organics | Pure Ayurvedic Rituals, Hair Care & Skincare",
    template: "%s | Shree Vidhi Organics",
  },
  description:
    "Handcrafted in Varanasi, India. Discover 100% pure Ayurvedic Kapur Kachri powder, Himalayan Sea Buckthorn pulp, 15-Herb Vedic face packs, and organic herbal powders. Free from synthetic chemicals.",
  keywords: [
    "Shree Vidhi Organics",
    "Ayurvedic hair care",
    "Kapur Kachri powder",
    "Sea Buckthorn pulp",
    "Vedic blend face pack",
    "Varanasi Ayurveda",
    "Herbal skincare",
    "Wild Kasturi turmeric",
    "Organic hair growth",
  ],
  authors: [{ name: "Shree Vidhi Organics" }],
  creator: "Shree Vidhi Organics",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shreevidhiorganics.com",
    title: "Shree Vidhi Organics | Pure Ayurvedic Rituals from Varanasi",
    description: "Time-tested organic and Ayurvedic skincare, haircare, and wellness preparations handcrafted in small batches.",
    siteName: "Shree Vidhi Organics",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Shree Vidhi Organics Sacred Ayurvedic Preparations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Vidhi Organics | Ancient Wisdom. Modern Wellness.",
    description: "Pure Ayurvedic haircare, skincare, and superfoods from Varanasi.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shree Vidhi Organics",
    url: "https://shreevidhiorganics.com",
    logo: "/shreevidhi_logo.avif",
    founder: {
      "@type": "Person",
      name: "Aditi Singh",
    },
    description: "Government-funded social enterprise in Varanasi founded by Aditi Singh. Authentic certified Ayurvedic Vidhi rituals, hair care, skincare, and seed cycling.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-6393600430",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "N15/170 A Badi Gaibi Chauraha Birdopur",
      addressLocality: "Varanasi",
      addressRegion: "Uttar Pradesh",
      postalCode: "221010",
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF8F5] text-[#18231C] antialiased selection:bg-[#7D9980]/20">
        <ScrollProgressBar />
        <AmbientGlow />
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Global Modals & Notifications */}
        <CartDrawer />
        <SearchModal />
        <QuickViewModal />
        <MobileMenu />
        <ToastContainer />
      </body>
    </html>
  );
}
