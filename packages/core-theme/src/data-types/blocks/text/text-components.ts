import type {
  ColorMode,
  ThemeColor,
  TextAlign,
  TextSize,
  TextComponent,
} from '../../utility/styling';

export type TextComponentProps = {
  as?: TextComponent;
  className?: string;
  children?: React.ReactNode;
  size?: TextSize;
  align?: TextAlign;
  colorMode?: ColorMode;
  themeColor?: ThemeColor;
  classOverride?: string;
};
