import type { ButtonClassNames } from '../../types/style-types/button-style-classes.js';

export const buttonClassNames: ButtonClassNames = {
  style: {
    normal: {
      base: {
        backgroundColor: 'bg-blue-600',
        backgroundOpacity: '',
        textColor: 'text-white',
        borderColor: 'border-transparent',
        paddingY: 'py-2',
        paddingX: 'px-4',
        fontSize: 'text-base',
        fontWeight: 'font-medium',
        rounding: 'rounded-md',
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
          paddingX: 'px-5',
          fontSize: 'text-lg',
        },
      },
    },
    variants: {
      outline: {
        base: {
          backgroundColor: 'bg-transparent',
          textColor: 'text-blue-600',
          borderColor: 'border-blue-600',
          paddingY: 'py-2',
          paddingX: 'px-4',
          fontSize: 'text-base',
          fontWeight: 'font-medium',
          rounding: 'rounded-md',
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
