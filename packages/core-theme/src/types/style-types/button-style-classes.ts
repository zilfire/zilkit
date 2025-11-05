export type ButtonSize = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ButtonColorClassCategory =
  | 'backgroundColor'
  | 'backgroundOpacity'
  | 'textColor'
  | 'borderColor';

export type ButtonSizeClassCategory =
  | 'paddingY'
  | 'paddingX'
  | 'fontSize'
  | 'fontWeight'
  | 'rounding';

export type ButtonStyleClassCategory = ButtonColorClassCategory | ButtonSizeClassCategory;

export type ButtonClassOverride = Partial<Record<ButtonStyleClassCategory, string>> | string;

export interface ButtonColorStyleClassCategories {
  backgroundColor?: string;
  backgroundOpacity?: string;
  textColor?: string;
  borderColor?: string;
}

export interface ButtonSizeStyleClassCategories {
  paddingY?: string;
  paddingX?: string;
  fontSize?: string;
  fontWeight?: string;
  rounding?: string;
}

export type ButtonStyleClassCategories = ButtonColorStyleClassCategories &
  ButtonSizeStyleClassCategories;

export interface ButtonVariantStyle {
  base: ButtonStyleClassCategories;
  colors?: Partial<Record<string, ButtonColorStyleClassCategories>>;
  sizes?: Partial<Record<ButtonSize, ButtonSizeStyleClassCategories>>;
}

export interface ButtonClassNames {
  style: {
    normal: ButtonVariantStyle;
    variants?: Partial<Record<Exclude<string, 'normal'>, ButtonVariantStyle>>;
  };
}
