import { BackgroundClassNames } from '../types/background-style.types.js';

// Background colors
export const bgBlack = 'bg-black';
export const bgWhite = 'bg-white';
export const bgPrimary = 'bg-primary-600';
export const bgMuted = 'bg-gray-100';

export const backgroundClassNames: BackgroundClassNames = {
  backgroundColors: {
    black: bgBlack,
    white: bgWhite,
    muted: bgMuted,
    primary: bgPrimary,
  },
};
