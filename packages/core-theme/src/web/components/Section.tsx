import clsx from 'clsx';
import { ThemeColor, ColorTone, OpacityOption } from '../../types/style-types/index.js';
import { styleGuide } from '../style/style-guide.js';
import { getBGColorClass, getOpacityClass } from '../style/utils.js';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import type { ThemeContext } from '../../types/context-types/index.js';
import SanityImage from '@zilfire/next-sanity-image';

type SectionOptions = {
  sectionColor?: ThemeColor;
  sectionColorTone?: ColorTone;
  sectionClassName?: string;
  sectionClassOverride?: boolean;
};

type OverlayOptions = {
  overlayColor?: ThemeColor;
  overlayColorTone?: ColorTone;
  overlayOpacity?: OpacityOption;
};

type BackgroundImageOptions = {
  imageSizes?: string | number[];
  quality?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
};

export type HeroSectionProps = {
  children?: React.ReactNode;
  sectionOptions?: SectionOptions;
  overlayOptions?: OverlayOptions;
  backgroundImageOptions?: BackgroundImageOptions;
  backgroundImage?: SanityImageWithAlt;
  themeContext: ThemeContext;
};

const defaultBGColorTone: ColorTone = '500';
const defaultClassName = 'relative overflow-hidden';
const defaultOverlayColorTone: ColorTone = '500';
const defaultOverlayOpacity: OpacityOption = '50';

export const Section: React.FC<HeroSectionProps> = ({
  children,
  sectionOptions,
  overlayOptions,
  backgroundImageOptions,
  backgroundImage,
  themeContext,
}) => {
  const {
    sectionColor,
    sectionColorTone = defaultBGColorTone,
    sectionClassName,
    sectionClassOverride,
  } = sectionOptions || {};
  const bgClass = sectionColor
    ? getBGColorClass(sectionColor, sectionColorTone, styleGuide)
    : false;

  const {
    overlayColor,
    overlayColorTone = defaultOverlayColorTone,
    overlayOpacity = defaultOverlayOpacity,
  } = overlayOptions || {};

  const overlayOpacityClass = overlayColor ? getOpacityClass(overlayOpacity, styleGuide) : false;
  const overlayBgClass = overlayColor
    ? getBGColorClass(overlayColor, overlayColorTone, styleGuide)
    : false;

  const { imageSizes, quality, priority, onLoad, onError, loading } = backgroundImageOptions || {};

  const { sanityConfig } = themeContext;

  return (
    <section
      className={clsx(sectionClassOverride !== true && defaultClassName, sectionClassName, bgClass)}
    >
      {backgroundImage && (
        <div className="absolute z-0 w-full h-full">
          <SanityImage
            imageObject={backgroundImage}
            alt={backgroundImage.alt || 'Hero Image'}
            sanityConfig={sanityConfig}
            layout="cover"
            quality={quality}
            priority={priority || false}
            onLoad={onLoad}
            onError={onError}
            loading={loading}
            imageSizes={imageSizes}
          />
        </div>
      )}
      <div className={clsx('absolute inset-0 z-5', overlayOpacityClass, overlayBgClass)}></div>
      {children}
    </section>
  );
};
