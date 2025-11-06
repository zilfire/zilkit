import clsx from 'clsx';
import { getSectionVerticalSpacingClass } from '../style/style-utils/text-style-utils.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import type { SectionVerticalSpacingSize } from '../../types/style-types/section-style-classes.js';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import SanityImage from '@zilfire/next-sanity-image';

interface SectionProps {
  as?: 'section' | 'div' | 'article' | 'header' | 'footer' | 'main';
  children?: React.ReactNode;
  context: ThemeContext;
  data?: SectionBackgroundImageData;
  verticalSpacing?: SectionVerticalSpacingSize;
  overlayOptions?: SectionBackgroundOverlayProps;
  backgroundImageOptions?: SectionBackgroundImageOptions;
  className?: string;
  classOverride?: string;
  id?: string;
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
  color?: string;
  className?: string;
}

type SectionBackgroundImageData = {
  backgroundImage?: SanityImageWithAlt;
};

interface SectionBackgroundImageProps {
  data: SectionBackgroundImageData;
  context: ThemeContext;
  options?: SectionBackgroundImageOptions;
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
  verticalSpacing,
  id,
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
      {children}
    </Component>
  );
};

export const SectionBackgroundOverlay: React.FC<SectionBackgroundOverlayProps> = ({
  enabled = true,
  opacity = 0.6,
  className,
}) => {
  if (!enabled) return null;

  return (
    <div
      className={clsx('absolute inset-0 z-5 w-full h-full bg-black', className)}
      style={{ opacity }}
    />
  );
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
  id,
  backgroundImageOptions,
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
      // Only apply spacing to wrapper if no background image
      verticalSpacing={hasBackground ? undefined : verticalSpacing}
    >
      {data && hasBackground && (
        <SectionBackgroundImage data={data} context={context} options={backgroundImageOptions} />
      )}
      {hasBackground && <SectionBackgroundOverlay {...overlayOptions} />}
      <div
        className={clsx(
          'relative z-10',
          // Apply spacing to content if there's a background
          hasBackground ? spacingClass : undefined
        )}
      >
        {children}
      </div>
    </SectionWrapper>
  );
};

export default Section;
