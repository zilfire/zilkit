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

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type classNamesBySize = string | Partial<Record<TextSize | 'default', string>>;

export type StyleGroupClassNames = Partial<Record<TextStyleGroup, classNamesBySize>>;

export type TextVariantStyle = {
  default: StyleGroupClassNames;
  elements?: Partial<Record<TextComponent, StyleGroupClassNames>>;
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
