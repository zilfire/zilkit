import type { StyleClassNames } from '../../types/style-types/text-styles.js';

// Text size variables
// export const textXS = 'text-xs';
// export const textSmall = 'text-sm';
export const textBase = 'text-base';
export const textLarge = 'text-lg md:text-xl';
export const textXL = 'text-xl md:text-xxl';
export const text2XL = 'text-xxl md:text-3xl lg:text-4xl';
export const text3XL = 'text-3xl md:text-4xl lg:text-5xl';
export const text4XL = 'text-4xl md:text-5xl lg:text-6xl';
// export const text5XL = 'text-4xl md:text-6xl lg:text-7xl';
// export const text6XL = 'text-4xl md:text-6xl lg:text-8xl';
// export const text7XL = 'text-5xl md:text-7xl lg:text-9xl';
export const leadingSnug = 'leading-snug';
export const leadingNormal = 'leading-normal';
export const verticalLineSpacing = 'mb-3 md:mb-4';
export const verticalListElementSpacing = 'mb-1 last:mb-0';
export const textLeft = 'text-left';
export const textBlack = 'text-black';
export const textWhite = 'text-white';
export const fontNormal = 'font-normal';
export const fontBold = 'font-bold';
export const fontMedium = 'font-medium';
export const listDisc = 'list-disc';
export const listDecimal = 'list-decimal';
export const listNone = 'list-none';
export const listInside = 'list-inside';
export const bodyFont = 'font-body';
export const headingFont = 'font-heading';
export const fontItalic = 'italic';
export const fontNotItalic = 'not-italic';

export const styleClasses: StyleClassNames = {
  text: {
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
          horizontalSpacing: 'mx-0',
          border: '',
        },
        elements: {
          span: {
            verticalSpacing: 'm-0',
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
          blockquote: {},
          indent: {},
        },
      },
    },
    variants: {
      primary: {
        base: {
          default: {
            textColor: 'text-blue-700',
          },
        },
      },
    },
  },
};
