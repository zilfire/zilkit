import type {
  TextStyleGroup,
  TextComponent,
  TextVariantStyle,
  TextElementSize,
  classNamesBySize,
  TextClassOverrides,
} from '../../../types/style-types/text-style-classes.js';

import type { ThemeColor } from '../../../types/style-types/style-class-names.js';

// import type { LayoutSizeOption } from '../../../types/style-types/layout-style-classes.js';

import type { StyleClassNames } from '../../../types/style-types/style-class-names.js';

import type { TextStyleOptions } from '../../text/Text.js';

/**
 * Get a text color class by key
 */
export function getTextColorClass(
  key: ThemeColor,
  classNames: StyleClassNames
): string | undefined {
  return classNames.text.color[key];
}

const getStyleGroupClassNameBySize = (
  classNamesBySize: classNamesBySize,
  size: TextElementSize,
  styleClasses: StyleClassNames
): string => {
  if (typeof classNamesBySize === 'object') {
    // If object, check if size-specific class name exists
    const sizeClassName = size in classNamesBySize ? classNamesBySize[size] : undefined;

    if (sizeClassName) {
      return sizeClassName;
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
  size: TextElementSize,
  variant: string = 'normal',
  styleClasses: StyleClassNames,
  styleOptions: TextStyleOptions & { classOverrides?: TextClassOverrides }
): string => {
  const { bold = false, italic = false, lineDecoration = false, color = false } = styleOptions;

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

  // Handle overrides
  const classOverrides = styleOptions.classOverrides;

  if (typeof classOverrides === 'object' && textStyleGroup in classOverrides) {
    return classOverrides[textStyleGroup] || '';
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
