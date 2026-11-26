export type UserRole = "USER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
  address?: Address;
}

export interface Address {
  id: string;
  userId?: string;
  fullName: string;
  phone: string;
  houseFlat: string;
  street: string;
  landmark?: string;
  city: string;
  district?: string;
  state: string;
  pinCode: string;
  isDefault?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isFeatured?: boolean;
  productCount?: number;
}

export interface Ingredient {
  id: string;
  name: string;
  sanskritName?: string;
  botanicalName?: string;
  shortDesc: string;
  fullDesc?: string;
  benefits: string[];
  traditionalUse?: string;
  image: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  title: string;
  sku?: string;
  size: string;
  mrp: number;
  price: number;
  stock: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
  displayOrder?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  categoryName?: string;
  shortDesc: string;
  description: string;
  keyBenefits: string[];
  ingredientsText?: string;
  ingredientsList?: Ingredient[];
  howToUse: string;
  whoItIsFor?: string;
  storageInfo?: string;
  shippingInfo?: string;
  returnInfo?: string;
  mrp: number;
  salePrice: number;
  stock: number;
  lowStockAlert?: number;
  isFeatured: boolean;
  isBestseller: boolean;
  isNewArrival: boolean;
  isAddOn?: boolean;
  rating: number;
  reviewCount: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  metaTitle?: string;
  metaDescription?: string;
  images: ProductImage[];
  variants: ProductVariant[];
  // Trust, Transparency & Indian Regulatory Compliance
  batchNumber?: string;
  mfgDate?: string;
  expiryDate?: string;
  ayushLicense?: string;
  fssaiLicense?: string;
  originState?: string;
  hsnCode?: string;
  gstRate?: number;
  // Retention & Subscriptions
  isSubscriptionEligible?: boolean;
  subscriptionDiscountPercentage?: number;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId?: string;
  variantTitle?: string;
  price: number;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PROCESSING"
  | "PACKED"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod = "COD" | "RAZORPAY";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  variantTitle?: string;
  productImage?: string;
  price: number;
  mrp: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  guestEmail?: string;
  guestPhone?: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
  shippingAddress: Address;
  items: OrderItem[];
  trackingNumber?: string;
  trackingUrl?: string;
  courierName?: string;
  shiprocketOrderId?: number | string;
  shiprocketShipmentId?: number | string;
  estimatedDelivery?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpayStatus?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TrackingScan {
  date: string;
  activity: string;
  location: string;
}

export interface TrackingResult {
  orderNumber: string;
  trackingNumber: string;
  courierName: string;
  status: OrderStatus;
  currentStatusText: string;
  trackingUrl: string;
  origin: string;
  destination: string;
  estimatedDelivery?: string;
  scans: TrackingScan[];
  itemsCount: number;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  minCartValue: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  productName?: string;
  userId?: string;
  userName: string;
  userEmail?: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  readTime: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "Products" | "Orders & Shipping" | "Payments" | "Ayurveda & Usage";
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  link: string;
  imageUrl: string;
  buttonText: string;
  position: "HERO" | "MID_PAGE" | "TOP_ANNOUNCEMENT";
  isActive: boolean;
}

export interface SiteSettings {
  announcementText: string;
  freeShippingThreshold: number;
  supportPhone: string;
  supportEmail: string;
  supportAddress: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
}

// ----------------------------------------------------
// C. Customer Retention: Loyalty, Rewards & Membership
// ----------------------------------------------------
export type MembershipTier = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";

export interface LoyaltyAccount {
  userId: string;
  pointsBalance: number;
  lifetimePoints: number;
  tier: MembershipTier;
  referralCode: string;
  referredBy?: string;
  totalReferrals: number;
}

export interface LoyaltyTransaction {
  id: string;
  userId: string;
  points: number; // Positive for earned, negative for redeemed
  type: "ORDER_EARNED" | "POINTS_REDEEMED" | "REFERRAL_BONUS" | "SIGNUP_BONUS" | "TIER_BONUS";
  description: string;
  orderId?: string;
  createdAt: string;
}

// ----------------------------------------------------
// C. Product Bundles & Subscriptions
// ----------------------------------------------------
export interface ProductBundleItem {
  productId: string;
  productName: string;
  quantity: number;
}

export interface ProductBundle {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  items: ProductBundleItem[];
  mrpTotal: number;
  bundlePrice: number;
  savingsPercentage: number;
  image: string;
  isPopular?: boolean;
}

export type SubscriptionFrequency = "EVERY_30_DAYS" | "EVERY_60_DAYS" | "EVERY_90_DAYS";

export interface SubscriptionItem {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  variantId?: string;
  frequency: SubscriptionFrequency;
  discountPercentage: number;
  nextRenewalDate: string;
  status: "ACTIVE" | "PAUSED" | "CANCELLED";
  shippingAddress: Address;
  createdAt: string;
}

// ----------------------------------------------------
// D. Advanced Admin Analytics & BI
// ----------------------------------------------------
export interface DateRangeFilter {
  start: string; // ISO date
  end: string;
  label: "today" | "last7days" | "last30days" | "thisYear" | "all";
}

export interface AdminAnalyticsSummary {
  gmv: number; // Gross Merchandise Value
  netRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number; // percentage
  cartAbandonmentRate: number; // percentage
  estimatedCAC: number; // Customer Acquisition Cost in INR
  customerLifetimeValue: number; // LTV in INR
  repeatPurchaseRate: number; // percentage
  inventoryTurnoverRatio: number;
  returnRate: number; // percentage
  cancellationRate: number; // percentage
  periodComparison: {
    gmvGrowth: number;
    ordersGrowth: number;
    aovGrowth: number;
  };
  topSellingProducts: {
    productId: string;
    productName: string;
    unitsSold: number;
    revenue: number;
    profitMargin: number; // percentage
  }[];
  salesTrend: {
    date: string;
    revenue: number;
    orders: number;
  }[];
}

// ----------------------------------------------------
// I. Indian E-Commerce: GST Invoice Specification
// ----------------------------------------------------
export interface GSTTaxBreakdown {
  taxableAmount: number;
  hsnCode: string;
  rate: number; // percentage e.g. 18
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
}

export interface GSTInvoice {
  invoiceNumber: string;
  invoiceDate: string;
  orderNumber: string;
  sellerDetails: {
    legalName: string;
    brandName: string;
    gstin: string;
    fssaiLicense: string;
    ayushLicense: string;
    address: string;
    state: string;
    stateCode: string;
    contactEmail: string;
  };
  buyerDetails: {
    name: string;
    phone: string;
    email?: string;
    billingAddress: Address;
    shippingAddress: Address;
    state: string;
    stateCode?: string;
  };
  items: {
    description: string;
    hsnCode: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    taxableAmount: number;
    taxRate: number;
    cgst: number;
    sgst: number;
    igst: number;
    total: number;
  }[];
  taxSummary: GSTTaxBreakdown[];
  subtotal: number;
  totalDiscount: number;
  shippingFee: number;
  totalTax: number;
  grandTotal: number;
  amountInWords: string;
  isInterState: boolean;
}

// ----------------------------------------------------
// E. Marketing & Privacy Preferences
// ----------------------------------------------------
export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

