import type { StyleClassNames } from '../../types/style-types/text-styles.js';

export const styleClasses: StyleClassNames = {
  text: {
    normal: {
      base: {
        default: {
          textSize: 'text-base',
          textAlign: 'text-left',
          textColor: 'text-black',
          leading: 'leading-7',
          fontWeight: 'font-normal',
          fontStyle: 'not-italic',
        },
        elements: {
          h1: {
            textSize: 'text-4xl',
          },
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
