'use client';
import clsx from 'clsx';
import { getSectionVerticalSpacingClass } from '../style/style-utils/layout-style-utils.js';
import { getBackgroundColorClass } from '../style/style-utils/layout-style-utils.js';
import { getContentMaxWidthClass } from '../style/style-utils/layout-style-utils.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import type { BackgroundColor } from '../../types/style-types/layout-style-classes.js';
import type { LayoutSizeOption } from '../../types/style-types/layout-style-classes.js';
import type { ContentWidthOption } from '../../types/style-types/layout-style-classes.js';
import { Container } from './Container.js';
import type React from 'react';

// Constants
const DEFAULT_VERTICAL_SPACING = 'md' as const;

// Helper functions
const getClassName = (
  classOverride: string | undefined,
  defaultClasses: string,
  additionalClasses?: string
): string => {
  return classOverride || clsx(defaultClasses, additionalClasses);
};

export interface SectionProps {
  as?: 'section' | 'div' | 'article' | 'header' | 'footer' | 'main';
  children?: React.ReactNode;
  context: ThemeContext;
  backgroundColor?: BackgroundColor;
  className?: string;
  classOverride?: string;
  id?: string;
  container?: boolean;
  verticalSpacing?: LayoutSizeOption;
  contentOptions?: SectionContentOptions;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export interface SectionContentOptions {
  className?: string;
  classOverride?: string;
  maxWidth?: ContentWidthOption;
}

export interface SectionContentProps {
  options?: SectionContentOptions;
  children?: React.ReactNode;
  context: ThemeContext;
}

export const SectionContent = ({
  options,
  children,
  context,
}: SectionContentProps): React.ReactElement => {
  const { styleClasses } = context;
  const maxWidthClass = options?.maxWidth
    ? getContentMaxWidthClass(options.maxWidth, styleClasses)
    : '';

  return (
    <div
      className={getClassName(
        options?.classOverride,
        clsx('relative', maxWidthClass),
        options?.className
      )}
    >
      {children}
    </div>
  );
};

export const Section = ({
  as: Component = 'section',
  children,
  context,
  backgroundColor,
  className,
  classOverride,
  id,
  container = true,
  verticalSpacing = DEFAULT_VERTICAL_SPACING,
  contentOptions,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: SectionProps): React.ReactElement => {
  const { styleClasses } = context;
  const spacingClass = getSectionVerticalSpacingClass(verticalSpacing, styleClasses);
  const bgColorClass = backgroundColor
    ? getBackgroundColorClass(backgroundColor, styleClasses)
    : '';

  const sectionClasses = getClassName(
    classOverride,
    clsx('relative', spacingClass, bgColorClass),
    className
  );

  const content = contentOptions ? (
    <SectionContent options={contentOptions} context={context}>
      {children}
    </SectionContent>
  ) : (
    children
  );

  return (
    <Component
      id={id}
      className={sectionClasses}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {container ? <Container context={context}>{content}</Container> : content}
    </Component>
  );
};

export default Section;
