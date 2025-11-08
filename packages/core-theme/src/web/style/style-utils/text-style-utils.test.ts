import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getTextClass } from './text-style-utils.js';
import { getSectionVerticalSpacingClass } from './layout-style-utils.js';
import type { StyleClassNames } from '../../../types/style-types/style-class-names.js';

// Mock text styles data for testing
const mockTextStyles: StyleClassNames = {
  text: {
    style: {
      normal: {
        default: {
          textSize: {
            default: 'text-base',
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
          },
          textColor: {
            default: 'text-neutral-900',
            sm: 'text-neutral-700',
            md: 'text-neutral-900',
            lg: 'text-neutral-800',
          },
          fontWeight: 'font-normal',
        },
        elements: {
          h1: {
            textSize: {
              default: 'text-4xl',
              md: 'text-4xl',
              lg: 'text-5xl',
            },
            fontWeight: 'font-bold',
          },
          h2: {
            textSize: {
              default: 'text-3xl',
              md: 'text-3xl',
              lg: 'text-4xl',
            },
            fontWeight: 'font-semibold',
          },
          p: {
            textSize: {
              default: 'text-base',
              sm: 'text-sm',
              md: 'text-base',
            },
            leading: 'leading-relaxed',
          },
        },
      },
      variants: {
        hero: {
          default: {
            textSize: {
              default: 'text-6xl',
              md: 'text-6xl',
              lg: 'text-7xl',
            },
            fontWeight: 'font-black',
            textColor: 'text-white',
          },
          elements: {
            h1: {
              textSize: {
                default: 'text-7xl',
                md: 'text-7xl',
                lg: 'text-8xl',
              },
              fontWeight: 'font-black',
              leading: {
                default: 'leading-tight',
                md: 'leading-tight',
                lg: 'leading-none',
              },
            },
          },
        },
        caption: {
          default: {
            textSize: 'text-xs',
            fontWeight: 'font-light',
            textColor: 'text-neutral-600',
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
  layout: {
    verticalSectionSpacing: {
      base: 'py-32 md:py-40 lg:py-48',
      sm: 'py-16 md:py-24 lg:py-32',
      md: 'py-20 md:py-32 lg:py-36',
      lg: 'py-24 md:py-36 lg:py-40',
      xl: 'py-32 md:py-40 lg:py-48',
    },
    backgroundColors: {
      black: 'bg-black',
      white: 'bg-white',
      muted: 'bg-gray-100',
    },
    verticalLineSpacing: {
      base: 'mb-4 md:mb-5',
    },
    containerPadding: {
      base: 'px-4 md:px-6 lg:px-8',
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
          },
          secondary: {
            backgroundColor: 'bg-gray-600',
            textColor: 'text-white',
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
    },
  },
};

describe('getTextClass', () => {
  describe('normal variant (default)', () => {
    it('should return element-specific style for md size', () => {
      const result = getTextClass('h1', 'textSize', mockTextStyles, {
        size: 'md',
      });
      assert.strictEqual(result, 'text-4xl');
    });

    it('should return element-specific style for different style groups', () => {
      const fontWeightResult = getTextClass('h1', 'fontWeight', mockTextStyles, {
        size: 'md',
      });
      assert.strictEqual(fontWeightResult, 'font-bold');

      const leadingResult = getTextClass('p', 'leading', mockTextStyles, {
        size: 'md',
      });
      assert.strictEqual(leadingResult, 'leading-relaxed');
    });

    it('should fall back to default style when element-specific style is not available', () => {
      const result = getTextClass('span', 'textColor', mockTextStyles, {
        size: 'md',
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

    it('should use default size when size is not specified', () => {
      const result = getTextClass('h1', 'textSize', mockTextStyles, {});
      assert.strictEqual(result, 'text-4xl'); // Falls back to 'default' key which is 'text-4xl'
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
      const underlineResult = getTextClass('p', 'lineDecoration', mockTextStyles, {
        lineDecoration: 'underline',
      });
      assert.strictEqual(underlineResult, 'underline');

      const strikethroughResult = getTextClass('p', 'lineDecoration', mockTextStyles, {
        lineDecoration: 'strikethrough',
      });
      assert.strictEqual(strikethroughResult, 'line-through');

      const overlineResult = getTextClass('p', 'lineDecoration', mockTextStyles, {
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
        size: 'md',
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
        size: 'md',
      });
      assert.strictEqual(result, 'text-6xl');
    });

    it('should work with simple variants without element overrides', () => {
      const result = getTextClass('p', 'textSize', mockTextStyles, {
        variant: 'caption',
        size: 'md',
      });
      assert.strictEqual(result, 'text-xs');
    });

    it('should fall back to normal styles when variant does not exist', () => {
      const result = getTextClass('h1', 'textSize', mockTextStyles, {
        variant: 'nonexistent',
        size: 'md',
      });
      assert.strictEqual(result, 'text-4xl');
    });

    it('should fall back to normal styles when variant size does not exist', () => {
      const result = getTextClass('h1', 'textSize', mockTextStyles, {
        variant: 'caption',
        size: 'lg', // caption variant only has default/string size
      });
      assert.strictEqual(result, 'text-xs'); // string values apply to all sizes
    });

    it('should prioritize emphasis over variant styles', () => {
      // Even with hero variant, emphasis should take precedence
      const result = getTextClass('h1', 'fontWeight', mockTextStyles, {
        variant: 'hero',
        size: 'md',
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
        size: 'md',
      });
      assert.strictEqual(result, '');
    });

    it('should use normal variant when variant is "normal"', () => {
      const result = getTextClass('h1', 'textSize', mockTextStyles, {
        variant: 'normal',
        size: 'md',
      });
      assert.strictEqual(result, 'text-4xl');
    });

    it('should handle undefined options gracefully', () => {
      const result = getTextClass('h1', 'textSize', mockTextStyles, {
        variant: undefined,
        size: undefined,
      });
      assert.strictEqual(result, 'text-4xl'); // should use default size and normal variant
    });
  });

  describe('fallback hierarchy', () => {
    it('should follow correct fallback order: emphasis -> variant element -> variant default -> normal element -> normal default', () => {
      // Test case where emphasis takes highest priority
      const emphasisResult = getTextClass('h1', 'fontWeight', mockTextStyles, {
        variant: 'hero',
        size: 'md',
        bold: true,
      });
      assert.strictEqual(emphasisResult, 'font-bold'); // emphasis wins over variant

      // Test case where variant has element style (no emphasis)
      const variantElementResult = getTextClass('h1', 'leading', mockTextStyles, {
        variant: 'hero',
        size: 'md',
      });
      assert.strictEqual(variantElementResult, 'leading-tight');

      // Test case where variant has only default style
      const variantDefaultResult = getTextClass('p', 'fontWeight', mockTextStyles, {
        variant: 'hero',
        size: 'md',
      });
      assert.strictEqual(variantDefaultResult, 'font-black');

      // Test case where variant doesn't exist, falls back to normal element
      const normalElementResult = getTextClass('p', 'leading', mockTextStyles, {
        variant: 'nonexistent',
        size: 'md',
      });
      assert.strictEqual(normalElementResult, 'leading-relaxed');

      // Test case where no element style exists, falls back to normal default
      const normalDefaultResult = getTextClass('span', 'textColor', mockTextStyles, {
        variant: 'nonexistent',
        size: 'md',
      });
      assert.strictEqual(normalDefaultResult, 'text-neutral-900');
    });
  });
});

describe('getSectionVerticalSpacingClass', () => {
  it('should return base class when size is "base"', () => {
    const result = getSectionVerticalSpacingClass('base', mockTextStyles);
    assert.strictEqual(result, 'py-32 md:py-40 lg:py-48');
  });

  it('should return specific size class when size is provided', () => {
    const result = getSectionVerticalSpacingClass('sm', mockTextStyles);
    assert.strictEqual(result, 'py-16 md:py-24 lg:py-32');
  });

  it('should return different size classes correctly', () => {
    const mdResult = getSectionVerticalSpacingClass('md', mockTextStyles);
    assert.strictEqual(mdResult, 'py-20 md:py-32 lg:py-36');

    const lgResult = getSectionVerticalSpacingClass('lg', mockTextStyles);
    assert.strictEqual(lgResult, 'py-24 md:py-36 lg:py-40');

    const xlResult = getSectionVerticalSpacingClass('xl', mockTextStyles);
    assert.strictEqual(xlResult, 'py-32 md:py-40 lg:py-48');
  });

  it('should fall back to base when requested size is not available', () => {
    // Since 'xs' is not defined in our mock data, it should fall back to base
    const result = getSectionVerticalSpacingClass('xs', mockTextStyles);
    assert.strictEqual(result, 'py-32 md:py-40 lg:py-48');
  });
});
