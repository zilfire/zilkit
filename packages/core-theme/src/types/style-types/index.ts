export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'secondary-accent'
  | 'neutral'
  | 'white'
  | 'black';

export type FontStyle = 'normal' | 'italic';

export type ColorTone =
  | '50' //50 - Standard light backgrounds.
  | '100' //100 - Standard light backgrounds.
  | '200' //200 - Standard light backgrounds.
  | '300' //300 - Used for cards, sheets, or surfaces above the background.
  | '400' //400 - A lighter shade of color, used for emphasis.
  | '500' //500 - Mid background color
  | '600' //600 - A deeper shade of color, used for emphasis.
  | '700' //700 - Standard dark backgrounds.
  | '800' //800 - Standard dark backgrounds.
  | '900' //900 - Standard dark backgrounds.
  | '950'; //950 - The deepest, almost black.

export type OpacityOption =
  | '0' //0% - Fully transparent.
  | '5' //5% - Almost fully transparent.
  | '10' //10% - Very transparent.
  | '15' //15% - Highly transparent.
  | '20' //20% - Quite transparent.
  | '25' //25% - Quarter transparent.
  | '30' //30% - Moderately transparent.
  | '35' //35% - Moderately transparent.
  | '40' //40% - Less transparent.
  | '45' //45% - Less transparent.
  | '50' //50% - Half transparent.
  | '55' //55% - More opaque.
  | '60' //60% - More opaque.
  | '65' //65% - Mostly opaque.
  | '70' //70% - Mostly opaque.
  | '75' //75% - Three quarters opaque.
  | '80' //80% - Nearly opaque.
  | '90' //90% - Very nearly opaque.
  | '95' //95% - Almost fully opaque.
  | '100'; //100% - Fully opaque.

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type TextSize = Size;
export type ButtonSize = TextSize;
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
  colorTone?: ColorTone;
  fontFamily?: string;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  leading?: Leading;
  className?: string;
  classOverride?: string;
  border?: TextSize;
  borderColor?: ThemeColor;
  listType?: ListType;
  listPosition?: ListPosition;
  styleOverride?: TextStylesOverride;
};

export type DefaultTextComponentStyles = {
  textSize: TextSize;
  textAlign: TextAlign;
  textColor: ThemeColor;
  colorTone: ColorTone;
  fontFamily?: string; // Optional font family
  fontWeight: FontWeight;
  fontStyle: FontStyle;
  border?: TextSize; // Optional border style
  borderColor?: ThemeColor; // Optional border color
  listType?: ListType; // Optional list type
  listPosition?: ListPosition; // Optional list position
};

export type DefaultStyles = {
  // colorTone: ColorTone;
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
        leading: Record<TextSize, string>;
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

export type spacingStyles = {
  line: Record<Size, string>;
  verticalLineGap: Record<Size, string>;
  section: Record<Size, string>;
  containerPadding: string;
};

export type StyleGuide = {
  defaultStyles: DefaultStyles;
  bgColor: Record<ThemeColor, Record<ColorTone, string>>;
  bgColorHover: Record<ThemeColor, Record<ColorTone, string>>;
  borderColorHover: Record<ThemeColor, Record<ColorTone, string>>;
  borderColor: Record<ThemeColor, Record<ColorTone, string>>;
  textColorHover: Record<ThemeColor, Record<ColorTone, string>>;
  textColor: Record<ThemeColor, Record<ColorTone, string>>;
  fontWeight: Record<FontWeight, string>;
  fontStyle: Record<FontStyle, string>;
  leading: Record<Leading, string>;
  componentStyles: ComponentStyles;
  listType: Record<ListType, string>;
  listPosition: Record<ListPosition, string>;
  rounding: Record<RoundingSize, string>;
  spacing: spacingStyles;
  opacity: Record<OpacityOption, string>;
  bgOpacity: Record<OpacityOption, string>;
};
