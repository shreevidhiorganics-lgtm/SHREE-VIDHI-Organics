# Shree Vidhi Organics 🌿

> **Luxury Ayurvedic E-Commerce Platform**  
> *Government-Funded Social Enterprise & Women Empowerment Initiative based in Varanasi, Uttar Pradesh, India.*

---

## 🏛️ Overview

**Shree Vidhi Organics** is an enterprise-grade e-commerce application crafted with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. It delivers an authentic, luxury Ayurvedic shopping experience celebrating traditional Varanasi herbal formulations, single-origin botanicals, and specialized therapeutic regimens (such as the 2-step Seed Cycling hormone balance protocol).

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 14.2.18 (App Router, Server Components & Dynamic SSR) |
| **Language** | TypeScript 5 (Strict Mode, Zero Any) |
| **Styling** | Tailwind CSS 3.4 with custom Ayurvedic palette (`#18231C`, `#C5A872`, `#FAF8F5`) |
| **State Management** | Zustand (Persistent Cart, Wishlist, QuickView, and Search Modals) |
| **Icons & UI** | Lucide React |
| **Payments** | PayU Live Hosted Checkout & Cash on Delivery (COD) |
| **Catalog** | 29 Authentic Formulations mapped to high-definition 4000×3200 transparent pouch photography and ritual labels |

---

## 📁 Project Directory Structure

```text
SHREE_VIDHI_ORGANICS/
├── public/
│   ├── .well-known/            # Chrome DevTools & PWA metadata
│   └── pictures/               # Centralized, optimized digital asset repository
│       ├── banners/            # Hero carousel & promotional banners
│       ├── blog/               # Editorial journal graphics
│       ├── brand/              # Logos, heritage stamps, and brand photography
│       └── products/           # 29 HD pouch renders, back labels, and benefit infographics
├── src/
│   ├── app/                    # Next.js App Router (40 static & dynamic routes)
│   │   ├── (storefront)/       # Home, /shop, /product/[slug], /cart, /checkout
│   │   ├── account/            # Customer profile & order history
│   │   ├── admin/              # Comprehensive Admin Suite (Orders, Products, Inventory, CMS, Coupons)
│   │   ├── api/                # Next.js Route Handlers (Auth, Orders, PayU payment lifecycle)
│   │   ├── blog/               # Ayurvedic rituals journal & slug routing
│   │   └── track-order/        # Live package tracking with courier partner status
│   ├── components/             # Modular React UI components
│   │   ├── cart/               # CartDrawer slide-over & item management
│   │   ├── common/             # AmbientGlow, ScrollProgressBar, ScrollReveal, SearchModal, ToastContainer
│   │   ├── home/               # HeroBanner, ShopByConcern, SeedCyclingSpotlight, CustomerReviews, FAQ
│   │   ├── layout/             # AnnouncementBar, Header, Footer, MobileMenu
│   │   └── products/           # ProductCard, QuickViewModal, Variant Selectors
│   ├── lib/                    # Core business logic & database layer
│   │   ├── auth/               # Admin session security & JWT verification
│   │   ├── data/               # initial-data.ts (Full 29-product Ayurvedic database)
│   │   ├── db/                 # Thread-safe in-memory DataStore with persistence
│   │   ├── payu.ts             # PayU merchant hash generation & webhook verification
│   │   └── utils.ts            # Formatting helpers & Tailwind class mergers
│   ├── store/                  # Client-side Zustand stores
│   │   ├── cart-store.ts       # Cart state, shipping threshold calculation, promo codes
│   │   ├── ui-store.ts         # Modals, drawers, and mobile navigation state
│   │   └── wishlist-store.ts   # Wishlist state with localStorage persistence
│   └── types/                  # Strict TypeScript domain interfaces
├── next.config.mjs             # Next.js configuration with backward-compatible image rewrites
├── tailwind.config.ts          # Luxury Ayurvedic design system tokens
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 🌿 Product Catalog Highlights

The store features 29 rigorously vetted herbal formulations across 6 core categories:
1. **Hair Care:** Kapur Kachri, Sarva Kesh Blend, Amla Reetha Shikakai, Hibiscus, Reetha, Henna, Methi.
2. **Skin & Face Care:** Natural Ubtan, Multani Mitti Neem Turmeric, Chandan, Aloe Vera Gel & Powder, Neem, Rose, Orange Peel, Kaolin Clay, French Green Clay.
3. **Ubtan & Face Packs:** Authentic Ayurvedic Ubtan recipes handcrafted by Varanasi artisan women.
4. **Wellness & Superfoods:** Seed Cycling 2-Phase Hormone Balance Kit, Pure Sea Buckthorn Pulp, Vedic Blend 15-Herb Tonic, Moringa, Tulsi.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/kumarkartikeysahu-collab/shree-vidhi-organics.git
cd shree-vidhi-organics

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Verification
```bash
# Run TypeScript type check
npm run lint

# Compile optimized production build
npm run build

# Start production server
npm start
```

---

## 📜 License & Compliance

All botanical formulations comply with classical Ayurvedic standards and GMP manufacturing protocols.  
© 2026 Shree Vidhi Organics. Handcrafted in Varanasi, India.
