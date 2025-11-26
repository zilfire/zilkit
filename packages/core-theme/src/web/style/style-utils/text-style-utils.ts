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

import type { StyleClassNames } from '../../../types/style-types/style-class-names.js';

/**
 * Get a text color class by key
 */
export function getTextColorClass(
  key: ThemeColor,
  classNames: StyleClassNames
): string | undefined {
  if (classNames.text?.textColor?.[key]) {
    return classNames.text?.textColor?.[key];
  }
  return undefined;
}

const getStyleGroupClassNameBySize = (
  classNamesBySize: classNamesBySize,
  size: TextElementSize
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
  // Handle overrides

  const textClassNames = styleClasses.text;

  const classOverrides = styleOptions.classOverrides;
  if (typeof classOverrides === 'object' && textStyleGroup in classOverrides) {
    return classOverrides[textStyleGroup] || '';
  }

  // Check for option styles
  if (
    textStyleGroup in styleOptions &&
    styleOptions[textStyleGroup] &&
    textClassNames[textStyleGroup]
  ) {
    const optionClassNameKey = styleOptions[
      textStyleGroup
    ] as keyof (typeof textClassNames)[typeof textStyleGroup];
    const optionClassName =
      textClassNames[textStyleGroup]?.[
        optionClassNameKey as keyof (typeof textClassNames)[typeof textStyleGroup]
      ];
    if (optionClassName) {
      return optionClassName;
    }
  }

  // If variant, check for variant-specific styles -- First check element then default
  if (variant !== 'normal') {
    // Check for variantStyles
    const variantStyles: TextVariantStyle | undefined =
      styleClasses.text.elementStyle.variants?.[variant];

    if (variantStyles) {
      // check for textStyleGroup in variant element styles.
      const variantElementClassNames: classNamesBySize | undefined =
        variantStyles.elements?.[textComponent]?.[textStyleGroup];
      if (variantElementClassNames) {
        return getStyleGroupClassNameBySize(variantElementClassNames, size);
      }

      // Check for textStyleGroup in variant default styles.
      const variantDefaultClassNames: classNamesBySize | undefined =
        variantStyles.default[textStyleGroup];
      if (variantDefaultClassNames) {
        return getStyleGroupClassNameBySize(variantDefaultClassNames, size);
      }
    }
  }

  // Check for normal styles
  const normalStyles: TextVariantStyle | undefined = styleClasses.text.elementStyle.normal;
  if (normalStyles) {
    // check for textStyleGroup in element styles.
    const normalElementClassNames: classNamesBySize | undefined =
      normalStyles.elements?.[textComponent]?.[textStyleGroup];
    if (normalElementClassNames) {
      return getStyleGroupClassNameBySize(normalElementClassNames, size);
    }

    // Check for textStyleGroup in default styles.
    const normalDefaultClassNames: classNamesBySize | undefined =
      normalStyles.default[textStyleGroup];
    if (normalDefaultClassNames) {
      return getStyleGroupClassNameBySize(normalDefaultClassNames, size);
    }
  }

  return '';
};
