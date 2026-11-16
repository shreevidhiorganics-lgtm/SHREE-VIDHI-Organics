import { ProductBundle } from "@/types";
import { products } from "@/lib/data/initial-data";

export const curatedBundles: ProductBundle[] = [
  {
    id: "bundle-hair-ritual",
    slug: "ayurvedic-hair-fall-control-ritual",
    name: "Complete Hair Fall Control Ritual",
    tagline: "Kapur Kachri, Amla & Shikakai traditional scalp therapy",
    description:
      "A classic 3-step Ayurvedic haircare system to deeply cleanse, stimulate follicles, and restore shine without sulfates.",
    items: [
      { productId: "prod-kapur-kachri", productName: "Kapur Kachri Scalp Powder", quantity: 1 },
      { productId: "prod-amla", productName: "Organic Amla Powder", quantity: 1 },
      { productId: "prod-shikakai", productName: "Shikakai Natural Cleanser", quantity: 1 },
    ],
    mrpTotal: 799,
    bundlePrice: 599,
    savingsPercentage: 25,
    image: "/pictures/products/kapur-kachri.png",
    isPopular: true,
  },
  {
    id: "bundle-bridal-glow",
    slug: "royal-varanasi-bridal-glow-kit",
    name: "Royal Varanasi Bridal Glow Ubtan Kit",
    tagline: "Natural Ubtan, Pure Chandan Sandalwood & Wild Kasturi Turmeric",
    description:
      "Handcrafted according to royal Varanasi wedding rituals to diminish sun tan, smooth skin texture, and impart a radiant glow.",
    items: [
      { productId: "prod-natural-ubtan", productName: "Natural Ayurvedic Ubtan", quantity: 1 },
      { productId: "prod-chandan", productName: "Pure Chandan Sandalwood Powder", quantity: 1 },
      { productId: "prod-wild-turmeric", productName: "Wild Kasturi Turmeric Powder", quantity: 1 },
    ],
    mrpTotal: 999,
    bundlePrice: 749,
    savingsPercentage: 25,
    image: "/pictures/products/natural-ubtan.png",
    isPopular: true,
  },
  {
    id: "bundle-detox-glow",
    slug: "botanical-detox-face-pack-trio",
    name: "Botanical Detox & Pore Purifying Trio",
    tagline: "Neem Powder, Multani Mitti & Beetroot Powder",
    description:
      "Purify oily or acne-prone skin with pure clay and antibacterial neem, followed by pink beetroot antioxidant hydration.",
    items: [
      { productId: "prod-neem", productName: "Pure Organic Neem Powder", quantity: 1 },
      { productId: "prod-multani-mitti", productName: "Natural Multani Mitti Clay", quantity: 1 },
      { productId: "prod-beetroot", productName: "Sun-Dried Beetroot Powder", quantity: 1 },
    ],
    mrpTotal: 699,
    bundlePrice: 529,
    savingsPercentage: 24,
    image: "/pictures/products/beetroot-powder.png",
    isPopular: false,
  },
];

export function getCuratedBundles(): ProductBundle[] {
  return curatedBundles;
}

export function getBundleBySlug(slug: string): ProductBundle | undefined {
  return curatedBundles.find((b) => b.slug === slug);
}
