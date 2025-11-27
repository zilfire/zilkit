import type { ThemeColor, StyleClassNames } from '../types/style.types.js';

/**
 * Get a background color class by key
 */
export function getBackgroundColorClass(
  key: ThemeColor,
  classNames: StyleClassNames
): string | undefined {
  return classNames.background.backgroundColors?.[key];
}
