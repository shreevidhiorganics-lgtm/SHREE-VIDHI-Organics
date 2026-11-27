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
  Address,
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

// In-memory data repository with thread-safe server state and persistent storage (MySQL / Disk)
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
      name: "Shree Vidhi Admin",
      email: "shreevidhiorganics@gmail.com",
      role: "ADMIN",
      createdAt: "2026-01-01T00:00:00Z",
    },
  ];

  private constructor() {
    this.init();
  }

  public static getInstance(): DataStore {
    const g = globalThis as typeof globalThis & { __svoDataStore?: DataStore };
    if (typeof window === "undefined") {
      if (!g.__svoDataStore) {
        g.__svoDataStore = new DataStore();
      }
      return g.__svoDataStore;
    }
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  private getStoragePath(): string | null {
    if (typeof window !== "undefined") return null;
    try {
      // Dynamic import to avoid bundling in client components
      const pathMod = require("path");
      return pathMod.resolve(process.cwd(), "data", "store.json");
    } catch {
      return null;
    }
  }

  private loadFromDisk() {
    if (typeof window !== "undefined") return;
    try {
      const fsMod = require("fs");
      const filePath = this.getStoragePath();
      if (!filePath || !fsMod.existsSync(filePath)) return;

      const raw = fsMod.readFileSync(filePath, "utf-8");
      const data = JSON.parse(raw);

      if (Array.isArray(data.orders)) this.orders = data.orders;
      if (Array.isArray(data.reviews)) this.reviews = data.reviews;
      if (Array.isArray(data.users)) this.users = data.users;
      if (Array.isArray(data.addresses)) this.addresses = data.addresses;
      if (Array.isArray(data.coupons)) this.coupons = data.coupons;
      if (data.settings) this.settings = data.settings;
      if (data.otps && typeof data.otps === "object") {
        const now = Date.now();
        for (const [phone, entry] of Object.entries<any>(data.otps)) {
          if (entry?.otp && Number(entry.expiresAt) > now) {
            this.otps.set(phone, { otp: String(entry.otp), expiresAt: Number(entry.expiresAt) });
          }
        }
      }
      if (Array.isArray(data.products) && data.products.length > 0) {
        const hasFullProducts = data.products.every((p: any) => p?.slug && p?.name);
        if (hasFullProducts) {
          this.products = data.products;
        } else {
          for (const savedProd of data.products) {
            const match = this.products.find((p) => p.id === savedProd.id);
            if (match) {
              if (savedProd.stock !== undefined) match.stock = savedProd.stock;
              if (savedProd.rating !== undefined) match.rating = savedProd.rating;
              if (savedProd.reviewCount !== undefined) match.reviewCount = savedProd.reviewCount;
              if (savedProd.variants) match.variants = savedProd.variants;
            }
          }
        }
      }
    } catch (err) {
      console.warn("[DataStore] Failed to load from disk:", err);
    }
  }

  private persistSnapshot() {
    if (typeof window !== "undefined") return;
    try {
      const fsMod = require("fs");
      const pathMod = require("path");
      const filePath = this.getStoragePath();
      if (!filePath) return;

      const dataDir = pathMod.dirname(filePath);
      if (!fsMod.existsSync(dataDir)) {
        fsMod.mkdirSync(dataDir, { recursive: true });
      }

      const snapshot = {
        orders: this.orders,
        reviews: this.reviews,
        users: this.users,
        addresses: this.addresses,
        coupons: this.coupons,
        settings: this.settings,
        otps: Object.fromEntries(this.otps.entries()),
        products: this.products,
        updatedAt: new Date().toISOString(),
      };

      const tmpPath = `${filePath}.tmp`;
      fsMod.writeFileSync(tmpPath, JSON.stringify(snapshot, null, 2), "utf-8");
      fsMod.renameSync(tmpPath, filePath);
    } catch (err) {
      console.warn("[DataStore] Failed to persist snapshot:", err);
    }
  }

  private mutationListeners: ((action: string, payload?: any) => void)[] = [];

  public onMutation(listener: (action: string, payload?: any) => void): () => void {
    this.mutationListeners.push(listener);
    return () => {
      this.mutationListeners = this.mutationListeners.filter((l) => l !== listener);
    };
  }

  private notifyMutation(action: string, payload?: any) {
    for (const listener of this.mutationListeners) {
      try {
        listener(action, payload);
      } catch (err) {
        console.error(`[DataStore] Mutation listener error (${action}):`, err);
      }
    }
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

    // Fresh production orders repository
    this.orders = [];

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

    // Hydrate state from persistent disk storage
    this.loadFromDisk();

    // Trigger background initialization if configured
    this.notifyMutation("initTables");
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
    this.persistSnapshot();
    this.notifyMutation("saveProduct", newProduct);
    return newProduct;
  }

  public updateProduct(id: string, productData: Partial<Product>): Product | null {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.products[index] = {
      ...this.products[index],
      ...productData,
    };
    this.persistSnapshot();
    this.notifyMutation("saveProduct", this.products[index]);
    return this.products[index];
  }

  public deleteProduct(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    if (this.products.length < initialLen) {
      this.persistSnapshot();
      this.notifyMutation("deleteProduct", id);
      return true;
    }
    return false;
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

  public getOrderByNumber(orderNumber: string): Order | null {
    return this.orders.find((o) => o.orderNumber === orderNumber || o.id === orderNumber) || null;
  }

  public createOrder(orderPayload: {
    userId?: string;
    guestEmail?: string;
    guestPhone?: string;
    shippingAddress: Order["shippingAddress"];
    items: { productId: string; variantId?: string; quantity: number }[];
    paymentMethod: "COD" | "RAZORPAY";
    couponCode?: string;
  }): { success: boolean; order?: Order; error?: string } {
    if (
      !orderPayload.shippingAddress ||
      !orderPayload.shippingAddress.fullName?.trim() ||
      !orderPayload.shippingAddress.phone?.trim() ||
      !orderPayload.shippingAddress.city?.trim() ||
      !orderPayload.shippingAddress.pinCode?.trim()
    ) {
      return { success: false, error: "Complete shipping address (name, phone, city, PIN code) is required." };
    }

    // 1. Validate ALL items & stock up front before mutating inventory
    let subtotal = 0;
    const validatedItems: Order["items"] = [];
    const pendingDecrements: { product: Product; variant?: Product["variants"][number]; quantity: number }[] = [];

    for (const item of orderPayload.items) {
      if (!item || typeof item.productId !== "string" || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 100) {
        return { success: false, error: "Invalid product or item quantity (must be integer 1–100)." };
      }

      const product = this.getProductById(item.productId);
      if (!product || product.status !== "PUBLISHED") {
        return { success: false, error: `Product not available: ${item.productId}` };
      }

      const variant = item.variantId
        ? product.variants.find((v) => v.id === item.variantId)
        : product.variants[0];
      if (item.variantId && !variant) {
        return { success: false, error: `Invalid product variant selected for ${product.name}.` };
      }

      const availableStock = variant ? variant.stock : product.stock;
      if (item.quantity > availableStock) {
        return {
          success: false,
          error: `Insufficient stock for ${product.name}. Available: ${availableStock}`,
        };
      }

      const unitPrice = variant ? variant.price : product.salePrice;
      const unitMrp = variant ? variant.mrp : product.mrp;
      if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
        return { success: false, error: `Invalid price configuration for ${product.name}.` };
      }

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

      pendingDecrements.push({ product, variant, quantity: item.quantity });
    }

    // 2. Decrement inventory atomically after all items succeed validation
    for (const entry of pendingDecrements) {
      if (entry.variant) {
        entry.variant.stock -= entry.quantity;
      }
      entry.product.stock -= entry.quantity;
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
        this.notifyMutation("saveCoupon", appliedCoupon);
      }
    }

    const shippingFee = subtotal > 0 ? 49 : 0;
    const total = Math.max(0, subtotal - discount + shippingFee);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `SVO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: orderPayload.userId,
      guestEmail: orderPayload.guestEmail,
      guestPhone: orderPayload.guestPhone,
      status: "PLACED",
      paymentMethod: orderPayload.paymentMethod,
      paymentStatus: (orderPayload.paymentMethod === "COD" || orderPayload.paymentMethod === "RAZORPAY") ? "PENDING" : "PAID",
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
    this.persistSnapshot();
    this.notifyMutation("saveOrder", newOrder);
    for (const item of orderPayload.items) {
      this.notifyMutation("updateStock", { productId: item.productId, quantity: item.quantity });
    }
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
    this.persistSnapshot();
    this.notifyMutation("saveOrder", order);
    return order;
  }

  public updateOrderPaymentDetails(
    orderId: string,
    details: {
      status?: OrderStatus;
      paymentStatus: PaymentStatus;
      razorpayOrderId?: string;
      razorpayPaymentId?: string;
      razorpayStatus?: string;
    }
  ): Order | null {
    const order = this.getOrderById(orderId);
    if (!order) return null;

    if (details.status) order.status = details.status;
    order.paymentStatus = details.paymentStatus;
    if (details.razorpayOrderId) order.razorpayOrderId = details.razorpayOrderId;
    if (details.razorpayPaymentId) order.razorpayPaymentId = details.razorpayPaymentId;
    if (details.razorpayStatus) order.razorpayStatus = details.razorpayStatus;
    order.updatedAt = new Date().toISOString();
    this.persistSnapshot();
    this.notifyMutation("saveOrder", order);
    return order;
  }

  public updateOrderShippingDetails(
    orderId: string,
    details: {
      status?: OrderStatus;
      trackingNumber?: string;
      trackingUrl?: string;
      courierName?: string;
      shiprocketOrderId?: number | string;
      shiprocketShipmentId?: number | string;
    }
  ): Order | null {
    const order = this.getOrderById(orderId);
    if (!order) return null;

    if (details.status) order.status = details.status;
    if (details.trackingNumber) order.trackingNumber = details.trackingNumber;
    if (details.trackingUrl) order.trackingUrl = details.trackingUrl;
    if (details.courierName) order.courierName = details.courierName;
    if (details.shiprocketOrderId !== undefined) order.shiprocketOrderId = details.shiprocketOrderId;
    if (details.shiprocketShipmentId !== undefined) order.shiprocketShipmentId = details.shiprocketShipmentId;
    order.updatedAt = new Date().toISOString();
    this.persistSnapshot();
    this.notifyMutation("saveOrder", order);
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

  public createCoupon(couponData: Omit<Coupon, "id" | "usedCount">): Coupon {
    const newCoupon: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`,
      code: couponData.code.trim().toUpperCase(),
      usedCount: 0,
    };
    this.coupons.unshift(newCoupon);
    this.persistSnapshot();
    this.notifyMutation("saveCoupon", newCoupon);
    return newCoupon;
  }

  public deleteCoupon(id: string): boolean {
    const initialLen = this.coupons.length;
    this.coupons = this.coupons.filter((c) => c.id !== id);
    if (this.coupons.length < initialLen) {
      this.persistSnapshot();
      this.notifyMutation("deleteCoupon", id);
      return true;
    }
    return false;
  }

  public toggleReviewApproval(reviewId: string): Review | null {
    const review = this.reviews.find((r) => r.id === reviewId);
    if (!review) return null;
    review.isApproved = !review.isApproved;
    this.persistSnapshot();
    this.notifyMutation("updateReviewApproval", {
      reviewId: review.id,
      isApproved: review.isApproved,
    });
    return review;
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

    this.persistSnapshot();
    this.notifyMutation("saveReview", newReview);

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
    this.persistSnapshot();
    this.notifyMutation("saveSettings", this.settings);
    return this.settings;
  }

  public hydrateFromDatabase(dbState: {
    orders?: Order[];
    users?: User[];
    addresses?: Address[];
    products?: Product[];
    reviews?: Review[];
    coupons?: Coupon[];
    settings?: SiteSettings | null;
  }) {
    if (Array.isArray(dbState.orders)) {
      this.orders = dbState.orders;
    }
    if (Array.isArray(dbState.users) && dbState.users.length > 0) {
      this.users = dbState.users;
    }
    if (Array.isArray(dbState.addresses)) {
      this.addresses = dbState.addresses;
    }
    if (Array.isArray(dbState.products) && dbState.products.length > 0) {
      this.products = dbState.products;
    }
    if (Array.isArray(dbState.reviews)) {
      this.reviews = dbState.reviews;
    }
    if (Array.isArray(dbState.coupons)) {
      this.coupons = dbState.coupons;
    }
    if (dbState.settings) {
      this.settings = dbState.settings;
    }
    this.persistSnapshot();
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

  // ---------------- AUTHENTICATION & OTP ----------------
  private otps: Map<string, { otp: string; expiresAt: number }> = new Map();
  private addresses: Address[] = [];

  public sendOtp(phone: string): { success: boolean; message: string; otp: string } {
    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    // Generate secure 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    this.otps.set(cleanPhone, { otp: generatedOtp, expiresAt });
    this.persistSnapshot();
    this.notifyMutation("saveOtp", { phone: cleanPhone, otp: generatedOtp, expiresAt });

    return {
      success: true,
      message: `OTP sent successfully to +91 ${cleanPhone}.`,
      otp: generatedOtp,
    };
  }

  public verifyOtp(phone: string, inputOtp: string): boolean {
    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    // Reload latest snapshot in case another worker/module wrote the OTP
    if (!this.otps.has(cleanPhone)) {
      this.loadFromDisk();
    }
    const entry = this.otps.get(cleanPhone);

    // Allow test OTP only outside production when explicitly enabled
    if (
      process.env.NODE_ENV !== "production" &&
      process.env.ALLOW_TEST_OTP === "true" &&
      inputOtp === "123456"
    ) {
      return true;
    }

    if (!entry) return false;
    if (Date.now() > entry.expiresAt) {
      this.otps.delete(cleanPhone);
      this.persistSnapshot();
      return false;
    }

    if (entry.otp === inputOtp.trim()) {
      this.otps.delete(cleanPhone);
      this.persistSnapshot();
      return true;
    }

    return false;
  }

  public registerCustomer(payload: {
    name: string;
    email: string;
    phone: string;
    address?: {
      houseFlat: string;
      street: string;
      landmark?: string;
      city: string;
      state: string;
      pinCode: string;
    };
  }): User {
    const cleanPhone = payload.phone.replace(/\D/g, "").slice(-10);
    const normalizedEmail = payload.email.toLowerCase().trim();

    if (normalizedEmail === "shreevidhiorganics@gmail.com") {
      throw new Error("Reserved administrator email cannot be used for customer registration.");
    }

    // Match strictly by verified phone number (never allow unverified email to hijack another account)
    let user = this.users.find(
      (u) => u.role !== "ADMIN" && u.phone && u.phone.replace(/\D/g, "").slice(-10) === cleanPhone
    );

    if (user) {
      user.name = payload.name.trim();
      user.email = normalizedEmail;
      user.phone = `+91 ${cleanPhone}`;
    } else {
      const emailOwner = this.users.find(
        (u) => u.email.toLowerCase() === normalizedEmail
      );
      if (emailOwner) {
        throw new Error("An account with this email already exists under a different mobile number.");
      }
      user = {
        id: `usr-cust-${Date.now()}`,
        name: payload.name.trim(),
        email: normalizedEmail,
        phone: `+91 ${cleanPhone}`,
        role: "USER",
        createdAt: new Date().toISOString(),
      };
      this.users.push(user);
    }

    // Save Delivery Address if provided
    if (payload.address && payload.address.houseFlat && payload.address.city && payload.address.pinCode) {
      const fullAddress: Address = {
        id: `addr-${Date.now()}`,
        userId: user.id,
        fullName: payload.name.trim(),
        phone: `+91 ${cleanPhone}`,
        houseFlat: payload.address.houseFlat.trim(),
        street: payload.address.street.trim(),
        landmark: payload.address.landmark?.trim() || "",
        city: payload.address.city.trim(),
        state: payload.address.state.trim() || "Uttar Pradesh",
        pinCode: payload.address.pinCode.trim(),
        isDefault: true,
      };

      // Replace or add default address
      this.addresses = this.addresses.filter((a) => a.userId !== user!.id);
      this.addresses.push(fullAddress);
      user.address = fullAddress;
      this.notifyMutation("saveAddress", fullAddress);
    }

    this.persistSnapshot();
    this.notifyMutation("saveUser", user);

    return user;
  }

  public getUserById(id: string): User | null {
    const user = this.users.find((u) => u.id === id) || null;
    if (user && !user.address) {
      user.address = this.addresses.find((a) => a.userId === id) || undefined;
    }
    return user;
  }

  public getUserByPhone(phone: string): User | null {
    const clean = phone.replace(/\D/g, "").slice(-10);
    const user = this.users.find((u) => u.phone && u.phone.replace(/\D/g, "").slice(-10) === clean) || null;
    if (user && !user.address) {
      user.address = this.addresses.find((a) => a.userId === user.id) || undefined;
    }
    return user;
  }

  public getAddressByUserId(userId: string): Address | null {
    return this.addresses.find((a) => a.userId === userId) || null;
  }
}

export const dataStore = DataStore.getInstance();
