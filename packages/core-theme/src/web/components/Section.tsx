'use client';
import clsx from 'clsx';
import {
  getSectionVerticalSpacingClass,
  getContentMaxWidthClass,
} from '../style/utils/layout-style-utils.js';
import { getBackgroundColorClass } from '../style/utils/background-style-utils.js';
import type { ThemeContext } from '../../config/context.js';
import type { ThemeColor } from '../style/types/style.types.js';
import type { LayoutSize, ContentWidth } from '../style/types/layout-style.types.js';
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

export interface SectionStyleOptions {
  backgroundColor?: ThemeColor;
  verticalSpacing?: LayoutSize;
}

export type SectionElement = 'section' | 'div' | 'article' | 'header' | 'footer' | 'main';

export interface SectionOptions {
  styleOptions?: SectionStyleOptions;
  className?: string;
  classOverride?: string;
  id?: string;
  container?: boolean;
  as?: SectionElement;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export interface SectionProps extends SectionOptions {
  children?: React.ReactNode;
  context?: ThemeContext;
}

export interface SectionContentOptions {
  className?: string;
  classOverride?: string;
  maxWidth?: ContentWidth;
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
  const maxWidthClass = options?.maxWidth ? getContentMaxWidthClass(options.maxWidth) : '';

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
  // backgroundColor,
  className,
  classOverride,
  id,
  container = true,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  styleOptions: { backgroundColor, verticalSpacing = DEFAULT_VERTICAL_SPACING } = {},
}: SectionProps): React.ReactElement => {
  const spacingClass = getSectionVerticalSpacingClass(verticalSpacing);
  const bgColorClass = backgroundColor ? getBackgroundColorClass(backgroundColor) : '';

  const sectionClasses = getClassName(
    classOverride,
    clsx('relative', spacingClass, bgColorClass),
    className
  );

  return (
    <Component
      id={id}
      className={sectionClasses}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {container ? <Container>{children}</Container> : children}
    </Component>
  );
};

export default Section;
