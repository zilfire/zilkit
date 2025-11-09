import type { ThemeColor } from '../../../types/style-types/style-class-names.js';
import type {
  BorderEdge,
  BorderThickness,
} from '../../../types/style-types/border-style-classes.js';

import type { StyleClassNames } from '../../../types/style-types/style-class-names.js';

/**
 * Get a border color class by key
 */
export function getBorderColorClass(
  key: ThemeColor,
  classNames: StyleClassNames
): string | undefined {
  return classNames.border.color?.[key];
}

/**
 * Get a border edge class by edge and thickness
 */
export function getBorderEdgeClass(
  edge: BorderEdge,
  thickness: BorderThickness,
  classNames: StyleClassNames
): string | undefined {
  return classNames.border.edge?.[edge]?.[thickness];
}
