import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        wine: {
          DEFAULT: "#3f1c28",
          deep: "#2a1219",
          mid: "#5a2838",
          soft: "#7a3d4e",
        },
        gold: {
          DEFAULT: "#c4a35a",
          light: "#e4c97a",
          dark: "#8d7033",
        },
        parchment: {
          DEFAULT: "#f6efe2",
          deep: "#e8dcc6",
          card: "#fffaf1",
        },
        ink: {
          DEFAULT: "#1f1914",
          muted: "#5c5147",
          faint: "#7a6e62",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Palatino", "Georgia", "serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 12px 30px -18px rgba(63, 28, 40, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
