"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Truck, CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { formatPrice, formatDate } from "@/lib/utils";
import { OrderStatus } from "@/types";
import { useUIStore } from "@/store/ui-store";

const STATUS_OPTIONS: OrderStatus[] = [
  "PLACED",
  "CONFIRMED",
  "PROCESSING",
  "PACKED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrdersPage() {
  const { addToast } = useUIStore();
  const [orders, setOrders] = useState(dataStore.getOrders());
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [shippingOrderId, setShippingOrderId] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchesStatus = filterStatus === "ALL" || o.status === filterStatus;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.shippingAddress.fullName.toLowerCase().includes(q) ||
      o.shippingAddress.city.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    dataStore.updateOrderStatus(orderId, newStatus);
    setOrders([...dataStore.getOrders()]);
    addToast(`Updated ${orderId} to status ${newStatus}.`, "success");
  };

  const handleShiprocketDispatch = async (orderId: string) => {
    setShippingOrderId(orderId);
    try {
      const res = await fetch("/api/admin/orders/ship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        addToast(data.error || "Shiprocket dispatch failed.", "error");
      } else {
        addToast(data.message || `Dispatched! AWB: ${data.trackingNumber}`, "success");
        setOrders([...dataStore.getOrders()]);
      }
    } catch {
      addToast("Network error dispatching to Shiprocket.", "error");
    } finally {
      setShippingOrderId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-forest-950">
          Order Management & Fulfillment
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Process customer orders, update delivery timelines, and monitor payments.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order ID, customer name, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-forest-800"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="flex items-center gap-2 text-xs font-semibold self-end sm:self-auto">
          <span className="text-muted-foreground">Filter Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-forest-950 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-muted-foreground uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Order #</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Customer & Destination</th>
                <th className="py-3.5 px-4 font-semibold">Items</th>
                <th className="py-3.5 px-4 font-semibold">Total</th>
                <th className="py-3.5 px-4 font-semibold">Payment</th>
                <th className="py-3.5 px-4 font-semibold">Current Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-muted-foreground text-xs font-light">
                    No orders recorded yet. Fresh orders placed by customers will appear here in real time.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50">
                    <td className="py-3.5 px-4 font-mono font-bold text-forest-950">
                      {order.orderNumber}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-3.5 px-4">
                      <strong className="text-forest-950 block">{order.shippingAddress.fullName}</strong>
                      <span className="text-[11px] text-muted-foreground">
                        {order.shippingAddress.city}, {order.shippingAddress.state} ({order.shippingAddress.pinCode})
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {order.items.length} {order.items.length === 1 ? "remedy" : "remedies"}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-forest-950">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-gray-100 text-forest-900 font-semibold px-2 py-0.5 rounded text-[11px]">
                        {order.paymentMethod} • {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-forest-50 border border-forest-200 text-forest-900 rounded-lg px-2.5 py-1 text-[11px] font-bold cursor-pointer"
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st.replace(/_/g, " ")}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {order.status !== "SHIPPED" && order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                          <button
                            type="button"
                            onClick={() => handleShiprocketDispatch(order.id)}
                            disabled={shippingOrderId === order.id}
                            className="inline-flex items-center gap-1 bg-[#1C3F26] hover:bg-[#16331F] disabled:opacity-50 text-[#FAF8F5] text-[10px] font-semibold px-2.5 py-1 rounded-md transition-all shadow-sm"
                            title="Dispatch via Shiprocket and generate AWB"
                          >
                            {shippingOrderId === order.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Send className="w-3 h-3" />
                            )}
                            <span>Shiprocket</span>
                          </button>
                        )}
                        <Link
                          href={`/track-order?orderNumber=${order.orderNumber}`}
                          target="_blank"
                          className="text-forest-800 hover:text-gold-600 font-bold hover:underline"
                        >
                          Track Live
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
