import { text } from 'node:stream/consumers';
import type { TextClassNames } from '../../types/style-types/text-style-classes.js';
import clsx from 'clsx';

// Text size variables
// export const textXS = 'text-xs';
export const textSmall = 'text-sm';
export const textBase = 'text-base';
export const textLarge = 'text-lg md:text-xl';
export const textXL = 'text-xl md:text-xxl';
export const text2XL = 'text-xxl md:text-3xl lg:text-4xl';
export const text3XL = 'text-3xl md:text-4xl lg:text-5xl';
export const text4XL = 'text-4xl md:text-5xl lg:text-6xl';
export const text5XL = 'text-4xl md:text-6xl lg:text-7xl';
export const text6XL = 'text-4xl md:text-6xl lg:text-8xl';
// export const text7XL = 'text-5xl md:text-7xl lg:text-9xl';

// Line decorations
export const fontUnderline = 'underline';
export const fontStrikethrough = 'line-through';
export const fontOverline = 'overline';

// Leading
export const leadingSnug = 'leading-snug';
export const leadingNormal = 'leading-normal';

// Vertical spacing
export const verticalLineSpacing = 'mb-3 md:mb-4';
export const verticalListElementSpacing = 'mb-1 last:mb-0';

// Margin resets
export const zeroHorizontalMargin = 'mx-0';
export const zeroVerticalMargin = 'my-0';
export const zeroMargin = 'm-0';

// Text alignment
export const textLeft = 'text-left';

// Text colors
export const textBlack = 'text-black';
export const textWhite = 'text-white';
export const textPrimary = 'text-blue-700';

// Font weights
export const fontNormal = 'font-normal';
export const fontBold = 'font-bold';
export const fontMedium = 'font-medium';

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

// Indentations
export const mediumIndent = 'ml-4';
export const indentHorizontalSpacing = clsx(mediumIndent);

// Blockquote styles
export const blockquotePadding = 'pl-4';
export const blockquoteHorizontalSpacing = clsx(mediumIndent, blockquotePadding);
export const blockquoteBorder = 'border-l';
export const blockquoteBorderColor = 'border-gray-400';

export const textClassNames: TextClassNames = {
  emphasis: {
    bold: fontBold,
    italic: fontItalic,
    underline: fontUnderline,
    strikethrough: fontStrikethrough,
    overline: fontOverline,
  },
  color: {
    black: textBlack,
    white: textWhite,
    primary: textPrimary,
  },
  style: {
    normal: {
      base: {
        default: {
          textSize: textBase,
          textAlign: textLeft,
          textColor: textBlack,
          leading: leadingNormal,
          fontWeight: fontNormal,
          fontStyle: fontNotItalic,
          fontFamily: bodyFont,
          listType: '',
          listPosition: '',
          verticalSpacing: verticalLineSpacing,
          horizontalSpacing: zeroHorizontalMargin,
          border: '',
        },
        elements: {
          span: {
            verticalSpacing: zeroVerticalMargin,
          },
          h1: {
            textSize: text4XL,
            leading: leadingSnug,
            fontWeight: fontBold,
            fontFamily: headingFont,
          },
          h2: {
            textSize: text3XL,
            leading: leadingSnug,
            fontWeight: fontBold,
            fontFamily: headingFont,
          },
          h3: {
            textSize: text2XL,
            leading: leadingSnug,
            fontWeight: fontBold,
            fontFamily: headingFont,
          },
          h4: {
            textSize: textXL,
            leading: leadingSnug,
            fontWeight: fontBold,
            fontFamily: headingFont,
          },
          h5: {
            textSize: textLarge,
            fontFamily: headingFont,
            fontWeight: fontBold,
          },
          h6: {
            textSize: textLarge,
            fontFamily: headingFont,
            fontWeight: fontMedium,
          },
          ol: {
            listType: listDecimal,
            verticalSpacing: verticalLineSpacing,
          },
          ul: {
            listType: listDisc,
            verticalSpacing: verticalLineSpacing,
          },
          li: {
            verticalSpacing: verticalListElementSpacing,
          },
          blockquote: {
            horizontalSpacing: blockquoteHorizontalSpacing,
            border: blockquoteBorder,
            borderColor: blockquoteBorderColor,
          },
          indent: {
            horizontalSpacing: indentHorizontalSpacing,
          },
        },
      },
      sm: {
        default: {
          textSize: textSmall,
        },
        elements: {
          h5: {
            textSize: textBase,
          },
          h4: {
            textSize: textLarge,
          },
          h3: {
            textSize: textXL,
          },
          h2: {
            textSize: text2XL,
          },
          h1: {
            textSize: text3XL,
          },
        },
      },
      lg: {
        default: {
          textSize: textLarge,
        },
        elements: {
          h5: {
            textSize: textXL,
          },
          h4: {
            textSize: text2XL,
          },
          h3: {
            textSize: text3XL,
          },
          h2: {
            textSize: text4XL,
          },
          h1: {
            textSize: text5XL,
          },
        },
      },
      xl: {
        default: {
          textSize: textXL,
        },
        elements: {
          h5: {
            textSize: text2XL,
          },
          h4: {
            textSize: text3XL,
          },
          h3: {
            textSize: text4XL,
          },
          h2: {
            textSize: text5XL,
          },
          h1: {
            textSize: text6XL,
          },
        },
      },
    },
    variants: {
      primary: {
        base: {
          default: {
            textColor: textPrimary,
          },
        },
      },
    },
  },
};

export default textClassNames;
