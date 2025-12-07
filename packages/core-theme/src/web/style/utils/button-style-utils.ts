import type {
  ButtonStyleClassCategory,
  ButtonColorClassCategory,
  ButtonSizeClassCategory,
  ButtonSize,
  ButtonClassOverride,
  ButtonClassCategory,
} from '../types/button-style.types.js';
import type { StyleClassNames } from '../types/style.types.js';
import { styleClassNames as defaultStyleClassNames } from '../../style/classes/style-classes.js';
import clsx from 'clsx';

export const buttonSizeClassCategories: readonly ButtonSizeClassCategory[] = [
  'paddingY',
  'paddingX',
  'fontSize',
  'fontWeight',
  'rounding',
  'verticalSpacing',
  'horizontalSpacing',
] as const;

export const buttonColorClassCategories: readonly ButtonColorClassCategory[] = [
  'backgroundColor',
  'textColor',
  'borderColor',
] as const;

export const buttonStyleClassCategories: readonly ButtonStyleClassCategory[] = [
  'pointer',
  'border',
] as const;

export const buttonClassCategories: readonly ButtonClassCategory[] = [
  ...buttonSizeClassCategories,
  ...buttonColorClassCategories,
  ...buttonStyleClassCategories,
] as const;

export const getButtonClass = (
  classCategory: ButtonClassCategory,
  options: {
    variant?: string;
    size?: ButtonSize;
    color?: string;
  },
  styleClassNames: StyleClassNames = defaultStyleClassNames
): string => {
  const { variant = 'normal', size = 'base', color } = options;

  // Determine if the category belongs to color or size groups
  const isColorCategory = buttonColorClassCategories.includes(
    classCategory as ButtonColorClassCategory
  );
  const isSizeCategory = buttonSizeClassCategories.includes(
    classCategory as ButtonSizeClassCategory
  );
  const isStyleCategory = buttonStyleClassCategories.includes(
    classCategory as ButtonStyleClassCategory
  );

  // If variant is not 'normal', check in the variants object first
  if (variant !== 'normal' && styleClassNames.button.style.variants?.[variant]) {
    const variantStyle = styleClassNames.button.style.variants[variant];
    const normalStyle = styleClassNames.button.style.normal;

    // Check in color sub-object if it's a color category and color is provided
    if (isColorCategory && color) {
      // First check variant colors
      if (variantStyle.colors?.[color]) {
        const colorClass = variantStyle.colors[color][classCategory as ButtonColorClassCategory];
        if (colorClass) {
          return colorClass;
        }
      }
      // If not in variant colors, check normal colors
      if (normalStyle.colors?.[color]) {
        const colorClass = normalStyle.colors[color][classCategory as ButtonColorClassCategory];
        if (colorClass) {
          return colorClass;
        }
      }
    }

    // Check in size sub-object if it's a size category and size is provided
    if (isSizeCategory) {
      // First check variant sizes
      if (variantStyle.sizes?.[size]) {
        const sizeClass = variantStyle.sizes[size][classCategory as ButtonSizeClassCategory];
        if (sizeClass) {
          return sizeClass;
        }
      }
      // If not in variant sizes, check normal sizes
      if (normalStyle.sizes?.[size]) {
        const sizeClass = normalStyle.sizes[size][classCategory as ButtonSizeClassCategory];
        if (sizeClass) {
          return sizeClass;
        }
      }
    }

    // Check in variant base object
    const baseClass = variantStyle.base[classCategory];
    if (baseClass) {
      return baseClass;
    }
  }

  // Fall back to normal variant
  const normalStyle = styleClassNames.button.style.normal;

  // Check in normal color sub-object if it's a color category and color is provided
  if (isColorCategory && color && normalStyle.colors?.[color]) {
    const colorClass = normalStyle.colors[color][classCategory as ButtonColorClassCategory];
    if (colorClass) {
      return colorClass;
    }
  }

  // Check in normal size sub-object if it's a size category
  if (isSizeCategory && normalStyle.sizes?.[size]) {
    const sizeClass = normalStyle.sizes[size][classCategory as ButtonSizeClassCategory];
    if (sizeClass) {
      return sizeClass;
    }
  }

  // Check in normal base object
  const baseClass = normalStyle.base[classCategory];
  if (baseClass) {
    return baseClass;
  }

  // Return empty string if nothing found
  return '';
};

export const getButtonClasses = (
  options: {
    variant?: string;
    size?: ButtonSize;
    color?: string;
    className?: string;
    classOverride?: ButtonClassOverride;
  } = {},
  styleClassNames: StyleClassNames = defaultStyleClassNames
): string => {
  const { variant, size, color, className, classOverride } = options;

  // If classOverride is a string, return the classOverride and the className combined
  if (typeof classOverride === 'string') {
    return clsx(classOverride, className);
  }

  // Collect all class names for each category
  const classNames: string[] = [];

  // Loop through buttonClassCategories to retrieve classNames for each classCategory
  for (const classCategory of buttonClassCategories) {
    // Check if there is a classOverride for the specific classCategory
    if (classOverride && typeof classOverride === 'object' && classOverride[classCategory]) {
      classNames.push(classOverride[classCategory]!);
    } else {
      // Use getButtonClass to retrieve the class for this category
      const categoryClass = getButtonClass(
        classCategory,
        {
          variant,
          size,
          color,
        },
        styleClassNames
      );
      if (categoryClass) {
        classNames.push(categoryClass);
      }
    }
  }

  // Combine all class names with the additional className
  return clsx(...classNames, className);
};
