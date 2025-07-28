import type {
  ColorMode,
  // ThemeColor,
  // TextAlign,
  // TextSize,
  // FontStyle,
  // FontWeight,
  // Leading,
  TextComponent,
  TextComponentStyles,
} from '../../utility/styling';

export type TextComponentProps = TextComponentStyles & {
  as?: TextComponent;
  children?: React.ReactNode;
  // className?: string;
  // classOverride?: string;
  // size?: TextSize;
  // align?: TextAlign;
  colorMode?: ColorMode;
  // themeColor?: ThemeColor;
  // leading?: Leading;
  // weight?: FontWeight;
  // style?: FontStyle;
};
