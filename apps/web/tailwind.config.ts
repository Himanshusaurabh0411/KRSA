import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#2E3576",
        orange: "#E8500A",
        green: "#3AAA35",
        ink: "#1A1A2E",
        muted: "#6B7080",
        cream: "#FAF9F6"
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial", "sans-serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"]
      },
      boxShadow: {
        premium: "0 24px 60px rgba(22, 28, 72, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
