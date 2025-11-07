'use client';
import clsx from 'clsx';
import { getSectionVerticalSpacingClass } from '../style/style-utils/text-style-utils.js';
import { getBackgroundColorClass } from '../style/style-utils/section-style-utils.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import type { BackgroundColor } from '../../types/style-types/section-style-classes.js';
import type { SectionVerticalSpacingSize } from '../../types/style-types/section-style-classes.js';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import SanityImage from '@zilfire/next-sanity-image';
import { Container } from './Container.js';

export interface SectionProps {
  as?: 'section' | 'div' | 'article' | 'header' | 'footer' | 'main';
  children?: React.ReactNode;
  context: ThemeContext;
  data?: SectionBackgroundImageData;
  className?: string;
  classOverride?: string;
  id?: string;
  container?: boolean;
  verticalSpacing?: SectionVerticalSpacingSize;
  overlayOptions?: SectionBackgroundOverlayProps;
  contentOptions?: SectionContentOptions;
  backgroundImageOptions?: SectionBackgroundImageOptions;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

interface SectionWrapperProps {
  as?: 'section' | 'div' | 'article' | 'header' | 'footer' | 'main';
  className?: string;
  children?: React.ReactNode;
  classOverride?: string;
  context?: ThemeContext;
  verticalSpacing?: SectionVerticalSpacingSize;
  id?: string;
  container?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

// @todo: update and export from next-sanity-image package
export interface SectionBackgroundImageOptions {
  imageSizes?: string | number[];
  quality?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
  className?: string;
}

interface SectionBackgroundOverlayProps {
  enabled?: boolean;
  opacity?: number;
  color?: BackgroundColor;
  className?: string;
  context: ThemeContext;
}

export interface SectionBackgroundImageData {
  backgroundImage?: SanityImageWithAlt;
}

export interface SectionBackgroundImageProps {
  data: SectionBackgroundImageData;
  context: ThemeContext;
  options?: SectionBackgroundImageOptions;
}

export interface SectionContentOptions {
  className?: string;
  classOverride?: string;
}

export interface SectionContentProps {
  options?: SectionContentOptions;
  children?: React.ReactNode;
}

export const SectionBackgroundImage: React.FC<SectionBackgroundImageProps> = ({
  data,
  context,
  options,
}) => {
  const { backgroundImage } = data || {};
  const { sanityConfig } = context;
  const {
    imageSizes,
    quality = 80,
    priority = false,
    onLoad,
    onError,
    loading = 'lazy',
    className,
  } = options || {};

  if (!backgroundImage) return null;

  return (
    <div className={clsx('absolute inset-0 z-0', className)}>
      <SanityImage
        imageObject={backgroundImage}
        alt={backgroundImage.alt || 'Background Image'}
        sanityConfig={sanityConfig}
        layout="cover"
        quality={quality}
        priority={priority}
        onLoad={onLoad}
        onError={onError}
        loading={loading}
        imageSizes={imageSizes}
      />
    </div>
  );
};

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  as: Component = 'section',
  className,
  children,
  classOverride,
  context,
  verticalSpacing = 'md',
  id,
  container = true,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}) => {
  const spacingClass =
    context && verticalSpacing
      ? getSectionVerticalSpacingClass(verticalSpacing, context.styleClasses)
      : '';

  return (
    <Component
      id={id}
      className={classOverride ? classOverride : clsx('relative', spacingClass, className)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {container ? <Container>{children}</Container> : children}
    </Component>
  );
};

export const SectionBackgroundOverlay: React.FC<SectionBackgroundOverlayProps> = ({
  color = 'black',
  enabled = true,
  opacity = 0.6,
  className,
  context,
}) => {
  if (!enabled) return null;

  const backgroundColorClass = getBackgroundColorClass(color, context.styleClasses);

  return (
    <div
      className={clsx('absolute inset-0 z-5 w-full h-full', backgroundColorClass, className)}
      style={{ opacity }}
    />
  );
};

export const SectionContent: React.FC<SectionContentProps> = ({ options, children }) => {
  const { className, classOverride } = options || {};
  return <div className={classOverride || clsx('relative z-10', className)}>{children}</div>;
};

export const Section: React.FC<SectionProps> = ({
  as = 'section',
  children,
  context,
  data,
  verticalSpacing,
  overlayOptions,
  className,
  classOverride,
  contentOptions,
  id,
  backgroundImageOptions,
  container = true,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}) => {
  const hasBackground = data?.backgroundImage;
  const spacingClass =
    context && verticalSpacing
      ? getSectionVerticalSpacingClass(verticalSpacing, context.styleClasses)
      : '';

  return (
    <SectionWrapper
      as={as}
      context={context}
      className={className}
      classOverride={classOverride}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      verticalSpacing={verticalSpacing}
      container={container}
    >
      {hasBackground && (
        <>
          <SectionBackgroundImage data={data} context={context} options={backgroundImageOptions} />
          <SectionBackgroundOverlay {...overlayOptions} context={context} />
        </>
      )}
      <SectionContent options={contentOptions}>{children}</SectionContent>
    </SectionWrapper>
  );
};

export default Section;
