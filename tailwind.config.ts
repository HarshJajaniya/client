import type { Config } from "tailwindcss";

export default {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/component/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        white: "#ffffff",

        gray: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },

        blue: {
          200: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },

        "dark-bg": "#101214",
        "dark-bg-2": "#1d1f21",
        "dark-bg-3": "#3b3d40",

        "blue-primary": "#0275ff",
        "stroke-dark": "#2d3135",
      },
    },
  },

  plugins: [],
} satisfies Config;
