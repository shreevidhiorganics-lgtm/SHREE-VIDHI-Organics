"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IndianRupee,
  ShoppingBag,
  Clock,
  Package,
  AlertTriangle,
  TrendingUp,
  Users,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { formatPrice, formatDate } from "@/lib/utils";
import { OrderStatus } from "@/types";
import { useUIStore } from "@/store/ui-store";

export default function AdminDashboardPage() {
  const { addToast } = useUIStore();
  const metrics = dataStore.getAdminMetrics();
  const [orders, setOrders] = useState(dataStore.getOrders());
  const products = dataStore.getProducts();

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    dataStore.updateOrderStatus(orderId, newStatus);
    setOrders([...dataStore.getOrders()]);
    addToast(`Updated order ${orderId} to ${newStatus}`, "success");
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Title */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-forest-950">
          Executive Dashboard Overview
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Real-time metrics, order fulfillments, and revenue statistics for Shree Vidhi Organics.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>TOTAL REVENUE</span>
            <div className="w-8 h-8 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-forest-950">
            {formatPrice(metrics.totalRevenue)}
          </div>
          <span className="text-[11px] text-forest-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Avg Order Value: {formatPrice(metrics.averageOrderValue)}</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>TOTAL ORDERS</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-forest-950">
            {metrics.totalOrders}
          </div>
          <span className="text-[11px] text-muted-foreground">
            {metrics.pendingOrders} pending dispatch
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>ACTIVE PRODUCTS</span>
            <div className="w-8 h-8 rounded-lg bg-sage-50 text-sage-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-forest-950">
            {metrics.totalProducts}
          </div>
          <span className="text-[11px] text-muted-foreground">
            {products.filter((p) => p.isBestseller).length} bestsellers active
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>LOW STOCK ALERTS</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600">
            {metrics.lowStockProducts}
          </div>
          <Link href="/admin/inventory" className="text-[11px] text-forest-800 hover:underline font-semibold block">
            View Inventory Restock →
          </Link>
        </div>
      </div>

      {/* 2 Column Layout: Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg text-forest-950">
              Recent Customer Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-forest-800 hover:underline flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-muted-foreground uppercase text-[10px] tracking-wider">
                  <th className="pb-3 font-semibold">Order</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50">
                    <td className="py-3 font-mono font-bold text-forest-950">
                      {order.orderNumber}
                    </td>
                    <td className="py-3">
                      <span className="font-semibold text-forest-950 block">
                        {order.shippingAddress.fullName}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {order.shippingAddress.city}, {order.shippingAddress.state}
                      </span>
                    </td>
                    <td className="py-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className="bg-forest-50 border border-forest-200 text-forest-900 rounded-lg px-2 py-1 text-[11px] font-semibold cursor-pointer"
                      >
                        <option value="PLACED">PLACED</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="PACKED">PACKED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="py-3 font-bold text-forest-950">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-3">
                      <Link
                        href={`/track-order?orderNumber=${order.orderNumber}`}
                        className="text-forest-700 hover:underline font-semibold"
                        target="_blank"
                      >
                        Track
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products Box */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg text-forest-950">
              Top Catalog Remedies
            </h2>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-forest-800 hover:underline"
            >
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50">
                <div className="w-12 h-12 rounded-lg bg-ayur-cream relative overflow-hidden shrink-0 border border-gray-100">
                  <img src={p.images[0]?.url} alt="" className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 text-xs">
                  <h4 className="font-bold text-forest-950 line-clamp-1">{p.name}</h4>
                  <span className="text-muted-foreground block text-[11px]">
                    Stock: {p.stock} units • {formatPrice(p.salePrice)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 text-center">
            <Link
              href="/admin/products/new"
              className="w-full inline-block bg-forest-900 hover:bg-forest-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm"
            >
              + Create New Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
