import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Ayurvedic Signature Palette
        forest: {
          50: "#F0F5F1",
          100: "#DCE8DE",
          200: "#B9D1BE",
          300: "#8FB497",
          400: "#5C9068",
          500: "#2E693D",
          600: "#235230",
          700: "#1C3F26",
          800: "#15311E",
          900: "#0E2214",
          950: "#07120A",
        },
        sage: {
          50: "#F5F8F5",
          100: "#E6ECE6",
          200: "#C8D7C8",
          300: "#A6C0A6",
          400: "#87A987",
          500: "#698F69",
          600: "#527352",
          700: "#3E573E",
          800: "#2D3E2D",
          900: "#1F2B1F",
        },
        gold: {
          50: "#FAF7EE",
          100: "#F4ECD4",
          200: "#E8D8A7",
          300: "#DAC27A",
          400: "#CBAF4F",
          500: "#C5A059",
          600: "#A8833E",
          700: "#87672D",
          800: "#684D20",
          900: "#4D3816",
        },
        ayur: {
          ivory: "#FAF8F5",
          linen: "#F7F4EE",
          cream: "#F4EFEA",
          sand: "#EFECE6",
          stone: "#E4DFD5",
          beige: "#EADBCE",
          charcoal: "#1F2421",
          slate: "#1C231E",
          moss: "#3A4F3D",
          leaf: "#2A5C38",
          mist: "#EBF1EB",
          sage: "#7D9980",
          terracotta: "#C86D51",
          goldMuted: "#C5A872",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(28, 37, 30, 0.03)",
        soothe: "0 4px 24px -2px rgba(28, 37, 30, 0.04), 0 16px 36px -12px rgba(28, 37, 30, 0.05)",
        card: "0 4px 20px -2px rgba(28, 37, 30, 0.04)",
        float: "0 12px 32px -4px rgba(28, 37, 30, 0.08)",
        gold: "0 4px 20px -2px rgba(197, 168, 114, 0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(8px) rotate(-2deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "shimmer-gold": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 4s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-reverse": "float-reverse 7s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
        "marquee-fast": "marquee 22s linear infinite",
        "shimmer-gold": "shimmer-gold 3s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
