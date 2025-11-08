import type {
  BackgroundColor,
  LayoutSizeOption,
} from '../../../types/style-types/layout-style-classes.js';
import { StyleClassNames } from '../../../types/style-types/style-class-names.js';

export const getBackgroundColorClass = (color: BackgroundColor, styleClasses: StyleClassNames) => {
  return styleClasses.layout.backgroundColors[color] || '';
};

export const getSectionVerticalSpacingClass = (
  size: LayoutSizeOption,
  styleClasses: StyleClassNames
): string => {
  // Get the requested size or fall back to base
  const spacingClass =
    styleClasses.layout.verticalSectionSpacing[size] ||
    styleClasses.layout.verticalSectionSpacing.base;

  return spacingClass || '';
};

export const getContainerPaddingClass = (
  size: LayoutSizeOption,
  styleClasses: StyleClassNames
): string => {
  // Get the requested size or fall back to base
  const paddingClass =
    styleClasses.layout.containerPadding[size] || styleClasses.layout.containerPadding.base;

  return paddingClass || '';
};
