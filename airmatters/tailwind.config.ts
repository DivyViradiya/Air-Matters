import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "112.5rem", // 1800px
        "4xl": "131.25rem", // 2100px
      },
      borderRadius: {
        // Squircle standard
        lg:  "1.5rem",  /* 24px — cards */
        md:  "1rem",    /* 16px — inputs */
        sm:  "0.5rem",  /* 8px  — badges */
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
      },
      colors: {
        // ── Brand palette (Vibrant Green & Biotech Blue) ───────────
        "brand-primary":   "#56B452", // Green-500
        "brand-secondary": "#2C7D3B", // Leaf Green
        "brand-accent":    "#0EA5E9", // Electric Blue
        "brand-deep":      "#142C16", // Moss Deep
        "brand-forest":    "#23572A", // Forest Dark

        "moss-deep":   "#142C16",
        "forest-dark": "#23572A",
        "leaf-green":  "#2C7D3B",
        "bio-vibrant": "#56B452",
        "sprout":      "#7DD87A",
        "pulse":       "#0EA5E9", // Updated to Blue
        "mist":        "#E0F2FE", // Updated to Blue
        "ghost-mint":  "#F0FDF4",
        "void":        "#080F09",
        "canopy":      "#1A3D1D",
        "data-ink":    "#4A6040",
        "signal-amber": "#F59E0B",
        "hazard-red":  "#EF4444",

        // ── Tailwind token aliases (for components) ──────
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border:     "hsl(var(--border) / <alpha-value>)",
        input:      "hsl(var(--input) / <alpha-value>)",
        ring:       "hsl(var(--ring) / <alpha-value>)",
        card: {
          DEFAULT:    "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          border:     "hsl(var(--card-border) / <alpha-value>)",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          border:     "hsl(var(--popover-border) / <alpha-value>)",
        },
        primary: {
          DEFAULT:    "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          border:     "var(--primary-border)",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          border:     "var(--secondary-border)",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          border:     "var(--muted-border)",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          border:     "var(--accent-border)",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          border:     "var(--destructive-border)",
        },
        chart: {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)",
        },
        sidebar: {
          ring:       "hsl(var(--sidebar-ring) / <alpha-value>)",
          DEFAULT:    "hsl(var(--sidebar) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
          border:     "hsl(var(--sidebar-border) / <alpha-value>)",
        },
        "sidebar-primary": {
          DEFAULT:    "hsl(var(--sidebar-primary) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          border:     "var(--sidebar-primary-border)",
        },
        "sidebar-accent": {
          DEFAULT:    "hsl(var(--sidebar-accent) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border:     "var(--sidebar-accent-border)",
        },
        status: {
          online:  "#22C55E",
          away:    "#F59E0B",
          busy:    "#EF4444",
          offline: "#94A3B8",
        },
      },
      fontFamily: {
        sans:    ["'Open Sans'", "sans-serif"],
        display: ["'Poppins'", "sans-serif"],  // Poppins — headings
        mono:    ["'JetBrains Mono'", "monospace"],
        lexend:  ["'Lexend'", "sans-serif"],
      },
      keyframes: {

        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        blob: {
          "0%":   { transform: "translate(0px, 0px) scale(1)" },
          "33%":  { transform: "translate(30px, -50px) scale(1.1)" },
          "66%":  { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        "float-up": {
          "0%":  { transform: "translateY(0) translateX(0)", opacity: "0" },
          "10%": { opacity: "0.2" },
          "50%": { opacity: "0.5" },
          "90%": { opacity: "0.2" },
        },
        // New: subtle pulse glow for 3D scene highlights
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", filter: "blur(20px)" },
          "50%":      { opacity: "0.7", filter: "blur(28px)" },
        },
        // New: scan-line reveal for data readouts
        "scan-in": {
          from: { clip_path: "inset(0 100% 0 0)" },
          to:   { clip_path: "inset(0 0% 0 0)" },
        },
      },
      animation: {
        blob:               "blob 7s infinite",
        "float-up":         "float-up 15s linear infinite",
        "accordion-down":   "accordion-down 0.2s ease-out",
        "accordion-up":     "accordion-up 0.2s ease-out",
        "glow-pulse":       "glow-pulse 4s ease-in-out infinite",
        "scan-in":          "scan-in 0.6s ease-out forwards",
      },
      transitionTimingFunction: {
        liquid: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        snap:   "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        slow: "500ms",
        snap: "150ms",
      },
      boxShadow: {
        // Brand-tinted glow shadows
        "glow-sm": "0 0 10px 2px hsl(118 41% 51% / 0.2)",
        "glow-md": "0 0 20px 4px hsl(118 41% 51% / 0.25)",
        "glow-lg": "0 0 40px 8px hsl(118 41% 51% / 0.2)",
        "pulse-glow": "0 0 20px 6px hsl(118 54% 66% / 0.35)",
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
