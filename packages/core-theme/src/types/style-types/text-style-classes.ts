import type { ThemeColor } from './style-class-names.js';

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

export type TextLineDecoration = 'none' | 'underline' | 'strikethrough' | 'overline';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export type FontStyle = 'normal' | 'italic';

export type FontFamily = 'body' | 'heading' | string;

export type ListType = 'disc' | 'none' | 'decimal' | string;

export type ListPosition = 'inside' | 'outside';

export type VerticalSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type HorizontalSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type BorderColor = ThemeColor;

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
  textSize?: TextSize;
  textAlign?: TextAlign;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  fontFamily?: FontFamily;
  listType?: ListType;
  listPosition?: ListPosition;
  verticalSpacing?: VerticalSpacing;
  lineDecoration?: TextLineDecoration | false;
  textColor?: TextColor | false;
}

export type TextClassOverrides = Partial<Record<TextStyleGroup, string>> | string;

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
  textSize: Partial<Record<TextSize, string>>;
  textAlign: Partial<Record<TextAlign, string>>;
  textColor: { black: string; white: string; muted: string; primary: string } & Partial<
    Record<ThemeColor, string>
  >;
  fontWeight: Partial<Record<FontWeight, string>>;
  fontStyle: Partial<Record<FontStyle, string>>;
  fontFamily: Partial<Record<FontFamily, string>>;
  listType: Partial<Record<ListType, string>>;
  listPosition: Partial<Record<ListPosition, string>>;
  verticalSpacing: Partial<Record<VerticalSpacing, string>>;
  horizontalSpacing: Partial<Record<HorizontalSpacing, string>>;
  lineDecoration: Partial<Record<TextLineDecoration, string>>;
  style: {
    normal: TextVariantStyle;
    variants?: {
      [key: Exclude<string, 'normal'>]: TextVariantStyle;
    };
  };
};
