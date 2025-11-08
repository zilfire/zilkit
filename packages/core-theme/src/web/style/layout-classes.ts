import type { LayoutClassNames } from '@/types/style-types/layout-style-classes.js';

// const sectionSpacingXS = 'py-10 md:py-18 lg:py-24';
const sectionSpacingSM = 'py-16 md:py-24 lg:py-32';
const sectionSpacingMD = 'py-20 md:py-32 lg:py-36';
const sectionSpacingLG = 'py-24 md:py-36 lg:py-40';
const sectionSpacingXL = 'py-32 md:py-40 lg:py-48';
// const sectionSpacingxxl = 'py-40 md:py-64 lg:py-72';

// vertical line spacing
export const verticalLineSpacingXS = 'mb-1 md:mb-2'; // 0.25rem → 0.5rem
export const verticalLineSpacingSM = 'mb-2 md:mb-3'; // 0.5rem → 0.75rem
export const verticalLineSpacingMD = 'mb-4 md:mb-5'; // 1rem → 1.25rem
export const verticalLineSpacingLG = 'mb-6 md:mb-8'; // 1.5rem → 2rem
export const verticalLineSpacingXL = 'mb-8 md:mb-10'; // 2rem → 2.5rem
export const verticalLineSpacingXXL = 'mb-10 md:mb-12'; // 2.5rem → 3rem

export const layoutClassNames: LayoutClassNames = {
  verticalSectionSpacing: {
    base: sectionSpacingXL,
    sm: sectionSpacingSM,
    md: sectionSpacingMD,
    lg: sectionSpacingLG,
    xl: sectionSpacingXL,
  },
  backgroundColors: {
    black: 'bg-black',
    white: 'bg-white',
    muted: 'bg-gray-100',
    primary: 'bg-primary-500',
  },
  verticalLineSpacing: {
    base: verticalLineSpacingMD,
    xs: verticalLineSpacingXS,
    sm: verticalLineSpacingSM,
    md: verticalLineSpacingMD,
    lg: verticalLineSpacingLG,
    xl: verticalLineSpacingXL,
    xxl: verticalLineSpacingXXL,
  },
  containerPadding: {
    base: 'px-4 md:px-8 lg:px-16',
  },
};
