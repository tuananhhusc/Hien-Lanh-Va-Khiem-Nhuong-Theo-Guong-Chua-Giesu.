import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.mdx",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#FDFBF7",
        ivory: "#FAFAFA",
        ink: "#18181B",
        gold: "#D4AF37",
        purple: "#7D287D",
        burgundy: "#C62D25",
      },
      boxShadow: {
        halo: "0 20px 60px rgba(125, 40, 125, 0.10)",
      },
      fontFamily: {
        sans: [
          "var(--font-academic-sans)",
          "Noto Sans",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "var(--font-academic-serif)",
          "Noto Serif",
          "Source Serif Pro",
          "Times New Roman",
          "serif",
        ],
      },
      maxWidth: {
        reading: "72ch",
      },
    },
  },
  plugins: [],
};

export default config;
