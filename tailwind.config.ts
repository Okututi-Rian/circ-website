import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A8A",
          dark: "#0F2460",
        },
        accent: {
          green:  "#22C55E",
          orange: "#F97316",
          sky:    "#38BDF8",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          2: "#F0F4FF",
        },
        main:   "#1F2937",
        muted:  "#6B7280",
        border: "#E2E8F0",
      },
      fontFamily: {
        display: ["Clash Display", "sans-serif"],
        body:    ["Satoshi", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xl:  "12px",
        "2xl": "16px",
      },
      boxShadow: {
        card:    "0 2px 8px rgba(30,58,138,0.06)",
        "card-hover": "0 8px 24px rgba(30,58,138,0.12)",
        navbar:  "0 2px 12px rgba(30,58,138,0.08)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
