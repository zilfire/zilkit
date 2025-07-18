import type { Config } from "tailwindcss";
import path from "path";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    path.join(
      path.dirname(require.resolve("@zilfire/core-theme")),
      "**/*.{js,ts,jsx,tsx,mdx}"
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
