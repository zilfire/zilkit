export type LayoutSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ContentWidth = 'full' | 'wide' | 'normal' | 'narrow' | 'xs';

export type GapSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ZIndexLayer = 'background' | 'overlay' | 'content' | 'dropdown' | 'modal' | 'tooltip';

export interface LayoutClassNames {
  verticalSectionSpacing: Partial<Record<LayoutSize, string>>;
  verticalLineSpacing: Partial<Record<LayoutSize, string>>;
  structure: {
    container: string;
    containerXPadding: string | Partial<Record<LayoutSize, string>>;
  };
  contentMaxWidth: Partial<Record<ContentWidth, string>>;
  horizontalGapSpacing: Partial<Record<GapSpacing, string>>;
  verticalGapSpacing: Partial<Record<GapSpacing, string>>;
  zIndex: Partial<Record<ZIndexLayer, string>>;
  gapSpacing: Partial<Record<GapSpacing, string>>;
}
