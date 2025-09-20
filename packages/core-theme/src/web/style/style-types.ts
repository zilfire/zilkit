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
export type ButtonSize = 'sm' | 'md' | 'lg';
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

export type ListType = 'none' | 'disc' | 'decimal';

export type ListPosition = 'inside' | 'outside';

export type RoundingSize = 'none' | 'sm' | 'md' | 'lg' | 'full';

export type TextComponentVariant = TextComponent | 'indent' | 'blockquote';

export type TextStylesForOverride =
  | 'textSize'
  | 'textAlign'
  | 'textColor'
  | 'leading'
  | 'fontWeight'
  | 'fontStyle'
  | 'fontFamily'
  | 'listType'
  | 'listPosition'
  | 'spacing'
  | 'border';

export type TextStylesOverride = TextStylesForOverride | TextStylesForOverride[];

export type TextComponentStyles = {
  textSize?: TextSize;
  textAlign?: TextAlign;
  textColor?: ThemeColor;
  fontFamily?: string;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  leading?: Leading;
  className?: string;
  classOverride?: string;
  border?: TextSize; // Optional border style
  borderColor?: ThemeColor; // Optional border color
  listType?: ListType; // Optional list type
  listPosition?: ListPosition; // Optional list position
  styleOverride?: TextStylesOverride;
};

export type DefaultTextComponentStyles = {
  textSize: TextSize;
  textAlign: TextAlign;
  textColor: ThemeColor;
  fontFamily?: string; // Optional font family
  fontWeight: FontWeight;
  fontStyle: FontStyle;
  leading: Leading;
  border?: TextSize; // Optional border style
  borderColor?: ThemeColor; // Optional border color
  listType?: ListType; // Optional list type
  listPosition?: ListPosition; // Optional list position
};

export type DefaultStyles = {
  colorMode: ColorMode;
  backgroundColor: ThemeColor;
  textColor: ThemeColor;
  componentStyles: Record<TextComponentVariant, DefaultTextComponentStyles>;
};

export type ComponentStyles =
  | Record<
      TextComponentVariant,
      {
        fontSize: Record<TextSize, string>;
        spacing: Record<TextSize, string>;
        // leading: Record<TextSize, string>;
        textAlign?: Record<TextAlign, string>;
        border?: Record<TextSize | ButtonSize, string>;
        borderColor?: Record<ThemeColor, string>;
      }
    > &
      Record<
        'button',
        {
          fontSize: Record<ButtonSize, string>;
          spacing: Record<ButtonSize, string>;
          // leading: Record<TextSize, string>;
          // textAlign?: Record<TextAlign, string>;
          border?: Record<TextSize | ButtonSize, string>;
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
  listType: Record<ListType, string>;
  listPosition: Record<ListPosition, string>;
  rounding: Record<RoundingSize, string>;
};
