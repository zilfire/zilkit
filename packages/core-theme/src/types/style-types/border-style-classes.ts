import type { ThemeColor } from './style-class-names.js';

export type BorderColor = ThemeColor;
export type BorderColors = {
  black: string;
  white: string;
  muted: string;
  primary: string;
} & Partial<Record<ThemeColor, string>>;

export type BorderThickness = 'thin' | 'medium' | 'thick';
export type BorderEdge = 'top' | 'right' | 'bottom' | 'left' | 'all';
export type BorderEdges = Partial<Record<BorderEdge, Partial<Record<BorderThickness, string>>>>;

export interface BorderClassNames {
  color: BorderColors;
  edge: BorderEdges;
}
