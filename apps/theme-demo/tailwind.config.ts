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
        primary: colors.green,
        secondary: colors.cyan,
        accent: colors.rose,
        'secondary-accent': colors.violet,
        neutral: colors.gray,
      },

      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['var(--font-geist-mono)', 'sans-serif'],
        heading: ['Merriweather', 'serif'],
        body: ['var(--font-geist-sans)', 'sans-serif'],
      },
      boxShadow: {
        'outline-primary': '0 0 0 3px rgba(79, 70, 229, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
