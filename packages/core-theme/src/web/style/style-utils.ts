import type {
  TextStyleGroup,
  TextComponent,
  StyleClassNames,
  TextSize,
  TextVariantStyle,
  TextLineDecoration,
  SectionVerticalSpacingSize,
} from '../../types/style-types/style-classes.js';

export const getTextClass = (
  textComponent: TextComponent,
  textStyleGroup: TextStyleGroup,
  textStyles: StyleClassNames,
  styleOptions: {
    variant?: string;
    size?: TextSize;
    bold?: boolean;
    italic?: boolean;
    lineDecoration?: TextLineDecoration | false;
  }
): string => {
  const {
    size = 'base',
    variant = 'normal',
    bold = false,
    italic = false,
    lineDecoration = false,
  } = styleOptions;

  // Check for emphasis styles first.
  if (bold && textStyleGroup === 'fontWeight') {
    const boldClass = textStyles.text.emphasis?.bold;
    if (boldClass) {
      return boldClass;
    }
  }

  if (italic && textStyleGroup === 'fontStyle') {
    const italicClass = textStyles.text.emphasis?.italic;
    if (italicClass) {
      return italicClass;
    }
  }

  if (lineDecoration && textStyleGroup === 'decorationLine') {
    const decorationClass = textStyles.text.emphasis?.[lineDecoration];
    if (decorationClass) {
      return decorationClass;
    }
  }

  // Check for variant style.
  if (variant !== 'normal' && textStyles.text.style.variants?.[variant]) {
    const variantStyles = textStyles.text.style.variants[variant] as TextVariantStyle;
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
  if (textStyles.text.style.normal[size]?.elements?.[textComponent]?.[textStyleGroup]) {
    return textStyles.text.style.normal[size]?.elements?.[textComponent]?.[textStyleGroup];
  }

  // Check for normal default size style.
  if (textStyles.text.style.normal[size]?.default?.[textStyleGroup]) {
    return textStyles.text.style.normal[size]?.default?.[textStyleGroup];
  }

  return '';
};

export const getSectionVerticalSpacingClass = (
  sectionStyles: StyleClassNames,
  size?: SectionVerticalSpacingSize
): string => {
  const spacingSize = size || 'base';

  // Get the requested size or fall back to base
  const spacingClass =
    sectionStyles.section.sectionVerticalSpacing[spacingSize] ||
    sectionStyles.section.sectionVerticalSpacing.base;

  return spacingClass || '';
};
