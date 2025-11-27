import type { ThemeColor } from './style.types.js';
import type { StyleOption, StyleOverride } from './style.types.js';

export type TextColor = ThemeColor;

export type TextVariant = string;

export type TextElement =
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

export type TextElementVariant = 'blockquote' | 'indent';

export type TextComponent = TextElement | TextElementVariant;

export type TextLineDecoration = 'underline' | 'strikethrough' | 'overline';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export type TextTransform = 'normal' | 'uppercase' | 'lowercase' | 'capitalize';

export type FontStyle = 'normal' | 'italic';

export type FontFamily = 'body' | 'heading' | string;

export type ListType = 'disc' | 'decimal' | string;

export type ListPosition = 'inside' | 'outside';

export type VerticalSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type HorizontalSpacing = string;

export type Border = string;

export type BorderColor = 'black' | 'white' | 'muted' | 'primary' | string;

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

export type TextStyleGroup =
  | 'textSize'
  | 'textAlign'
  | 'textColor'
  | 'textTransform'
  | 'fontWeight'
  | 'fontStyle'
  | 'fontFamily'
  | 'listType'
  | 'listPosition'
  | 'verticalSpacing'
  | 'horizontalSpacing'
  | 'border'
  | 'borderColor'
  | 'lineDecoration';

export interface TextStyleOptions {
  textSize?: StyleOption<TextSize>;
  textAlign?: StyleOption<TextAlign>;
  fontWeight?: StyleOption<FontWeight>;
  fontStyle?: StyleOption<FontStyle>;
  fontFamily?: StyleOption<FontFamily>;
  listType?: StyleOption<ListType>;
  listPosition?: StyleOption<ListPosition>;
  verticalSpacing?: StyleOption<VerticalSpacing>;
  horizontalSpacing?: StyleOption<HorizontalSpacing>;
  border?: StyleOption<Border>;
  borderColor?: StyleOption<BorderColor>;
  lineDecoration?: StyleOption<TextLineDecoration>;
  textColor?: StyleOption<TextColor>;
  textTransform?: StyleOption<TextTransform>;
}

// export type TextClassOverrides = Partial<Record<TextStyleGroup, string>> | string;

export type TextStyleOverride = StyleOverride<TextStyleGroup>;

export type TextSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl';

export type TextElementSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type classNamesBySize = string | Partial<Record<TextElementSize, string>>;

export type StyleGroupClassNames = Partial<Record<TextStyleGroup, classNamesBySize>>;

export type TextVariantStyle = {
  default: StyleGroupClassNames;
  elements?: Partial<Record<TextComponent, StyleGroupClassNames>>;
};

export type TextClassNames = {
  textSize?: Partial<Record<TextSize, string>>;
  textAlign?: Partial<Record<TextAlign, string>>;
  textColor?: { black: string; white: string; muted: string; primary: string } & Partial<
    Record<ThemeColor, string>
  >;
  fontWeight?: Partial<Record<FontWeight, string>>;
  fontStyle?: Partial<Record<FontStyle, string>>;
  fontFamily?: Partial<Record<FontFamily, string>>;
  listType?: Partial<Record<ListType, string>>;
  listPosition?: Partial<Record<ListPosition, string>>;
  verticalSpacing?: Partial<Record<VerticalSpacing, string>>;
  horizontalSpacing?: Partial<Record<HorizontalSpacing, string>>;
  lineDecoration?: Partial<Record<TextLineDecoration, string>>;
  border?: Partial<Record<Border, string>>;
  borderColor?: Partial<Record<BorderColor, string>>;
  textTransform?: Partial<Record<TextTransform, string>>;
  elementStyle: {
    normal: TextVariantStyle;
    variants?: {
      [key: Exclude<string, 'normal'>]: TextVariantStyle;
    };
  };
};
