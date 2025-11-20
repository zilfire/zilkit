import type {
  TextStyleGroup,
  TextComponent,
  TextVariantStyle,
  TextElementSize,
  classNamesBySize,
  TextClassOverrides,
  TextStyleOptions,
} from '../../../types/style-types/text-style-classes.js';

import type { ThemeColor } from '../../../types/style-types/style-class-names.js';

// import type { LayoutSizeOption } from '../../../types/style-types/layout-style-classes.js';

import type { StyleClassNames } from '../../../types/style-types/style-class-names.js';

/**
 * Get a text color class by key
 */
export function getTextColorClass(
  key: ThemeColor,
  classNames: StyleClassNames
): string | undefined {
  return classNames.text.textColor[key];
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
  const { bold = false, italic = false, lineDecoration = false, textColor = false } = styleOptions;

  // Handle overrides
  const classOverrides = styleOptions.classOverrides;

  if (typeof classOverrides === 'object' && textStyleGroup in classOverrides) {
    return classOverrides[textStyleGroup] || '';
  }

  // Check for option styles
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

  if (textColor && textStyleGroup === 'textColor') {
    const colorClass = styleClasses.text.textColor?.[textColor];
    if (colorClass) {
      return colorClass;
    }
  }

  if (textStyleGroup === 'textAlign' && styleOptions.textAlign) {
    const alignClass = styleClasses.text.textAlign?.[styleOptions.textAlign];
    if (alignClass) {
      return alignClass;
    }
  }

  if (textStyleGroup === 'textSize' && styleOptions.textSize) {
    const sizeClass = styleClasses.text.textSize?.[styleOptions.textSize];
    if (sizeClass) {
      return sizeClass;
    }
  }

  if (textStyleGroup === 'fontWeight' && styleOptions.fontWeight) {
    const weightClass = styleClasses.text.fontWeight?.[styleOptions.fontWeight];
    if (weightClass) {
      return weightClass;
    }
  }

  if (textStyleGroup === 'fontStyle' && styleOptions.fontStyle) {
    const styleClass = styleClasses.text.fontStyle?.[styleOptions.fontStyle];
    if (styleClass) {
      return styleClass;
    }
  }

  if (textStyleGroup === 'fontFamily' && styleOptions.fontFamily) {
    const familyClass = styleClasses.text.fontFamily?.[styleOptions.fontFamily];
    if (familyClass) {
      return familyClass;
    }
  }

  if (textStyleGroup === 'listType' && styleOptions.listType) {
    const listTypeClass = styleClasses.text.listType?.[styleOptions.listType];
    if (listTypeClass) {
      return listTypeClass;
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
