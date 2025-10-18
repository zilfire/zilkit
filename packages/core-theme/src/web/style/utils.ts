// import clsx from 'clsx';

import type {
  ColorTone,
  OpacityOption,
  StyleGuide,
  ThemeColor,
} from '../../types/style-types/index.js';

import type {
  TextStyleGroup,
  TextElement,
  StyleClassNames,
  TextSize,
  TextVariantStyle,
} from '../../types/style-types/text-styles.js';

export const getBGColorClass = (
  themeColor: ThemeColor,
  colorTone: ColorTone,
  styleGuide: StyleGuide
) => {
  const colorClass = styleGuide.bgColor[themeColor]?.[colorTone];
  return colorClass || '';
};

export const getOpacityClass = (opacity: OpacityOption, styleGuide: StyleGuide): string => {
  const opacityClass = styleGuide.opacity[opacity];
  return opacityClass || '';
};

export const getTextClass = (
  textElement: TextElement,
  textStyleGroup: TextStyleGroup,
  textStyles: StyleClassNames,
  styleOptions: {
    variant?: string;
    size?: TextSize;
  }
): string => {
  const { size = 'base', variant = 'normal' } = styleOptions;

  // Check for variant style.
  if (variant !== 'normal' && textStyles.text.variants?.[variant]) {
    const variantStyles = textStyles.text.variants[variant] as TextVariantStyle;
    // Check for variant size-specific style.
    if (variantStyles[size]?.elements?.[textElement]?.[textStyleGroup]) {
      return variantStyles[size]?.elements?.[textElement]?.[textStyleGroup];
    }
    // Check for variant default size style.
    if (variantStyles[size]?.default?.[textStyleGroup]) {
      return variantStyles[size]?.default?.[textStyleGroup];
    }
  }

  // Check for normal size-specific style.
  if (textStyles.text.normal[size]?.elements?.[textElement]?.[textStyleGroup]) {
    return textStyles.text.normal[size]?.elements?.[textElement]?.[textStyleGroup];
  }

  // Check for normal default size style.
  if (textStyles.text.normal[size]?.default?.[textStyleGroup]) {
    return textStyles.text.normal[size]?.default?.[textStyleGroup];
  }

  return '';
};
