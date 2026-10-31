import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F5EFE3",
          deep: "#EBDBCD",
        },
        "cream-deep": "#EBDBCD",
        ink: {
          DEFAULT: "#19181D",
          60: "#5D5B62",
          line: "rgba(25, 24, 29, 0.9)",
        },
        ink60: "#5D5B62",
        tangerine: {
          DEFAULT: "#FE6500",
          deep: "#B84400",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        ui: ["var(--font-ui)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1240px",
      },
      spacing: {
        gutter: "clamp(16px, 4vw, 48px)",
      },
    },
  },
  plugins: [],
};

export default config;
