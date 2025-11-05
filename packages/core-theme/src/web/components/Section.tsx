import clsx from 'clsx';
import { getSectionVerticalSpacingClass } from '../style/style-utils.js';
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

/**
 * SectionBackgroundImage Component
 * Renders a full-bleed background image for sections using inset-0 positioning
 *
 * @example
 * ```tsx
 * <SectionBackgroundImage
 *   data={{ backgroundImage: sanityImageObject }}
 *   context={themeContext}
 *   options={{ quality: 90, priority: true }}
 * />
 * ```
 */
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

/**
 * SectionBackgroundOverlay Component
 * Renders a configurable overlay on top of background images
 *
 * @example
 * ```tsx
 * <SectionBackgroundOverlay
 *   opacity={0.4}
 *   color="blue"
 *   className="bg-gradient-to-r from-blue-900 to-purple-900"
 * />
 * ```
 */
export const SectionBackgroundOverlay: React.FC<SectionBackgroundOverlayProps> = ({
  enabled = true,
  opacity = 0.3,
  color = 'black',
  className,
}) => {
  if (!enabled) return null;

  return (
    <div className={clsx('absolute inset-0 z-5', className || `bg-${color}`)} style={{ opacity }} />
  );
};

/**
 * Section Component
 * A flexible section component with intelligent spacing and background image support
 *
 * Key Features:
 * - Automatic spacing management (applies to wrapper for normal sections, content for background sections)
 * - Full-bleed background images with optional overlays
 * - Semantic HTML element support
 * - Accessibility attributes
 * - Integration with theme vertical spacing system
 *
 * @example Basic section with spacing
 * ```tsx
 * <Section verticalSpacing="lg" context={themeContext}>
 *   <h2>My Section</h2>
 * </Section>
 * ```
 *
 * @example Section with background image
 * ```tsx
 * <Section
 *   verticalSpacing="xl"
 *   context={themeContext}
 *   data={{ backgroundImage: sanityImageObject }}
 *   overlayOptions={{ opacity: 0.4, color: 'black' }}
 * >
 *   <h2>Hero Section</h2>
 * </Section>
 * ```
 *
 * @example Semantic HTML
 * ```tsx
 * <Section as="article" id="main-content" aria-labelledby="heading">
 *   <h1 id="heading">Article Title</h1>
 * </Section>
 * ```
 */
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
      {data && (
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
