import type { ThemeColor } from '../../../types/style-types/style-class-names.js';

import type { StyleClassNames } from '../../../types/style-types/style-class-names.js';

/**
 * Get a background color class by key
 */
export function getBackgroundColorClass(
  key: ThemeColor,
  classNames: StyleClassNames
): string | undefined {
  return classNames.background.backgroundColors?.[key];
}
