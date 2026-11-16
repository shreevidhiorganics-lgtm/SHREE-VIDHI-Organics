import { products, ingredients, faqs } from "@/lib/data/initial-data";
import { Product } from "@/types";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AssistantResponse {
  message: string;
  recommendedProducts: Array<{
    id: string;
    name: string;
    slug: string;
    price: number;
    mrp: number;
    image: string;
    keyBenefit: string;
  }>;
  suggestedIngredients?: string[];
  suggestedBundles?: Array<{
    name: string;
    savings: string;
    items: string[];
  }>;
}

// Compact catalog summary for AI grounding
const catalogSummary = products.map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  category: p.categoryName || p.categoryId,
  price: p.salePrice,
  mrp: p.mrp,
  image: p.images[0]?.url || "/pictures/products/placeholder.png",
  benefits: p.keyBenefits.slice(0, 3).join(", "),
  ingredients: p.ingredientsList?.map((i) => i.name).join(", ") || p.ingredientsText || "100% Ayurvedic Herbs",
  howToUse: p.howToUse,
}));

const SYSTEM_GROUNDING_PROMPT = `
You are the Shree Vidhi Organics AI Ayurvedic Shopping Assistant.
Shree Vidhi Organics is an authentic Ayurvedic personal care brand founded in Varanasi, India, crafting pure, single-origin botanical powders and traditional recipes with no added chemicals.

CRITICAL INSTRUCTIONS:
1. ONLY recommend products from the provided catalog. NEVER make up products, brands, or fake prices.
2. DO NOT make unverified medical claims or claim to cure medical diseases (e.g. alopecia, psoriasis). Speak from traditional Ayurvedic wellness knowledge (e.g. "cooling Pitta dosha", "nourishing scalp roots", "gentle exfoliation", "improving natural skin radiance").
3. Explain verified ingredients honestly (e.g., Amla is rich in Vitamin C, Bhringraj is known as Keshraj in classical Ayurveda).
4. When you recommend a product, reference its exact name from the catalog.
5. Provide actionable tips on how to mix (e.g. with rose water, curd, or warm water) and apply according to traditional Ayurvedic methods.

VERIFIED PRODUCT CATALOG:
${JSON.stringify(catalogSummary, null, 2)}
`;

/**
 * Deterministic Ayurvedic Heuristic Engine (Offline/Fallback)
 */
function heuristicAyurvedicResponse(query: string): AssistantResponse {
  const lower = query.toLowerCase();

  // Find matching products
  const matched = catalogSummary.filter((p) => {
    const inName = p.name.toLowerCase().includes(lower);
    const inBenefits = p.benefits.toLowerCase().includes(lower);
    const inIngredients = p.ingredients.toLowerCase().includes(lower);
    const inCategory = p.category.toLowerCase().includes(lower);
    return inName || inBenefits || inIngredients || inCategory;
  });

  // Keywords detection
  if (lower.includes("hair") || lower.includes("dandruff") || lower.includes("fall") || lower.includes("growth")) {
    const hairProducts = catalogSummary
      .filter((p) => p.category.toLowerCase().includes("hair") || p.name.toLowerCase().includes("amla") || p.name.toLowerCase().includes("bhringraj") || p.name.toLowerCase().includes("kapur"))
      .slice(0, 3);

    return {
      message:
        "For healthy scalp and stronger roots, classical Ayurveda recommends cooling the scalp and pacifying excess Pitta dosha. Traditional herbs like Bhringraj, Amla, and Kapur Kachri are renowned for strengthening follicles and revitalizing natural hair texture without harsh sulfates or parabens.",
      recommendedProducts: hairProducts.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        mrp: p.mrp,
        image: p.image,
        keyBenefit: p.benefits,
      })),
      suggestedIngredients: ["Bhringraj", "Amla", "Kapur Kachri", "Shikakai"],
      suggestedBundles: [
        {
          name: "Complete Ayurvedic Hair Fall Control Ritual",
          savings: "Save 18%",
          items: ["Kapur Kachri Powder", "Amla Powder", "Shikakai Natural Cleanser"],
        },
      ],
    };
  }

  if (lower.includes("skin") || lower.includes("glow") || lower.includes("tan") || lower.includes("ubtan") || lower.includes("acne") || lower.includes("pimple")) {
    const skinProducts = catalogSummary
      .filter((p) => p.category.toLowerCase().includes("skin") || p.category.toLowerCase().includes("ubtan") || p.name.toLowerCase().includes("chandan") || p.name.toLowerCase().includes("turmeric") || p.name.toLowerCase().includes("ubtan"))
      .slice(0, 3);

    return {
      message:
        "In Ayurveda, glowing skin (Twacha Kanti) begins with natural detoxification and gentle herbs that restore skin balance. Our traditional Ubtan and botanical powders gently exfoliate, reduce sun tanning, and soothe irritation without stripping natural oils.",
      recommendedProducts: skinProducts.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        mrp: p.mrp,
        image: p.image,
        keyBenefit: p.benefits,
      })),
      suggestedIngredients: ["Sandalwood (Chandan)", "Wild Kasturi Turmeric", "Natural Ubtan", "Multani Mitti"],
      suggestedBundles: [
        {
          name: "Royal Varanasi Bridal Glow Ritual",
          savings: "Save 20%",
          items: ["Natural Ayurvedic Ubtan", "Pure Chandan Sandalwood Powder", "Wild Kasturi Turmeric"],
        },
      ],
    };
  }

  if (matched.length > 0) {
    const topMatches = matched.slice(0, 3);
    return {
      message: `Here are our verified Ayurvedic products matching your interest in "${query}". Each formulation is crafted under traditional slow-processing standards in Varanasi.`,
      recommendedProducts: topMatches.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        mrp: p.mrp,
        image: p.image,
        keyBenefit: p.benefits,
      })),
      suggestedIngredients: topMatches.map((p) => p.name.split(" ")[0]),
    };
  }

  // General store introduction
  const featured = catalogSummary.slice(0, 3);
  return {
    message:
      "Namaste! I am your Shree Vidhi Organics Ayurvedic Guide. I can help you find 100% natural single-origin herbs, explain Ayurvedic ingredients, or suggest daily rituals tailored to your skin and hair needs. How can I assist you today?",
    recommendedProducts: featured.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      mrp: p.mrp,
      image: p.image,
      keyBenefit: p.benefits,
    })),
    suggestedIngredients: ["Amla", "Bhringraj", "Chandan", "Turmeric"],
  };
}

/**
 * Generate AI Shopping Assistant response with Gemini or Grounded Fallback
 */
export async function getAIAssistantResponse(
  conversation: ChatMessage[],
  userQuery: string
): Promise<AssistantResponse> {
  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (!geminiApiKey || geminiApiKey === "your_gemini_api_key_here") {
    return heuristicAyurvedicResponse(userQuery);
  }

  try {
    const prompt = `
${SYSTEM_GROUNDING_PROMPT}

CUSTOMER CONVERSATION HISTORY:
${conversation.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n")}

LATEST CUSTOMER QUERY:
${userQuery}

Respond strictly in valid JSON matching this schema:
{
  "message": "Your helpful, verified Ayurvedic response without medical claims...",
  "recommendedProductSlugs": ["slug-1", "slug-2"],
  "suggestedIngredients": ["Amla", "Bhringraj"],
  "suggestedBundles": [
    {
      "name": "Bundle Name",
      "savings": "Save 15%",
      "items": ["Product 1", "Product 2"]
    }
  ]
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      console.warn("[AIAssistant] Gemini API error status:", response.status);
      return heuristicAyurvedicResponse(userQuery);
    }

    const data = await response.json();
    const rawJsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJsonText) {
      return heuristicAyurvedicResponse(userQuery);
    }

    const parsed = JSON.parse(rawJsonText);
    const recommendedProducts = (parsed.recommendedProductSlugs || [])
      .map((slug: string) => catalogSummary.find((p) => p.slug === slug))
      .filter(Boolean)
      .map((p: any) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        mrp: p.mrp,
        image: p.image,
        keyBenefit: p.benefits,
      }));

    return {
      message: parsed.message || "Here are verified Ayurvedic recommendations for you.",
      recommendedProducts: recommendedProducts.length > 0 ? recommendedProducts : catalogSummary.slice(0, 2),
      suggestedIngredients: parsed.suggestedIngredients || [],
      suggestedBundles: parsed.suggestedBundles || [],
    };
  } catch (err) {
    console.error("[AIAssistant] Error querying LLM:", err);
    return heuristicAyurvedicResponse(userQuery);
  }
}
