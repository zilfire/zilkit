import type { ThemeColor } from './style-class-names.js';

export type ButtonSize = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ButtonColorClassCategory = 'backgroundColor' | 'textColor' | 'borderColor';

export type ButtonSizeClassCategory =
  | 'paddingY'
  | 'paddingX'
  | 'fontSize'
  | 'fontWeight'
  | 'rounding'
  | 'verticalSpacing'
  | 'horizontalSpacing';

export type ButtonStyleClassCategory = 'pointer' | 'border';

export type ButtonClassCategory =
  | ButtonColorClassCategory
  | ButtonSizeClassCategory
  | ButtonStyleClassCategory;

export type ButtonClassOverride = Partial<Record<ButtonClassCategory, string>> | string;

export interface ButtonColorStyleClassCategories {
  backgroundColor?: ThemeColor;
  backgroundOpacity?: string;
  textColor?: ThemeColor;
  borderColor?: ThemeColor;
}

export interface ButtonSizeStyleClassCategories {
  paddingY?: string;
  paddingX?: string;
  fontSize?: string;
  fontWeight?: string;
  rounding?: string;
  verticalSpacing?: string;
  horizontalSpacing?: string;
}

export interface ButtonClassCategories {
  pointer?: string;
  border?: string;
}

export type ButtonStyleClassCategories = ButtonColorStyleClassCategories &
  ButtonSizeStyleClassCategories &
  ButtonClassCategories;

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
