import type { ButtonClassNames } from '../types/button-style.types.js';

export const verticalLineSpacing = 'mb-3 md:mb-4';
export const horizontalButtonSpacing = 'mr-3';

export const buttonClassNames: ButtonClassNames = {
  style: {
    normal: {
      base: {
        backgroundColor: 'bg-primary-600 hover:brightness-95',
        textColor: 'text-white',
        borderColor: 'border-transparent',
        paddingY: 'py-2',
        paddingX: 'px-4',
        fontSize: 'text-base',
        fontWeight: 'font-medium',
        rounding: 'rounded-md',
        pointer: 'cursor-pointer',
        verticalSpacing: '',
        horizontalSpacing: '',
        border: 'border-2',
      },
      colors: {
        primary: {
          backgroundColor: 'bg-blue-600',
          textColor: 'text-white',
          borderColor: 'border-transparent',
        },
        secondary: {
          backgroundColor: 'bg-gray-600',
          textColor: 'text-white',
          borderColor: 'border-transparent',
        },
      },
      sizes: {
        sm: {
          paddingY: 'py-1',
          paddingX: 'px-3',
          fontSize: 'text-sm',
        },
        lg: {
          paddingY: 'py-3',
          paddingX: 'px-8',
          fontSize: 'text-lg',
        },
      },
    },
    variants: {
      outline: {
        base: {
          backgroundColor: 'bg-black/45 hover:bg-black/40',
          textColor: 'text-primary-500 hover:text-primary-600',
          borderColor: 'border-primary-500 hover:border-primary-600',
          paddingY: 'py-2',
          paddingX: 'px-4',
          fontSize: 'text-base',
          fontWeight: 'font-medium',
          rounding: 'rounded-md',
          pointer: 'cursor-pointer',
        },
        colors: {
          primary: {
            textColor: 'text-blue-600',
            borderColor: 'border-blue-600',
          },
          secondary: {
            textColor: 'text-gray-600',
            borderColor: 'border-gray-600',
          },
        },
      },
    },
  },
};
