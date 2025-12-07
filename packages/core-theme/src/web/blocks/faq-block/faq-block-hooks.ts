import { useState, useCallback } from 'react';
import type { ThemeContext } from '../../../config/context.js';
import type { BorderColor } from '../../style/types/border-style.types.js';
import { getBorderColorClass, getBorderEdgeClass } from '../../style/utils/border-style-utils.js';
import { getGapSpacingClass } from '../../style/utils/layout-style-utils.js';
import { FAQ_DEFAULTS } from './faq-block-config.js';

/**
 * Custom hook for toggle functionality
 */
export const useToggle = (initialState = false): [boolean, () => void] => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((prev) => !prev), []);
  return [state, toggle];
};

// /**
//  * Hook to generate border classes
//  */
// export const useBorderClasses = (
//   edge: 'top' | 'bottom' | 'left' | 'right' | 'all',
//   borderColor: BorderColor | undefined,
//   borderThickness: 'thin' | 'medium' | 'thick' | undefined,
//   context: ThemeContext
// ) => {
//   const colorClass = getBorderColorClass(
//     borderColor || FAQ_DEFAULTS.border.color,
//     context.styleClasses
//   );
//   const edgeClass = getBorderEdgeClass(
//     edge,
//     borderThickness || FAQ_DEFAULTS.border.thickness,
//     context.styleClasses
//   );

//   return { colorClass, edgeClass };
// };

// /**
//  * Hook to generate layout classes
//  */
// export const useLayoutClasses = (context: ThemeContext) => {
//   const gapClass = getGapSpacingClass(FAQ_DEFAULTS.layout.columnGap, context.styleClasses);
//   const colOneClass = getColumnLayoutClass(FAQ_DEFAULTS.layout.firstColumn, context.styleClasses);
//   const colTwoClass = getColumnLayoutClass(FAQ_DEFAULTS.layout.secondColumn, context.styleClasses);

//   return { gapClass, colOneClass, colTwoClass };
// };
