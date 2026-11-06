"use client";

import React from "react";
import { Users, Mail, Phone, Calendar } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { formatDate } from "@/lib/utils";

export default function AdminCustomersPage() {
  const users = dataStore.getUsers();

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-forest-950">
          Customer Directory & Order History
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          View registered seekers, purchase frequency, and contact details.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-muted-foreground uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Customer</th>
                <th className="py-3.5 px-4 font-semibold">Role</th>
                <th className="py-3.5 px-4 font-semibold">Contact Email</th>
                <th className="py-3.5 px-4 font-semibold">Phone</th>
                <th className="py-3.5 px-4 font-semibold">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-forest-900 text-gold-400 font-bold flex items-center justify-center">
                        {u.name[0]}
                      </div>
                      <span className="font-bold text-forest-950">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        u.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-forest-100 text-forest-800"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground font-mono">
                    {u.email}
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">
                    {u.phone || "—"}
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">
                    {formatDate(u.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
