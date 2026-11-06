import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Leaf, MapPin, Heart, ShieldCheck, ArrowRight, Award, HeartHandshake, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Our Story & Varanasi Heritage | Shree Vidhi Organics",
  description: "Founded by Aditi Singh after healing chronic PCOD/PCOS with Ayurveda. A government-funded social enterprise in Varanasi empowering rural women and farmers through pure Ayurvedic Vidhi.",
};

export default function OurStoryPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-20 sm:space-y-28">
        {/* 1. Hero Section */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] bg-[#18231C] px-4 py-1.5 rounded-full border border-[#C5A872]/40 shadow-[0_4px_16px_-2px_rgba(24,35,28,0.2),0_0_12px_rgba(197,168,114,0.12)]">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B980]" />
            <span>Government-Funded Social Enterprise • Varanasi</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#18231C] tracking-tight leading-[1.15]">
            Ancient <span className="italic font-normal text-[#8C6D32]">Vidhi</span> for Modern Wellness.
          </h1>
          <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light max-w-2xl mx-auto">
            Born from a personal journey of healing and rooted in the spiritual ghats of Varanasi, Shree Vidhi crafts certified pure Ayurvedic remedies while creating an ecosystem of dignity, entrepreneurship, and rural empowerment.
          </p>
        </div>

        {/* 2. Brand Showcase Banner Frame */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-[#EDE7DD] shadow-[0_12px_40px_-8px_rgba(28,37,30,0.06)] bg-[#F8F5EE]">
          <Image
            src="/pictures/brand/shreevidhi_brand_showcase.jpg"
            alt="Shree Vidhi Organics Complete Product Range"
            fill
            priority
            className="object-contain p-2"
          />
        </div>

        {/* 3. Founder's Healing Story: Aditi Singh & PCOD/PCOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-block text-[10px] font-medium uppercase tracking-[0.25em] text-[#7D9980]">
              The Genesis &amp; Founder&rsquo;s Journey
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#18231C] leading-snug">
              From Chronic PCOD to Ayurveda&rsquo;s Golden Method
            </h2>
            <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light">
              Shree Vidhi was born from a deeply personal journey of healing. Our founder, <strong>Aditi Singh</strong>, struggled for years with a disturbed modern lifestyle and chronic PCOD/PCOS that conventional treatments failed to resolve permanently.
            </p>
            <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light">
              Turning to ancient Ayurvedic texts and holistic botanical nutrition, she experienced the transformative power of nature: cycle regularity restored, inflammation calmed, and authentic vitality reclaimed.
            </p>
            <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light">
              Inspired to make this golden <em>&ldquo;Vidhi&rdquo;</em> (sacred method) accessible to every home, she established a <strong>government-funded social enterprise in Varanasi</strong> — uniting authentic time-tested formulations with modern certified standards.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-[#18231C] border border-[#C5A872]/40 shadow-[0_4px_16px_-2px_rgba(24,35,28,0.25)] flex items-center justify-center text-[#D8B980]">
              <HeartHandshake className="w-5 h-5 text-[#D8B980]" />
            </div>
            <h3 className="font-serif text-2xl font-normal text-[#18231C]">
              What is <span className="italic text-[#8C6D32]">&quot;Vidhi&quot;</span>?
            </h3>
            <p className="text-xs sm:text-sm text-[#4A544E] leading-relaxed font-light">
              In classical Sanskrit treatises, <strong>Vidhi (विधि)</strong> signifies the righteous procedure, mindful cadence, and exact ritual through which healing energy (<em>Prana</em>) is awakened. Every seed, root, and leaf we grind honors this sacred discipline.
            </p>
            <div className="pt-2 border-t border-[#F0ECE4] text-[11px] text-[#8C6D32] font-medium tracking-wide uppercase">
              Varanasi Heritage • Social Enterprise
            </div>
          </div>
        </div>

        {/* 4. Our Vision & Our Mission (Booklet Official Text) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#18231C] text-[#FAF8F5] border border-[#2D3E32] shadow-[0_12px_36px_rgba(24,35,28,0.15)] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#25372B] border border-[#C5A872]/40 flex items-center justify-center text-[#D8B980]">
              <Sparkles className="w-4 h-4 text-[#D8B980]" />
            </div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#D8B980] font-medium block">
              OUR VISION
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              The Symbol of Authentic Wellness &amp; Women&rsquo;s Dignity
            </h3>
            <p className="text-xs sm:text-sm text-[#C2CDC5] leading-relaxed font-light">
              &ldquo;To be the definitive symbol of authentic Ayurvedic wellness and women&rsquo;s empowerment, creating a future where natural health and economic independence are universally accessible. We envision a society where every &lsquo;Shree Vidhi&rsquo; product is not just a personal care item, but a testament to our rich heritage, the dignity of labor, and the boundless potential of women.&rdquo;
            </p>
          </div>

          {/* Mission Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white text-forest-950 border border-[#EDE7DD] shadow-[0_12px_36px_rgba(28,37,30,0.04)] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#C5A872]/40 flex items-center justify-center text-[#8C6D32]">
              <Award className="w-4 h-4 text-[#8C6D32]" />
            </div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C6D32] font-medium block">
              OUR MISSION
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-forest-950">
              Government-Certified Purity &amp; Ethical Sourcing
            </h3>
            <p className="text-xs sm:text-sm text-forest-900/80 leading-relaxed font-light">
              &ldquo;To produce and market high-quality, government-certified Ayurvedic and organic products that celebrate &lsquo;ancient vidhi&rsquo; for modern wellness. Our mission is to directly enhance the lives of women by providing them with entrepreneurial opportunities and to uplift farming communities through fair and ethical sourcing practices.&rdquo;
            </p>
          </div>
        </div>

        {/* 5. Product Portfolio Overview (from Booklet Page 5) */}
        <div className="bg-white p-8 sm:p-14 rounded-3xl sm:rounded-[2.5rem] border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] tracking-[0.25em] text-[#8C6D32] uppercase font-medium">
              CURATED HERITAGE APOTHECARY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#18231C]">
              Our Product Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-[#6C766F] font-light">
              A modern interpretation of ancient wisdom across three core wellness disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DD] space-y-3">
              <span className="text-[11px] font-semibold text-[#8C6D32] uppercase tracking-wider block">01 / Skin &amp; Facial Care</span>
              <h4 className="font-serif text-lg text-[#18231C] font-semibold">Natural Cleansers &amp; Masks</h4>
              <p className="text-xs text-[#5D6760] font-light leading-relaxed">
                Natural Ubtan, Multani Mitti Neem Turmeric Blend, non-staining Jangali Haldi, pure Chandan, and cooling Aloe Vera Gels.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DD] space-y-3">
              <span className="text-[11px] font-semibold text-[#8C6D32] uppercase tracking-wider block">02 / Sacred Hair Care</span>
              <h4 className="font-serif text-lg text-[#18231C] font-semibold">Shiro Lepa &amp; Cleansers</h4>
              <p className="text-xs text-[#5D6760] font-light leading-relaxed">
                Sarva Kesh Blend, Amla Reetha Shikakai, and pure single-origin herbs like Kapoor Kachri, Methi, Henna, and Hibiscus.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DD] space-y-3">
              <span className="text-[11px] font-semibold text-[#8C6D32] uppercase tracking-wider block">03 / Wellness Supplements</span>
              <h4 className="font-serif text-lg text-[#18231C] font-semibold">Hormonal &amp; Cellular Vitality</h4>
              <p className="text-xs text-[#5D6760] font-light leading-relaxed">
                Vedic Seed Cycling Kit (Follicular &amp; Luteal phases), Himalayan Sea Buckthorn pulp, Beetroot superfood powder, and Moringa.
              </p>
            </div>
          </div>
        </div>

        {/* 6. Four Pillars of Integrity */}
        <div className="bg-white p-8 sm:p-14 rounded-3xl sm:rounded-[2.5rem] border border-[#EDE7DD] shadow-[0_4px_24px_-4px_rgba(28,37,30,0.03)] space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] tracking-[0.25em] text-[#8C6D32] uppercase font-medium">
              ETHICAL COMMITMENT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#18231C]">
              Four Pillars of Our Social Enterprise
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DD] space-y-2">
              <div className="flex items-center gap-2 text-[#8C6D32] text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Pure &amp; Natural</span>
              </div>
              <p className="text-xs text-[#5D6760] font-light leading-relaxed">
                Zero parabens, sulfates, artificial fragrances, or chemical fillers. 100% botanical bio-actives.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DD] space-y-2">
              <div className="flex items-center gap-2 text-[#8C6D32] text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Ancient Wisdom</span>
              </div>
              <p className="text-xs text-[#5D6760] font-light leading-relaxed">
                Formulations inspired by classical Ayurvedic treatises, cold-processed to preserve essential prana.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DD] space-y-2">
              <div className="flex items-center gap-2 text-[#8C6D32] text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Sustainability</span>
              </div>
              <p className="text-xs text-[#5D6760] font-light leading-relaxed">
                Fair living prices directly for rural farming communities and eco-conscious recyclable packaging.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DD] space-y-2">
              <div className="flex items-center gap-2 text-[#8C6D32] text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Women Entrepreneurs</span>
              </div>
              <p className="text-xs text-[#5D6760] font-light leading-relaxed">
                Providing rural women with the tools, training, and resources to build independent economic futures.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Official Regulatory & License Credentials */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-[#E0D7C8] space-y-4 text-xs text-[#5D6760] font-light">
          <div className="flex items-center gap-2 text-forest-950 font-serif font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-[#1C3F26]" />
            <span>Government Registrations &amp; Licensing Credentials</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div>
              <strong className="text-forest-950 font-medium block">Marketed By:</strong>
              <span>Shree Vidhi Organics, N15/170 A Badi Gaibi Chauraha, Birdopur, Varanasi, Uttar Pradesh 221010</span>
            </div>
            <div>
              <strong className="text-forest-950 font-medium block">AYUSH &amp; FSSAI Licenses:</strong>
              <span>License No. RJ-1032-AYU • FSSAI Lic. No. 12221036000261 / 12223024000403</span>
            </div>
            <div>
              <strong className="text-forest-950 font-medium block">Direct Contact:</strong>
              <span>+91 6393600430, +91 7752905694 • shreevidhiorganics@gmail.com</span>
            </div>
          </div>
        </div>

        {/* 8. Call to Action */}
        <div className="p-10 sm:p-16 bg-[#18231C] text-[#FAF8F5] rounded-3xl sm:rounded-[2.5rem] text-center space-y-6 shadow-[0_16px_40px_-8px_rgba(24,35,28,0.25)] border border-[#26372D]">
          <span className="text-[10px] tracking-[0.25em] text-[#D8B980] uppercase font-medium">
            Join the Ritual
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-snug max-w-xl mx-auto">
            Experience Ancient Vidhi for Modern Wellness
          </h2>
          <p className="text-xs sm:text-sm text-[#A8B4AC] max-w-md mx-auto font-light leading-relaxed">
            From hormonal balance with our Seed Cycling Kit to glowing bridal Ubtan, explore our certified, chemical-free rituals.
          </p>
          <div className="pt-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#FAF8F5] hover:bg-[#F2ECE0] text-[#18231C] font-medium text-xs sm:text-sm py-3.5 px-8 rounded-full transition-all shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
