export type LayoutSizeOption = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ContentWidthOption = 'full' | 'wide' | 'normal' | 'narrow' | 'xs';

export type GapSpacingOption = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ColumnLayout = 'half' | 'third' | 'quarter' | 'twoThirds' | 'threeQuarters' | 'full';

export type ZIndexLayer = 'background' | 'overlay' | 'content' | 'dropdown' | 'modal' | 'tooltip';

export interface LayoutClassNames {
  verticalSectionSpacing: Partial<Record<LayoutSizeOption, string>>;

  verticalLineSpacing: Partial<Record<LayoutSizeOption, string>>;
  containerPadding: Partial<Record<LayoutSizeOption, string>>;
  contentMaxWidth: Partial<Record<ContentWidthOption, string>>;
  horizontalGapSpacing: Partial<Record<GapSpacingOption, string>>;
  verticalGapSpacing: Partial<Record<GapSpacingOption, string>>;
  zIndex: Partial<Record<ZIndexLayer, string>>;

  gapSpacing: Partial<Record<GapSpacingOption, string>>;

  columnLayout: Partial<Record<ColumnLayout, string>>;
}
