import type { ColorTone, OpacityOption, StyleGuide, ThemeColor } from './style-types.js';

export const getBGColorClass = (
  themeColor: ThemeColor,
  colorTone: ColorTone,
  styleGuide: StyleGuide
) => {
  const colorClass = styleGuide.bgColor[themeColor]?.[colorTone];
  return colorClass || '';
};

export const getOpacityClass = (opacity: OpacityOption, styleGuide: StyleGuide): string => {
  const opacityClass = styleGuide.opacity[opacity];
  return opacityClass || '';
};
