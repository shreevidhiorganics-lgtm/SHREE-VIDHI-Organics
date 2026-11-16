"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppSupportUrl } from "@/lib/notifications/whatsapp";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
}

export default function WhatsAppButton({
  message = "Namaste Shree Vidhi Organics, I have a question about your Ayurvedic products.",
  className = "",
}: WhatsAppButtonProps) {
  const url = getWhatsAppSupportUrl(message);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Ayurvedic Expert on WhatsApp"
      className={`fixed bottom-6 left-6 z-30 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium text-xs group border border-white/20 focus:outline-none focus:ring-4 focus:ring-emerald-400/40 ${className}`}
    >
      <MessageCircle className="w-4 h-4 fill-white" />
      <span className="hidden sm:inline">WhatsApp Help</span>
    </a>
  );
}
