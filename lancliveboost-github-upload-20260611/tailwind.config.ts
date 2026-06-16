import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./data/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        ink: "#12100b",
        muted: "#6f6758",
        line: "#e5d8bd",
        paper: "#f7f1e6",
        brand: "#d6a84f",
        "brand-dark": "#a87922",
        navy: "#0b0b0c",
        "navy-light": "#191611",
        accent: "#f0c66c",
        whatsapp: "#25d366"
      },
      boxShadow: {
        soft: "0 14px 40px rgba(11, 11, 12, 0.12)",
        card: "0 2px 10px rgba(11, 11, 12, 0.08)",
        lift: "0 20px 50px rgba(11, 11, 12, 0.18)"
      },
      borderRadius: {
        xl: "14px"
      }
    }
  },
  plugins: []
};

export default config;
