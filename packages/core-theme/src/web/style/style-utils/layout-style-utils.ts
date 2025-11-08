import type {
  BackgroundColor,
  LayoutSizeOption,
  ContentWidthOption,
  GapSpacingOption,
  ZIndexLayer,
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

export const getContentMaxWidthClass = (
  width: ContentWidthOption,
  styleClasses: StyleClassNames
): string => {
  // Get the requested width or fall back to base
  const widthClass =
    styleClasses.layout.contentMaxWidth[width] || styleClasses.layout.contentMaxWidth.base;

  return widthClass || '';
};

export const getHorizontalGapSpacingClass = (
  size: GapSpacingOption,
  styleClasses: StyleClassNames
): string => {
  // Get the requested size or fall back to base
  const gapClass =
    styleClasses.layout.horizontalGapSpacing[size] || styleClasses.layout.horizontalGapSpacing.base;

  return gapClass || '';
};

export const getVerticalGapSpacingClass = (
  size: GapSpacingOption,
  styleClasses: StyleClassNames
): string => {
  // Get the requested size or fall back to base
  const gapClass =
    styleClasses.layout.verticalGapSpacing[size] || styleClasses.layout.verticalGapSpacing.base;

  return gapClass || '';
};

export const getZIndexClass = (layer: ZIndexLayer, styleClasses: StyleClassNames): string => {
  // Get the requested layer or fall back to base
  const zIndexClass = styleClasses.layout.zIndex[layer] || styleClasses.layout.zIndex.base;

  return zIndexClass || '';
};
