import type { Config } from "tailwindcss";
import { mauve, violet, red, blackA } from "@radix-ui/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      fontFamily: {
        raleway: ["var(--font-raleway)"],
        openSans: ["var(--font-open-sans)"],
        poppins: ["var(--font-poppins)"],
      },

      colors: {
        primary: "#f2be5c",
        ...mauve,
        ...violet,
        ...red,
        ...blackA,
      },
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
    screens: {
      lt: { max: "500px" },
      sm: { max: "600px" },
      sm1: { max: "840px" },
      md: { max: "1100px" },
      md1: { max: "850px" },
      lg: { min: "2300px" },
      xl: { max: "1280px" },
      "2xl": { max: "1536px" },
    },
  },
  plugins: [],
};
export default config;
