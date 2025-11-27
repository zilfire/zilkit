import type {
  LayoutSize,
  ContentWidth,
  GapSpacing,
  ZIndexLayer,
} from '../types/layout-style.types.js';
import { StyleClassNames } from '../types/style.types.js';

export const getSectionVerticalSpacingClass = (
  size: LayoutSize,
  styleClasses: StyleClassNames
): string => {
  return styleClasses.layout.verticalSectionSpacing[size] || '';
};

export const getContainerClass = (styleClasses: StyleClassNames): string => {
  return styleClasses.layout.structure.container || '';
};

export const getContainerXPaddingClass = (
  size: LayoutSize,
  styleClasses: StyleClassNames
): string => {
  if (typeof styleClasses.layout.structure.containerXPadding === 'string') {
    return styleClasses.layout.structure.containerXPadding;
  }
  return styleClasses.layout.structure.containerXPadding[size] || '';
};

export const getContentMaxWidthClass = (
  width: ContentWidth,
  styleClasses: StyleClassNames
): string => {
  return styleClasses.layout.contentMaxWidth[width] || '';
};

export const getHorizontalGapSpacingClass = (
  size: GapSpacing,
  styleClasses: StyleClassNames
): string => {
  return styleClasses.layout.horizontalGapSpacing[size] || '';
};

export const getVerticalGapSpacingClass = (
  size: GapSpacing,
  styleClasses: StyleClassNames
): string => {
  return styleClasses.layout.verticalGapSpacing[size] || '';
};

export const getZIndexClass = (layer: ZIndexLayer, styleClasses: StyleClassNames): string => {
  return styleClasses.layout.zIndex[layer] || '';
};

export const getVerticalLineSpacingClass = (
  size: LayoutSize,
  styleClasses: StyleClassNames
): string => {
  return styleClasses.layout.verticalLineSpacing[size] || '';
};

export const getGapSpacingClass = (size: GapSpacing, styleClasses: StyleClassNames): string => {
  return styleClasses.layout.gapSpacing[size] || '';
};
