import colors from 'tailwindcss/colors';

import type { Config } from 'tailwindcss';
import path from 'path';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    path.join(path.dirname(require.resolve('@zilfire/core-theme')), '**/*.{js,ts,jsx,tsx,mdx}'),
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.cyan,
        secondary: colors.rose,
        accent: colors.amber,
        neutral: colors.gray,
        base: colors.white,
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      boxShadow: {
        'outline-primary': '0 0 0 3px rgba(79, 70, 229, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
