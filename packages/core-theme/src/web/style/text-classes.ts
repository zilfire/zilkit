import { text } from 'node:stream/consumers';
import type { TextClassNames } from '../../types/style-types/text-style-classes.js';
import {
  verticalLineSpacingXS,
  verticalLineSpacingSM,
  verticalLineSpacingMD,
  verticalLineSpacingLG,
  verticalLineSpacingXL,
} from './layout-classes.js';

import clsx from 'clsx';

// Text colors
export const textBlack = 'text-black';
export const textWhite = 'text-white';
export const textPrimary = 'text-primary-600';
export const textMuted = 'text-gray-600';

// Text size variables - consistent naming and responsive scaling
export const textXS = 'text-xs'; // 0.75rem
export const textSM = 'text-sm'; // 0.875rem
export const textMD = 'text-base'; // 1rem
export const textLG = 'text-lg md:text-xl'; // 1.125rem → 1.25rem
export const textXL = 'text-xl md:text-2xl'; // 1.25rem → 1.5rem
export const text2XL = 'text-2xl md:text-3xl lg:text-4xl'; // 1.5rem → 1.875rem → 2.25rem
export const text3XL = 'text-3xl md:text-4xl lg:text-5xl'; // 1.875rem → 2.25rem → 3rem
export const text4XL = 'text-4xl md:text-5xl lg:text-6xl'; // 2.25rem → 3rem → 3.75rem
export const text5XL = 'text-5xl md:text-6xl lg:text-7xl'; // 3rem → 3.75rem → 4.5rem
export const text6XL = 'text-6xl md:text-7xl lg:text-8xl'; // 3.75rem → 4.5rem → 6rem
export const text7XL = 'text-7xl md:text-8xl lg:text-9xl'; // 4.5rem → 6rem → 8rem

// Line decorations
export const fontUnderline = 'underline';
export const fontStrikethrough = 'line-through';
export const fontOverline = 'overline';
export const fontNoLineDecoration = '';

// Font Weights
export const fontThin = 'font-thin';
export const fontExtraLight = 'font-extralight';
export const fontLight = 'font-light';
export const fontNormal = 'font-normal';
export const fontMedium = 'font-medium';
export const fontSemiBold = 'font-semibold';
export const fontBold = 'font-bold';
export const fontExtraBold = 'font-extrabold';
export const fontBlack = 'font-black';

// Vertical spacing
// export const verticalLineSpacing = 'mb-3 md:mb-4';
export const verticalListElementSpacing = 'mb-1 last:mb-0';

// Margin resets
export const zeroHorizontalMargin = 'mx-0';
export const zeroVerticalMargin = 'my-0';
export const zeroMargin = 'm-0';

// Text alignment
export const textLeft = 'text-left';
export const textCenter = 'text-center';
export const textRight = 'text-right';
export const textJustify = 'text-justify';

// Font families
export const bodyFont = 'font-body';
export const headingFont = 'font-heading';

// Font Styles
export const fontItalic = 'italic';
export const fontNotItalic = 'not-italic';

// List styles
export const listDisc = 'list-disc';
export const listDecimal = 'list-decimal';
export const listNone = 'list-none';
export const listInside = 'list-inside';
export const listOutside = 'list-outside';

// Indentations
export const mediumIndent = 'ml-4';
export const indentHorizontalSpacing = clsx(mediumIndent);

// Blockquote styles
export const blockquotePadding = 'pl-2';
export const blockquoteHorizontalSpacing = clsx('ml-1', blockquotePadding);
export const blockquoteBorder = 'border-l-4';
export const blockquoteBorderColor = 'border-gray-400';

// horizontal spacing
export const horizontalSpacingNone = '';

export const textClassNames: TextClassNames = {
  textSize: {
    xs: textXS,
    sm: textSM,
    md: textMD,
    lg: textLG,
    xl: textXL,
    '2xl': text2XL,
    '3xl': text3XL,
    '4xl': text4XL,
    '5xl': text5XL,
    '6xl': text6XL,
    '7xl': text7XL,
  },
  textAlign: {
    left: textLeft,
    center: textCenter,
    right: textRight,
    justify: textJustify,
  },
  textColor: {
    black: textBlack,
    white: textWhite,
    primary: textPrimary,
    muted: textMuted,
  },
  fontWeight: {
    thin: fontThin,
    extralight: fontExtraLight,
    light: fontLight,
    normal: fontNormal,
    medium: fontMedium,
    semibold: fontSemiBold,
    bold: fontBold,
    extrabold: fontExtraBold,
    black: fontBlack,
  },
  fontStyle: {
    normal: fontNotItalic,
    italic: fontItalic,
  },
  fontFamily: {
    body: bodyFont,
    heading: headingFont,
  },
  listType: {
    disc: listDisc,
    decimal: listDecimal,
    none: listNone,
  },
  listPosition: {
    inside: listInside,
    outside: listOutside,
  },
  verticalSpacing: {
    none: zeroVerticalMargin,
    xs: verticalLineSpacingXS,
    sm: verticalLineSpacingSM,
    md: verticalLineSpacingMD,
    lg: verticalLineSpacingLG,
    xl: verticalLineSpacingXL,
  },
  horizontalSpacing: {
    none: horizontalSpacingNone,
  },
  lineDecoration: {
    none: fontNoLineDecoration,
    underline: fontUnderline,
    strikethrough: fontStrikethrough,
    overline: fontOverline,
  },
  elementStyle: {
    normal: {
      default: {
        textSize: {
          xs: textXS,
          sm: textSM,
          md: textMD,
          lg: textLG,
          xl: textXL,
        },
        textAlign: textLeft,
        textColor: textBlack,
        // leading: leadingNormal,
        fontWeight: fontNormal,
        fontStyle: fontNotItalic,
        fontFamily: bodyFont,
        listType: '',
        listPosition: '',
        verticalSpacing: {
          xs: verticalLineSpacingXS,
          sm: verticalLineSpacingSM,
          md: verticalLineSpacingMD,
          lg: verticalLineSpacingLG,
          xl: verticalLineSpacingXL,
        },
        horizontalSpacing: zeroHorizontalMargin,
      },
      elements: {
        span: {
          verticalSpacing: zeroVerticalMargin,
        },
        h1: {
          textSize: {
            xs: text3XL,
            sm: text3XL,
            md: text4XL,
            lg: text5XL,
            xl: text6XL,
          },
          // leading: leadingSnug,
          fontWeight: fontBold,
          fontFamily: headingFont,
        },
        h2: {
          textSize: {
            xs: text2XL,
            sm: text2XL,
            md: text3XL,
            lg: text4XL,
            xl: text5XL,
          },
          // leading: leadingSnug,
          fontWeight: fontBold,
          fontFamily: headingFont,
        },
        h3: {
          textSize: {
            xs: textXL,
            sm: textXL,
            md: text2XL,
            lg: text3XL,
            xl: text4XL,
          },
          // leading: leadingSnug,
          fontWeight: fontBold,
          fontFamily: headingFont,
        },
        h4: {
          textSize: {
            xs: textLG,
            sm: textSM,
            md: textXL,
            lg: text2XL,
            xl: text3XL,
          },
          // leading: leadingSnug,
          fontWeight: fontBold,
          fontFamily: headingFont,
        },
        h5: {
          textSize: {
            xs: textMD,
            sm: textMD,
            md: textLG,
            lg: textXL,
            xl: text2XL,
          },
          fontFamily: headingFont,
          fontWeight: fontBold,
        },
        h6: {
          textSize: {
            xs: textMD,
            sm: textMD,
            md: textLG,
            lg: textXL,
            xl: text2XL,
          },
          fontFamily: headingFont,
          fontWeight: fontMedium,
        },
        ol: {
          listType: listDecimal,
          verticalSpacing: verticalLineSpacingMD,
        },
        ul: {
          listType: listDisc,
          verticalSpacing: verticalLineSpacingMD,
        },
        li: {
          verticalSpacing: verticalListElementSpacing,
        },
        blockquote: {
          horizontalSpacing: blockquoteHorizontalSpacing,
          border: blockquoteBorder,
          borderColor: blockquoteBorderColor,
          fontStyle: fontItalic,
          textColor: textMuted,
        },
        indent: {
          horizontalSpacing: indentHorizontalSpacing,
        },
      },
    },
    variants: {
      primary: {
        default: {
          textColor: textPrimary,
        },
      },
    },
  },
};

export default textClassNames;
