"use client";

import React, { useState } from "react";
import { Sliders, Save, Sparkles, MessageSquare } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { useUIStore } from "@/store/ui-store";

export default function AdminCmsPage() {
  const { addToast } = useUIStore();
  const currentSettings = dataStore.getSettings();

  const [settings, setSettings] = useState({
    announcementText: currentSettings.announcementText,
    freeShippingThreshold: currentSettings.freeShippingThreshold,
    supportPhone: currentSettings.supportPhone,
    supportEmail: currentSettings.supportEmail,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.updateSettings({
      announcementText: settings.announcementText,
      freeShippingThreshold: Number(settings.freeShippingThreshold),
      supportPhone: settings.supportPhone,
      supportEmail: settings.supportEmail,
    });
    addToast("Site announcement and CMS settings updated!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-forest-950">
          Content & Announcement Bar Management
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Update top announcement bar promotions, free shipping thresholds, and contact information without editing code.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <h2 className="font-serif font-bold text-lg text-forest-950 pb-3 border-b border-gray-100 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-forest-700" />
          <span>Storefront Top Announcement & Parameters</span>
        </h2>

        <div>
          <label className="text-xs font-bold text-forest-900 block mb-1">
            Top Announcement Bar Text *
          </label>
          <input
            type="text"
            required
            value={settings.announcementText}
            onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-forest-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-forest-900 block mb-1">
              Free Shipping Threshold (₹) *
            </label>
            <input
              type="number"
              required
              value={settings.freeShippingThreshold}
              onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-forest-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-forest-900 block mb-1">
              Customer Support Helpline
            </label>
            <input
              type="text"
              value={settings.supportPhone}
              onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-forest-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-forest-900 block mb-1">
              Support Email
            </label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-forest-800"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="bg-forest-900 hover:bg-forest-800 text-white font-bold py-3 px-8 rounded-xl text-xs shadow-card flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Publish Content Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
}
