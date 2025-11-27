import type { ThemeColor, StyleClassNames } from '../types/style.types.js';
import type { BorderEdge, BorderThickness } from '../types/border-style.types.js';

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
