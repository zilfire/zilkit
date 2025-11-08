import type {
  BackgroundColor,
  LayoutSizeOption,
} from '../../../types/style-types/layout-style-classes.js';
import { StyleClassNames } from '../../../types/style-types/style-class-names.js';

export const getBackgroundColorClass = (color: BackgroundColor, styleClasses: StyleClassNames) => {
  return styleClasses.section.backgroundColors[color] || '';
};

export const getSectionVerticalSpacingClass = (
  size: LayoutSizeOption,
  styleClasses: StyleClassNames
): string => {
  // Get the requested size or fall back to base
  const spacingClass =
    styleClasses.section.verticalSectionSpacing[size] ||
    styleClasses.section.verticalSectionSpacing.base;

  return spacingClass || '';
};
