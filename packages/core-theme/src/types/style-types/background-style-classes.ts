import type { ThemeColor } from './style-class-names.js';

export type BackgroundColor = ThemeColor;

export type BackgroundColors = { black: string; white: string; muted: string } & Record<
  ThemeColor,
  string
>;

export interface BackgroundClassNames {
  backgroundColors?: { black: string; white: string; muted: string; primary: string } & Partial<
    Record<ThemeColor, string>
  >;
}
