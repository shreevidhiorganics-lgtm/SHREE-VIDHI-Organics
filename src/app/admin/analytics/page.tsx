"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Repeat,
  Package,
  ArrowUpRight,
  Download,
  Calendar,
  Percent,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { AdminAnalyticsSummary } from "@/types";

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState<"today" | "last7days" | "last30days" | "thisYear" | "all">("last30days");
  const [data, setData] = useState<AdminAnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?range=${range}`);
      const json = await res.json();
      if (json.analytics) {
        setData(json.analytics);
      }
    } catch (err) {
      console.error("Failed to load analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [range]);

  const exportCSV = () => {
    if (!data) return;
    const rows = [
      ["Metric", "Value"],
      ["Gross Merchandise Value (GMV)", `INR ${data.gmv}`],
      ["Net Revenue", `INR ${data.netRevenue}`],
      ["Total Orders", data.totalOrders],
      ["Average Order Value (AOV)", `INR ${data.averageOrderValue}`],
      ["Conversion Rate", `${data.conversionRate}%`],
      ["Cart Abandonment Rate", `${data.cartAbandonmentRate}%`],
      ["Estimated CAC", `INR ${data.estimatedCAC}`],
      ["Customer Lifetime Value (LTV)", `INR ${data.customerLifetimeValue}`],
      ["Repeat Purchase Rate", `${data.repeatPurchaseRate}%`],
      ["Inventory Turnover", data.inventoryTurnoverRatio],
      ["Cancellation Rate", `${data.cancellationRate}%`],
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `shree_vidhi_bi_analytics_${range}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-800" />
            Business Intelligence & Analytics
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Real-time financial performance, unit economics, and customer retention metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Time range selector */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-medium">
            {(
              [
                ["today", "Today"],
                ["last7days", "7 Days"],
                ["last30days", "30 Days"],
                ["thisYear", "This Year"],
                ["all", "All Time"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setRange(key)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  range === key ? "bg-white text-emerald-950 shadow-sm font-semibold" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={exportCSV}
            disabled={!data || loading}
            className="flex items-center gap-1.5 bg-emerald-900 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs font-medium transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-stone-500 gap-2">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-800" />
          <p className="text-sm">Aggregating transactional intelligence...</p>
        </div>
      ) : data ? (
        <>
          {/* 1. Primary Financial & Health Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
                <span>Net Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-700" />
              </div>
              <div className="mt-2 text-2xl font-bold text-stone-900">{formatPrice(data.netRevenue)}</div>
              <div className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +{data.periodComparison.gmvGrowth}% vs prior
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
                <span>Gross Merchandise Value (GMV)</span>
                <TrendingUp className="w-4 h-4 text-amber-700" />
              </div>
              <div className="mt-2 text-2xl font-bold text-stone-900">{formatPrice(data.gmv)}</div>
              <div className="mt-2 text-xs text-stone-500">Total order pre-discount value</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
                <span>Average Order Value (AOV)</span>
                <ShoppingCart className="w-4 h-4 text-blue-700" />
              </div>
              <div className="mt-2 text-2xl font-bold text-stone-900">{formatPrice(data.averageOrderValue)}</div>
              <div className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +{data.periodComparison.aovGrowth}% growth
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
                <span>Total Orders</span>
                <Package className="w-4 h-4 text-purple-700" />
              </div>
              <div className="mt-2 text-2xl font-bold text-stone-900">{data.totalOrders}</div>
              <div className="mt-2 text-xs text-stone-500">
                Cancellation Rate: <span className="font-semibold text-rose-600">{data.cancellationRate}%</span>
              </div>
            </div>
          </div>

          {/* 2. Unit Economics & Retention (2026 Core Requirements) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="text-stone-500 text-xs font-medium">Repeat Purchase Rate</div>
              <div className="mt-2 text-2xl font-bold text-stone-900">{data.repeatPurchaseRate}%</div>
              <div className="mt-2 text-xs text-emerald-700">Healthy natural brand benchmark (&gt;25%)</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="text-stone-500 text-xs font-medium">Customer Lifetime Value (LTV)</div>
              <div className="mt-2 text-2xl font-bold text-emerald-950">{formatPrice(data.customerLifetimeValue)}</div>
              <div className="mt-2 text-xs text-stone-500">
                Est. CAC: <span className="font-semibold">{formatPrice(data.estimatedCAC)}</span> (LTV:CAC ~3.8x)
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="text-stone-500 text-xs font-medium">Store Conversion Rate</div>
              <div className="mt-2 text-2xl font-bold text-stone-900">{data.conversionRate}%</div>
              <div className="mt-2 text-xs text-stone-500">
                Abandonment: <span className="text-amber-700 font-semibold">{data.cartAbandonmentRate}%</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="text-stone-500 text-xs font-medium">Inventory Turnover Ratio</div>
              <div className="mt-2 text-2xl font-bold text-stone-900">{data.inventoryTurnoverRatio}x</div>
              <div className="mt-2 text-xs text-stone-500">Return Rate: {data.returnRate}%</div>
            </div>
          </div>

          {/* 3. Sales Trend Visualizer */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="text-base font-semibold text-stone-900 mb-4 flex items-center justify-between">
              <span>Revenue Trend ({range})</span>
              <span className="text-xs text-stone-500 font-normal">Daily Net Revenue</span>
            </h3>

            {data.salesTrend.length > 0 ? (
              <div className="h-44 flex items-end gap-2 pt-4 border-b border-stone-200 pb-2">
                {data.salesTrend.map((bar, i) => {
                  const maxRev = Math.max(...data.salesTrend.map((s) => s.revenue), 1000);
                  const heightPercent = Math.max(10, Math.round((bar.revenue / maxRev) * 100));

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded pointer-events-none whitespace-nowrap z-10">
                        {bar.date}: {formatPrice(bar.revenue)} ({bar.orders} orders)
                      </div>

                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-emerald-800 group-hover:bg-amber-600 rounded-t transition-colors"
                      />
                      <span className="text-[10px] text-stone-400 truncate max-w-full">{bar.date}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-xs text-stone-500 py-8 text-center">No transactions in selected period.</div>
            )}
          </div>

          {/* 4. Product-wise Profitability Table */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-stone-200">
              <h3 className="font-semibold text-stone-900 text-sm">Product-wise Profitability & Sales</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 border-b border-stone-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-5 py-3">Product Name</th>
                    <th className="px-5 py-3">Units Sold</th>
                    <th className="px-5 py-3">Gross Revenue</th>
                    <th className="px-5 py-3">Gross Margin</th>
                    <th className="px-5 py-3">Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {data.topSellingProducts.length > 0 ? (
                    data.topSellingProducts.map((p) => (
                      <tr key={p.productId} className="hover:bg-stone-50/80 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-stone-900">{p.productName}</td>
                        <td className="px-5 py-3.5">{p.unitsSold} units</td>
                        <td className="px-5 py-3.5 font-semibold text-emerald-950">{formatPrice(p.revenue)}</td>
                        <td className="px-5 py-3.5">
                          <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                            {p.profitMargin}%
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-stone-500">
                          {data.netRevenue > 0 ? `${Math.round((p.revenue / data.netRevenue) * 100)}%` : "0%"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-5 py-6 text-center text-stone-500">
                        No product breakdown available for this date filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
