import type { LayoutClassNames } from '@/types/style-types/layout-style-classes.js';

// const sectionSpacingXS = 'py-10 md:py-18 lg:py-24';
const sectionSpacingSM = 'py-16 md:py-24 lg:py-32';
const sectionSpacingMD = 'py-20 md:py-32 lg:py-36';
const sectionSpacingLG = 'py-24 md:py-36 lg:py-40';
const sectionSpacingXL = 'py-32 md:py-40 lg:py-48';
const sectionSpacingXXL = 'py-40 md:py-64 lg:py-72';

// vertical line spacing
export const verticalLineSpacingXS = 'mb-1 md:mb-2'; // 0.25rem → 0.5rem
export const verticalLineSpacingSM = 'mb-2 md:mb-3'; // 0.5rem → 0.75rem
export const verticalLineSpacingMD = 'mb-4 md:mb-6'; // 1rem → 1.25rem
export const verticalLineSpacingLG = 'mb-6 md:mb-8'; // 1.5rem → 2rem
export const verticalLineSpacingXL = 'mb-8 md:mb-12'; // 2rem → 3rem
export const verticalLineSpacingXXL = 'mb-12 md:mb-16'; // 3rem → 4rem

// horizontal gap spacing
export const horizontalGapSpacingXS = 'gap-x-2'; // 0.5rem
export const horizontalGapSpacingSM = 'gap-x-4'; // 1rem
export const horizontalGapSpacingMD = 'gap-x-6'; // 1.5rem
export const horizontalGapSpacingLG = 'gap-x-8'; // 2rem
export const horizontalGapSpacingXL = 'gap-x-12'; // 3rem
export const horizontalGapSpacingXXL = 'gap-x-16'; // 4rem

// vertical gap spacing
export const verticalGapSpacingXS = 'gap-y-2'; // 0.5rem
export const verticalGapSpacingSM = 'gap-y-4'; // 1rem
export const verticalGapSpacingMD = 'gap-y-6'; // 1.5rem
export const verticalGapSpacingLG = 'gap-y-8'; // 2rem
export const verticalGapSpacingXL = 'gap-y-12'; // 3rem
export const verticalGapSpacingXXL = 'gap-y-16'; // 4rem

// gap spacing
export const gapSpacingXS = 'gap-2'; // 0.5rem
export const gapSpacingSM = 'gap-4'; // 1rem
export const gapSpacingMD = 'gap-6'; // 1.5rem
export const gapSpacingLG = 'gap-8'; // 2rem
export const gapSpacingXL = 'gap-12'; // 3rem
export const gapSpacingXXL = 'gap-16'; // 4rem

// z-index layers
export const zIndexBackground = 'z-0';
export const zIndexOverlay = 'z-5';
export const zIndexContent = 'z-10';
export const zIndexDropdown = 'z-40';
export const zIndexModal = 'z-50';
export const zIndexTooltip = 'z-60';

// Column layout classes
export const halfColumn = 'w-full lg:w-6/12';
export const thirdColumn = 'w-full lg:w-4/12';
export const quarterColumn = 'w-full lg:w-3/12';
export const twoThirdsColumn = 'w-full lg:w-8/12';
export const threeQuartersColumn = 'w-full lg:w-9/12';
export const fullWidthColumn = 'w-full';

export const layoutClassNames: LayoutClassNames = {
  verticalSectionSpacing: {
    sm: sectionSpacingSM,
    md: sectionSpacingMD,
    lg: sectionSpacingLG,
    xl: sectionSpacingXL,
    xxl: sectionSpacingXXL,
  },
  verticalLineSpacing: {
    xs: verticalLineSpacingXS,
    sm: verticalLineSpacingSM,
    md: verticalLineSpacingMD,
    lg: verticalLineSpacingLG,
    xl: verticalLineSpacingXL,
    xxl: verticalLineSpacingXXL,
  },
  containerPadding: {},
  contentMaxWidth: {
    xs: 'max-w-xl',
    narrow: 'max-w-2xl',
    normal: 'max-w-4xl',
    wide: 'max-w-6xl',
    full: 'max-w-none',
  },
  horizontalGapSpacing: {
    xs: horizontalGapSpacingXS,
    sm: horizontalGapSpacingSM,
    md: horizontalGapSpacingMD,
    lg: horizontalGapSpacingLG,
    xl: horizontalGapSpacingXL,
    xxl: horizontalGapSpacingXXL,
  },
  verticalGapSpacing: {
    xs: verticalGapSpacingXS,
    sm: verticalGapSpacingSM,
    md: verticalGapSpacingMD,
    lg: verticalGapSpacingLG,
    xl: verticalGapSpacingXL,
    xxl: verticalGapSpacingXXL,
  },
  gapSpacing: {
    xs: gapSpacingXS,
    sm: gapSpacingSM,
    md: gapSpacingMD,
    lg: gapSpacingLG,
    xl: gapSpacingXL,
    xxl: gapSpacingXXL,
  },
  zIndex: {
    background: zIndexBackground,
    overlay: zIndexOverlay,
    content: zIndexContent,
    dropdown: zIndexDropdown,
    modal: zIndexModal,
    tooltip: zIndexTooltip,
  },
  columnLayout: {
    half: halfColumn,
    third: thirdColumn,
    quarter: quarterColumn,
    twoThirds: twoThirdsColumn,
    threeQuarters: threeQuartersColumn,
    full: fullWidthColumn,
  },
};
