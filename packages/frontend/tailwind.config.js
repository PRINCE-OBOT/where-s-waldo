/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#12233B",
          light: "#1C3454",
          dark: "#0B1626"
        },
        parchment: {
          DEFAULT: "#EDE6D6",
          dark: "#DCD2B8"
        },
        brass: {
          DEFAULT: "#C9A24B",
          light: "#E0C578",
          dark: "#9C7A32"
        },
        stamp: "#B23A2E",
        moss: "#4C6444"
      },
      fontFamily: {
        display: ["'Special Elite'", "cursive"],
        mono: ["'Space Mono'", "monospace"]
      },
      backgroundImage: {
        grain: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)"
      },
      backgroundSize: {
        grain: "3px 3px"
      }
    }
  },
  plugins: []
};
