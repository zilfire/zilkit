import type { SectionClassNames } from '@/types/style-types/section-style-classes.js';

// const sectionSpacingXS = 'py-10 md:py-18 lg:py-24';
const sectionSpacingSM = 'py-16 md:py-24 lg:py-32';
const sectionSpacingMD = 'py-20 md:py-32 lg:py-36';
const sectionSpacingLG = 'py-24 md:py-36 lg:py-40';
const sectionSpacingXL = 'py-32 md:py-40 lg:py-48';
// const sectionSpacingxxl = 'py-40 md:py-64 lg:py-72';

export const sectionClassNames: SectionClassNames = {
  sectionVerticalSpacing: {
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
};
