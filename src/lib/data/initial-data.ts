import { Category, Ingredient, Product, FAQ, Blog, Banner, SiteSettings, Coupon } from "@/types";

export const siteSettings: SiteSettings = {
  announcementText: "🌿 Government-Funded Social Enterprise in Varanasi • 100% Certified Ayurvedic Vidhi • Free Express Shipping above ₹499",
  freeShippingThreshold: 499,
  supportPhone: "+91 6393600430, +91 7752905694",
  supportEmail: "shreevidhiorganics@gmail.com",
  supportAddress: "N15/170 A Badi Gaibi Chauraha, Birdopur, Varanasi, Uttar Pradesh - 221010, India",
  instagramUrl: "https://instagram.com/shreevidhiorganics",
  facebookUrl: "https://facebook.com/shreevidhiorganics",
  youtubeUrl: "https://youtube.com/@shreevidhiorganics",
};

export const categories: Category[] = [
  {
    id: "cat-hair",
    name: "Hair Care",
    slug: "hair-care",
    description: "Time-tested Ayurvedic herbs to strengthen roots, control hair fall, and restore natural shine.",
    image: "/pictures/products/kapur-kachri.png",
    isFeatured: true,
    productCount: 9,
  },
  {
    id: "cat-skin",
    name: "Skin Care",
    slug: "skin-care",
    description: "Pure botanical powders, wild turmeric, and gentle clays for healthy, glowing skin without harsh chemicals.",
    image: "/pictures/products/chandan-powder.png",
    isFeatured: true,
    productCount: 8,
  },
  {
    id: "cat-facepacks",
    name: "Ubtan & Face Packs",
    slug: "ubtan-face-packs",
    description: "Traditional Ayurvedic facial packs crafted with hand-ground herbs, clays, and floral petals.",
    image: "/pictures/products/natural-ubtan.png",
    isFeatured: true,
    productCount: 6,
  },
  {
    id: "cat-powders",
    name: "Herbal Powders",
    slug: "herbal-powders",
    description: "100% single-origin natural herbs ground under slow temperature to preserve active bio-nutrients.",
    image: "/pictures/products/beetroot-powder.png",
    isFeatured: true,
    productCount: 8,
  },
  {
    id: "cat-wellness",
    name: "Wellness & Superfoods",
    slug: "wellness",
    description: "Pure Himalayan Sea Buckthorn pulp and botanical wellness blends formulated to support immunity, vitality, and cellular rejuvenation.",
    image: "/pictures/products/seabuckthorn-pulp.png",
    isFeatured: true,
    productCount: 2,
  },
  {
    id: "cat-bestsellers",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "Our most cherished Ayurvedic daily rituals, trusted by thousands across India.",
    image: "/pictures/products/vedic-blend.png",
    isFeatured: true,
    productCount: 12,
  },
];

export const ingredients: Ingredient[] = [
  {
    id: "ing-kapur-kachri",
    name: "Kapur Kachri",
    sanskritName: "Shati / Gandhapalashi",
    botanicalName: "Hedychium spicatum",
    shortDesc: "Revered Ayurvedic herb celebrated for stimulating micro-circulation in the scalp, calming dandruff, and leaving a naturally fragrant therapeutic aroma.",
    fullDesc: "Kapoor Kachri has been documented in traditional Ayurvedic treatises as a potent Rasayana herb. It balances Vata and Kapha doshas, strengthens hair follicles at the roots, and adds noticeable bounce and shine to limp strands.",
    benefits: [
      "Stimulates dormant hair follicles",
      "Controls scalp buildup and flakiness",
      "Imparts natural volume, softness, and therapeutic aroma",
      "Balances excess Vata and Kapha dosha",
    ],
    traditionalUse: "Traditionally infused in warm coconut or sesame oil for Shiro Abhyanga (Ayurvedic head massage) or blended in herbal hair lepa (masks).",
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ing-kasturi-manjal",
    name: "Wild Kasturi Turmeric",
    sanskritName: "Kasturi Manjal / Aranya Haridra",
    botanicalName: "Curcuma aromatica",
    shortDesc: "Non-staining wild medicinal turmeric renowned for brightening dull skin tone, fading acne spots, and giving a healthy Ayurvedic glow.",
    fullDesc: "Unlike culinary turmeric, Kasturi Manjal is intensely aromatic and does not stain the skin yellow. Its active curcuminoids and essential oils possess powerful antimicrobial and anti-inflammatory properties.",
    benefits: [
      "Fades dark spots, acne scars, and uneven pigmentation",
      "Naturally non-staining botanical formulation",
      "Purifies pores and regulates excess sebum",
      "Imparts an authentic warm luminous glow",
    ],
    traditionalUse: "Used in bridal Ubtans and weekly face masks mixed with rose water, milk, or pure yoghurt.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ing-beetroot",
    name: "Pure Beetroot",
    sanskritName: "Palanki Phalam",
    botanicalName: "Beta vulgaris",
    shortDesc: "Sun-dehydrated, finely powdered beetroot loaded with betalains, iron, and potassium to impart a youthful natural flush and plumpness.",
    fullDesc: "Rich in antioxidants that neutralize environmental free radicals, beetroot revitalizes tired complexion, replenishes moisture, and gently exfoliates dull dead surface cells.",
    benefits: [
      "Gives a natural rosy-pink radiance to the complexion",
      "Boosts skin elasticity with active antioxidants",
      "Mildly exfoliates and refines uneven skin texture",
      "Pure, edible-grade powder without artificial food colors",
    ],
    traditionalUse: "Blended with sandalwood or multani mitti for brightening face masks, or used as a clean botanical lip & cheek tint.",
    image: "https://images.unsplash.com/photo-1588691884488-874db1db48d7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ing-bhringraj",
    name: "Bhringraj",
    sanskritName: "Keshraj (King of Hair)",
    botanicalName: "Eclipta alba",
    shortDesc: "The undisputed 'King of Hair' in Ayurveda, renowned for preventing premature greying, cooling the scalp, and reversing thinning.",
    fullDesc: "Bhringraj works by nourishing the hair roots with essential phytosterols and mineral compounds, calming excess Pitta heat in the head which often triggers hair fall.",
    benefits: [
      "Reduces chronic hair fall and breakage",
      "Prevents premature greying by restoring natural pigment vitality",
      "Cools the head and eases stress-induced hair loss",
      "Deeply conditions dry and coarse strands",
    ],
    traditionalUse: "Steeped in cold-pressed sesame or coconut oil for weekly Ayurvedic Shiro Abhyanga.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ing-amla",
    name: "Amla (Indian Gooseberry)",
    sanskritName: "Amalaki / Dhatri",
    botanicalName: "Phyllanthus emblica",
    shortDesc: "Sacred Ayurvedic fruit celebrated as nature's greatest rejuvenator (Rasayana), overflowing with heat-stable Vitamin C and tannins.",
    fullDesc: "Amla strengthens hair roots from within, adds deep luster, cleanses the scalp gently, and promotes healthy cellular turnover.",
    benefits: [
      "Natural source of heat-stable Vitamin C",
      "Conditions hair to deep silky softness",
      "Soothes itchy scalp and controls flaking",
      "Fortifies hair shaft against heat and UV damage",
    ],
    traditionalUse: "Used alongside Reetha and Shikakai as an ancient chemical-free hair wash, and consumed internally for digestive wellness.",
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
  },
];

export const products: Product[] = [
  {
    "id": "prod-natural-ubtan",
    "name": "Shree Vidhi 100% Pure & Natural Ubtan Powder - Face Pack Powder for Acne, Dull Skin & Dark Spots (100gm)",
    "slug": "shree-vidhi-natural-ubtan-powder-100gm",
    "sku": "SVO-UB-100",
    "categoryId": "cat-facepacks",
    "categoryName": "Ubtan & Face Packs",
    "shortDesc": "100% pure & natural Ubtan powder — face pack for acne, dull skin & dark spots. Naturally brightens, exfoliates, and restores skin glow.",
    "description": "This potent Ayurvedic blend of Multani Mitti, Turmeric, Gram Flour, Barley Powder, Rice, and Masur Dal offers a complete solution for radiant, glowing skin.\n\nMultani Mitti (Fuller's Earth) deeply cleanses and tightens pores, while Gram Flour and Rice act as gentle exfoliators to lift dead cells and blackheads. Turmeric provides anti-inflammatory and antiseptic properties to brighten skin tone and soothe blemishes, while Barley Powder and Masur Dal nourish and rejuvenate.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • FSSAI Lic. No. 12221036000261. Shelf Life: 3 Years.",
    "keyBenefits": [
      "Exfoliates, brightens, and nourishes skin deeply",
      "Fights acne breakouts, dark spots, and uneven texture",
      "Lifts stubborn environmental tan and clears blackheads",
      "100% natural heritage grains and clays — no synthetic fillers"
    ],
    "ingredientsText": "Multani Mitti (Fuller's Earth), Turmeric, Gram Flour (Besan), Barley Powder, Rice, Masur Dal.",
    "howToUse": "Mix 2-3 tablespoons with raw milk, fresh curd, or rose water into a smooth paste. Gently massage over damp face and neck in circular motions. Leave on for 15 minutes, then rinse thoroughly with lukewarm water.",
    "whoItIsFor": "Ideal for all skin types — especially those with acne, dark spots, dullness, or sun tan.",
    "storageInfo": "Store in a cool, dry place. Keep sealed airtight. Shelf life: 3 Years.",
    "shippingInfo": "Dispatched within 24 hours. Free express shipping on orders above ₹499.",
    "returnInfo": "100% Satisfaction guarantee. Contact us within 48 hours for any issues.",
    "mrp": 199,
    "salePrice": 149,
    "stock": 120,
    "lowStockAlert": 20,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "rating": 4.92,
    "reviewCount": 67,
    "status": "PUBLISHED",
    "metaTitle": "Pure & Natural Ubtan Powder 100g | Shree Vidhi Organics",
    "metaDescription": "100% pure natural Ubtan powder face pack for acne, dull skin, and dark spots. Handcrafted in Varanasi. 100g.",
    "images": [
      {
        "id": "img-ub-1",
        "url": "/pictures/products/natural-ubtan.png",
        "alt": "Shree Vidhi Natural Ubtan Powder 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      },
      {
        "id": "img-ub-2",
        "url": "/pictures/products/natural-ubtan-back.png",
        "alt": "Shree Vidhi Natural Ubtan Powder Back Ingredient & Ritual Label",
        "isPrimary": false,
        "displayOrder": 2
      },
      {
        "id": "img-ub-3",
        "url": "/pictures/products/natural-ubtan-benefits-infographic.jpg",
        "alt": "Natural Ubtan Key Benefits Infographic",
        "isPrimary": false,
        "displayOrder": 3
      },
      {
        "id": "img-ub-4",
        "url": "/pictures/products/natural-ubtan-howtouse-infographic.jpg",
        "alt": "How to Use Shree Vidhi Natural Ubtan Infographic",
        "isPrimary": false,
        "displayOrder": 4
      },
      {
        "id": "img-ub-5",
        "url": "/pictures/products/natural-ubtan-why-infographic.png",
        "alt": "Why Choose Shree Vidhi Natural Ubtan",
        "isPrimary": false,
        "displayOrder": 5
      }
    ],
    "variants": [
      {
        "id": "var-ub-100",
        "productId": "prod-natural-ubtan",
        "title": "100g",
        "size": "100g",
        "mrp": 199,
        "price": 149,
        "stock": 120
      }
    ],
    "createdAt": "2025-12-20T14:10:00+05:30"
  },
  {
    "id": "prod-beetroot-powder",
    "name": "Shree Vidhi Pure & Natural Beetroot Powder for Pinkish, Glowing, Shiny Skin - 100g",
    "slug": "shree-vidhi-beetroot-powder-100g",
    "sku": "SVO-BT-100",
    "categoryId": "cat-powders",
    "categoryName": "Herbal Powders",
    "shortDesc": "100% pure & natural beetroot powder for reddish, glowing skin. Natural blush, lip tint, and face pack — all in one.",
    "description": "A powerful source of antioxidants, vitamins, and minerals gently dehydrated at low temperatures to lock in active betalain pigments, Vitamin C, and potassium.\n\nUsed externally, Beetroot Powder provides a natural rosy flush to lips and cheeks, and improves skin and hair health by enhancing micro-circulation. Internally, it acts as an antioxidant superfood that supports detoxification and vitality.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • FSSAI Lic. No. 12221036000261. Shelf Life: 3 Years.",
    "keyBenefits": [
      "Imparts a natural rosy-pink flush to skin",
      "High betalain antioxidants combat oxidative damage",
      "Helps fade discoloration and dull undertones",
      "Multi-purpose: face packs, lip tint, and hair masks"
    ],
    "ingredientsText": "100% Pure Beetroot (Beta vulgaris) Powder. Nothing else added.",
    "howToUse": "Mix 1 teaspoon with honey, aloe vera, or yogurt. Apply on face for 10-15 minutes, then rinse for an instant glowing blush.",
    "whoItIsFor": "Great for pale, dull, or fatigued skin needing vibrant natural radiance.",
    "storageInfo": "Store in a dry airtight container in a cool place.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Authentic natural product guarantee.",
    "mrp": 199,
    "salePrice": 149,
    "stock": 75,
    "lowStockAlert": 10,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "rating": 4.85,
    "reviewCount": 29,
    "status": "PUBLISHED",
    "metaTitle": "Pure Beetroot Powder 100g | Shree Vidhi Organics",
    "metaDescription": "100% natural beetroot powder for glowing skin, natural blush, and face packs. Chemical-free. 100g.",
    "images": [
      {
        "id": "img-bt-1",
        "url": "/pictures/products/beetroot-powder.png",
        "alt": "Shree Vidhi Pure Beetroot Powder 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      },
      {
        "id": "img-bt-2",
        "url": "/pictures/products/beetroot-powder-back.png",
        "alt": "Shree Vidhi Pure Beetroot Powder Back Ingredient & Usage Label",
        "isPrimary": false,
        "displayOrder": 2
      },
      {
        "id": "img-bt-3",
        "url": "/pictures/products/beetroot-powder-why.jpg",
        "alt": "Why Choose Shree Vidhi Pure Beetroot Powder",
        "isPrimary": false,
        "displayOrder": 3
      },
      {
        "id": "img-bt-4",
        "url": "/pictures/products/beetroot-powder-benefits.jpg",
        "alt": "Pure Beetroot Powder Antioxidant & Skin Benefits",
        "isPrimary": false,
        "displayOrder": 4
      }
    ],
    "variants": [
      {
        "id": "var-bt-100",
        "productId": "prod-beetroot-powder",
        "title": "100g",
        "size": "100g",
        "mrp": 199,
        "price": 149,
        "stock": 75
      }
    ],
    "createdAt": "2026-01-05T10:00:00+05:30"
  },
  {
    "id": "prod-jangali-haldi",
    "name": "Shree Vidhi Jangali Haldi Powder for Face & Skin Care - 50g",
    "slug": "shree-vidhi-jangali-haldi-powder-50g",
    "sku": "SVO-JH-050",
    "categoryId": "cat-skin",
    "categoryName": "Skin Care",
    "shortDesc": "Pure wild Jangali Haldi (Kasturi Turmeric) powder for face and skin — non-staining, aromatic, and deeply purifying.",
    "description": "Unlike regular kitchen turmeric, authentic **Jangali Haldi** (Wild Kasturi Turmeric / *Curcuma aromatica*) is specifically cultivated for cosmetic skincare and does not stain the skin.\n\nIt possesses potent anti-inflammatory and antioxidant properties that help in brightening skin complexion, fading dark spots and acne marks, and refining skin texture with an earthy, cooling herbal aroma.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • FSSAI Lic. No. 12221036000261. Shelf Life: 3 Years.",
    "keyBenefits": [
      "Non-staining wild turmeric — safe for daily face use",
      "Fades dark spots, sun tan, and post-acne marks",
      "Anti-bacterial — controls breakouts and blackheads",
      "Refines skin complexion with golden Ayurvedic radiance"
    ],
    "ingredientsText": "100% Pure Wild Jangali Haldi (Curcuma aromatica) rhizome powder.",
    "howToUse": "Mix 1/2 teaspoon with rose water or raw milk. Apply as a spot treatment or full face mask for 15 minutes. Rinse with lukewarm water.",
    "whoItIsFor": "Anyone with acne, dark spots, hyperpigmentation, or dull skin.",
    "storageInfo": "Store in a cool dry place away from direct sunlight.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Pure Ayurvedic guarantee.",
    "mrp": 149,
    "salePrice": 119,
    "stock": 90,
    "lowStockAlert": 12,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "rating": 4.9,
    "reviewCount": 31,
    "status": "PUBLISHED",
    "metaTitle": "Jangali Haldi Powder 50g for Face & Skin | Shree Vidhi Organics",
    "metaDescription": "Pure wild Jangali Haldi (Kasturi Turmeric) powder for face and skin care. Non-staining, aromatic. 50g.",
    "images": [
      {
        "id": "img-jh-1",
        "url": "/pictures/products/jangali-haldi.png",
        "alt": "Shree Vidhi Jangali Haldi Powder 50g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      },
      {
        "id": "img-jh-2",
        "url": "/pictures/products/jangali-haldi-back.png",
        "alt": "Shree Vidhi Jangali Haldi Powder Back Ingredient & Ritual Label",
        "isPrimary": false,
        "displayOrder": 2
      },
      {
        "id": "img-jh-3",
        "url": "/pictures/products/jangali-haldi-why.jpg",
        "alt": "Why Choose Shree Vidhi Jangali Haldi",
        "isPrimary": false,
        "displayOrder": 3
      },
      {
        "id": "img-jh-4",
        "url": "/pictures/products/jangali-haldi-benefits.jpg",
        "alt": "Jangali Haldi Non-Staining Wild Kasturi Turmeric Benefits",
        "isPrimary": false,
        "displayOrder": 4
      }
    ],
    "variants": [
      {
        "id": "var-jh-50",
        "productId": "prod-jangali-haldi",
        "title": "50g",
        "size": "50g",
        "mrp": 149,
        "price": 119,
        "stock": 90
      }
    ],
    "createdAt": "2026-01-10T12:00:00+05:30"
  },
  {
    "id": "prod-kapur-kachri",
    "name": "Shree Vidhi Kapur Kachri Powder | Ayurvedic Support for Hair Growth - 50gm",
    "slug": "shree-vidhi-kapur-kachri-powder-50gm",
    "sku": "SVO-HK-050",
    "categoryId": "cat-hair",
    "categoryName": "Hair Care",
    "shortDesc": "Revered Ayurvedic Kapur Kachri powder — supports hair growth, reduces fall, and strengthens roots with a refreshing herbal aroma.",
    "description": "A celebrated Ayurvedic herb (*Hedychium spicatum*) prized for centuries to nourish scalp health, promote healthy hair growth, and strengthen roots.\n\nIt improves hair texture, imparts natural softness and luster, and soothes flakiness and dandruff, leaving a therapeutic, aromatic herbal fragrance without any artificial scents.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • FSSAI Lic. No. 12221036000261. Shelf Life: 3 Years.",
    "keyBenefits": [
      "Promotes healthy hair growth and root vitality",
      "Reduces hair fall, breakage, and split ends",
      "Improves hair texture, softness, and natural luster",
      "Controls scalp flakiness and dandruff",
      "Naturally aromatic — earthy, spicy herbal fragrance"
    ],
    "ingredientsText": "100% Pure Dried & Finely Ground Kapur Kachri (Hedychium spicatum) Root Rhizome.",
    "howToUse": "Mix 2-3 tablespoons with warm water, curd, or aloe vera into a paste. Apply to scalp and hair. Leave for 30–45 minutes, then rinse with lukewarm water.",
    "whoItIsFor": "All hair types. Ideal for hair thinning, slow growth, weak roots, or dull lifeless hair.",
    "storageInfo": "Store in an airtight container in a cool, dry place away from direct sunlight.",
    "shippingInfo": "Dispatched within 24 hours. Free express shipping on orders above ₹499.",
    "returnInfo": "100% Quality Guarantee. Contact us within 48 hours for damaged packages.",
    "mrp": 149,
    "salePrice": 119,
    "stock": 85,
    "lowStockAlert": 10,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "rating": 4.9,
    "reviewCount": 38,
    "status": "PUBLISHED",
    "metaTitle": "Kapur Kachri Powder 50g for Hair Growth | Shree Vidhi Organics",
    "metaDescription": "100% pure Ayurvedic Kapur Kachri Powder for hair growth, root strengthening, and natural volume. 50g.",
    "images": [
      {
        "id": "img-kk-1",
        "url": "/pictures/products/kapur-kachri.png",
        "alt": "Shree Vidhi Kapur Kachri Powder 50g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      },
      {
        "id": "img-kk-2",
        "url": "/pictures/products/kapur-kachri-back.png",
        "alt": "Shree Vidhi Kapur Kachri Powder Back Ingredient & Ritual Label",
        "isPrimary": false,
        "displayOrder": 2
      },
      {
        "id": "img-kk-3",
        "url": "/pictures/products/kapur-kachri-why.jpg",
        "alt": "Why Choose Shree Vidhi Kapur Kachri Powder",
        "isPrimary": false,
        "displayOrder": 3
      },
      {
        "id": "img-kk-4",
        "url": "/pictures/products/kapur-kachri-benefits.jpg",
        "alt": "Kapur Kachri Hair Growth & Root Density Benefits",
        "isPrimary": false,
        "displayOrder": 4
      }
    ],
    "variants": [
      {
        "id": "var-kk-50",
        "productId": "prod-kapur-kachri",
        "title": "50g",
        "size": "50g",
        "mrp": 149,
        "price": 119,
        "stock": 50
      }
    ],
    "createdAt": "2025-11-24T17:24:49+05:30"
  },
  {
    "id": "prod-multani-neem-turmeric",
    "name": "Shree Vidhi Multani Mitti Neem Turmeric Blend Powder for Face and Body - 100gm",
    "slug": "shree-vidhi-multani-mitti-neem-turmeric-blend-100gm",
    "sku": "SVO-MNT-100",
    "categoryId": "cat-facepacks",
    "categoryName": "Ubtan & Face Packs",
    "shortDesc": "Pure Multani Mitti, Neem & Turmeric blend — a traditional face and body cleansing powder that deeply purifies, brightens, and controls oiliness.",
    "description": "A traditional Ayurvedic blend of Multani Mitti, Neem, and Turmeric — an all-in-one clarifying solution for radiant, blemish-free skin.\n\nMultani Mitti (Fuller's Earth) deeply cleanses the pores and absorbs excess sebum. Neem, revered for its antibacterial power, purifies the skin and helps soothe breakouts. Turmeric brightens the complexion with antioxidant care and promotes an even skin tone.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • FSSAI Lic. No. 12221036000261. Shelf Life: 3 Years.",
    "keyBenefits": [
      "Deep pore cleansing with Multani Mitti",
      "Controls oiliness and reduces acne with Neem",
      "Brightens and evens skin tone with Turmeric",
      "Suitable for face and body — 100% natural",
      "Zero parabens, sulfates, or synthetic additives"
    ],
    "ingredientsText": "Multani Mitti (Fuller's Earth), Neem (Azadirachta indica) Powder, Turmeric (Curcuma longa) Powder.",
    "howToUse": "Mix 1-2 tablespoons with rose water or plain water into a smooth paste. Apply on face and body. Leave for 15 minutes and rinse with lukewarm water. Use 2-3 times per week.",
    "whoItIsFor": "Oily, acne-prone, or combination skin. Anyone wanting a natural deep-cleansing face pack.",
    "storageInfo": "Store in a cool, dry place. Keep sealed after use.",
    "shippingInfo": "Dispatched within 24 hours. Free express shipping on orders above ₹499.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 199,
    "salePrice": 149,
    "stock": 100,
    "lowStockAlert": 15,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "rating": 4.87,
    "reviewCount": 45,
    "status": "PUBLISHED",
    "metaTitle": "Multani Mitti Neem Turmeric Blend 100g | Shree Vidhi Organics",
    "metaDescription": "Pure Multani Mitti, Neem & Turmeric blend powder for face and body. Deep cleansing, oil control, and skin brightening. 100g.",
    "images": [
      {
        "id": "img-mnt-1",
        "url": "/pictures/products/multani-neem-turmeric.png",
        "alt": "Shree Vidhi Multani Mitti Neem Turmeric Blend 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      },
      {
        "id": "img-mnt-2",
        "url": "/pictures/products/multani-neem-turmeric-back.png",
        "alt": "Shree Vidhi Multani Mitti Neem Turmeric Blend Back Ingredient & Ritual Label",
        "isPrimary": false,
        "displayOrder": 2
      },
      {
        "id": "img-mnt-3",
        "url": "/pictures/products/multani-neem-turmeric-why.png",
        "alt": "Why Choose Shree Vidhi Multani Mitti Neem Turmeric Blend",
        "isPrimary": false,
        "displayOrder": 3
      },
      {
        "id": "img-mnt-4",
        "url": "/pictures/products/multani-neem-turmeric-benefits.jpg",
        "alt": "Multani Mitti Neem Turmeric Synergistic Clarifying Benefits",
        "isPrimary": false,
        "displayOrder": 4
      }
    ],
    "variants": [
      {
        "id": "var-mnt-100",
        "productId": "prod-multani-neem-turmeric",
        "title": "100g",
        "size": "100g",
        "mrp": 199,
        "price": 149,
        "stock": 100
      }
    ],
    "createdAt": "2026-02-01T09:00:00+05:30"
  },
  {
    "id": "prod-vedic-blend",
    "name": "Shree Vidhi Vedic Blend - 15 Shaktishali Samagri Natural Powder Face Wash & Face Mask (50g)",
    "slug": "shree-vidhi-vedic-blend-50g",
    "sku": "SVO-VB-050",
    "categoryId": "cat-facepacks",
    "categoryName": "Ubtan & Face Packs",
    "shortDesc": "Handcrafted with 15 sacred Ayurvedic botanicals including Kapur Kachri, Chandan, Mulethi, and Wild Turmeric for daily deep cleansing and radiant glow.",
    "description": "This mixture of Kapur Kachri, Multani Mitti, Barley Powder, Chandan Powder, Red Lentils Powder, Gram Flour, Aloe Vera Powder, Wild Turmeric, Mulethi Powder, Neem Powder, Tulsi Powder, Rose Powder, Beetroot Powder, Orange Peel Powder, and Brown Rice Powder mixed with curd contains ingredients known for extraordinary skin rejuvenation.\n\n**Key Clinical Benefits:**\n- **Acne:** The antimicrobial and anti-inflammatory properties of Neem, Tulsi, and Wild Turmeric help calm breakouts.\n- **Oily Skin:** Multani Mitti and Gram Flour absorb excess sebum without stripping moisture.\n- **Dull Skin:** Gentle botanical exfoliators brighten complexion and lift stubborn tan.\n- **Hyperpigmentation:** Chandan, Mulethi, and Orange Peel powder help fade dark spots.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • FSSAI Lic. No. 12221036000261. Shelf Life: 3 Years.",
    "keyBenefits": [
      "15 Sacred Ayurvedic ingredients in one luxurious blend",
      "Cleanses as a daily face wash or intensive weekly mask",
      "Fades hyperpigmentation, acne blemishes, and sun tan",
      "Balances skin pH and tightens enlarged pores naturally"
    ],
    "ingredientsText": "Kapur Kachri, Multani Mitti, Barley, Chandan, Red Lentils, Gram Flour, Aloe Vera, Wild Turmeric, Mulethi, Neem, Tulsi, Rose, Beetroot, Orange Peel, Brown Rice.",
    "howToUse": "Take 1 tablespoon. For face wash: mix with warm water and massage for 1 minute. For face mask: mix with curd or rose water, apply for 15 minutes, and rinse.",
    "whoItIsFor": "All skin types desiring an authentic, chemical-free Vedic facial ritual.",
    "storageInfo": "Store in the stainless steel jar in a cool, dry place.",
    "shippingInfo": "Dispatched within 24 hours. Free express shipping above ₹499.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 399,
    "salePrice": 299,
    "stock": 80,
    "lowStockAlert": 15,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": true,
    "rating": 4.95,
    "reviewCount": 54,
    "status": "PUBLISHED",
    "metaTitle": "Vedic Blend 15-Ingredient Powder Face Wash 50g | Shree Vidhi Organics",
    "metaDescription": "Shree Vidhi Vedic Blend - 15 potent Ayurvedic ingredients for glowing, blemish-free skin. 50g.",
    "images": [
      {
        "id": "img-vb-1",
        "url": "/pictures/products/vedic-blend.png",
        "alt": "Shree Vidhi Vedic Blend 15 Shaktishali Samagri Steel Jar",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-vb-50",
        "productId": "prod-vedic-blend",
        "title": "50g",
        "size": "50g",
        "mrp": 399,
        "price": 299,
        "stock": 80
      }
    ],
    "createdAt": "2026-02-10T11:00:00+05:30"
  },
  {
    "id": "prod-aloe-vera-gel",
    "name": "Shree Vidhi 100% Pure Aloe Vera Gel for Skin & Hair (200ml)",
    "slug": "shree-vidhi-aloe-vera-gel-200ml",
    "sku": "SVO-AVG-200",
    "categoryId": "cat-skin",
    "categoryName": "Skin Care",
    "shortDesc": "Pure soothing aloe vera gel. Hydrates parched skin, calms sunburn and razor irritation, and acts as a lightweight leave-in hair conditioner.",
    "description": "Aloe vera juice deeply hydrates, smooths, and promotes epidermal healing. Formulated with a balanced pH to ensure silky texture and rapid skin absorption without greasy residue.\n\n**Government Certified:** AYUSH Lic. No. 890-AYU • FSSAI Lic. No. 12223024000403. Net Quantity: 200 ML.",
    "keyBenefits": [
      "Deep soothing hydration for face, body, and scalp",
      "Calms sunburn, rashes, and shaving irritation instantly",
      "Tames frizzy hair and conditions dry split ends",
      "Clean, lightweight formula that absorbs within seconds"
    ],
    "ingredientsText": "Pure Aloe Vera Juice, Carbomer, Glycerin, DM Water, DMDM Hydantoin, Natural Fragrance.",
    "howToUse": "Apply generously on clean face, body, or hair strands. Massage gently until fully absorbed. Use day and night.",
    "whoItIsFor": "Ideal for dry, irritated, sunburned, or sensitive skin and frizzy hair.",
    "storageInfo": "Store in a cool place away from direct sunlight.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 275,
    "salePrice": 199,
    "stock": 110,
    "lowStockAlert": 15,
    "isFeatured": true,
    "isBestseller": false,
    "isNewArrival": true,
    "rating": 4.88,
    "reviewCount": 33,
    "status": "PUBLISHED",
    "metaTitle": "Pure Aloe Vera Gel 200ml for Skin & Hair | Shree Vidhi Organics",
    "metaDescription": "100% pure aloe vera gel for face hydration, sunburn relief, and hair smoothing. 200ml pump bottle.",
    "images": [
      {
        "id": "img-avg-1",
        "url": "/pictures/products/aloe-vera-gel.png",
        "alt": "Shree Vidhi Pure Aloe Vera Gel 200ml Pump Bottle",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-avg-200",
        "productId": "prod-aloe-vera-gel",
        "title": "200ml",
        "size": "200ml",
        "mrp": 275,
        "price": 199,
        "stock": 110
      }
    ],
    "createdAt": "2026-02-12T12:00:00+05:30"
  },
  {
    "id": "prod-sarva-kesh-blend",
    "name": "Shree Vidhi Sarva Kesh Blend - Complete Ayurvedic Hair Mask (100g)",
    "slug": "shree-vidhi-sarva-kesh-blend-100g",
    "sku": "SVO-SKB-100",
    "categoryId": "cat-hair",
    "categoryName": "Hair Care",
    "shortDesc": "All-in-one cleanser, conditioner, and growth enhancer powered by Henna, Neem, Reetha, Shikakai, Amla, Kapur Kachri, Methi, and Hibiscus.",
    "description": "A master blend of 8 sacred hair-care herbs. Henna and Hibiscus impart natural conditioning, shine, and soft bounce. Amla, Reetha, and Shikakai gently purify the scalp while building follicular density. Kapur Kachri and Methi stimulate micro-circulation to drastically cut down hair fall.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • FSSAI Lic. No. 12221036000261. Shelf Life: 3 Years.",
    "keyBenefits": [
      "Complete 8-in-1 Ayurvedic hair nutrition and scalp detox",
      "Reduces hair breakage, split ends, and thinning",
      "Natural herbal conditioning — eliminates frizz without silicones",
      "Stimulates roots for thicker, stronger hair density"
    ],
    "ingredientsText": "Henna, Neem, Reetha, Shikakai, Amla, Kapur Kachri, Methi, Hibiscus.",
    "howToUse": "Mix 2-3 tablespoons with warm water, curd, or brewed tea into a thick paste. Apply evenly from roots to ends. Leave for 30–45 minutes and rinse thoroughly with plain water.",
    "whoItIsFor": "Ideal for damaged hair, chronic hair fall, dandruff, and dull limp strands.",
    "storageInfo": "Store in a cool dry place. Keep pouch zipped tight.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 199,
    "salePrice": 149,
    "stock": 95,
    "lowStockAlert": 15,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "rating": 4.93,
    "reviewCount": 49,
    "status": "PUBLISHED",
    "metaTitle": "Sarva Kesh Blend Ayurvedic Hair Mask 100g | Shree Vidhi Organics",
    "metaDescription": "8-in-1 Ayurvedic hair mask with Henna, Amla, Reetha, Shikakai, Kapur Kachri, Methi, Hibiscus. 100g.",
    "images": [
      {
        "id": "img-skb-1",
        "url": "/pictures/products/sarva-kesh-blend.png",
        "alt": "Shree Vidhi Sarva Kesh Blend 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-skb-100",
        "productId": "prod-sarva-kesh-blend",
        "title": "100g",
        "size": "100g",
        "mrp": 199,
        "price": 149,
        "stock": 95
      }
    ],
    "createdAt": "2026-01-20T14:00:00+05:30"
  },
  {
    "id": "prod-amla-reetha-shikakai",
    "name": "Shree Vidhi Amla Reetha Shikakai Blend - Traditional Ayurvedic Hair Cleansing Powder (100g)",
    "slug": "shree-vidhi-amla-reetha-shikakai-blend-100g",
    "sku": "SVO-ARS-100",
    "categoryId": "cat-hair",
    "categoryName": "Hair Care",
    "shortDesc": "The timeless Ayurvedic trio of Amla, Reetha, and Shikakai to gently cleanse scalp, eliminate dandruff, and impart natural bounce.",
    "description": "The classical herbal hair cleanser. Reetha creates a gentle botanical foam that purifies the scalp, Shikakai softens and untangles strands while preserving natural lipid moisture, and Amla infuses roots with natural Vitamin C to stop premature greying.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • FSSAI Lic. No. 12221036000261. Shelf Life: 3 Years.",
    "keyBenefits": [
      "100% natural chemical-free alternative to sulfate shampoos",
      "Cleanses grease and buildup without drying the scalp",
      "Prevents premature greying and strengthens follicles",
      "Imparts silky softness, volume, and natural shine"
    ],
    "ingredientsText": "Pure Amla (Emblica officinalis), Reetha (Sapindus mukorossi), and Shikakai (Acacia concinna) powders.",
    "howToUse": "Boil 2 tablespoons in 2 cups of water for 5 minutes, let cool and strain, or mix powder directly with warm water into a paste. Massage into wet scalp like a shampoo and rinse.",
    "whoItIsFor": "Anyone switching from chemical shampoos to authentic Ayurvedic hair washes.",
    "storageInfo": "Store in a cool dry place.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 199,
    "salePrice": 149,
    "stock": 105,
    "lowStockAlert": 15,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "rating": 4.91,
    "reviewCount": 42,
    "status": "PUBLISHED",
    "metaTitle": "Amla Reetha Shikakai Powder 100g | Shree Vidhi Organics",
    "metaDescription": "Pure Ayurvedic Amla Reetha Shikakai blend for natural shampooing, hair fall control, and root strengthening. 100g.",
    "images": [
      {
        "id": "img-ars-1",
        "url": "/pictures/products/amla-reetha-shikakai-blend.png",
        "alt": "Shree Vidhi Amla Reetha Shikakai Blend 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-ars-100",
        "productId": "prod-amla-reetha-shikakai",
        "title": "100g",
        "size": "100g",
        "mrp": 199,
        "price": 149,
        "stock": 105
      }
    ],
    "createdAt": "2026-01-22T10:00:00+05:30"
  },
  {
    "id": "prod-natural-scrub-blend",
    "name": "Shree Vidhi Natural Scrub Blend - Ayurvedic Exfoliating Face & Body Scrub (100g)",
    "slug": "shree-vidhi-natural-scrub-blend-100g",
    "sku": "SVO-NSB-100",
    "categoryId": "cat-facepacks",
    "categoryName": "Ubtan & Face Packs",
    "shortDesc": "Traditional botanical scrub blend with pulses, grains, and herbs to unclog pores, lift dead cells, and smooth rough skin texture.",
    "description": "Coarsely milled whole grains and healing Ayurvedic botanicals work gently to buff away dead stratum corneum cells, stubborn blackheads, and environmental tan without micro-tears. Leaves skin velvety soft and breathing free.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Gentle non-abrasive natural exfoliation for face and body",
      "Clears stubborn blackheads and clears clogged pores",
      "Smooths rough elbows, knees, and strawberry skin",
      "Imparts an instant refined glow and velvety softness"
    ],
    "ingredientsText": "Barley Grains, Masur Dal (Red Lentils), Gram Flour, Rice Powder, Turmeric, Sandalwood.",
    "howToUse": "Mix 1-2 tablespoons with milk, curd, or rose water. Massage gently onto damp skin in circular motions for 2-3 minutes. Rinse with water.",
    "whoItIsFor": "Dull, flaky, rough, or congested skin.",
    "storageInfo": "Keep dry and airtight.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 199,
    "salePrice": 149,
    "stock": 70,
    "lowStockAlert": 10,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "rating": 4.86,
    "reviewCount": 26,
    "status": "PUBLISHED",
    "metaTitle": "Natural Scrub Blend 100g | Shree Vidhi Organics",
    "metaDescription": "Pure Ayurvedic exfoliating scrub blend for face and body. 100g.",
    "images": [
      {
        "id": "img-nsb-1",
        "url": "/pictures/products/natural-scrub-blend.png",
        "alt": "Shree Vidhi Natural Scrub Blend 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-nsb-100",
        "productId": "prod-natural-scrub-blend",
        "title": "100g",
        "size": "100g",
        "mrp": 199,
        "price": 149,
        "stock": 70
      }
    ],
    "createdAt": "2026-01-25T15:00:00+05:30"
  },
  {
    "id": "prod-shagun-haldi",
    "name": "Shree Vidhi Shagun Haldi - Traditional Bridal & Celebratory Glow Blend (100g)",
    "slug": "shree-vidhi-shagun-haldi-100g",
    "sku": "SVO-SH-100",
    "categoryId": "cat-skin",
    "categoryName": "Skin Care",
    "shortDesc": "Auspicious celebratory turmeric and sandalwood blend handcrafted for bridal ceremonies, festivities, and deep luminous radiance.",
    "description": "Prepared according to sacred Vedic tradition, Shagun Haldi combines golden ceremonial turmeric with cooling sandalwood and fragrant floral herbs. It purifies the aura, blesses the skin with an ethereal golden glow, and soothes wedding-day stress.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Sacred celebratory blend for brides, grooms, and festivities",
      "Creates a luminous, long-lasting golden bridal glow",
      "Soothes sensitive skin and refines texture",
      "100% authentic pure herbs — zero synthetic dyes or chemical fragrances"
    ],
    "ingredientsText": "Aromatic Turmeric, Pure Chandan, Multani Mitti, Rose Petals, Gram Flour.",
    "howToUse": "Mix with raw milk, rose water, or fresh malai into a rich paste. Apply all over face, neck, and arms. Rinse after 15-20 minutes.",
    "whoItIsFor": "Brides, grooms, festival rituals, and anyone wanting an auspicious golden glow.",
    "storageInfo": "Store in a cool dry place.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 199,
    "salePrice": 149,
    "stock": 85,
    "lowStockAlert": 10,
    "isFeatured": true,
    "isBestseller": false,
    "isNewArrival": false,
    "rating": 4.94,
    "reviewCount": 35,
    "status": "PUBLISHED",
    "metaTitle": "Shagun Haldi Bridal Blend 100g | Shree Vidhi Organics",
    "metaDescription": "Authentic Vedic bridal Haldi & Chandan blend for celebrations and weddings. 100g.",
    "images": [
      {
        "id": "img-sh-1",
        "url": "/pictures/products/shagun-haldi.png",
        "alt": "Shree Vidhi Shagun Haldi 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-sh-100",
        "productId": "prod-shagun-haldi",
        "title": "100g",
        "size": "100g",
        "mrp": 199,
        "price": 149,
        "stock": 85
      }
    ],
    "createdAt": "2026-01-26T12:00:00+05:30"
  },
  {
    "id": "prod-multani-mitti",
    "name": "Shree Vidhi 100% Pure Multani Mitti (Fuller's Earth) Powder (100g)",
    "slug": "shree-vidhi-pure-multani-mitti-100g",
    "sku": "SVO-MM-100",
    "categoryId": "cat-facepacks",
    "categoryName": "Ubtan & Face Packs",
    "shortDesc": "Pure micro-fine Fuller's Earth powder. Draws out deep impurities, absorbs grease, and cools summer heat.",
    "description": "Authentic Indian clay rich in magnesium chloride. Deeply unclogs sebum pores, dries active acne, and tightens sagging skin.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Absorbs excess oil and eliminates grease shine",
      "Draws out blackheads, pollutants, and sebum plugs",
      "Shrinks visible open pores and cools inflamed skin",
      "Pure single-origin clay without stone grit or chemical bleaching"
    ],
    "ingredientsText": "100% Pure Fuller's Earth (Multani Mitti) clay powder.",
    "howToUse": "Mix with rose water into a creamy paste. Apply for 10-15 minutes until almost dry. Rinse gently with cool water.",
    "whoItIsFor": "Oily, combination, and acne-prone skin.",
    "storageInfo": "Keep dry and tightly sealed.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 149,
    "salePrice": 99,
    "stock": 150,
    "lowStockAlert": 20,
    "isFeatured": false,
    "isBestseller": true,
    "isNewArrival": false,
    "rating": 4.89,
    "reviewCount": 58,
    "status": "PUBLISHED",
    "metaTitle": "Pure Multani Mitti Powder 100g | Shree Vidhi Organics",
    "metaDescription": "100% natural Fuller's Earth clay powder for oil control and acne care. 100g.",
    "images": [
      {
        "id": "img-mm-1",
        "url": "/pictures/products/multani-mitti.png",
        "alt": "Shree Vidhi Pure Multani Mitti Powder 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-mm-100",
        "productId": "prod-multani-mitti",
        "title": "100g",
        "size": "100g",
        "mrp": 149,
        "price": 99,
        "stock": 150
      }
    ],
    "createdAt": "2026-01-28T09:00:00+05:30"
  },
  {
    "id": "prod-chandan-powder",
    "name": "Shree Vidhi Pure Chandan (Sandalwood) Powder for Face & Skin (50g)",
    "slug": "shree-vidhi-chandan-sandalwood-powder-50g",
    "sku": "SVO-CP-050",
    "categoryId": "cat-skin",
    "categoryName": "Skin Care",
    "shortDesc": "Cooling, fragrant authentic sandalwood powder. Calms redness, soothes sunburn, and brightens complexion with divine aroma.",
    "description": "Revered across centuries for its Pitta-pacifying cooling energy, Chandan powder relieves prickly heat, calms inflamed blemishes, and imparts an ethereal, velvety matte finish.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Calms acute skin inflammation, acne redness, and sunburn",
      "Fades dark blemishes and balances uneven skin tone",
      "Naturally cooling with authentic therapeutic sandalwood aroma",
      "100% botanical — zero synthetic perfume oils"
    ],
    "ingredientsText": "100% Pure Sandalwood (Santalum album) Bark & Heartwood Powder.",
    "howToUse": "Mix 1 teaspoon with chilled rose water or raw milk. Apply for 15 minutes. Rinse with cool water.",
    "whoItIsFor": "Sensitive, acne-prone, sunburned, or overheated skin.",
    "storageInfo": "Store in an airtight jar in a cool, dark place.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 149,
    "salePrice": 119,
    "stock": 75,
    "lowStockAlert": 10,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "rating": 4.96,
    "reviewCount": 44,
    "status": "PUBLISHED",
    "metaTitle": "Pure Chandan Sandalwood Powder 50g | Shree Vidhi Organics",
    "metaDescription": "Authentic soothing sandalwood powder for face glow, acne calming, and cooling skin rituals. 50g.",
    "images": [
      {
        "id": "img-cp-1",
        "url": "/pictures/products/chandan-powder.png",
        "alt": "Shree Vidhi Pure Chandan Powder 50g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-cp-50",
        "productId": "prod-chandan-powder",
        "title": "50g",
        "size": "50g",
        "mrp": 149,
        "price": 119,
        "stock": 75
      }
    ],
    "createdAt": "2026-01-29T10:00:00+05:30"
  },
  {
    "id": "prod-neem-powder",
    "name": "Shree Vidhi Pure Neem Powder - Antibacterial & Antifungal Purifier (50g)",
    "slug": "shree-vidhi-neem-powder-50g",
    "sku": "SVO-NP-050",
    "categoryId": "cat-powders",
    "categoryName": "Herbal Powders",
    "shortDesc": "Potent organic neem leaf powder to purify oily and acne-prone skin and relieve stubborn scalp flakiness and dandruff.",
    "description": "Derived from shade-dried organic Azadirachta indica leaves, Neem powder possesses powerful nimbidin and azadirachtin compounds that disinfect active pimples, purify blood, and soothe scalp itching.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Fights stubborn acne bacteria and dries cystic pimples",
      "Eliminates dandruff fungi and scalp irritation",
      "Deeply purifies pores of environmental pollutants",
      "100% pure shade-dried organic neem leaves"
    ],
    "ingredientsText": "100% Pure Neem (Azadirachta indica) Leaf Powder.",
    "howToUse": "For face: blend with rose water or aloe gel as a spot treatment for 10 minutes. For scalp: mix with curd or warm water and apply for 30 minutes before shampooing.",
    "whoItIsFor": "Oily, blemish-prone skin and dandruff-prone scalps.",
    "storageInfo": "Keep dry and sealed.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 149,
    "salePrice": 99,
    "stock": 100,
    "lowStockAlert": 15,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "rating": 4.88,
    "reviewCount": 31,
    "status": "PUBLISHED",
    "metaTitle": "Pure Neem Powder 50g | Shree Vidhi Organics",
    "metaDescription": "Pure antibacterial neem leaf powder for acne care and dandruff control. 50g.",
    "images": [
      {
        "id": "img-np-1",
        "url": "/pictures/products/neem-powder.png",
        "alt": "Shree Vidhi Pure Neem Powder 50g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-np-50",
        "productId": "prod-neem-powder",
        "title": "50g",
        "size": "50g",
        "mrp": 149,
        "price": 99,
        "stock": 100
      }
    ],
    "createdAt": "2026-01-30T11:00:00+05:30"
  },
  {
    "id": "prod-tulsi-powder",
    "name": "Shree Vidhi Pure Tulsi (Holy Basil) Powder (50g)",
    "slug": "shree-vidhi-tulsi-powder-50g",
    "sku": "SVO-TP-050",
    "categoryId": "cat-powders",
    "categoryName": "Herbal Powders",
    "shortDesc": "Sacred holy basil rich in eugenol and antioxidants. Protects against free radicals and cleanses skin deeply.",
    "description": "Known as the Queen of Herbs, Tulsi (*Ocimum sanctum*) is cherished for its detoxifying, anti-aging, and skin-clearing powers. It relieves environmental oxidative stress and balances natural sebum.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Rich in eugenol and flavonoids to combat oxidative aging",
      "Cleanses deep impurities and reduces blackheads",
      "Soothes itchy scalp and calms minor skin irritations",
      "Pure aromatic holy basil leaves"
    ],
    "ingredientsText": "100% Pure Krishna Tulsi (Ocimum sanctum) Leaf Powder.",
    "howToUse": "Mix 1 teaspoon with honey or rose water. Apply for 15 minutes and rinse thoroughly with cool water.",
    "whoItIsFor": "Dull, congested, or pollution-exposed skin.",
    "storageInfo": "Keep dry and airtight.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 149,
    "salePrice": 99,
    "stock": 90,
    "lowStockAlert": 10,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "rating": 4.87,
    "reviewCount": 24,
    "status": "PUBLISHED",
    "metaTitle": "Pure Tulsi Powder 50g | Shree Vidhi Organics",
    "metaDescription": "Pure holy basil powder for detoxifying skin packs and herbal care. 50g.",
    "images": [
      {
        "id": "img-tp-1",
        "url": "/pictures/products/tulsi-powder.png",
        "alt": "Shree Vidhi Pure Tulsi Powder 50g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-tp-50",
        "productId": "prod-tulsi-powder",
        "title": "50g",
        "size": "50g",
        "mrp": 149,
        "price": 99,
        "stock": 90
      }
    ],
    "createdAt": "2026-02-01T12:00:00+05:30"
  },
  {
    "id": "prod-aloe-vera-powder",
    "name": "Shree Vidhi Pure Aloe Vera Leaf Powder (50g)",
    "slug": "shree-vidhi-aloe-vera-powder-50g",
    "sku": "SVO-AVP-050",
    "categoryId": "cat-powders",
    "categoryName": "Herbal Powders",
    "shortDesc": "Concentrated dehydrated aloe vera for intensely hydrating face packs and restorative hair spa masks.",
    "description": "Pure botanical Aloe Vera powder preserves essential polysaccharides and enzymes that rehydrate parched skin and revitalize brittle hair fibers.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Infuses deep moisture into thirsty skin cells",
      "Smoothes cuticles and detangles dry hair",
      "Calms redness and promotes cell renewal",
      "100% pure dried aloe vera inner gel powder"
    ],
    "ingredientsText": "100% Pure Aloe Barbadensis Leaf Powder.",
    "howToUse": "Rehydrate 1 teaspoon with warm water, rose water, or curd into a soothing jelly. Apply on face or scalp for 20 minutes.",
    "whoItIsFor": "Dry, dehydrated, or sensitive skin and brittle hair.",
    "storageInfo": "Store sealed away from moisture.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 149,
    "salePrice": 99,
    "stock": 80,
    "lowStockAlert": 10,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "rating": 4.85,
    "reviewCount": 21,
    "status": "PUBLISHED",
    "metaTitle": "Pure Aloe Vera Powder 50g | Shree Vidhi Organics",
    "metaDescription": "Pure botanical aloe vera leaf powder for face hydration and hair masks. 50g.",
    "images": [
      {
        "id": "img-avp-1",
        "url": "/pictures/products/aloe-vera-powder.png",
        "alt": "Shree Vidhi Pure Aloe Vera Powder 50g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-avp-50",
        "productId": "prod-aloe-vera-powder",
        "title": "50g",
        "size": "50g",
        "mrp": 149,
        "price": 99,
        "stock": 80
      }
    ],
    "createdAt": "2026-02-02T10:00:00+05:30"
  },
  {
    "id": "prod-moringa-powder",
    "name": "Shree Vidhi Pure Moringa Leaf Powder - Natural Superfood (100g)",
    "slug": "shree-vidhi-moringa-leaf-powder-100g",
    "sku": "SVO-MOR-100",
    "categoryId": "cat-wellness",
    "categoryName": "Wellness & Superfoods",
    "shortDesc": "Nutrient-dense superfood packed with plant protein, iron, calcium, and antioxidants for daily vitality, immunity, and skin radiance.",
    "description": "Known as the Miracle Tree, Moringa (*Moringa oleifera*) contains 7x more Vitamin C than oranges and 4x more calcium than milk. It revitalizes body energy, purifies toxins, and promotes lustrous hair and clear skin.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • FSSAI Lic. No. 12221036000261. Shelf Life: 3 Years.",
    "keyBenefits": [
      "Over 90 essential bio-nutrients and 46 active antioxidants",
      "Boosts natural immune defense and combats chronic fatigue",
      "Supports healthy digestion and metabolism",
      "Can be consumed in smoothies or used in clarifying face masks"
    ],
    "ingredientsText": "100% Pure Organic Moringa oleifera Leaf Powder.",
    "howToUse": "Take 1 teaspoon (3–5g) daily mixed into morning warm water, juice, dal, or smoothie. Can also be blended with honey as a nutrient-rich face mask.",
    "whoItIsFor": "Anyone seeking clean, natural vitality, immunity support, and daily nutrient defense.",
    "storageInfo": "Store in an airtight container in a dry place.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 199,
    "salePrice": 149,
    "stock": 85,
    "lowStockAlert": 10,
    "isFeatured": true,
    "isBestseller": false,
    "isNewArrival": true,
    "rating": 4.9,
    "reviewCount": 37,
    "status": "PUBLISHED",
    "metaTitle": "Pure Moringa Leaf Powder 100g | Shree Vidhi Organics",
    "metaDescription": "100% pure organic moringa leaf superfood powder for immunity, energy, and radiant skin. 100g.",
    "images": [
      {
        "id": "img-mor-1",
        "url": "/pictures/products/moringa-powder.png",
        "alt": "Shree Vidhi Pure Moringa Powder 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-mor-100",
        "productId": "prod-moringa-powder",
        "title": "100g",
        "size": "100g",
        "mrp": 199,
        "price": 149,
        "stock": 85
      }
    ],
    "createdAt": "2026-02-03T11:00:00+05:30"
  },
  {
    "id": "prod-amla-powder",
    "name": "Shree Vidhi Pure Amla (Indian Gooseberry) Powder (100g)",
    "slug": "shree-vidhi-amla-powder-100g",
    "sku": "SVO-AML-100",
    "categoryId": "cat-hair",
    "categoryName": "Hair Care",
    "shortDesc": "Richest natural source of Vitamin C. Strengthens hair follicles from roots, halts premature greying, and boosts collagen.",
    "description": "Shade-dried and pulverized wild Indian Gooseberries (*Phyllanthus emblica*). Delivers concentrated polyphenols and tannins that halt hair thinning, strengthen keratin roots, and condition hair with brilliant luster.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Stimulates hair roots and delays premature greying",
      "High natural Vitamin C stimulates scalp collagen",
      "Cleanses product buildup and calms dandruff",
      "100% pure edible-grade wild gooseberry powder"
    ],
    "ingredientsText": "100% Pure Amla (Emblica officinalis) Fruit Powder.",
    "howToUse": "Mix with warm water, curd, or coconut oil into a mask. Apply on scalp for 30–45 minutes and rinse. Can also be consumed with warm water (1/2 tsp daily).",
    "whoItIsFor": "Anyone with hair thinning, early grey strands, or weak roots.",
    "storageInfo": "Keep in an airtight jar in a cool place.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 199,
    "salePrice": 149,
    "stock": 115,
    "lowStockAlert": 15,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "rating": 4.92,
    "reviewCount": 51,
    "status": "PUBLISHED",
    "metaTitle": "Pure Amla Powder 100g | Shree Vidhi Organics",
    "metaDescription": "Pure Indian Gooseberry powder for hair growth, root strengthening, and anti-greying. 100g.",
    "images": [
      {
        "id": "img-aml-1",
        "url": "/pictures/products/amla-powder.png",
        "alt": "Shree Vidhi Pure Amla Powder 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-aml-100",
        "productId": "prod-amla-powder",
        "title": "100g",
        "size": "100g",
        "mrp": 199,
        "price": 149,
        "stock": 115
      }
    ],
    "createdAt": "2026-02-04T09:00:00+05:30"
  },
  {
    "id": "prod-reetha-powder",
    "name": "Shree Vidhi Pure Reetha (Soapnut) Powder for Hair & Scalp (100g)",
    "slug": "shree-vidhi-reetha-powder-100g",
    "sku": "SVO-RTH-100",
    "categoryId": "cat-hair",
    "categoryName": "Hair Care",
    "shortDesc": "Natural botanical foaming cleanser with mild saponins that wash scalp clean without stripping natural protective oils.",
    "description": "Authentic dried soapnuts (*Sapindus mukorossi*). Reetha produces a delicate natural lather that washes away excess scalp sebum, dandruff flakes, and styling residues without artificial chemical foaming agents.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Natural herbal soaping agent — zero sulfates",
      "Balances oily scalps and controls dandruff",
      "Imparts a silky clean feel and natural root lift",
      "Gentle enough for sensitive and allergy-prone scalps"
    ],
    "ingredientsText": "100% Pure Dried Reetha (Sapindus mukorossi) Shell Powder.",
    "howToUse": "Mix 2 tablespoons with warm water into a liquid wash. Massage into wet scalp until it lathers slightly. Rinse thoroughly.",
    "whoItIsFor": "Oily scalps, product buildup, and sensitive scalp conditions.",
    "storageInfo": "Store in a dry place.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 199,
    "salePrice": 149,
    "stock": 90,
    "lowStockAlert": 10,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "rating": 4.88,
    "reviewCount": 30,
    "status": "PUBLISHED",
    "metaTitle": "Pure Reetha Soapnut Powder 100g | Shree Vidhi Organics",
    "metaDescription": "Pure natural soapnut cleanser for chemical-free hair washing and scalp detox. 100g.",
    "images": [
      {
        "id": "img-rth-1",
        "url": "/pictures/products/reetha-powder.png",
        "alt": "Shree Vidhi Pure Reetha Powder 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-rth-100",
        "productId": "prod-reetha-powder",
        "title": "100g",
        "size": "100g",
        "mrp": 199,
        "price": 149,
        "stock": 90
      }
    ],
    "createdAt": "2026-02-05T10:00:00+05:30"
  },
  {
    "id": "prod-hibiscus-powder",
    "name": "Shree Vidhi Pure Hibiscus Flower Powder for Hair Growth & Shine (100g)",
    "slug": "shree-vidhi-hibiscus-powder-100g",
    "sku": "SVO-HIB-100",
    "categoryId": "cat-hair",
    "categoryName": "Hair Care",
    "shortDesc": "Made from shade-dried red hibiscus petals. Deeply conditions strands, stimulates root volume, and adds lustrous mirror shine.",
    "description": "Known in Sanskrit as *Japapushpa*, Hibiscus petals are packed with natural mucilage, amino acids, and alpha-hydroxy acids that lock in hydration, condition coarse texture, and nourish dormant hair follicles.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Deep herbal conditioning — leaves hair glossy and mirror-smooth",
      "Natural mucilage prevents moisture loss and tames frizz",
      "Stimulates keratin synthesis for bouncy, fuller hair",
      "100% pure dried red hibiscus flower petals"
    ],
    "ingredientsText": "100% Pure Dried Red Hibiscus (Hibiscus rosa-sinensis) Flower Powder.",
    "howToUse": "Mix 2-3 tablespoons with yogurt, aloe vera, or water into a slippery crimson paste. Apply to hair from root to tip for 30 minutes. Rinse thoroughly.",
    "whoItIsFor": "Dry, frizzy, dull, or color-treated hair.",
    "storageInfo": "Keep sealed away from moisture.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 249,
    "salePrice": 179,
    "stock": 80,
    "lowStockAlert": 10,
    "isFeatured": true,
    "isBestseller": false,
    "isNewArrival": true,
    "rating": 4.94,
    "reviewCount": 39,
    "status": "PUBLISHED",
    "metaTitle": "Pure Hibiscus Flower Powder 100g | Shree Vidhi Organics",
    "metaDescription": "Pure dried hibiscus petal powder for deep hair conditioning, shine, and scalp health. 100g.",
    "images": [
      {
        "id": "img-hib-1",
        "url": "/pictures/products/hibiscus-powder.png",
        "alt": "Shree Vidhi Pure Hibiscus Powder 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-hib-100",
        "productId": "prod-hibiscus-powder",
        "title": "100g",
        "size": "100g",
        "mrp": 249,
        "price": 179,
        "stock": 80
      }
    ],
    "createdAt": "2026-02-06T11:00:00+05:30"
  },
  {
    "id": "prod-henna-powder",
    "name": "Shree Vidhi 100% Pure Rajasthani Sojat Henna (Mehendi) Powder (100g)",
    "slug": "shree-vidhi-henna-powder-100g",
    "sku": "SVO-HEN-100",
    "categoryId": "cat-hair",
    "categoryName": "Hair Care",
    "shortDesc": "Authentic triple-sifted micro-fine henna sourced directly from Sojat, Rajasthan. Deep herbal conditioning and rich reddish-brown tint.",
    "description": "Grown in the mineral-rich soils of Sojat, Rajasthan, renowned worldwide for high natural lawsone dye content. Provides rich earthy color coverage for grey hair while cooling the scalp and sealing hair cuticles with protective gloss.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "High natural lawsone dye content from authentic Sojat farms",
      "Naturally covers greys without harsh chemical PPD or ammonia",
      "Seals cuticles, prevents hair thinning, and provides UV protection",
      "Triple cloth-sifted for butter-smooth paste application"
    ],
    "ingredientsText": "100% Pure Sojat Henna (Lawsonia inermis) Leaf Powder.",
    "howToUse": "Soak in warm black tea or water for 2-4 hours. Apply to clean dry hair sections. Leave for 1-2 hours and rinse thoroughly with plain water.",
    "whoItIsFor": "Anyone looking for chemical-free hair coloring, root strengthening, and cooling scalp comfort.",
    "storageInfo": "Store in a cool dry place.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 149,
    "salePrice": 99,
    "stock": 130,
    "lowStockAlert": 20,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "rating": 4.93,
    "reviewCount": 56,
    "status": "PUBLISHED",
    "metaTitle": "Pure Sojat Henna Powder 100g | Shree Vidhi Organics",
    "metaDescription": "100% pure Rajasthani Sojat henna powder for natural hair conditioning and chemical-free grey coverage. 100g.",
    "images": [
      {
        "id": "img-hen-1",
        "url": "/pictures/products/henna-powder.png",
        "alt": "Shree Vidhi Pure Henna Powder 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-hen-100",
        "productId": "prod-henna-powder",
        "title": "100g",
        "size": "100g",
        "mrp": 149,
        "price": 99,
        "stock": 130
      }
    ],
    "createdAt": "2026-02-07T12:00:00+05:30"
  },
  {
    "id": "prod-rose-powder",
    "name": "Shree Vidhi Pure Desi Rose Petal Powder (50g)",
    "slug": "shree-vidhi-rose-petal-powder-50g",
    "sku": "SVO-RP-050",
    "categoryId": "cat-skin",
    "categoryName": "Skin Care",
    "shortDesc": "Aromatic dried rose petals ground into fine cosmetic powder. Enhances skin elasticity, balances pH, and imparts a soft rosy glow.",
    "description": "Milled from Indian Damask roses (*Rosa damascena*). Rich in Vitamin C and natural floral oils that tone sagging pores, quench dry skin, and soothe irritation with a divine natural scent.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Hydrates and tightens pores naturally",
      "Restores skin's natural acidic pH balance",
      "Imparts soft rosy glow and soothing floral aroma",
      "100% pure pesticide-free dried rose petals"
    ],
    "ingredientsText": "100% Pure Dried Rose (Rosa damascena) Petal Powder.",
    "howToUse": "Mix 1-2 teaspoons with raw milk, curd, or honey. Apply for 15 minutes. Rinse with cool water.",
    "whoItIsFor": "Normal, dry, sensitive, or aging skin.",
    "storageInfo": "Keep dry and airtight.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 149,
    "salePrice": 119,
    "stock": 85,
    "lowStockAlert": 10,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "rating": 4.91,
    "reviewCount": 32,
    "status": "PUBLISHED",
    "metaTitle": "Pure Rose Petal Powder 50g | Shree Vidhi Organics",
    "metaDescription": "Pure dried desi rose petal powder for skin toning, hydration, and rosy radiance. 50g.",
    "images": [
      {
        "id": "img-rp-1",
        "url": "/pictures/products/rose-powder.png",
        "alt": "Shree Vidhi Pure Rose Powder 50g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-rp-50",
        "productId": "prod-rose-powder",
        "title": "50g",
        "size": "50g",
        "mrp": 149,
        "price": 119,
        "stock": 85
      }
    ],
    "createdAt": "2026-02-08T09:00:00+05:30"
  },
  {
    "id": "prod-orange-peel-powder",
    "name": "Shree Vidhi Pure Orange Peel Powder - Packed with Vitamin C (50g)",
    "slug": "shree-vidhi-orange-peel-powder-50g",
    "sku": "SVO-OP-050",
    "categoryId": "cat-skin",
    "categoryName": "Skin Care",
    "shortDesc": "Natural citric acid and Vitamin C powerhouse. Gently scrubs away stubborn sun tan, lightens acne blemishes, and unclogs pores.",
    "description": "Sun-dried orange peels (*Citrus aurantium*) rich in natural alpha-hydroxy acids, hesperidin, and Vitamin C. Gently removes dead skin cells, clears dark tan lines, and clarifies oily pores.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Fades stubborn sun tan, dark spots, and acne pigmentation",
      "High natural Vitamin C stimulates collagen and brightening",
      "Regulates excess oil and clears dead skin cell buildup",
      "Leaves skin visibly luminous and energized"
    ],
    "ingredientsText": "100% Pure Dried Orange (Citrus aurantium) Peel Powder.",
    "howToUse": "Mix 1 teaspoon with honey, yogurt, or rose water. Apply on face for 10-12 minutes. Massage gently while rinsing.",
    "whoItIsFor": "Tanned, pigmented, oily, or dull skin.",
    "storageInfo": "Store in a cool dry place.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 149,
    "salePrice": 99,
    "stock": 95,
    "lowStockAlert": 15,
    "isFeatured": true,
    "isBestseller": false,
    "isNewArrival": false,
    "rating": 4.9,
    "reviewCount": 38,
    "status": "PUBLISHED",
    "metaTitle": "Pure Orange Peel Powder 50g | Shree Vidhi Organics",
    "metaDescription": "Pure Vitamin C orange peel powder for tan removal, blemish lightening, and skin glow. 50g.",
    "images": [
      {
        "id": "img-op-1",
        "url": "/pictures/products/orange-peel-powder.png",
        "alt": "Shree Vidhi Pure Orange Peel Powder 50g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-op-50",
        "productId": "prod-orange-peel-powder",
        "title": "50g",
        "size": "50g",
        "mrp": 149,
        "price": 99,
        "stock": 95
      }
    ],
    "createdAt": "2026-02-09T10:00:00+05:30"
  },
  {
    "id": "prod-methi-powder",
    "name": "Shree Vidhi Pure Methi (Fenugreek) Powder for Scalp & Hair Growth (50g)",
    "slug": "shree-vidhi-methi-powder-50g",
    "sku": "SVO-MP-050",
    "categoryId": "cat-hair",
    "categoryName": "Hair Care",
    "shortDesc": "High in nicotinic acid and protein. Deeply hydrates brittle hair, detangles knots, and visibly curtails severe hair fall.",
    "description": "Ground from finest whole fenugreek seeds (*Trigonella foenum-graecum*). Packed with lecithin, protein, and potassium that repair broken keratin bonds, soothe itchy dry scalp, and promote robust follicle regrowth.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Reduces chronic hair fall and repairs damaged hair fibers",
      "High natural mucilage detangles knots and softens dry ends",
      "Nourishes hair follicles with protein and nicotinic acid",
      "Soothes dry, flaky scalp and dandruff irritation"
    ],
    "ingredientsText": "100% Pure Fenugreek (Trigonella foenum-graecum) Seed Powder.",
    "howToUse": "Mix 2 tablespoons with curd or warm water into a slimy paste. Apply from roots to ends for 30 minutes. Rinse thoroughly.",
    "whoItIsFor": "Severe hair fall, thinning hair, dry scalp, and frizzy damaged strands.",
    "storageInfo": "Keep dry and airtight.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 149,
    "salePrice": 99,
    "stock": 100,
    "lowStockAlert": 15,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "rating": 4.91,
    "reviewCount": 47,
    "status": "PUBLISHED",
    "metaTitle": "Pure Methi Fenugreek Powder 50g | Shree Vidhi Organics",
    "metaDescription": "Pure fenugreek seed powder for stopping hair fall, repairing damage, and scalp nourishment. 50g.",
    "images": [
      {
        "id": "img-mp-1",
        "url": "/pictures/products/methi-powder.png",
        "alt": "Shree Vidhi Pure Methi Powder 50g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      },
      {
        "id": "img-mp-2",
        "url": "/pictures/products/methi-powder-why-infographic.png",
        "alt": "Why Choose Shree Vidhi Methi Powder",
        "isPrimary": false,
        "displayOrder": 2
      }
    ],
    "variants": [
      {
        "id": "var-mp-50",
        "productId": "prod-methi-powder",
        "title": "50g",
        "size": "50g",
        "mrp": 149,
        "price": 99,
        "stock": 100
      }
    ],
    "createdAt": "2026-02-10T14:00:00+05:30"
  },
  {
    "id": "prod-kaolin-clay",
    "name": "Shree Vidhi Pure Kaolin White Clay Powder for Sensitive Skin (100g)",
    "slug": "shree-vidhi-kaolin-clay-powder-100g",
    "sku": "SVO-KC-100",
    "categoryId": "cat-facepacks",
    "categoryName": "Ubtan & Face Packs",
    "shortDesc": "The gentlest cosmetic clay. Delicately cleanses and detoxifies sensitive, dry, and delicate skin without tightness or irritation.",
    "description": "A pure white silicate mineral clay with a neutral pH. Unlike heavier clays, Kaolin absorbs impurities and softens skin without causing dryness, making it suitable even for extremely delicate and reactive skin.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Gentlest cosmetic clay — perfect for dry and sensitive skin types",
      "Cleanses pores without stripping the epidermal moisture barrier",
      "Refines texture, calms redness, and creates a soft matte base",
      "100% pure cosmetic grade white kaolin clay"
    ],
    "ingredientsText": "100% Pure Cosmetic White Kaolin Clay.",
    "howToUse": "Mix with rose water or aloe vera gel. Apply for 10-15 minutes and rinse with lukewarm water.",
    "whoItIsFor": "Sensitive, dry, or delicate skin needing gentle detoxification.",
    "storageInfo": "Keep sealed in a dry location.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 199,
    "salePrice": 149,
    "stock": 70,
    "lowStockAlert": 10,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "rating": 4.88,
    "reviewCount": 22,
    "status": "PUBLISHED",
    "metaTitle": "Pure Kaolin Clay Powder 100g | Shree Vidhi Organics",
    "metaDescription": "Pure white kaolin clay powder for sensitive skin cleansing and pore detox. 100g.",
    "images": [
      {
        "id": "img-kc-1",
        "url": "/pictures/products/kaolin-clay.png",
        "alt": "Shree Vidhi Kaolin Clay Powder 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-kc-100",
        "productId": "prod-kaolin-clay",
        "title": "100g",
        "size": "100g",
        "mrp": 199,
        "price": 149,
        "stock": 70
      }
    ],
    "createdAt": "2026-02-11T10:00:00+05:30"
  },
  {
    "id": "prod-french-green-clay",
    "name": "Shree Vidhi Pure French Green Clay Powder for Pore Detox (100g)",
    "slug": "shree-vidhi-french-green-clay-100g",
    "sku": "SVO-FGC-100",
    "categoryId": "cat-facepacks",
    "categoryName": "Ubtan & Face Packs",
    "shortDesc": "Rich in montmorillonite minerals. Extracts deep impurities, shrinks visible pores, and controls stubborn acne.",
    "description": "Mined from volcanic earth deposits, French Green Clay is loaded with active iron oxides, kelp, and silica. Its ionic charge draws out deep subcutaneous toxins, reduces cystic congestion, and restores cellular micro-circulation.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Powerful pore-cleansing action draws out deep subcutaneous toxins",
      "Absorbs heavy excess oil and clears stubborn acne congestion",
      "Tones and tightens enlarged skin pores",
      "100% pure mineral-rich illite and montmorillonite clay"
    ],
    "ingredientsText": "100% Pure French Green Clay (Montmorillonite).",
    "howToUse": "Mix with rose water or apple cider vinegar diluted in water. Apply for 10-15 minutes until semi-dry. Rinse with cool water.",
    "whoItIsFor": "Oily, congested, acne-prone, or polluted skin.",
    "storageInfo": "Store sealed away from moisture.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 199,
    "salePrice": 149,
    "stock": 65,
    "lowStockAlert": 10,
    "isFeatured": true,
    "isBestseller": false,
    "isNewArrival": false,
    "rating": 4.92,
    "reviewCount": 36,
    "status": "PUBLISHED",
    "metaTitle": "French Green Clay Powder 100g | Shree Vidhi Organics",
    "metaDescription": "Pure French green clay for deep pore detox, oil control, and blemish care. 100g.",
    "images": [
      {
        "id": "img-fgc-1",
        "url": "/pictures/products/french-green-clay.png",
        "alt": "Shree Vidhi French Green Clay Powder 100g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-fgc-100",
        "productId": "prod-french-green-clay",
        "title": "100g",
        "size": "100g",
        "mrp": 199,
        "price": 149,
        "stock": 65
      }
    ],
    "createdAt": "2026-02-12T15:00:00+05:30"
  },
  {
    "id": "prod-mulethi-powder",
    "name": "Shree Vidhi Pure Mulethi (Licorice Root) Powder (50g)",
    "slug": "shree-vidhi-mulethi-licorice-powder-50g",
    "sku": "SVO-ML-050",
    "categoryId": "cat-skin",
    "categoryName": "Skin Care",
    "shortDesc": "Known for natural glabridin, a potent Ayurvedic skin-brightener that fades stubborn dark spots, pigmentation, and tanning.",
    "description": "Pulverized sweet licorice roots (*Glycyrrhiza glabra*). Contains active glabridin and liquiritin, which naturally inhibit tyrosinase enzyme activity to brighten sun spots, melasma marks, and post-acne blemishes without skin thinning.\n\n**Government Certified:** AYUSH Lic. No. RJ-1032-AYU • Shelf Life: 3 Years.",
    "keyBenefits": [
      "Natural glabridin clinically brightens hyperpigmentation",
      "Fades stubborn sun spots, acne scars, and dark patches",
      "Soothes sensitive, reddened, or inflamed skin",
      "100% pure wild-harvested licorice root"
    ],
    "ingredientsText": "100% Pure Licorice (Glycyrrhiza glabra) Root Powder.",
    "howToUse": "Mix 1 teaspoon with raw milk or rose water. Apply as a targeted spot treatment or full face mask for 15 minutes. Rinse with water.",
    "whoItIsFor": "Pigmented, sun-damaged, blemished, or uneven skin tones.",
    "storageInfo": "Store in a dry airtight jar.",
    "shippingInfo": "Dispatched within 24 hours.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 149,
    "salePrice": 99,
    "stock": 85,
    "lowStockAlert": 10,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "rating": 4.95,
    "reviewCount": 48,
    "status": "PUBLISHED",
    "metaTitle": "Pure Mulethi Licorice Powder 50g | Shree Vidhi Organics",
    "metaDescription": "Pure licorice root powder for fading pigmentation, dark spots, and sun tanning naturally. 50g.",
    "images": [
      {
        "id": "img-ml-1",
        "url": "/pictures/products/mulethi-powder.png",
        "alt": "Shree Vidhi Pure Mulethi Powder 50g front pouch",
        "isPrimary": true,
        "displayOrder": 1
      }
    ],
    "variants": [
      {
        "id": "var-ml-50",
        "productId": "prod-mulethi-powder",
        "title": "50g",
        "size": "50g",
        "mrp": 149,
        "price": 99,
        "stock": 85
      }
    ],
    "createdAt": "2026-02-13T10:00:00+05:30"
  },
  {
    "id": "prod-seabuckthorn-pulp",
    "name": "Shree Vidhi 100% Pure Himalayan Sea Buckthorn Pulp (500ml)",
    "slug": "shree-vidhi-sea-buckthorn-pulp-500ml",
    "sku": "SVO-SBT-500",
    "categoryId": "cat-wellness",
    "categoryName": "Wellness & Superfoods",
    "shortDesc": "Himalayan golden superberry juice rich in rare Omega 3, 6, 7 & 9, Vitamin C, and antioxidants for immunity, skin glow, and vitality.",
    "description": "Derived from wild-harvested Himalayan sea buckthorn berries (*Hippophae rhamnoides*). A veritable nutritional powerhouse packed with 190+ bioactive compounds, rare Omega-7 fatty acids that nourish mucous membranes and skin elasticity, and 12x more Vitamin C than oranges.\n\n**Government Certified:** FSSAI Lic. No. 12225999000643 • Shelf Life: 18 Months. Net Volume: 500 ML.",
    "keyBenefits": [
      "Rich in rare Omega-7, 3, 6, 9 for cell membrane regeneration",
      "Immense Vitamin C & E content for radiant skin glow",
      "Strengthens immune resistance, gut lining, and cardio health",
      "100% wild Himalayan sea buckthorn — no added sugar or artificial colors"
    ],
    "ingredientsText": "100% Pure Himalayan Sea Buckthorn (Hippophae rhamnoides) Berry Pulp & Juice.",
    "howToUse": "Dilute 20–30ml in a glass of room-temperature or lukewarm water. Drink once or twice daily on an empty stomach in the morning.",
    "whoItIsFor": "Anyone seeking total body rejuvenation, deep skin hydration, and robust immune health.",
    "storageInfo": "Keep in a cool dry place. Refrigerate after opening and consume within 30 days.",
    "shippingInfo": "Dispatched within 24 hours. Free express shipping above ₹499.",
    "returnInfo": "100% Quality guarantee.",
    "mrp": 1499,
    "salePrice": 899,
    "stock": 50,
    "lowStockAlert": 10,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": true,
    "isAddOn": true,
    "rating": 4.96,
    "reviewCount": 62,
    "status": "PUBLISHED",
    "metaTitle": "Pure Sea Buckthorn Pulp 500ml | Shree Vidhi Organics",
    "metaDescription": "100% pure Himalayan sea buckthorn pulp juice with Omega 7 and Vitamin C. 500ml.",
    "images": [
      {
        "id": "img-sbt-1",
        "url": "/pictures/products/seabuckthorn-pulp.png",
        "alt": "Shree Vidhi Sea Buckthorn Pulp 500ml Can",
        "isPrimary": true,
        "displayOrder": 1
      },
      {
        "id": "img-sbt-2",
        "url": "/pictures/products/seabuckthorn-pulp-set.png",
        "alt": "Shree Vidhi Sea Buckthorn Pulp & Bottle Set",
        "isPrimary": false,
        "displayOrder": 2
      },
      {
        "id": "img-sbt-3",
        "url": "/pictures/products/seabuckthorn-juice-showcase.png",
        "alt": "Sea Buckthorn 100% Natural Juice Showcase",
        "isPrimary": false,
        "displayOrder": 3
      }
    ],
    "variants": [
      {
        "id": "var-sbt-500",
        "productId": "prod-seabuckthorn-pulp",
        "title": "500ml",
        "size": "500ml",
        "mrp": 1499,
        "price": 899,
        "stock": 50
      }
    ],
    "createdAt": "2026-02-14T11:00:00+05:30"
  }
];

export const banners: Banner[] = [
  {
    id: "ban-1",
    title: "Ancient Wisdom. Modern Wellness.",
    subtitle: "Sacred Ayurvedic Rituals from the Spiritual Heart of Varanasi",
    tagline: "100% PURE BOTANICAL HERBS & SUPERFOODS",
    link: "/shop",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85",
    buttonText: "Shop Sacred Rituals",
    position: "HERO",
    isActive: true,
  },
  {
    id: "ban-2",
    title: "Pure Rituals. Naturally Beautiful.",
    subtitle: "Hand-blended 15-Herb Vedic Packs and Potent Single Botanical Powders",
    tagline: "ETHICALLY HARVESTED • CHEMICAL FREE",
    link: "/shop?category=ubtan-face-packs",
    imageUrl: "https://images.unsplash.com/photo-1608248597359-4678888b5ba8?auto=format&fit=crop&w=1800&q=85",
    buttonText: "Explore Collections",
    position: "HERO",
    isActive: true,
  },
];

export const coupons: Coupon[] = [
  {
    id: "coup-1",
    code: "VIDHI15",
    description: "Get 15% OFF on your order above ₹499",
    discountType: "PERCENTAGE",
    discountValue: 15,
    minCartValue: 499,
    maxDiscount: 150,
    validFrom: "2026-01-01T00:00:00Z",
    validUntil: "2026-12-31T23:59:59Z",
    usedCount: 142,
    isActive: true,
  },
  {
    id: "coup-2",
    code: "AYURVEDA50",
    description: "Flat ₹50 OFF on orders above ₹299",
    discountType: "FIXED",
    discountValue: 50,
    minCartValue: 299,
    validFrom: "2026-01-01T00:00:00Z",
    validUntil: "2026-12-31T23:59:59Z",
    usedCount: 289,
    isActive: true,
  },
];

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    category: "Products",
    question: "Are Shree Vidhi Organics products 100% natural and chemical-free?",
    answer: "Yes, absolutely. We do not use parabens, sulfates, silicones, synthetic dyes, artificial perfumes, or filler clays. Every product is handcrafted using pure single-source botanical herbs and traditional Vedic formulations.",
  },
  {
    id: "faq-2",
    category: "Products",
    question: "Where are your herbs and products sourced and manufactured?",
    answer: "Our roots and operations are grounded in the sacred city of Varanasi, Uttar Pradesh. We work directly with certified organic farmers and tribal collectors across India to ethically source medicinal herbs at peak potency.",
  },
  {
    id: "faq-3",
    category: "Orders & Shipping",
    question: "What are your shipping charges and delivery timelines?",
    answer: "We offer FREE Express Shipping across India on all orders above ₹499. For orders below ₹499, a nominal standard delivery charge of ₹49 applies. Orders are dispatched within 24 hours and typically reach your doorstep in 3 to 5 business days.",
  },
  {
    id: "faq-4",
    category: "Payments",
    question: "Which payment methods do you accept?",
    answer: "We support all major payment modes including UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, MasterCard, RuPay), Net Banking, and Cash on Delivery (COD).",
  },
  {
    id: "faq-5",
    category: "Ayurveda & Usage",
    question: "How do I choose the right Ayurvedic face pack or hair blend for my dosha?",
    answer: "For dry scalp and hair fall, Kapur Kachri and Sarva Kesh (Bhringraj) balance Vata dosha. For oily, acne-prone skin, Wild Kasturi Turmeric and the 15-Herb Vedic Blend calm excess Pitta heat. Check our Ingredient Library for detailed Ayurvedic guidance.",
  },
];

export const blogs: Blog[] = [
  {
    id: "blog-1",
    title: "Kapur Kachri: The Forgotten Himalayan Herb That Restores Scalp Vitality",
    slug: "kapur-kachri-ayurvedic-hair-growth-secrets",
    excerpt: "Discover how the aromatic rhizome of Hedychium spicatum stimulates micro-vascular circulation in the scalp and pacifies aggravated Vata dosha.",
    content: `For centuries, Ayurvedic vaidyas have celebrated Kapoor Kachri (*Hedychium spicatum*) as a precious gift of the Himalayan foothills. Unlike modern commercial hair serums laden with synthetic silicones that merely coat the hair shaft, Kapur Kachri works directly at the root matrix.

### The Dosha Connection
In Ayurvedic tridosha theory, hair thinning and breakage are caused by an imbalance in **Vata** (which causes dry, brittle strands) and **Kapha** (which causes clogged scalp follicles and sluggish micro-circulation). Kapur Kachri possesses a gentle heating potency (*Ushna Virya*) and a purifying aromatic fragrance that invigorates dormant follicles.

### How to Practice the Weekly Shiro Lepa
1. Blend 2 tablespoons of pure Kapur Kachri powder with lukewarm water or steep it in green tea.
2. For dry hair, incorporate 1 teaspoon of virgin coconut oil or curd.
3. Part your hair into sections and massage the paste into your scalp.
4. Leave on for 45 minutes, breathe in the therapeutic botanical aroma, and rinse clean.`,
    coverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    author: "Vaidya Shreya Sharma",
    readTime: "5 min read",
    category: "Hair Care",
    tags: ["Kapur Kachri", "Ayurveda", "Hair Fall", "Scalp Health"],
    isPublished: true,
    createdAt: "2026-01-15T08:00:00Z",
  },
];

