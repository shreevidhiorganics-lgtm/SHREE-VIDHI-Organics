import {
  Product,
  Category,
  Ingredient,
  Order,
  Review,
  Coupon,
  Blog,
  FAQ,
  Banner,
  SiteSettings,
  OrderStatus,
  PaymentStatus,
  User,
} from "@/types";
import {
  products as initialProducts,
  categories as initialCategories,
  ingredients as initialIngredients,
  coupons as initialCoupons,
  faqs as initialFaqs,
  blogs as initialBlogs,
  banners as initialBanners,
  siteSettings as initialSettings,
} from "@/lib/data/initial-data";

// In-memory data repository with thread-safe server state
class DataStore {
  private static instance: DataStore;

  private products: Product[] = [];
  private categories: Category[] = [];
  private ingredients: Ingredient[] = [];
  private orders: Order[] = [];
  private reviews: Review[] = [];
  private coupons: Coupon[] = [];
  private blogs: Blog[] = [];
  private faqs: FAQ[] = [];
  private banners: Banner[] = [];
  private settings: SiteSettings = { ...initialSettings };
  private users: User[] = [
    {
      id: "usr-admin-1",
      name: "Aditi Singh",
      email: "admin@shreevidhiorganics.com",
      role: "ADMIN",
      phone: "+91 6393600430",
      createdAt: "2026-01-01T00:00:00Z",
    },
    {
      id: "usr-cust-1",
      name: "Pooja Verma",
      email: "pooja.verma@example.com",
      role: "USER",
      phone: "+91 9876543210",
      createdAt: "2026-01-10T12:00:00Z",
    },
  ];

  private constructor() {
    this.init();
  }

  public static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  private init() {
    // Deep clone initial data
    this.products = JSON.parse(JSON.stringify(initialProducts));
    this.categories = JSON.parse(JSON.stringify(initialCategories));
    this.ingredients = JSON.parse(JSON.stringify(initialIngredients));
    this.coupons = JSON.parse(JSON.stringify(initialCoupons));
    this.faqs = JSON.parse(JSON.stringify(initialFaqs));
    this.blogs = JSON.parse(JSON.stringify(initialBlogs));
    this.banners = JSON.parse(JSON.stringify(initialBanners));

    // Seed realistic initial orders
    this.orders = [
      {
        id: "ord-101",
        orderNumber: "SVO-2026-8812",
        userId: "usr-cust-1",
        status: "DELIVERED",
        paymentMethod: "RAZORPAY",
        paymentStatus: "PAID",
        subtotal: 530,
        discount: 50,
        shippingFee: 0,
        total: 480,
        couponCode: "AYURVEDA50",
        trackingNumber: "DELHIVERY98712345",
        trackingUrl: "https://www.delhivery.com/track/package/DELHIVERY98712345",
        shippingAddress: {
          id: "addr-1",
          fullName: "Pooja Verma",
          phone: "+91 9876543210",
          houseFlat: "Flat 402, Ganga Heights",
          street: "Assi Ghat Road",
          landmark: "Near Sankat Mochan Temple",
          city: "Varanasi",
          district: "Varanasi",
          state: "Uttar Pradesh",
          pinCode: "221005",
          isDefault: true,
        },
        items: [
          {
            id: "item-1",
            productId: "prod-kapur-kachri",
            productName: "Shree Vidhi Kapur Kachri Powder",
            variantTitle: "50g",
            productImage: "https://cdn.shopify.com/s/files/1/0722/7582/0736/files/Front_97f1abd9-5b7b-4560-8ada-d1382167d5a7.png?v=1763985206",
            price: 141,
            mrp: 299,
            quantity: 1,
            total: 141,
          },
          {
            id: "item-2",
            productId: "prod-beetroot-powder",
            productName: "Shree Vidhi Pure & Natural Beetroot Powder",
            variantTitle: "100g",
            productImage: "/products/beetroot-powder.png",
            price: 149,
            mrp: 299,
            quantity: 1,
            total: 149,
          },
        ],
        createdAt: "2026-02-14T10:30:00Z",
      },
      {
        id: "ord-102",
        orderNumber: "SVO-2026-9045",
        userId: "usr-cust-1",
        status: "PROCESSING",
        paymentMethod: "COD",
        paymentStatus: "PENDING",
        subtotal: 448,
        discount: 0,
        shippingFee: 49,
        total: 497,
        shippingAddress: {
          id: "addr-1",
          fullName: "Pooja Verma",
          phone: "+91 9876543210",
          houseFlat: "Flat 402, Ganga Heights",
          street: "Assi Ghat Road",
          city: "Varanasi",
          state: "Uttar Pradesh",
          pinCode: "221005",
        },
        items: [
          {
            id: "item-3",
            productId: "prod-multani-neem-turmeric",
            productName: "Shree Vidhi Multani Mitti Neem Turmeric Blend",
            variantTitle: "100g",
            productImage: "/products/multani-neem-turmeric.png",
            price: 149,
            mrp: 299,
            quantity: 1,
            total: 149,
          },
          {
            id: "item-4",
            productId: "prod-natural-ubtan",
            productName: "Shree Vidhi Pure & Natural Ubtan Powder",
            variantTitle: "300g",
            productImage: "/products/natural-ubtan.png",
            price: 299,
            mrp: 499,
            quantity: 1,
            total: 299,
          },
        ],
        createdAt: "2026-02-20T16:15:00Z",
      },
    ];

    // Seed authentic reviews
    this.reviews = [
      {
        id: "rev-1",
        productId: "prod-kapur-kachri",
        productName: "Shree Vidhi Kapur Kachri Powder",
        userName: "Meera R.",
        userEmail: "meera.r@example.com",
        rating: 5,
        title: "Remarkable difference in scalp health and hair fall",
        comment: "I have been mixing this with cold-pressed coconut oil once a week. The natural earthy fragrance is so calming and my shedding stopped within three weeks. 100% genuine Ayurvedic herb!",
        isVerifiedPurchase: true,
        isApproved: true,
        createdAt: "2026-02-01T14:20:00Z",
      },
      {
        id: "rev-2",
        productId: "prod-natural-ubtan",
        productName: "Shree Vidhi Pure & Natural Ubtan Powder",
        userName: "Vikram Malhotra",
        userEmail: "vikram.m@example.com",
        rating: 5,
        title: "Pure unadulterated traditional ubtan",
        comment: "Tangy, rich, and high quality. You can tell it has no artificial chemicals or synthetic fragrance. My skin feels visibly more radiant and clean.",
        isVerifiedPurchase: true,
        isApproved: true,
        createdAt: "2026-02-05T09:15:00Z",
      },
      {
        id: "rev-3",
        productId: "prod-multani-neem-turmeric",
        productName: "Shree Vidhi Multani Mitti Neem Turmeric Blend",
        userName: "Ananya Dixit",
        userEmail: "ananya.d@example.com",
        rating: 5,
        title: "Gives a fresh, radiant post-temple bridal glow",
        comment: "The mix of multani mitti, neem and turmeric feels so cooling. Doesn't dry out the skin like synthetic clay packs. Highly recommended!",
        isVerifiedPurchase: true,
        isApproved: true,
        createdAt: "2026-02-10T11:45:00Z",
      },
    ];
  }

  // ---------------- PRODUCTS ----------------
  public getProducts(options?: {
    category?: string;
    featured?: boolean;
    bestseller?: boolean;
    search?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Product[] {
    let result = [...this.products];

    if (options?.category) {
      result = result.filter(
        (p) =>
          p.categoryId === options.category ||
          p.categoryName?.toLowerCase().replace(/\s+/g, "-") === options.category
      );
    }

    if (options?.featured) {
      result = result.filter((p) => p.isFeatured);
    }

    if (options?.bestseller) {
      result = result.filter((p) => p.isBestseller);
    }

    if (options?.minPrice !== undefined) {
      result = result.filter((p) => p.salePrice >= (options.minPrice || 0));
    }

    if (options?.maxPrice !== undefined) {
      result = result.filter((p) => p.salePrice <= (options.maxPrice || Infinity));
    }

    if (options?.search) {
      const q = options.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.ingredientsText?.toLowerCase().includes(q) ||
          p.keyBenefits.some((b) => b.toLowerCase().includes(q))
      );
    }

    if (options?.sort) {
      switch (options.sort) {
        case "price-asc":
          result.sort((a, b) => a.salePrice - b.salePrice);
          break;
        case "price-desc":
          result.sort((a, b) => b.salePrice - a.salePrice);
          break;
        case "rating":
          result.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case "bestselling":
          result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
          break;
      }
    }

    return result;
  }

  public getProductBySlug(slug: string): Product | null {
    return this.products.find((p) => p.slug === slug) || null;
  }

  public getProductById(id: string): Product | null {
    return this.products.find((p) => p.id === id) || null;
  }

  public createProduct(productData: Partial<Product>): Product {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: productData.name || "Untitled Product",
      slug: productData.slug || `product-${Date.now()}`,
      sku: productData.sku || `SVO-${Date.now().toString().slice(-4)}`,
      categoryId: productData.categoryId || "cat-powders",
      categoryName: productData.categoryName || "Herbal Powders",
      shortDesc: productData.shortDesc || "",
      description: productData.description || "",
      keyBenefits: productData.keyBenefits || [],
      ingredientsText: productData.ingredientsText || "",
      howToUse: productData.howToUse || "",
      whoItIsFor: productData.whoItIsFor || "All skin/hair types",
      mrp: productData.mrp || 299,
      salePrice: productData.salePrice || 199,
      stock: productData.stock !== undefined ? productData.stock : 50,
      isFeatured: !!productData.isFeatured,
      isBestseller: !!productData.isBestseller,
      isNewArrival: !!productData.isNewArrival,
      rating: 5.0,
      reviewCount: 0,
      status: productData.status || "PUBLISHED",
      images: productData.images || [
        {
          id: `img-${Date.now()}`,
          url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
          alt: productData.name || "Ayurvedic product",
          isPrimary: true,
        },
      ],
      variants: productData.variants || [
        {
          id: `var-${Date.now()}`,
          productId: `prod-${Date.now()}`,
          title: "Standard",
          size: "100g",
          mrp: productData.mrp || 299,
          price: productData.salePrice || 199,
          stock: productData.stock || 50,
        },
      ],
      createdAt: new Date().toISOString(),
    };

    this.products.unshift(newProduct);
    return newProduct;
  }

  public updateProduct(id: string, productData: Partial<Product>): Product | null {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.products[index] = {
      ...this.products[index],
      ...productData,
    };
    return this.products[index];
  }

  public deleteProduct(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    return this.products.length < initialLen;
  }

  // ---------------- CATEGORIES ----------------
  public getCategories(): Category[] {
    return this.categories;
  }

  public getCategoryBySlug(slug: string): Category | null {
    return this.categories.find((c) => c.slug === slug) || null;
  }

  // ---------------- INGREDIENTS ----------------
  public getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  public getIngredientById(id: string): Ingredient | null {
    return this.ingredients.find((i) => i.id === id) || null;
  }

  // ---------------- ORDERS & CHECKOUT ----------------
  public getOrders(userId?: string): Order[] {
    if (userId) {
      return this.orders.filter((o) => o.userId === userId);
    }
    return this.orders;
  }

  public getOrderById(id: string): Order | null {
    return this.orders.find((o) => o.id === id || o.orderNumber === id) || null;
  }

  public createOrder(orderPayload: {
    userId?: string;
    guestEmail?: string;
    guestPhone?: string;
    shippingAddress: Order["shippingAddress"];
    items: { productId: string; variantId?: string; quantity: number }[];
    paymentMethod: "COD" | "RAZORPAY" | "PAYU";
    couponCode?: string;
  }): { success: boolean; order?: Order; error?: string } {
    // 1. Server-side validation of products and recalculation of total
    let subtotal = 0;
    const validatedItems: Order["items"] = [];

    for (const item of orderPayload.items) {
      const product = this.getProductById(item.productId);
      if (!product) {
        return { success: false, error: `Product not found: ${item.productId}` };
      }

      const variant = item.variantId
        ? product.variants.find((v) => v.id === item.variantId)
        : product.variants[0];

      const availableStock = variant ? variant.stock : product.stock;
      if (item.quantity > availableStock) {
        return {
          success: false,
          error: `Insufficient stock for ${product.name}. Available: ${availableStock}`,
        };
      }

      const unitPrice = variant ? variant.price : product.salePrice;
      const unitMrp = variant ? variant.mrp : product.mrp;
      const itemTotal = unitPrice * item.quantity;
      subtotal += itemTotal;

      validatedItems.push({
        id: `ord-item-${Date.now()}-${Math.random().toString().slice(2, 6)}`,
        productId: product.id,
        productName: product.name,
        variantTitle: variant?.title,
        productImage: product.images[0]?.url,
        price: unitPrice,
        mrp: unitMrp,
        quantity: item.quantity,
        total: itemTotal,
      });

      // 2. Decrement inventory atomically
      if (variant) {
        variant.stock -= item.quantity;
      }
      product.stock -= item.quantity;
    }

    // 3. Server-side coupon verification
    let discount = 0;
    let appliedCoupon: Coupon | null = null;
    if (orderPayload.couponCode) {
      appliedCoupon = this.validateCoupon(orderPayload.couponCode, subtotal);
      if (appliedCoupon) {
        if (appliedCoupon.discountType === "PERCENTAGE") {
          const rawDiscount = (subtotal * appliedCoupon.discountValue) / 100;
          discount = appliedCoupon.maxDiscount
            ? Math.min(rawDiscount, appliedCoupon.maxDiscount)
            : rawDiscount;
        } else {
          discount = Math.min(appliedCoupon.discountValue, subtotal);
        }
        appliedCoupon.usedCount += 1;
      }
    }

    const shippingFee = subtotal >= this.settings.freeShippingThreshold ? 0 : 49;
    const total = Math.max(0, subtotal - discount + shippingFee);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `SVO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: orderPayload.userId,
      guestEmail: orderPayload.guestEmail,
      guestPhone: orderPayload.guestPhone,
      status: "PLACED",
      paymentMethod: orderPayload.paymentMethod,
      paymentStatus: (orderPayload.paymentMethod === "COD" || orderPayload.paymentMethod === "PAYU") ? "PENDING" : "PAID",
      subtotal,
      discount,
      shippingFee,
      total,
      couponCode: appliedCoupon?.code,
      shippingAddress: orderPayload.shippingAddress,
      items: validatedItems,
      trackingNumber: `SVO-EXP-${Math.floor(10000000 + Math.random() * 90000000)}`,
      trackingUrl: "https://shreevidhiorganics.com/track-order",
      createdAt: new Date().toISOString(),
    };

    this.orders.unshift(newOrder);
    return { success: true, order: newOrder };
  }

  public updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    paymentStatus?: PaymentStatus,
    trackingNumber?: string
  ): Order | null {
    const order = this.getOrderById(orderId);
    if (!order) return null;

    order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    order.updatedAt = new Date().toISOString();
    return order;
  }

  public updateOrderPaymentDetails(
    orderId: string,
    details: {
      status?: OrderStatus;
      paymentStatus: PaymentStatus;
      payuTxnId?: string;
      payuMihpayid?: string;
      payuStatus?: string;
    }
  ): Order | null {
    const order = this.getOrderById(orderId);
    if (!order) return null;

    if (details.status) order.status = details.status;
    order.paymentStatus = details.paymentStatus;
    if (details.payuTxnId) order.payuTxnId = details.payuTxnId;
    if (details.payuMihpayid) order.payuMihpayid = details.payuMihpayid;
    if (details.payuStatus) order.payuStatus = details.payuStatus;
    order.updatedAt = new Date().toISOString();
    return order;
  }

  // ---------------- COUPONS ----------------
  public validateCoupon(code: string, cartSubtotal: number): Coupon | null {
    const coupon = this.coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase() && c.isActive
    );
    if (!coupon) return null;
    if (cartSubtotal < coupon.minCartValue) return null;
    return coupon;
  }

  public getCoupons(): Coupon[] {
    return this.coupons;
  }

  // ---------------- REVIEWS ----------------
  public getReviewsForProduct(productId: string): Review[] {
    return this.reviews.filter((r) => r.productId === productId && r.isApproved);
  }

  public getAllReviews(): Review[] {
    return this.reviews;
  }

  public addReview(reviewData: {
    productId: string;
    userName: string;
    userEmail: string;
    rating: number;
    title: string;
    comment: string;
  }): Review {
    const product = this.getProductById(reviewData.productId);
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: reviewData.productId,
      productName: product?.name || "Product",
      userName: reviewData.userName,
      userEmail: reviewData.userEmail,
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      isVerifiedPurchase: true,
      isApproved: true,
      createdAt: new Date().toISOString(),
    };

    this.reviews.unshift(newReview);

    // Update product rating and reviewCount
    if (product) {
      const productReviews = this.reviews.filter((r) => r.productId === product.id);
      const totalStars = productReviews.reduce((sum, r) => sum + r.rating, 0);
      product.reviewCount = productReviews.length;
      product.rating = Number((totalStars / productReviews.length).toFixed(1));
    }

    return newReview;
  }

  // ---------------- CMS & CONTENT ----------------
  public getFaqs(): FAQ[] {
    return this.faqs;
  }

  public getBlogs(): Blog[] {
    return this.blogs.filter((b) => b.isPublished);
  }

  public getBlogBySlug(slug: string): Blog | null {
    return this.blogs.find((b) => b.slug === slug) || null;
  }

  public getBanners(): Banner[] {
    return this.banners.filter((b) => b.isActive);
  }

  public getSettings(): SiteSettings {
    return this.settings;
  }

  public updateSettings(settings: Partial<SiteSettings>): SiteSettings {
    this.settings = { ...this.settings, ...settings };
    return this.settings;
  }

  // ---------------- ADMIN METRICS ----------------
  public getAdminMetrics() {
    const totalRevenue = this.orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = this.orders.length;
    const pendingOrders = this.orders.filter(
      (o) => o.status === "PLACED" || o.status === "PROCESSING"
    ).length;
    const totalProducts = this.products.length;
    const lowStockProducts = this.products.filter(
      (p) => p.stock <= (p.lowStockAlert || 10)
    ).length;
    const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    return {
      totalRevenue,
      totalOrders,
      pendingOrders,
      totalProducts,
      lowStockProducts,
      averageOrderValue,
      totalCustomers: this.users.length,
    };
  }

  public getUsers(): User[] {
    return this.users;
  }
}

export const dataStore = DataStore.getInstance();
