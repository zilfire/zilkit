export type SectionVerticalSpacingSize = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type SectionClassNames = {
  sectionVerticalSpacing: { base: string } & Partial<
    Record<Exclude<SectionVerticalSpacingSize, 'base'>, string>
  >;
};
