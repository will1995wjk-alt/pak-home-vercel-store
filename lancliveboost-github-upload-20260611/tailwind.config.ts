import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./data/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        ink: "#111418",
        muted: "#5b6573",
        line: "#e6e8ec",
        paper: "#f5f6f8",
        brand: "#f5820b",
        "brand-dark": "#d96b00",
        navy: "#0f2747",
        "navy-light": "#1c3a5e",
        accent: "#0f2747",
        whatsapp: "#25d366"
      },
      boxShadow: {
        soft: "0 14px 40px rgba(15, 39, 71, 0.08)",
        card: "0 2px 10px rgba(15, 39, 71, 0.06)",
        lift: "0 20px 50px rgba(15, 39, 71, 0.14)"
      },
      borderRadius: {
        xl: "14px"
      }
    }
  },
  plugins: []
};

export default config;
