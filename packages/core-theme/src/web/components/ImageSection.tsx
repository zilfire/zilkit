'use client';
import clsx from 'clsx';
import { getSectionVerticalSpacingClass } from '../style/utils/layout-style-utils.js';
import { getBackgroundColorClass } from '../style/utils/background-style-utils.js';
import { getContentMaxWidthClass } from '../style/utils/layout-style-utils.js';
import { getZIndexClass } from '../style/utils/layout-style-utils.js';
import type { ThemeContext } from '../../sanity/data-types/index.js';
import type { BackgroundColor } from '../style/types/background-style.types.js';
import type { LayoutSize, ContentWidth } from '../style/types/layout-style.types.js';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import SanityImage from '@zilfire/next-sanity-image';
import { Container } from './Container.js';
import { styleClassNames } from '../style/classes/style-classes.js';
import type React from 'react';
import Image from './Image.js';

// Constants
const DEFAULT_BACKGROUND_IMAGE_QUALITY = 80 as const;
const DEFAULT_BACKGROUND_IMAGE_LOADING = 'lazy' as const;
const DEFAULT_OVERLAY_OPACITY = 0.6 as const;
const DEFAULT_OVERLAY_COLOR = 'black' as const;
const DEFAULT_VERTICAL_SPACING = 'md' as const;

// Helper functions
const getClassName = (
  classOverride: string | undefined,
  defaultClasses: string,
  additionalClasses?: string
): string => {
  return classOverride || clsx(defaultClasses, additionalClasses);
};

const hasBackgroundImage = (
  data?: SectionBackgroundImageData
): data is Required<SectionBackgroundImageData> => {
  return Boolean(data?.backgroundImage);
};

export interface ImageSectionProps {
  as?: 'section' | 'div' | 'article' | 'header' | 'footer' | 'main';
  children?: React.ReactNode;
  context: ThemeContext;
  data?: SectionBackgroundImageData;
  className?: string;
  classOverride?: string;
  id?: string;
  container?: boolean;
  verticalSpacing?: LayoutSize;
  overlayOptions?: SectionBackgroundOverlayProps;
  contentOptions?: ImageSectionContentOptions;
  backgroundImageOptions?: SectionBackgroundImageOptions;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

interface SectionWrapperProps {
  as?: 'section' | 'div' | 'article' | 'header' | 'footer' | 'main';
  className?: string;
  children?: React.ReactNode;
  classOverride?: string;
  context: ThemeContext;
  verticalSpacing?: LayoutSize;
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

export interface ImageSectionContentOptions {
  className?: string;
  classOverride?: string;
  maxWidth?: ContentWidth;
}

export interface ImageSectionContentProps {
  options?: ImageSectionContentOptions;
  children?: React.ReactNode;
  context: ThemeContext;
}

export const SectionBackgroundImage = ({
  data,
  context,
  options,
}: SectionBackgroundImageProps): React.ReactElement | null => {
  const { backgroundImage } = data || {};
  const { sanityConfig } = context;
  const {
    imageSizes,
    quality = DEFAULT_BACKGROUND_IMAGE_QUALITY,
    priority = false,
    onLoad,
    onError,
    loading = DEFAULT_BACKGROUND_IMAGE_LOADING,
    className,
  } = options || {};

  if (!backgroundImage) return null;

  const zIndexClass = getZIndexClass('background', styleClassNames);

  return (
    <div className={clsx('absolute inset-0', zIndexClass, className)}>
      <Image
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

export const SectionWrapper = ({
  as: Component = 'section',
  className,
  children,
  classOverride,
  context,
  verticalSpacing = DEFAULT_VERTICAL_SPACING,
  id,
  container = true,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: SectionWrapperProps): React.ReactElement => {
  const spacingClass = getSectionVerticalSpacingClass(verticalSpacing, styleClassNames);

  return (
    <Component
      id={id}
      className={getClassName(classOverride, clsx('relative', spacingClass), className)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {container ? <Container context={context}>{children}</Container> : children}
    </Component>
  );
};

export const SectionBackgroundOverlay = ({
  color = DEFAULT_OVERLAY_COLOR,
  enabled = true,
  opacity = DEFAULT_OVERLAY_OPACITY,
  className,
  context,
}: SectionBackgroundOverlayProps): React.ReactElement | null => {
  if (!enabled) return null;

  const backgroundColorClass = getBackgroundColorClass(color, styleClassNames);
  const zIndexClass = getZIndexClass('overlay', styleClassNames);

  return (
    <div
      className={clsx(
        'absolute inset-0 w-full h-full',
        zIndexClass,
        backgroundColorClass,
        className
      )}
      style={{ opacity }}
    />
  );
};

// Combined background image and overlay component
const SectionBackground = ({
  data,
  context,
  backgroundImageOptions,
  overlayOptions,
}: {
  data?: SectionBackgroundImageData;
  context: ThemeContext;
  backgroundImageOptions?: SectionBackgroundImageOptions;
  overlayOptions?: SectionBackgroundOverlayProps;
}): React.ReactElement | null => {
  if (!hasBackgroundImage(data)) return null;

  return (
    <>
      <SectionBackgroundImage data={data} context={context} options={backgroundImageOptions} />
      <SectionBackgroundOverlay {...overlayOptions} context={context} />
    </>
  );
};

export const ImageSectionContent = ({
  options,
  children,
  context,
}: ImageSectionContentProps): React.ReactElement => {
  const maxWidthClass = options?.maxWidth
    ? getContentMaxWidthClass(options.maxWidth, styleClassNames)
    : '';
  const zIndexClass = getZIndexClass('content', styleClassNames);

  return (
    <div
      className={getClassName(
        options?.classOverride,
        clsx('relative', zIndexClass, maxWidthClass),
        options?.className
      )}
    >
      {children}
    </div>
  );
};

export const ImageSection = ({
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
}: ImageSectionProps): React.ReactElement => {
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
      <SectionBackground
        data={data}
        context={context}
        backgroundImageOptions={backgroundImageOptions}
        overlayOptions={overlayOptions}
      />
      <ImageSectionContent options={contentOptions} context={context}>
        {children}
      </ImageSectionContent>
    </SectionWrapper>
  );
};

export default ImageSection;
