export type ButtonSize = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface ButtonColorStyleClasses {
  backgroundColor?: string;
  backgroundOpacity?: string;
  textColor?: string;
  borderColor?: string;
}

export interface ButtonSizeStyleClasses {
  paddingY?: string;
  paddingX?: string;
  fontSize?: string;
  fontWeight?: string;
  rounding?: string;
}

export type BaseStyleClasses = ButtonColorStyleClasses & ButtonSizeStyleClasses;

export interface ButtonVariantStyle {
  base: BaseStyleClasses;
  colors?: Partial<Record<string, ButtonColorStyleClasses>>;
  sizes?: Partial<Record<ButtonSize, ButtonSizeStyleClasses>>;
}

export interface ButtonClassNames {
  style: {
    normal: ButtonVariantStyle;
    variants?: Partial<Record<Exclude<string, 'normal'>, ButtonVariantStyle>>;
  };
}
