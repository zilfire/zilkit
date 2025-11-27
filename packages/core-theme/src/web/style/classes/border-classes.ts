import type { BorderClassNames } from '../types/border-style.types.js';

// Border colors
export const borderBlack = 'border-black';
export const borderWhite = 'border-white';
export const borderPrimary = 'border-primary-600';
export const borderMuted = 'border-gray-400';

// Border edges - top
export const borderTopThin = 'border-t-1';
export const borderTopMedium = 'border-t-2';
export const borderTopThick = 'border-t-4';

// Border edges - right
export const borderRightThin = 'border-r-1';
export const borderRightMedium = 'border-r-2';
export const borderRightThick = 'border-r-4';

// Border edges - bottom
export const borderBottomThin = 'border-b-1';
export const borderBottomMedium = 'border-b-2';
export const borderBottomThick = 'border-b-4';

// Border edges - left
export const borderLeftThin = 'border-l-1';
export const borderLeftMedium = 'border-l-2';
export const borderLeftThick = 'border-l-4';

// Border edges - all
export const borderAllThin = 'border-1';
export const borderAllMedium = 'border-2';
export const borderAllThick = 'border-4';

export const borderClassNames: BorderClassNames = {
  color: {
    black: borderBlack,
    white: borderWhite,
    muted: borderMuted,
    primary: borderPrimary,
  },
  edge: {
    top: {
      thin: borderTopThin,
      medium: borderTopMedium,
      thick: borderTopThick,
    },
    right: {
      thin: borderRightThin,
      medium: borderRightMedium,
      thick: borderRightThick,
    },
    bottom: {
      thin: borderBottomThin,
      medium: borderBottomMedium,
      thick: borderBottomThick,
    },
    left: {
      thin: borderLeftThin,
      medium: borderLeftMedium,
      thick: borderLeftThick,
    },
    all: {
      thin: borderAllThin,
      medium: borderAllMedium,
      thick: borderAllThick,
    },
  },
};
