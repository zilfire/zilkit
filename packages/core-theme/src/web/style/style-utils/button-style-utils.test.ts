import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getButtonClass } from './button-style-utils.js';
import type { StyleClassNames } from '../../../types/style-types/style-class-names.js';

// Mock button styles data for testing
const mockStyleClassNames: StyleClassNames = {
  text: {
    style: {
      normal: {
        default: {
          textSize: 'text-base',
        },
      },
    },
    emphasis: {
      bold: 'font-bold',
      italic: 'italic',
      underline: 'underline',
      strikethrough: 'line-through',
      overline: 'overline',
    },
    color: {
      black: 'text-black',
      white: 'text-white',
      primary: 'text-primary-600',
    },
  },
  layout: {
    verticalSectionSpacing: {
      base: 'py-32',
    },
    backgroundColors: {
      black: 'bg-black',
      white: 'bg-white',
      muted: 'bg-gray-100',
    },
    verticalLineSpacing: {
      base: 'mb-4',
    },
    containerPadding: {
      base: 'px-4',
    },
  },
  button: {
    style: {
      normal: {
        base: {
          backgroundColor: 'bg-blue-600',
          textColor: 'text-white',
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
            borderColor: 'border-blue-600',
          },
          secondary: {
            backgroundColor: 'bg-gray-600',
            textColor: 'text-white',
            borderColor: 'border-gray-600',
          },
          danger: {
            backgroundColor: 'bg-red-600',
            textColor: 'text-white',
          },
        },
        sizes: {
          sm: {
            paddingY: 'py-1',
            paddingX: 'px-2',
            fontSize: 'text-sm',
            rounding: 'rounded',
          },
          lg: {
            paddingY: 'py-3',
            paddingX: 'px-6',
            fontSize: 'text-lg',
            fontWeight: 'font-semibold',
          },
          xl: {
            paddingY: 'py-4',
            paddingX: 'px-8',
            fontSize: 'text-xl',
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
          sizes: {
            sm: {
              paddingY: 'py-1',
              paddingX: 'px-2',
              fontSize: 'text-sm',
            },
            lg: {
              paddingY: 'py-3',
              paddingX: 'px-6',
              fontSize: 'text-lg',
            },
          },
        },
        ghost: {
          base: {
            backgroundColor: 'bg-transparent',
            textColor: 'text-gray-700',
            paddingY: 'py-2',
            paddingX: 'px-4',
          },
          colors: {
            primary: {
              textColor: 'text-blue-600',
            },
          },
        },
      },
    },
  },
};

describe('getButtonClass', () => {
  describe('normal variant (default)', () => {
    it('should return class from normal base for color categories', () => {
      const result = getButtonClass(mockStyleClassNames, 'backgroundColor', {});
      assert.strictEqual(result, 'bg-blue-600');
    });

    it('should return class from normal base for size categories', () => {
      const paddingYResult = getButtonClass(mockStyleClassNames, 'paddingY', {});
      assert.strictEqual(paddingYResult, 'py-2');

      const fontSizeResult = getButtonClass(mockStyleClassNames, 'fontSize', {});
      assert.strictEqual(fontSizeResult, 'text-base');
    });

    it('should return class from normal colors when color is specified', () => {
      const result = getButtonClass(mockStyleClassNames, 'backgroundColor', {
        color: 'primary',
      });
      assert.strictEqual(result, 'bg-blue-600');
    });

    it('should return class from normal colors for different colors', () => {
      const primaryResult = getButtonClass(mockStyleClassNames, 'textColor', {
        color: 'primary',
      });
      assert.strictEqual(primaryResult, 'text-white');

      const secondaryResult = getButtonClass(mockStyleClassNames, 'backgroundColor', {
        color: 'secondary',
      });
      assert.strictEqual(secondaryResult, 'bg-gray-600');

      const dangerResult = getButtonClass(mockStyleClassNames, 'backgroundColor', {
        color: 'danger',
      });
      assert.strictEqual(dangerResult, 'bg-red-600');
    });

    it('should fall back to base when color-specific class is not available', () => {
      // danger color doesn't have borderColor, should fall back to base
      const result = getButtonClass(mockStyleClassNames, 'borderColor', {
        color: 'danger',
      });
      assert.strictEqual(result, ''); // base doesn't have borderColor either
    });

    it('should return class from normal sizes when size is specified', () => {
      const smResult = getButtonClass(mockStyleClassNames, 'paddingY', {
        size: 'sm',
      });
      assert.strictEqual(smResult, 'py-1');

      const lgResult = getButtonClass(mockStyleClassNames, 'fontSize', {
        size: 'lg',
      });
      assert.strictEqual(lgResult, 'text-lg');
    });

    it('should return class from normal sizes for different sizes', () => {
      const smFontSize = getButtonClass(mockStyleClassNames, 'fontSize', {
        size: 'sm',
      });
      assert.strictEqual(smFontSize, 'text-sm');

      const lgPaddingX = getButtonClass(mockStyleClassNames, 'paddingX', {
        size: 'lg',
      });
      assert.strictEqual(lgPaddingX, 'px-6');

      const xlPaddingY = getButtonClass(mockStyleClassNames, 'paddingY', {
        size: 'xl',
      });
      assert.strictEqual(xlPaddingY, 'py-4');
    });

    it('should fall back to base when size-specific class is not available', () => {
      // xl size doesn't have fontWeight, should fall back to base
      const result = getButtonClass(mockStyleClassNames, 'fontWeight', {
        size: 'xl',
      });
      assert.strictEqual(result, 'font-medium');
    });

    it('should use base size when size is not specified', () => {
      const result = getButtonClass(mockStyleClassNames, 'paddingY', {});
      assert.strictEqual(result, 'py-2');
    });

    it('should handle both color and size options together', () => {
      const bgResult = getButtonClass(mockStyleClassNames, 'backgroundColor', {
        color: 'primary',
        size: 'lg',
      });
      assert.strictEqual(bgResult, 'bg-blue-600'); // from color

      const paddingResult = getButtonClass(mockStyleClassNames, 'paddingX', {
        color: 'primary',
        size: 'lg',
      });
      assert.strictEqual(paddingResult, 'px-6'); // from size
    });
  });

  describe('custom variants', () => {
    it('should return class from variant base', () => {
      const result = getButtonClass(mockStyleClassNames, 'backgroundColor', {
        variant: 'outline',
      });
      assert.strictEqual(result, 'bg-transparent');
    });

    it('should return class from variant colors when color is specified', () => {
      const result = getButtonClass(mockStyleClassNames, 'textColor', {
        variant: 'outline',
        color: 'primary',
      });
      assert.strictEqual(result, 'text-blue-600');
    });

    it('should return class from variant colors for different colors', () => {
      const primaryResult = getButtonClass(mockStyleClassNames, 'borderColor', {
        variant: 'outline',
        color: 'primary',
      });
      assert.strictEqual(primaryResult, 'border-blue-600');

      const secondaryResult = getButtonClass(mockStyleClassNames, 'textColor', {
        variant: 'outline',
        color: 'secondary',
      });
      assert.strictEqual(secondaryResult, 'text-gray-600');
    });

    it('should fall back to normal color when color is not in variant colors', () => {
      // outline secondary color doesn't have backgroundColor in variant, falls back to normal secondary
      const result = getButtonClass(mockStyleClassNames, 'backgroundColor', {
        variant: 'outline',
        color: 'secondary',
      });
      assert.strictEqual(result, 'bg-gray-600');
    });

    it('should return class from variant sizes when size is specified', () => {
      const result = getButtonClass(mockStyleClassNames, 'paddingY', {
        variant: 'outline',
        size: 'sm',
      });
      assert.strictEqual(result, 'py-1');
    });

    it('should return class from variant sizes for different sizes', () => {
      const smResult = getButtonClass(mockStyleClassNames, 'fontSize', {
        variant: 'outline',
        size: 'sm',
      });
      assert.strictEqual(smResult, 'text-sm');

      const lgResult = getButtonClass(mockStyleClassNames, 'paddingX', {
        variant: 'outline',
        size: 'lg',
      });
      assert.strictEqual(lgResult, 'px-6');
    });

    it('should fall back to variant base when size-specific class is not available', () => {
      // outline lg size doesn't have rounding, should fall back to variant base
      const result = getButtonClass(mockStyleClassNames, 'rounding', {
        variant: 'outline',
        size: 'lg',
      });
      assert.strictEqual(result, 'rounded-md');
    });

    it('should handle variant with both color and size options', () => {
      const textColorResult = getButtonClass(mockStyleClassNames, 'textColor', {
        variant: 'outline',
        color: 'primary',
        size: 'lg',
      });
      assert.strictEqual(textColorResult, 'text-blue-600'); // from variant color

      const paddingResult = getButtonClass(mockStyleClassNames, 'paddingY', {
        variant: 'outline',
        color: 'primary',
        size: 'lg',
      });
      assert.strictEqual(paddingResult, 'py-3'); // from variant size
    });

    it('should work with variants that have minimal overrides', () => {
      const result = getButtonClass(mockStyleClassNames, 'textColor', {
        variant: 'ghost',
        color: 'primary',
      });
      assert.strictEqual(result, 'text-blue-600');
    });

    it('should fall back to variant base when color is not in variant colors', () => {
      const result = getButtonClass(mockStyleClassNames, 'textColor', {
        variant: 'ghost',
        color: 'nonexistent',
      });
      assert.strictEqual(result, 'text-gray-700');
    });
  });

  describe('fallback hierarchy', () => {
    it('should prioritize variant color over variant base', () => {
      const result = getButtonClass(mockStyleClassNames, 'textColor', {
        variant: 'outline',
        color: 'primary',
      });
      assert.strictEqual(result, 'text-blue-600'); // from variant color, not variant base
    });

    it('should prioritize variant size over variant base', () => {
      const result = getButtonClass(mockStyleClassNames, 'paddingY', {
        variant: 'outline',
        size: 'sm',
      });
      assert.strictEqual(result, 'py-1'); // from variant size, not variant base
    });

    it('should fall back to variant base when not in variant color/size', () => {
      const result = getButtonClass(mockStyleClassNames, 'rounding', {
        variant: 'outline',
        color: 'primary',
      });
      assert.strictEqual(result, 'rounded-md'); // from variant base
    });

    it('should fall back to normal color when not in variant', () => {
      const result = getButtonClass(mockStyleClassNames, 'backgroundColor', {
        variant: 'ghost',
        color: 'secondary',
      });
      assert.strictEqual(result, 'bg-gray-600'); // ghost doesn't have secondary color, falls back to normal secondary
    });

    it('should fall back to normal size when not in variant', () => {
      const result = getButtonClass(mockStyleClassNames, 'paddingY', {
        variant: 'ghost',
        size: 'lg',
      });
      assert.strictEqual(result, 'py-3'); // ghost doesn't have sizes, falls back to normal lg size
    });

    it('should fall back to normal base as last resort', () => {
      const result = getButtonClass(mockStyleClassNames, 'fontWeight', {
        variant: 'ghost',
      });
      assert.strictEqual(result, 'font-medium'); // ghost doesn't have fontWeight, falls back to normal base
    });

    it('should follow complete fallback order: variant color -> variant size -> variant base -> normal color -> normal size -> normal base', () => {
      // Test variant color (highest priority for color categories)
      const variantColorResult = getButtonClass(mockStyleClassNames, 'borderColor', {
        variant: 'outline',
        color: 'primary',
        size: 'lg',
      });
      assert.strictEqual(variantColorResult, 'border-blue-600'); // from variant color

      // Test variant size (highest priority for size categories)
      const variantSizeResult = getButtonClass(mockStyleClassNames, 'fontSize', {
        variant: 'outline',
        color: 'primary',
        size: 'sm',
      });
      assert.strictEqual(variantSizeResult, 'text-sm'); // from variant size

      // Test variant base (when not in variant color/size)
      const variantBaseResult = getButtonClass(mockStyleClassNames, 'backgroundColor', {
        variant: 'outline',
        size: 'lg',
      });
      assert.strictEqual(variantBaseResult, 'bg-transparent'); // from variant base

      // Test normal color (when variant doesn't have color)
      const normalColorResult = getButtonClass(mockStyleClassNames, 'borderColor', {
        variant: 'ghost',
        color: 'primary',
      });
      assert.strictEqual(normalColorResult, 'border-blue-600'); // falls back to normal primary color

      // Test normal size (when variant doesn't have size)
      const normalSizeResult = getButtonClass(mockStyleClassNames, 'paddingX', {
        variant: 'ghost',
        size: 'lg',
      });
      assert.strictEqual(normalSizeResult, 'px-6'); // ghost doesn't have sizes, falls back to normal lg size

      // Test normal base (last resort)
      const normalBaseResult = getButtonClass(mockStyleClassNames, 'fontWeight', {
        variant: 'ghost',
        color: 'secondary',
      });
      assert.strictEqual(normalBaseResult, 'font-medium'); // falls back to normal base
    });
  });

  describe('edge cases', () => {
    it('should return empty string when no matching class is found', () => {
      const result = getButtonClass(mockStyleClassNames, 'pointer', {});
      assert.strictEqual(result, '');
    });

    it('should handle non-existent variant gracefully', () => {
      const result = getButtonClass(mockStyleClassNames, 'backgroundColor', {
        variant: 'nonexistent',
      });
      assert.strictEqual(result, 'bg-blue-600'); // falls back to normal
    });

    it('should handle non-existent color gracefully', () => {
      const result = getButtonClass(mockStyleClassNames, 'textColor', {
        color: 'nonexistent',
      });
      assert.strictEqual(result, 'text-white'); // falls back to base
    });

    it('should handle non-existent size gracefully', () => {
      const result = getButtonClass(mockStyleClassNames, 'paddingY', {
        size: 'xxl',
      });
      assert.strictEqual(result, 'py-2'); // falls back to base
    });

    it('should use normal variant when variant is "normal"', () => {
      const result = getButtonClass(mockStyleClassNames, 'backgroundColor', {
        variant: 'normal',
      });
      assert.strictEqual(result, 'bg-blue-600');
    });

    it('should handle undefined options gracefully', () => {
      const result = getButtonClass(mockStyleClassNames, 'backgroundColor', {
        variant: undefined,
        size: undefined,
        color: undefined,
      });
      assert.strictEqual(result, 'bg-blue-600'); // should use defaults
    });

    it('should handle empty options object', () => {
      const result = getButtonClass(mockStyleClassNames, 'textColor', {});
      assert.strictEqual(result, 'text-white');
    });

    it('should correctly identify color vs size categories', () => {
      // Color category should check colors first
      const colorResult = getButtonClass(mockStyleClassNames, 'backgroundColor', {
        color: 'primary',
        size: 'lg',
      });
      assert.strictEqual(colorResult, 'bg-blue-600'); // from colors, not sizes

      // Size category should check sizes first
      const sizeResult = getButtonClass(mockStyleClassNames, 'paddingY', {
        color: 'primary',
        size: 'lg',
      });
      assert.strictEqual(sizeResult, 'py-3'); // from sizes, not colors
    });
  });
});
