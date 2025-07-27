import type { ColorMode, ThemeColor, TextAlign, TextSize } from '../../utility/styling';

export type TextComponentProps = {
  className?: string;
  children?: React.ReactNode;
  size?: TextSize;
  align?: TextAlign;
  colorMode?: ColorMode;
  themeColor?: ThemeColor;
  classOverride?: string;
};
