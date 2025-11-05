import type {
  ButtonStyleClassCategory,
  ButtonColorClassCategory,
  ButtonSizeClassCategory,
  ButtonSize,
  ButtonClassOverride,
  ButtonClassCategory,
} from '../../../types/style-types/button-style-classes.js';
import type { StyleClassNames } from '../../../types/style-types/style-class-names.js';
import clsx from 'clsx';

export const buttonSizeClassCategories: readonly ButtonSizeClassCategory[] = [
  'paddingY',
  'paddingX',
  'fontSize',
  'fontWeight',
  'rounding',
] as const;

export const buttonColorClassCategories: readonly ButtonColorClassCategory[] = [
  'backgroundColor',
  'backgroundOpacity',
  'textColor',
  'borderColor',
] as const;

export const buttonClassCategory: readonly ButtonClassCategory[] = ['pointer'] as const;

export const buttonClassCategories: readonly ButtonStyleClassCategory[] = [
  ...buttonSizeClassCategories,
  ...buttonColorClassCategories,
  ...buttonClassCategory,
] as const;

export const getButtonClass = (
  styleClassNames: StyleClassNames,
  classCategory: ButtonStyleClassCategory,
  options: {
    variant?: string;
    size?: ButtonSize;
    color?: string;
  }
): string => {
  const { variant = 'normal', size = 'base', color } = options;

  // Determine if the category belongs to color or size groups
  const isColorCategory = buttonColorClassCategories.includes(
    classCategory as ButtonColorClassCategory
  );
  const isSizeCategory = buttonSizeClassCategories.includes(
    classCategory as ButtonSizeClassCategory
  );

  // If variant is not 'normal', check in the variants object first
  if (variant !== 'normal' && styleClassNames.button.style.variants?.[variant]) {
    const variantStyle = styleClassNames.button.style.variants[variant];

    // Check in color sub-object if it's a color category and color is provided
    if (isColorCategory && color && variantStyle.colors?.[color]) {
      const colorClass = variantStyle.colors[color][classCategory as ButtonColorClassCategory];
      if (colorClass) {
        return colorClass;
      }
    }

    // Check in size sub-object if it's a size category and size is provided
    if (isSizeCategory && variantStyle.sizes?.[size]) {
      const sizeClass = variantStyle.sizes[size][classCategory as ButtonSizeClassCategory];
      if (sizeClass) {
        return sizeClass;
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
  styleClassNames: StyleClassNames,
  options: {
    variant?: string;
    size?: ButtonSize;
    color?: string;
    className?: string;
    classOverride?: ButtonClassOverride;
  }
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
      const categoryClass = getButtonClass(styleClassNames, classCategory, {
        variant,
        size,
        color,
      });
      if (categoryClass) {
        classNames.push(categoryClass);
      }
    }
  }

  // Combine all class names with the additional className
  return clsx(...classNames, className);
};
