import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lotus: {
          "bg-primary": "#0A0A0F",
          "bg-secondary": "#111118",
          lavender: "#C5A3FF",
          "lavender-dark": "#9B7DD4",
          pink: "#FF6B9D",
          "pink-hot": "#FF3D7F",
          gold: "#FFD700",
          "gold-warm": "#FFC107",
          smoke: "#F0EDF5",
          mist: "#9D9DB5",
          shadow: "rgba(197,163,255,0.08)",
        },
      },
      fontFamily: {
        heading: ["Bebas Neue", "Impact", "sans-serif"],
        body: ["Poppins", "sans-serif"],
        manga: ["Comic Neue", "cursive"],
      },
      boxShadow: {
        "lotus-glow": "0 0 30px rgba(197,163,255,0.35)",
        "pink-glow": "0 0 30px rgba(255,107,157,0.35)",
        "gold-glow": "0 0 20px rgba(255,215,0,0.3)",
        "lavender-soft": "0 4px 30px rgba(197,163,255,0.08)",
        "card-elevated": "0 8px 40px rgba(197,163,255,0.06), 0 1px 3px rgba(0,0,0,0.3)",
        "neon-lavender": "0 0 12px rgba(197,163,255,0.5), 0 0 30px rgba(197,163,255,0.2)",
        "neon-pink": "0 0 12px rgba(255,107,157,0.5), 0 0 30px rgba(255,107,157,0.2)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
        "glow-breathe": "glowBreathe 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(197,163,255,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(197,163,255,0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glowBreathe: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(197,163,255,0.3), inset 0 0 8px rgba(197,163,255,0.05)" },
          "50%": { boxShadow: "0 0 20px rgba(197,163,255,0.5), inset 0 0 12px rgba(197,163,255,0.1)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
