import type {
  LayoutSizeOption,
  ContentWidthOption,
  GapSpacingOption,
  ZIndexLayer,
  ColumnLayout,
} from '../../../types/style-types/layout-style-classes.js';
import { StyleClassNames } from '../../../types/style-types/style-class-names.js';

export const getSectionVerticalSpacingClass = (
  size: LayoutSizeOption,
  styleClasses: StyleClassNames
): string => {
  return styleClasses.layout.verticalSectionSpacing[size] || '';
};

export const getContainerPaddingClass = (
  size: LayoutSizeOption,
  styleClasses: StyleClassNames
): string => {
  return styleClasses.layout.containerPadding[size] || '';
};

export const getContentMaxWidthClass = (
  width: ContentWidthOption,
  styleClasses: StyleClassNames
): string => {
  return styleClasses.layout.contentMaxWidth[width] || '';
};

export const getHorizontalGapSpacingClass = (
  size: GapSpacingOption,
  styleClasses: StyleClassNames
): string => {
  return styleClasses.layout.horizontalGapSpacing[size] || '';
};

export const getVerticalGapSpacingClass = (
  size: GapSpacingOption,
  styleClasses: StyleClassNames
): string => {
  return styleClasses.layout.verticalGapSpacing[size] || '';
};

export const getZIndexClass = (layer: ZIndexLayer, styleClasses: StyleClassNames): string => {
  return styleClasses.layout.zIndex[layer] || '';
};

export const getVerticalLineSpacingClass = (
  size: LayoutSizeOption,
  styleClasses: StyleClassNames
): string => {
  return styleClasses.layout.verticalLineSpacing[size] || '';
};

export const getGapSpacingClass = (
  size: GapSpacingOption,
  styleClasses: StyleClassNames
): string => {
  return styleClasses.layout.gapSpacing[size] || '';
};

export const getColumnLayoutClass = (
  layout: ColumnLayout,
  styleClasses: StyleClassNames
): string => {
  return styleClasses.layout.columnLayout[layout] || '';
};
