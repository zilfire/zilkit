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

export type TextComponents =
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

export type Typography = Record<
  TextComponents,
  {
    fontSize: Record<TextSize, string>;
    spacing: Record<TextSize, string>;
    leading: Record<TextSize, string>;
  }
>;

export type StyleGuide = {
  defaults: {
    colorMode: ColorMode;
  } & {
    [K in TextComponents]: {
      size: TextSize;
      align: TextAlign;
      textColor: ThemeColor;
      textAlign: TextAlign;
      leading: 'snug' | 'normal';
    };
  };
  bgColor: Record<ThemeColor, Record<ColorMode, string>>;
  textColor: Record<ThemeColor, Record<ColorMode, string>>;
  typography: Typography;
  textAlign: Record<TextAlign, string>;
  leading: Record<string, string>;
};
