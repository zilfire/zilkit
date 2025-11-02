import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getTextClass } from './style-utils.js';
import type { StyleClassNames } from '../../types/style-types/style-classes.js';

// Mock text styles data for testing
const mockTextStyles: StyleClassNames = {
  text: {
    style: {
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
    emphasis: {
      bold: 'font-bold',
      italic: 'italic',
      underline: 'underline',
      strikethrough: 'line-through',
      overline: 'overline',
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

  describe('emphasis styles', () => {
    it('should return bold class when bold is true and textStyleGroup is fontWeight', () => {
      const result = getTextClass('p', 'fontWeight', mockTextStyles, {
        bold: true,
      });
      assert.strictEqual(result, 'font-bold');
    });

    it('should return italic class when italic is true and textStyleGroup is fontStyle', () => {
      const result = getTextClass('p', 'fontStyle', mockTextStyles, {
        italic: true,
      });
      assert.strictEqual(result, 'italic');
    });

    it('should return decoration class when lineDecoration is set and textStyleGroup is decorationLine', () => {
      const underlineResult = getTextClass('p', 'decorationLine', mockTextStyles, {
        lineDecoration: 'underline',
      });
      assert.strictEqual(underlineResult, 'underline');

      const strikethroughResult = getTextClass('p', 'decorationLine', mockTextStyles, {
        lineDecoration: 'strikethrough',
      });
      assert.strictEqual(strikethroughResult, 'line-through');

      const overlineResult = getTextClass('p', 'decorationLine', mockTextStyles, {
        lineDecoration: 'overline',
      });
      assert.strictEqual(overlineResult, 'overline');
    });

    it('should not return emphasis classes for non-matching style groups', () => {
      const boldForTextSize = getTextClass('p', 'textSize', mockTextStyles, {
        bold: true,
      });
      assert.strictEqual(boldForTextSize, 'text-base'); // Should fall back to normal

      const italicForTextColor = getTextClass('p', 'textColor', mockTextStyles, {
        italic: true,
      });
      assert.strictEqual(italicForTextColor, 'text-neutral-900'); // Should fall back to normal
    });

    it('should prioritize emphasis over normal styles', () => {
      // Even though h1 has font-bold in normal styles, emphasis should take precedence
      const result = getTextClass('h1', 'fontWeight', mockTextStyles, {
        bold: true,
      });
      assert.strictEqual(result, 'font-bold'); // From emphasis, not from h1 normal style
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

    it('should prioritize emphasis over variant styles', () => {
      // Even with hero variant, emphasis should take precedence
      const result = getTextClass('h1', 'fontWeight', mockTextStyles, {
        variant: 'hero',
        size: 'base',
        bold: true,
      });
      assert.strictEqual(result, 'font-bold'); // From emphasis, not from hero variant
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
    it('should follow correct fallback order: emphasis -> variant element -> variant default -> normal element -> normal default', () => {
      // Test case where emphasis takes highest priority
      const emphasisResult = getTextClass('h1', 'fontWeight', mockTextStyles, {
        variant: 'hero',
        size: 'base',
        bold: true,
      });
      assert.strictEqual(emphasisResult, 'font-bold'); // emphasis wins over variant

      // Test case where variant has element style (no emphasis)
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
