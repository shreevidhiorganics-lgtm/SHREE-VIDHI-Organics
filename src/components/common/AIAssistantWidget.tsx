"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, X, Send, Bot, User, ShoppingBag, ArrowRight, RefreshCw, MessageSquare } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { products } from "@/lib/data/initial-data";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  recommendedProducts?: Array<{
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

const QUICK_PROMPTS = [
  "🌿 Best herbs to stop hair fall & dandruff?",
  "✨ Which Ubtan is best for wedding bridal glow?",
  "🌱 What is Kapur Kachri and how to use it?",
  "🥥 Recommend a weekly hair care routine",
];

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Namaste! 🙏 I am your Shree Vidhi Ayurvedic Shopping Guide, crafted with verified knowledge from our Varanasi apothecary. How can I help you care for your hair or skin naturally today?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || loading) return;

    const query = userText.trim();
    setInput("");

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const history = messages.slice(-4).map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, history }),
      });

      if (!res.ok) throw new Error("Network error");
      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: data.message || "Here are authentic Ayurvedic recommendations.",
        recommendedProducts: data.recommendedProducts || [],
        suggestedIngredients: data.suggestedIngredients || [],
        suggestedBundles: data.suggestedBundles || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "I apologize, I could not connect at this moment. You can explore our 100% pure Ayurvedic powders and Ubtans directly in our shop!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (slug: string) => {
    const fullProduct = products.find((p) => p.slug === slug);
    if (fullProduct) {
      addItem(fullProduct);
      setAddedSlug(slug);
      setTimeout(() => setAddedSlug(null), 2000);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <aside aria-label="Ayurvedic AI Shopping Guide" className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-800 to-amber-900 text-amber-50 px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border border-amber-300/40 group focus:outline-none focus:ring-4 focus:ring-amber-500/50"
            aria-label="Ask Ayurvedic Shopping Assistant"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="font-medium text-sm pr-1">Ask Ayurvedic AI</span>
          </button>
        )}

        {/* Chat Drawer / Modal */}
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-[92vw] sm:w-[420px] h-[580px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-900 via-emerald-850 to-amber-950 text-white p-4 flex items-center justify-between border-b border-amber-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm tracking-wide text-amber-50 flex items-center gap-1.5">
                    Ayurvedic Shopping Guide
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-mono border border-amber-300/30">
                      2026 AI
                    </span>
                  </h3>
                  <p className="text-[11px] text-stone-300">Grounded in Varanasi Botanical Recipes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/60 text-stone-800 text-sm">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-emerald-800 text-amber-200 flex items-center justify-center shrink-0 mt-1">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                      m.role === "user"
                        ? "bg-emerald-800 text-white rounded-br-none"
                        : "bg-white border border-stone-200 shadow-sm rounded-bl-none text-stone-800"
                    }`}
                  >
                    <p className="whitespace-pre-line text-[13px]">{m.content}</p>

                    {/* Recommended Product Cards */}
                    {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-stone-100 space-y-2.5">
                        <p className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                          <ShoppingBag className="w-3 h-3" /> Recommended Products
                        </p>
                        <div className="space-y-2">
                          {m.recommendedProducts.map((prod) => (
                            <div
                              key={prod.id}
                              className="flex items-center gap-2.5 p-2 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-emerald-600/40 transition-colors"
                            >
                              <div className="w-12 h-12 rounded-lg bg-white relative overflow-hidden shrink-0 border border-stone-200">
                                <Image
                                  src={prod.image}
                                  alt={prod.name}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={`/product/${prod.slug}`}
                                  className="font-medium text-xs text-stone-900 hover:text-emerald-800 line-clamp-1"
                                >
                                  {prod.name}
                                </Link>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="font-bold text-xs text-emerald-900">
                                    {formatPrice(prod.price)}
                                  </span>
                                  {prod.mrp > prod.price && (
                                    <span className="text-[10px] text-stone-400 line-through">
                                      {formatPrice(prod.mrp)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => handleAddToCart(prod.slug)}
                                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                                  addedSlug === prod.slug
                                    ? "bg-emerald-700 text-white"
                                    : "bg-emerald-900 hover:bg-emerald-800 text-white"
                                }`}
                              >
                                {addedSlug === prod.slug ? "Added ✓" : "Add"}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggested Bundles */}
                    {m.suggestedBundles && m.suggestedBundles.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-stone-100">
                        {m.suggestedBundles.map((b, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[12px]"
                          >
                            <div className="flex items-center justify-between font-semibold text-amber-950">
                              <span>🎁 {b.name}</span>
                              <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
                                {b.savings}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-600 mt-1">
                              Includes: {b.items.join(" + ")}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {m.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-stone-300 text-stone-700 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-stone-500 text-xs pl-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-800" />
                  <span>Consulting Ayurvedic catalog...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="p-2.5 bg-stone-100/80 border-t border-stone-200 flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[11px] bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 px-2.5 py-1 rounded-full transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skin, hair, or Ayurvedic herbs..."
                className="flex-1 text-xs border border-stone-300 rounded-full px-3.5 py-2.5 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-emerald-800 disabled:opacity-50 transition-colors shrink-0"
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </aside>
    </>
  );
}
