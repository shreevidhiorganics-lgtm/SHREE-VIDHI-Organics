export type UserRole = "USER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
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

export type PaymentMethod = "COD" | "RAZORPAY" | "PAYU";
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
  payuTxnId?: string;
  payuMihpayid?: string;
  payuStatus?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
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
