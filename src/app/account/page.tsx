"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Clock,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Edit2,
  Plus,
  Sparkles,
} from "lucide-react";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";
import { formatPrice, formatDate } from "@/lib/utils";
import { Address, Order } from "@/types";

export default function AccountPage() {
  const router = useRouter();
  const { addToast } = useUIStore();
  const wishlistItems = useWishlistStore((state) => state.items);

  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "profile" | "wishlist">("orders");

  // Customer state
  const [profile, setProfile] = useState({
    name: "Seeker",
    email: "customer@shreevidhiorganics.com",
    phone: "",
  });
  const [savedAddress, setSavedAddress] = useState<Address | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setProfile({
            name: data.user.name || "Seeker",
            email: data.user.email || "",
            phone: data.user.phone || "",
          });
          if (data.user.address) {
            setSavedAddress(data.user.address);
          }
        }
      })
      .catch(() => {});

    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.orders && Array.isArray(data.orders)) {
          setOrders(data.orders);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    addToast("Logged out successfully.", "info");
    router.push("/login");
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("Profile details updated successfully.", "success");
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-8">
        {/* User Welcome Banner */}
        <div className="bg-white/90 p-6 sm:p-10 rounded-3xl border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 rounded-full bg-[#18231C] text-[#D8B980] flex items-center justify-center font-serif font-normal text-xl shadow-[0_0_15px_rgba(197,168,114,0.25)] border border-[#C5A872]/50">
              {profile.name[0]}
            </div>
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8C6D32] block mb-0.5">
                Authenticated Seeker
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#18231C]">
                Namaste, {profile.name}
              </h1>
              <span className="text-xs text-[#6C766F] font-light">{profile.email}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-normal text-[#A64F35] hover:text-[#873A23] bg-[#FAF0ED] hover:bg-[#F5E5E0] py-2.5 px-5 rounded-full border border-[#F2D7CE] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#EDE7DD] overflow-x-auto gap-2 sm:gap-4 pb-3">
          {[
            { id: "orders", label: `My Orders (${orders.length})`, icon: Package },
            { id: "addresses", label: "Delivery Addresses", icon: MapPin },
            { id: "wishlist", label: `Saved (${wishlistItems.length})`, icon: Heart },
            { id: "profile", label: "Profile Settings", icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-2.5 px-4 sm:px-5 rounded-full text-xs font-normal transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#1C3F26] text-[#FAF8F5] shadow-sm font-medium"
                    : "text-[#3D463F] hover:bg-white/80 border border-transparent hover:border-[#EDE7DD]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="font-serif font-normal text-xl text-[#18231C]">
              Your Sacred Order History
            </h2>

            {orders.length === 0 ? (
              <div className="bg-white/90 p-10 rounded-3xl border border-[#EDE7DD] text-center space-y-4">
                <Package className="w-10 h-10 text-[#8C6D32] mx-auto" />
                <p className="text-sm font-normal text-[#18231C]">No orders placed yet.</p>
                <Link
                  href="/shop"
                  className="inline-block bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] text-xs font-medium py-3 px-6 rounded-full shadow-sm transition-all"
                >
                  Explore Herbal Formulations
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white/90 p-6 sm:p-8 rounded-3xl border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0ECE4] text-xs">
                      <div>
                        <span className="text-[#6C766F] font-light block text-[11px]">ORDER NUMBER</span>
                        <span className="font-mono font-medium text-sm text-[#18231C]">
                          {order.orderNumber}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-medium text-[#2D5A38] bg-[#EBF1EB] border border-[#D5E3D5] px-3 py-1 rounded-full text-xs">
                          {order.status.replace(/_/g, " ")}
                        </span>
                        <span className="text-[#6C766F] font-light">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2.5">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-xs">
                          <div>
                            <strong className="text-[#18231C] font-normal">{item.productName}</strong>
                            <span className="text-[#6C766F] ml-2 font-light">
                              Qty: {item.quantity} {item.variantTitle && `(${item.variantTitle})`}
                            </span>
                          </div>
                          <span className="font-medium text-[#18231C]">{formatPrice(item.total)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#F0ECE4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="text-[#6C766F] font-light">
                        Payment Mode: <strong className="text-[#18231C] font-medium">{order.paymentMethod}</strong> ({order.paymentStatus})
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-medium text-sm text-[#18231C]">
                          Total: {formatPrice(order.total)}
                        </span>
                        <Link
                          href={`/track-order?orderNumber=${order.orderNumber}`}
                          className="bg-[#FAF8F5] hover:bg-[#F2ECE0] text-[#18231C] font-medium px-4 py-1.5 rounded-full border border-[#EDE7DD] transition-colors"
                        >
                          Track Ritual
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === "addresses" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-normal text-xl text-[#18231C]">
                Saved Delivery Addresses
              </h2>
              <button
                onClick={() => addToast("Address editor ready.", "info")}
                className="bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium text-xs py-2 px-5 rounded-full flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Address</span>
              </button>
            </div>

            {savedAddress ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/90 p-6 rounded-3xl border border-[#7D9980] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#EBF1EB] text-[#2D5A38] border border-[#D5E3D5] text-[10px] font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Primary Delivery Address
                    </span>
                    <button
                      onClick={() => addToast("Address editor ready.", "info")}
                      className="text-xs text-[#8C6D32] hover:underline font-normal flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div className="space-y-1 text-xs text-[#4A544E] font-light">
                    <strong className="text-sm font-medium text-[#18231C] block">
                      {savedAddress.fullName || profile.name}
                    </strong>
                    <p>{savedAddress.houseFlat}, {savedAddress.street}</p>
                    {savedAddress.landmark && <p>Near: {savedAddress.landmark}</p>}
                    <p>{savedAddress.city}, {savedAddress.state} - {savedAddress.pinCode}</p>
                    <p className="pt-1 text-[#6C766F] font-mono">Mobile: {savedAddress.phone || profile.phone}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/90 p-10 rounded-3xl border border-[#EDE7DD] text-center space-y-3">
                <MapPin className="w-10 h-10 text-[#8C6D32] mx-auto opacity-60" />
                <p className="text-sm font-normal text-[#18231C]">No saved delivery addresses yet.</p>
                <p className="text-xs text-[#6C766F] font-light max-w-sm mx-auto">
                  Your delivery address will be saved here automatically when you sign in or complete a checkout order.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Wishlist */}
        {activeTab === "wishlist" && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="font-serif font-normal text-xl text-[#18231C]">
              Saved Products ({wishlistItems.length})
            </h2>

            {wishlistItems.length === 0 ? (
              <div className="bg-white/90 p-10 rounded-3xl border border-[#EDE7DD] text-center space-y-4">
                <Heart className="w-10 h-10 text-[#8C6D32] mx-auto stroke-[1.5]" />
                <p className="text-sm font-normal text-[#18231C]">Your saved rituals list is currently empty.</p>
                <Link
                  href="/shop"
                  className="inline-block bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] text-xs font-medium py-3 px-6 rounded-full shadow-sm transition-all"
                >
                  Discover Herbal Formulations
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="bg-white/90 p-4 rounded-2xl border border-[#EDE7DD] flex items-center gap-3 hover:border-[#D5CDC1] transition-all">
                    <div className="w-14 h-14 rounded-xl bg-[#FAF8F5] relative overflow-hidden shrink-0 border border-[#EDE7DD]">
                      <Image
                        src={item.product.images[0]?.url || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=100&q=80"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-xs">
                      <Link href={`/product/${item.product.slug}`} className="font-medium text-[#18231C] hover:text-[#8C6D32] line-clamp-1 transition-colors">
                        {item.product.name}
                      </Link>
                      <span className="text-[#1C3F26] font-medium block mt-0.5">
                        {formatPrice(item.product.salePrice)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Profile Settings */}
        {activeTab === "profile" && (
          <div className="bg-white/90 p-6 sm:p-10 rounded-3xl border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-6 max-w-xl animate-fadeIn">
            <h2 className="font-serif font-normal text-xl text-[#18231C] pb-3 border-b border-[#F0ECE4]">
              Profile Settings
            </h2>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full bg-[#F5F1EB] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#828B84] cursor-not-allowed font-light"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                />
              </div>

              <button
                type="submit"
                className="bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium text-xs py-3.5 px-8 rounded-full shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] transition-all"
              >
                Save Profile Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
