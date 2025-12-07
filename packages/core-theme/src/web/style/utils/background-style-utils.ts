import type { ThemeColor, StyleClassNames } from '../types/style.types.js';
import { styleClassNames } from '../../style/classes/style-classes.js';

/**
 * Get a background color class by key
 */
export function getBackgroundColorClass(
  key: ThemeColor,
  classNames: StyleClassNames = styleClassNames
): string | undefined {
  return classNames.background.backgroundColors?.[key];
}
