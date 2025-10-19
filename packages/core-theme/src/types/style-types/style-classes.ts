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
  | 'borderColor';

export type TextSize = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ElementStyle = Partial<Record<TextStyleGroup, string>>;

export type TextClassOverrides = TextStyleGroup | TextStyleGroup[] | 'all';

export type TextSizeStyle = {
  default?: ElementStyle;
  elements?: Partial<Record<TextComponent, ElementStyle>>;
};

export type TextVariantStyle = {
  base?: TextSizeStyle;
} & {
  [key in TextSize]?: TextSizeStyle;
};

export type StyleClassNames = {
  text: {
    normal: TextVariantStyle;
    variants?: {
      [key: Exclude<string, 'normal'>]: TextVariantStyle;
    };
  };
};
