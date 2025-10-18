import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getTextClass } from './utils.js';
import type { StyleClassNames } from '../../types/style-types/text-styles.js';

// Mock text styles data for testing
const mockTextStyles: StyleClassNames = {
  text: {
    normal: {
      base: {
        default: {
          textSize: 'text-base',
          textColor: 'text-neutral-900',
          fontWeight: 'font-normal',
        },
        elements: {
          h1: {
            textSize: 'text-4xl',
            fontWeight: 'font-bold',
          },
          h2: {
            textSize: 'text-3xl',
            fontWeight: 'font-semibold',
          },
          p: {
            textSize: 'text-base',
            leading: 'leading-relaxed',
          },
        },
      },
      lg: {
        default: {
          textSize: 'text-lg',
          textColor: 'text-neutral-800',
        },
        elements: {
          h1: {
            textSize: 'text-5xl',
            fontWeight: 'font-bold',
          },
          h2: {
            textSize: 'text-4xl',
            fontWeight: 'font-semibold',
          },
        },
      },
      sm: {
        default: {
          textSize: 'text-sm',
          textColor: 'text-neutral-700',
        },
      },
    },
    variants: {
      hero: {
        base: {
          default: {
            textSize: 'text-6xl',
            fontWeight: 'font-black',
            textColor: 'text-white',
          },
          elements: {
            h1: {
              textSize: 'text-7xl',
              fontWeight: 'font-black',
              leading: 'leading-tight',
            },
          },
        },
        lg: {
          default: {
            textSize: 'text-7xl',
            fontWeight: 'font-black',
          },
          elements: {
            h1: {
              textSize: 'text-8xl',
              fontWeight: 'font-black',
              leading: 'leading-none',
            },
          },
        },
      },
      caption: {
        base: {
          default: {
            textSize: 'text-xs',
            fontWeight: 'font-light',
            textColor: 'text-neutral-600',
          },
        },
      },
    },
  },
};

describe('getTextClass', () => {
  describe('normal variant (default)', () => {
    it('should return element-specific style for base size', () => {
      const result = getTextClass('h1', 'textSize', mockTextStyles, {
        size: 'base',
      });
      assert.strictEqual(result, 'text-4xl');
    });

    it('should return element-specific style for different style groups', () => {
      const fontWeightResult = getTextClass('h1', 'fontWeight', mockTextStyles, {
        size: 'base',
      });
      assert.strictEqual(fontWeightResult, 'font-bold');

      const leadingResult = getTextClass('p', 'leading', mockTextStyles, {
        size: 'base',
      });
      assert.strictEqual(leadingResult, 'leading-relaxed');
    });

    it('should fall back to default style when element-specific style is not available', () => {
      const result = getTextClass('span', 'textColor', mockTextStyles, {
        size: 'base',
      });
      assert.strictEqual(result, 'text-neutral-900');
    });

    it('should work with different sizes', () => {
      const lgResult = getTextClass('h1', 'textSize', mockTextStyles, {
        size: 'lg',
      });
      assert.strictEqual(lgResult, 'text-5xl');

      const smResult = getTextClass('p', 'textSize', mockTextStyles, {
        size: 'sm',
      });
      assert.strictEqual(smResult, 'text-sm');
    });

    it('should use base size as default when size is not specified', () => {
      const result = getTextClass('h1', 'textSize', mockTextStyles, {});
      assert.strictEqual(result, 'text-4xl');
    });
  });

  describe('custom variants', () => {
    it('should return variant-specific element style', () => {
      const result = getTextClass('h1', 'textSize', mockTextStyles, {
        variant: 'hero',
        size: 'base',
      });
      assert.strictEqual(result, 'text-7xl');
    });

    it('should return variant-specific element style for different sizes', () => {
      const result = getTextClass('h1', 'textSize', mockTextStyles, {
        variant: 'hero',
        size: 'lg',
      });
      assert.strictEqual(result, 'text-8xl');
    });

    it('should fall back to variant default when element-specific style is not available', () => {
      const result = getTextClass('p', 'textSize', mockTextStyles, {
        variant: 'hero',
        size: 'base',
      });
      assert.strictEqual(result, 'text-6xl');
    });

    it('should work with simple variants without element overrides', () => {
      const result = getTextClass('p', 'textSize', mockTextStyles, {
        variant: 'caption',
        size: 'base',
      });
      assert.strictEqual(result, 'text-xs');
    });

    it('should fall back to normal styles when variant does not exist', () => {
      const result = getTextClass('h1', 'textSize', mockTextStyles, {
        variant: 'nonexistent',
        size: 'base',
      });
      assert.strictEqual(result, 'text-4xl');
    });

    it('should fall back to normal styles when variant size does not exist', () => {
      const result = getTextClass('h1', 'textSize', mockTextStyles, {
        variant: 'caption',
        size: 'lg', // caption variant only has base size
      });
      assert.strictEqual(result, 'text-5xl'); // falls back to normal lg
    });
  });

  describe('edge cases', () => {
    it('should return empty string when no matching style is found', () => {
      const result = getTextClass('blockquote', 'border', mockTextStyles, {
        size: 'xl', // size that doesn't exist
      });
      assert.strictEqual(result, '');
    });

    it('should handle missing style groups gracefully', () => {
      const result = getTextClass('h1', 'listType', mockTextStyles, {
        size: 'base',
      });
      assert.strictEqual(result, '');
    });

    it('should use normal variant when variant is "normal"', () => {
      const result = getTextClass('h1', 'textSize', mockTextStyles, {
        variant: 'normal',
        size: 'base',
      });
      assert.strictEqual(result, 'text-4xl');
    });

    it('should handle undefined options gracefully', () => {
      const result = getTextClass('h1', 'textSize', mockTextStyles, {
        variant: undefined,
        size: undefined,
      });
      assert.strictEqual(result, 'text-4xl'); // should use base size and normal variant
    });
  });

  describe('fallback hierarchy', () => {
    it('should follow correct fallback order: variant element -> variant default -> normal element -> normal default', () => {
      // Test case where variant has element style
      const variantElementResult = getTextClass('h1', 'leading', mockTextStyles, {
        variant: 'hero',
        size: 'base',
      });
      assert.strictEqual(variantElementResult, 'leading-tight');

      // Test case where variant has only default style
      const variantDefaultResult = getTextClass('p', 'fontWeight', mockTextStyles, {
        variant: 'hero',
        size: 'base',
      });
      assert.strictEqual(variantDefaultResult, 'font-black');

      // Test case where variant doesn't exist, falls back to normal element
      const normalElementResult = getTextClass('p', 'leading', mockTextStyles, {
        variant: 'nonexistent',
        size: 'base',
      });
      assert.strictEqual(normalElementResult, 'leading-relaxed');

      // Test case where no element style exists, falls back to normal default
      const normalDefaultResult = getTextClass('span', 'textColor', mockTextStyles, {
        variant: 'nonexistent',
        size: 'base',
      });
      assert.strictEqual(normalDefaultResult, 'text-neutral-900');
    });
  });
});
