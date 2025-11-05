import type {
  TextStyleGroup,
  TextComponent,
  TextVariantStyle,
} from '../../../types/style-types/text-style-classes.js';

import type { SectionVerticalSpacingSize } from '../../../types/style-types/section-style-classes.js';

import type { StyleClassNames } from '../../../types/style-types/style-class-names.js';

import type { TextStyleOptions } from '../../text/Text.js';

export const getTextClass = (
  textComponent: TextComponent,
  textStyleGroup: TextStyleGroup,
  styleClasses: StyleClassNames,
  styleOptions: TextStyleOptions
): string => {
  const {
    size = 'base',
    variant = 'normal',
    bold = false,
    italic = false,
    lineDecoration = false,
    color = false,
  } = styleOptions;

  // Check for emphasis styles first.
  if (bold && textStyleGroup === 'fontWeight') {
    const boldClass = styleClasses.text.emphasis?.bold;
    if (boldClass) {
      return boldClass;
    }
  }

  if (italic && textStyleGroup === 'fontStyle') {
    const italicClass = styleClasses.text.emphasis?.italic;
    if (italicClass) {
      return italicClass;
    }
  }

  if (lineDecoration && textStyleGroup === 'lineDecoration') {
    const decorationClass = styleClasses.text.emphasis?.[lineDecoration];
    if (decorationClass) {
      return decorationClass;
    }
  }

  if (color && textStyleGroup === 'textColor') {
    const colorClass = styleClasses.text.color?.[color];
    if (colorClass) {
      return colorClass;
    }
  }

  // Check for variant style.
  if (variant !== 'normal' && styleClasses.text.style.variants?.[variant]) {
    const variantStyles = styleClasses.text.style.variants[variant] as TextVariantStyle;
    // Check for variant size-specific style.
    if (variantStyles[size]?.elements?.[textComponent]?.[textStyleGroup]) {
      return variantStyles[size]?.elements?.[textComponent]?.[textStyleGroup];
    }
    // Check for variant default size style.
    if (variantStyles[size]?.default?.[textStyleGroup]) {
      return variantStyles[size]?.default?.[textStyleGroup];
    }
  }

  // Check for normal size-specific style.
  if (styleClasses.text.style.normal[size]?.elements?.[textComponent]?.[textStyleGroup]) {
    return styleClasses.text.style.normal[size]?.elements?.[textComponent]?.[textStyleGroup];
  }

  // Check for normal default size style.
  if (styleClasses.text.style.normal[size]?.default?.[textStyleGroup]) {
    return styleClasses.text.style.normal[size]?.default?.[textStyleGroup];
  }

  return '';
};

export const getSectionVerticalSpacingClass = (
  size: SectionVerticalSpacingSize,
  styleClasses: StyleClassNames
): string => {
  // Get the requested size or fall back to base
  const spacingClass =
    styleClasses.section.sectionVerticalSpacing[size] ||
    styleClasses.section.sectionVerticalSpacing.base;

  return spacingClass || '';
};
