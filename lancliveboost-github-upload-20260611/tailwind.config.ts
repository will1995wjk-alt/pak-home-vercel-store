import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./data/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        ink: "#13201f",
        muted: "#60706d",
        line: "#d7e5df",
        paper: "#f3faf6",
        brand: "#008c7a",
        "brand-dark": "#006f61",
        navy: "#173d38",
        "navy-light": "#23514b",
        accent: "#ff7a45",
        whatsapp: "#1fc46b"
      },
      boxShadow: {
        soft: "0 14px 40px rgba(19, 32, 31, 0.1)",
        card: "0 2px 10px rgba(19, 32, 31, 0.07)",
        lift: "0 20px 50px rgba(0, 140, 122, 0.16)"
      },
      borderRadius: {
        xl: "14px"
      }
    }
  },
  plugins: []
};

export default config;
