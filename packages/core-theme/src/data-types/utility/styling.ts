export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'secondary-accent'
  | 'neutral'
  | 'white'
  | 'black';

export type FontStyle = 'normal' | 'italic';

export type ColorMode =
  | 'darkest' //950 | 200 - The deepest, almost black.
  | 'dark' //900 | 200 - Standard dark backgrounds.
  | 'deep' //700 | 200- A deeper shade of color, used for emphasis.
  | 'medium' //500 | 950 or 50 - Mid backbground color
  | 'surface' //200 | 800 - Used for cards, sheets, or surfaces above the background.
  | 'light'; //50 | 800 - Standard light backgrounds.

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type Leading = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
export type FontWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export type TextComponent =
  | 'p'
  | 'span'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'li'
  | 'ol'
  | 'ul';

export type TextComponentVariant = TextComponent | 'indent' | 'blockquote';

export type TextComponentStyles = {
  textSize?: TextSize;
  textAlign?: TextAlign;
  textColor?: ThemeColor;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  leading?: Leading;
  className?: string;
  classOverride?: string;
  border?: TextSize; // Optional border style
  borderColor?: ThemeColor; // Optional border color
};

export type DefaultTextComponentStyles = {
  textSize: TextSize;
  textAlign: TextAlign;
  textColor: ThemeColor;
  fontWeight: FontWeight;
  fontStyle: FontStyle;
  leading: Leading;
  border?: TextSize; // Optional border style
  borderColor?: ThemeColor; // Optional border color
};

export type DefaultStyles = {
  colorMode: ColorMode;
  backgroundColor: ThemeColor;
  textColor: ThemeColor;
  componentStyles: Record<TextComponentVariant, DefaultTextComponentStyles>;
};

export type ComponentStyles = Record<
  TextComponentVariant,
  {
    fontSize: Record<TextSize, string>;
    spacing: Record<TextSize, string>;
    // leading: Record<TextSize, string>;
    textAlign: Record<TextAlign, string>;
    border?: Record<TextSize, string>;
    borderColor?: Record<ThemeColor, string>;
  }
>;

export type StyleGuide = {
  defaultStyles: DefaultStyles;
  bgColor: Record<ThemeColor, Record<ColorMode, string>>;
  textColor: Record<ThemeColor, Record<ColorMode, string>>;
  fontWeight: Record<FontWeight, string>;
  fontStyle: Record<FontStyle, string>;
  leading: Record<Leading, string>;
  componentStyles: ComponentStyles;
};
