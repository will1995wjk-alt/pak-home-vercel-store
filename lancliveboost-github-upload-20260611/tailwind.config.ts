import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./data/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        ink: "#17201c",
        muted: "#5f6b65",
        line: "#d9e1dc",
        paper: "#f8faf8",
        brand: "#0f8a72",
        navy: "#183f58",
        accent: "#de6a2c"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(28, 44, 37, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
