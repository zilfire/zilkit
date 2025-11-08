import { ColorClassNames } from '../../types/style-types/color-style-classes.js';

// Text colors
export const textBlack = 'text-black';
export const textWhite = 'text-white';
export const textPrimary = 'text-primary-600';
export const textMuted = 'text-gray-600';

// Background colors
export const bgBlack = 'bg-black';
export const bgWhite = 'bg-white';
export const bgPrimary = 'bg-primary-600';
export const bgMuted = 'bg-gray-200';

// Border colors
export const borderBlack = 'border-black';
export const borderWhite = 'border-white';
export const borderPrimary = 'border-primary-600';
export const borderMuted = 'border-gray-600';

export const colorClassNames: ColorClassNames = {
  backgroundColors: {
    black: bgBlack,
    white: bgWhite,
    muted: bgMuted,
    primary: bgPrimary,
  },
  borderColors: {
    black: borderBlack,
    white: borderWhite,
    muted: borderMuted,
    primary: borderPrimary,
  },
  textColors: {
    black: textBlack,
    white: textWhite,
    muted: textMuted,
    primary: textPrimary,
  },
};
