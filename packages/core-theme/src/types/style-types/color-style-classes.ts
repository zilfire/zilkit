export type ThemeColor = 'black' | 'white' | 'muted' | 'primary' | string;
export type BackgroundColor = ThemeColor;
export type BorderColor = ThemeColor;
export type TextColor = ThemeColor;

export type BackgroundColors = { black: string; white: string; muted: string } & Record<
  ThemeColor,
  string
>;

export interface ColorClassNames {
  backgroundColors?: { black: string; white: string; muted: string; primary: string } & Partial<
    Record<ThemeColor, string>
  >;
  borderColors: { black: string; white: string; muted: string; primary: string } & Partial<
    Record<ThemeColor, string>
  >;
  textColors?: { black: string; white: string; muted: string; primary: string } & Partial<
    Record<ThemeColor, string>
  >;
}
