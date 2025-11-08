import type { ThemeColor } from '../../../types/style-types/color-style-classes.js';

import type { StyleClassNames } from '../../../types/style-types/style-class-names.js';

/**
 * Get a background color class by key
 */
export function getBackgroundColorClass(
  key: ThemeColor,
  classNames: StyleClassNames
): string | undefined {
  return classNames.color.backgroundColors?.[key];
}

/**
 * Get a text color class by key
 */
export function getTextColorClass(
  key: ThemeColor,
  classNames: StyleClassNames
): string | undefined {
  console.log('getTextColor', key);
  return classNames.color.textColors?.[key];
}

/**
 * Get a border color class by key
 */
export function getBorderColorClass(
  key: ThemeColor,
  classNames: StyleClassNames
): string | undefined {
  return classNames.color.borderColors?.[key];
}
