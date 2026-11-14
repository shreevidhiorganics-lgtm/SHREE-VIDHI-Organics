"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  ShieldCheck,
  Loader2,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        if (
          data?.authenticated &&
          data?.user?.email?.toLowerCase() === "shreevidhiorganics@gmail.com"
        ) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          router.replace("/login?redirect=/admin");
        }
      })
      .catch(() => {
        if (!active) return;
        setIsAuthorized(false);
        router.replace("/login?redirect=/admin");
      });

    return () => {
      active = false;
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Continue to redirect
    }
    router.push("/login");
  };

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#EBF1EB] border border-[#D5E3D5] flex items-center justify-center text-[#2D5A38] mb-4">
          <Loader2 className="w-6 h-6 animate-spin text-[#1C3F26]" />
        </div>
        <h2 className="font-serif text-xl text-forest-950 font-bold mb-1">
          Verifying Admin Access
        </h2>
        <p className="text-xs text-forest-700/70 font-light">
          Validating authorization for shreevidhiorganics@gmail.com...
        </p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

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

        {/* Sidebar Footer Link to Store and Sign Out */}
        <div className="pt-6 border-t border-forest-800 space-y-1.5">
          <Link
            href="/"
            className="flex items-center justify-between text-xs text-sage-300 hover:text-gold-400 font-medium p-2 rounded-lg transition-colors"
          >
            <span>View Public Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-between text-xs text-red-300 hover:text-red-200 hover:bg-forest-900 font-medium p-2 rounded-lg transition-colors text-left"
          >
            <span>Sign Out</span>
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 py-3.5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sage-700 bg-sage-50 px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-sage-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Production Admin</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 text-forest-900">
              <div className="w-7 h-7 rounded-full bg-[#18231C] border border-[#C5A872]/40 text-[#D8B980] flex items-center justify-center font-bold shadow-sm">
                S
              </div>
              <span className="hidden sm:inline font-mono text-[11px] text-forest-800">
                shreevidhiorganics@gmail.com
              </span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-xs font-medium transition-colors"
              title="Logout from Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Dynamic Admin Body */}
        <main className="p-6 sm:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
