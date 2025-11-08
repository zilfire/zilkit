export type LayoutSizeOption = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type BackgroundColor = string;

export type BackgroundColors = { black: string; white: string; muted: string } & Record<
  BackgroundColor,
  string
>;

export interface LayoutClassNames {
  verticalSectionSpacing: { base: string } & Partial<
    Record<Exclude<LayoutSizeOption, 'base'>, string>
  >;
  backgroundColors: { black: string; white: string; muted: string } & Record<
    BackgroundColor,
    string
  >;
  verticalLineSpacing: { base: string } & Partial<
    Record<Exclude<LayoutSizeOption, 'base'>, string>
  >;
}
