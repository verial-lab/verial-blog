import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        verial: {
          bg: "#0A0A0A",
          surface: "#141414",
          border: "#1E1E1E",
          muted: "#666",
          primary: "#4D80FF",
          secondary: "#3366E6",
          accent: "#1A80B3",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "Menlo", "monospace"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
