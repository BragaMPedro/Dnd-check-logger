import type { Config } from "tailwindcss";

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
            "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
         animation:{
          'slide-left': '_slideLeft 0.3s',
          'slide-right': '_slideRight 0.3s',
         },
         keyframes: {
            "_slideLeft": {
               "0%": {
                  transform: "translateX(0)",
               },
               "100%": {
                  transform: "translateX(-100%)",
               },
            },
            "_slideRight": {
               "0%": {
                  transform: "translateX(-100%)",
               },
               "100%": {
                  transform: "translateX(0)",
               },
            },
         },
      },
   },
   plugins: [require("daisyui")],
};
export default config;
