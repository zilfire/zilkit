import type { ColorMode, ThemeColor, TextAlign, TextSize } from '../../utility/styling';
import type { JSX } from 'react';

export type TextComponentProps = {
  as?: keyof JSX.IntrinsicElements; // Allows specifying the HTML element type
  className?: string;
  children?: React.ReactNode;
  size?: TextSize;
  align?: TextAlign;
  colorMode?: ColorMode;
  themeColor?: ThemeColor;
  classOverride?: string;
};
