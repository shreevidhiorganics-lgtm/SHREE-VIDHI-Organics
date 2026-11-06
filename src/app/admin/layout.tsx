"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Layers,
  Tag,
  Users,
  Sliders,
  Star,
  ExternalLink,
  Leaf,
  LogOut,
  Bell,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Inventory", href: "/admin/inventory", icon: Layers },
    { name: "Coupons", href: "/admin/coupons", icon: Tag },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Content / CMS", href: "/admin/cms", icon: Sliders },
    { name: "Reviews", href: "/admin/reviews", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-forest-950 font-sans">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-forest-950 text-white shrink-0 flex flex-col justify-between p-4 sm:p-6 border-r border-forest-900">
        <div className="space-y-6">
          {/* Brand header */}
          <div className="flex items-center gap-3 pb-6 border-b border-forest-800">
            <div className="w-9 h-9 rounded-full bg-forest-800 flex items-center justify-center text-gold-400 font-bold">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-white block leading-tight">
                SHREE VIDHI
              </span>
              <span className="text-[9px] tracking-widest text-gold-400 font-bold uppercase">
                ADMIN PORTAL
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-gold-500 text-forest-950 font-bold shadow-sm"
                      : "text-sage-200 hover:bg-forest-900 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Link to Store */}
        <div className="pt-6 border-t border-forest-800 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between text-xs text-sage-300 hover:text-gold-400 font-medium p-2 rounded-lg transition-colors"
          >
            <span>View Public Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 py-3.5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sage-600 bg-sage-50 px-2.5 py-1 rounded-full">
              Production Admin
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 text-forest-900">
              <div className="w-7 h-7 rounded-full bg-[#18231C] border border-[#C5A872]/40 text-[#D8B980] flex items-center justify-center font-bold shadow-sm">
                A
              </div>
              <span className="hidden sm:inline">Aditi Singh (Varanasi)</span>
            </div>
          </div>
        </header>

        {/* Dynamic Admin Body */}
        <main className="p-6 sm:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
