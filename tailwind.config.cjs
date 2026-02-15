/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#0b0f14",
          light: "#f7f5f2",
        },
        ink: {
          DEFAULT: "#101114",
          light: "#0f172a",
        },
        accent: {
          DEFAULT: "#ff7a1a",
          soft: "#ffd2b0",
        },
        mint: {
          DEFAULT: "#58f1b8",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body: ["Source Serif 4", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 122, 26, 0.25)",
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
        "mesh": "radial-gradient(circle at top, rgba(255,122,26,0.2), transparent 55%), radial-gradient(circle at 20% 80%, rgba(88,241,184,0.22), transparent 50%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
