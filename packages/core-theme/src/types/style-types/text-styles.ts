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
  | 'border';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ElementStyle = Partial<Record<TextStyleGroup, string>>;

export type TextSizeStyle = {
  default?: ElementStyle;
  elements?: Partial<Record<TextElement, ElementStyle>>;
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
