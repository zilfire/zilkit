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

export type TextEmphasis = 'italic' | 'bold' | TextLineDecoration;

export type TextLineDecoration = 'underline' | 'strikethrough' | 'overline';

export type TextStyleGroup =
  | 'textSize'
  | 'textAlign'
  | 'textColor'
  | 'leading'
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

export type TextClassOverrides = Partial<Record<TextStyleGroup, string>> | string;

export type TextSize = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ElementStyle = Partial<Record<TextStyleGroup, string>>;

export type TextSizeStyle = {
  default?: ElementStyle;
  elements?: Partial<Record<TextComponent, ElementStyle>>;
};

export type TextVariantStyle = {
  base?: TextSizeStyle;
} & {
  [key in TextSize]?: TextSizeStyle;
};

export type TextClassNames = {
  emphasis?: {
    bold?: string;
    italic?: string;
    underline?: string;
    strikethrough?: string;
    overline?: string;
  };
  color?: Partial<Record<string, string>>;
  style: {
    normal: TextVariantStyle;
    variants?: {
      [key: Exclude<string, 'normal'>]: TextVariantStyle;
    };
  };
};
