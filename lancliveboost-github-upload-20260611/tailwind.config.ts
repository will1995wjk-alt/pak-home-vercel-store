import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./data/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f2233",
        muted: "#5a6b78",
        line: "#e2e8ec",
        paper: "#f4f6f8",
        brand: "#0f9d63",
        "brand-dark": "#0b7d4e",
        navy: "#102a43",
        "navy-light": "#1b3a57",
        accent: "#e8590c",
        whatsapp: "#25d366"
      },
      boxShadow: {
        soft: "0 14px 40px rgba(16, 42, 67, 0.08)",
        card: "0 2px 10px rgba(16, 42, 67, 0.06)",
        lift: "0 20px 50px rgba(16, 42, 67, 0.14)"
      },
      borderRadius: {
        xl: "14px"
      }
    }
  },
  plugins: []
};

export default config;
