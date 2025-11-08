export type LayoutSizeOption = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ContentWidthOption = 'full' | 'wide' | 'normal' | 'narrow' | 'xs';

export type GapSpacingOption = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ZIndexLayer =
  | 'base'
  | 'background'
  | 'overlay'
  | 'content'
  | 'dropdown'
  | 'modal'
  | 'tooltip';

export interface LayoutClassNames {
  verticalSectionSpacing: { base: string } & Partial<
    Record<Exclude<LayoutSizeOption, 'base'>, string>
  >;

  verticalLineSpacing: { base: string } & Partial<
    Record<Exclude<LayoutSizeOption, 'base'>, string>
  >;
  containerPadding: { base: string } & Partial<Record<Exclude<LayoutSizeOption, 'base'>, string>>;
  contentMaxWidth: { base: string } & Partial<Record<Exclude<ContentWidthOption, 'base'>, string>>;
  horizontalGapSpacing: { base: string } & Partial<
    Record<Exclude<GapSpacingOption, 'base'>, string>
  >;
  verticalGapSpacing: { base: string } & Partial<Record<Exclude<GapSpacingOption, 'base'>, string>>;
  zIndex: { base: string } & Partial<Record<Exclude<ZIndexLayer, 'base'>, string>>;
}
