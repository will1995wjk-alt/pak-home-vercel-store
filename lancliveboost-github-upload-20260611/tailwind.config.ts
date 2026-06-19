import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./data/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        ink: "#20242a",
        muted: "#656b76",
        line: "#d9dde4",
        paper: "#f4f6f8",
        brand: "#1457d9",
        "brand-dark": "#0b3d91",
        navy: "#101827",
        "navy-light": "#18243a",
        accent: "#ff7a1a",
        whatsapp: "#ff7a1a"
      },
      boxShadow: {
        soft: "0 14px 40px rgba(32, 36, 42, 0.12)",
        card: "0 2px 10px rgba(32, 36, 42, 0.08)",
        lift: "0 20px 50px rgba(20, 87, 217, 0.16)"
      },
      borderRadius: {
        xl: "14px"
      }
    }
  },
  plugins: []
};

export default config;
