export type SectionVerticalSpacingSize = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type BackgroundColor = string;

export type BackgroundColors = { black: string; white: string; muted: string } & Record<
  BackgroundColor,
  string
>;

export interface SectionClassNames {
  sectionVerticalSpacing: { base: string } & Partial<
    Record<Exclude<SectionVerticalSpacingSize, 'base'>, string>
  >;
  backgroundColors: { black: string; white: string; muted: string } & Record<
    BackgroundColor,
    string
  >;
}
