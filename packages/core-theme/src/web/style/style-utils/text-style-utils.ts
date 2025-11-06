import type {
  TextStyleGroup,
  TextComponent,
  TextVariantStyle,
  TextSize,
  classNamesBySize,
  StyleGroupClassNames,
} from '../../../types/style-types/text-style-classes.js';

import type { SectionVerticalSpacingSize } from '../../../types/style-types/section-style-classes.js';

import type { StyleClassNames } from '../../../types/style-types/style-class-names.js';

import type { TextStyleOptions } from '../../text/Text.js';

const getStyleGroupClassNameBySize = (
  classNamesBySize: classNamesBySize,
  size: TextSize | 'default',
  styleClasses: StyleClassNames
): string => {
  if (typeof classNamesBySize === 'object') {
    // If object, check if size-specific class name exists
    const sizeClassName = size in classNamesBySize ? classNamesBySize[size] : undefined;

    if (sizeClassName) {
      return sizeClassName;
    }

    if ('default' in classNamesBySize) {
      const defaultClassName = classNamesBySize.default;
      if (defaultClassName) {
        return defaultClassName;
      }
    }
  } else {
    // It's a string, return it
    return classNamesBySize;
  }

  console.warn(
    'getStyleGroupClassNameBySize: No class name found for size:',
    size,
    classNamesBySize
  );
  return '';
};

export const getTextClass = (
  textComponent: TextComponent,
  textStyleGroup: TextStyleGroup,
  styleClasses: StyleClassNames,
  styleOptions: TextStyleOptions
): string => {
  const {
    size = 'default',
    variant = 'normal',
    bold = false,
    italic = false,
    lineDecoration = false,
    color = false,
  } = styleOptions;

  // console.log('styleClasses', styleClasses.text.style.normal);

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

  // If variant, check for variant-specific styles -- First check element then default
  if (variant !== 'normal') {
    // Check for variantStyles
    const variantStyles: TextVariantStyle | undefined = styleClasses.text.style.variants?.[variant];

    if (variantStyles) {
      // check for textStyleGroup in variant element styles.
      const variantElementClassNames: classNamesBySize | undefined =
        variantStyles.elements?.[textComponent]?.[textStyleGroup];
      if (variantElementClassNames) {
        return getStyleGroupClassNameBySize(variantElementClassNames, size, styleClasses);
      }

      // Check for textStyleGroup in variant default styles.
      const variantDefaultClassNames: classNamesBySize | undefined =
        variantStyles.default[textStyleGroup];
      if (variantDefaultClassNames) {
        return getStyleGroupClassNameBySize(variantDefaultClassNames, size, styleClasses);
      }
    }
  }

  // Check for normal styles
  const normalStyles: TextVariantStyle | undefined = styleClasses.text.style.normal;
  if (normalStyles) {
    // check for textStyleGroup in element styles.
    const normalElementClassNames: classNamesBySize | undefined =
      normalStyles.elements?.[textComponent]?.[textStyleGroup];
    if (normalElementClassNames) {
      return getStyleGroupClassNameBySize(normalElementClassNames, size, styleClasses);
    }

    // Check for textStyleGroup in default styles.
    const normalDefaultClassNames: classNamesBySize | undefined =
      normalStyles.default[textStyleGroup];
    if (normalDefaultClassNames) {
      return getStyleGroupClassNameBySize(normalDefaultClassNames, size, styleClasses);
    }
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
