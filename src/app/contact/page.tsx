"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { useUIStore } from "@/store/ui-store";

export default function ContactPage() {
  const { addToast } = useUIStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Product Consultation & Doshic Advice",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast("Dhanyawad! Your message has been sent to our Varanasi care team.", "success");
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-4 py-1.5 rounded-full border border-[#C5A872]/40 shadow-[0_4px_16px_-2px_rgba(24,35,28,0.2),0_0_12px_rgba(197,168,114,0.12)]">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B980]" />
            <span>We Are Honored To Guide You</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#18231C] tracking-tight">
            Connect with Shree Vidhi
          </h1>
          <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light">
            Whether you have questions regarding doshic compatibility, dosage rituals, or order dispatch, our team in Varanasi is here to assist.
          </p>
        </div>

        {/* 2 Column Layout: Details + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
          {/* Left Details */}
          <div className="bg-[#18231C] text-[#FAF8F5] p-8 sm:p-10 rounded-3xl shadow-[0_16px_40px_-8px_rgba(24,35,28,0.25)] border border-[#26372D] space-y-8">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D8B980] font-medium block mb-1">
                Varanasi Sanctuary
              </span>
              <h3 className="font-serif font-normal text-2xl text-[#FAF8F5]">
                Shree Vidhi Organics
              </h3>
            </div>

            <div className="space-y-6 text-xs text-[#C2CDC5]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D8B980] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#FAF8F5] font-medium block mb-0.5">Registered Sanctuary:</strong>
                  <span className="font-light">N15/170 A Badi Gaibi Chauraha, Birdopur, Varanasi, Uttar Pradesh - 221010, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D8B980] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#FAF8F5] font-medium block mb-0.5">Phone & WhatsApp:</strong>
                  <div className="space-y-0.5">
                    <a href="tel:+916393600430" className="hover:text-[#D8B980] font-light transition-colors block">
                      +91 6393600430
                    </a>
                    <a href="tel:+917752905694" className="hover:text-[#D8B980] font-light transition-colors block">
                      +91 7752905694
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D8B980] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#FAF8F5] font-medium block mb-0.5">Electronic Mail:</strong>
                  <a href="mailto:shreevidhiorganics@gmail.com" className="hover:text-[#D8B980] font-light transition-colors">
                    shreevidhiorganics@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#D8B980] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#FAF8F5] font-medium block mb-0.5">Sanctuary Hours:</strong>
                  <span className="font-light">Monday – Saturday: 10:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#1F2C23] rounded-2xl border border-[#2D3E32] text-xs text-[#A8B4AC] font-light leading-relaxed">
              💬 <strong className="text-[#FAF8F5] font-medium">Direct WhatsApp Line:</strong> Have an immediate inquiry regarding your custom ritual? Message us directly at +91 6393600430.
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-2 bg-white/90 p-8 sm:p-12 rounded-3xl border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-6">
            <h2 className="font-serif font-normal text-2xl text-[#18231C]">
              Send an Inquiry or Consultation Request
            </h2>

            {submitted ? (
              <div className="p-10 text-center bg-[#FAF8F5] border border-[#EDE7DD] rounded-2xl space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#2D5A38] mx-auto" />
                <h3 className="font-serif font-normal text-xl text-[#18231C]">
                  Message Dispatched with Gratitude
                </h3>
                <p className="text-xs sm:text-sm text-[#6C766F] font-light max-w-sm mx-auto leading-relaxed">
                  Our herbalists in Varanasi will review your consultation request and reply within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-medium text-[#1C3F26] underline mt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. anand@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                      Inquiry Category *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl px-4 py-2.5 text-xs text-[#18231C] focus:outline-none focus:border-[#7D9980] cursor-pointer"
                    >
                      <option value="Product Consultation & Doshic Advice">Product Advice & Dosha Consultation</option>
                      <option value="Order Tracking & Delivery">Order Status & Delivery Inquiries</option>
                      <option value="Bulk or Wholesale Herbal Inquiry">Bulk / Wholesale Sourcing Inquiry</option>
                      <option value="Feedback or Testimonial">Feedback or Experience Sharing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#2F3832] block mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your inquiry or question in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#EDE7DD] rounded-xl p-4 text-xs text-[#18231C] placeholder:text-[#A3ADA5] focus:outline-none focus:border-[#7D9980] focus:ring-1 focus:ring-[#7D9980]/30 transition-all font-light"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#1C3F26] hover:bg-[#16331F] text-[#FAF8F5] font-medium py-3.5 px-8 rounded-full text-xs sm:text-sm shadow-[0_8px_20px_-4px_rgba(28,63,38,0.25)] flex items-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4 text-[#D8B980]" />
                  <span>Send Message to Varanasi</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
