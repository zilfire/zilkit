import clsx from 'clsx';
import { ThemeColor, ColorTone, OpacityOption } from '../../deprecated/types/style-types/index.js';
import { styleGuide } from '../../deprecated/web/style/style-guide.js';
// import { getBGColorClass, getOpacityClass } from '../style/style-utils.js';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import type { ThemeContext } from '../../types/context-types/index.js';
import SanityImage from '@zilfire/next-sanity-image';
import { Container } from './Container.js';
import type { ContainerOptions } from './Container.js';

export type { ContainerOptions };

export type SectionOptions = {
  sectionBGColor?: ThemeColor;
  sectionBGColorTone?: ColorTone;
  sectionClassName?: string;
  sectionClassOverride?: boolean;
};

export type OverlayOptions = {
  overlayColor?: ThemeColor;
  overlayColorTone?: ColorTone;
  overlayOpacity?: OpacityOption;
  overlayClassName?: string;
  overlayClassOverride?: boolean;
};

export type BackgroundImageOptions = {
  imageSizes?: string | number[];
  quality?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
};

export type SectionProps = {
  children?: React.ReactNode;
  sectionOptions?: SectionOptions;
  containerOptions?: ContainerOptions;
  overlayOptions?: OverlayOptions;
  backgroundImageOptions?: BackgroundImageOptions;
  backgroundImage?: SanityImageWithAlt;
  themeContext: ThemeContext;
};

const defaultBGColorTone: ColorTone = '500';
const defaultClassName = 'relative overflow-hidden';
const defaultOverlayColorTone: ColorTone = '500';
const defaultOverlayOpacity: OpacityOption = '50';

export const DeprSection: React.FC<SectionProps> = ({
  children,
  sectionOptions,
  containerOptions,
  overlayOptions,
  backgroundImageOptions,
  backgroundImage,
  themeContext,
}) => {
  const {
    sectionBGColor,
    sectionBGColorTone = defaultBGColorTone,
    sectionClassName,
    sectionClassOverride,
  } = sectionOptions || {};
  const bgClass = false;

  // const bgClass = sectionBGColor
  //   ? getBGColorClass(sectionBGColor, sectionBGColorTone, styleGuide)
  //   : false;

  const {
    overlayColor,
    overlayColorTone = defaultOverlayColorTone,
    overlayOpacity = defaultOverlayOpacity,
    overlayClassName,
    overlayClassOverride,
  } = overlayOptions || {};

  const overlayOpacityClass = false;
  const overlayBgClass = false;

  // const overlayOpacityClass = overlayColor ? getOpacityClass(overlayOpacity, styleGuide) : false;
  // const overlayBgClass = overlayColor
  //   ? getBGColorClass(overlayColor, overlayColorTone, styleGuide)
  //   : false;

  const { imageSizes, quality, priority, onLoad, onError, loading } = backgroundImageOptions || {};

  const { sanityConfig } = themeContext;

  console.log('containerOptions', containerOptions);
  const newClassName = 'py-30 px-4 md:px-40 lg:px-48';

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
      <div
        className={
          overlayClassOverride === true
            ? overlayClassName
            : clsx(
                'absolute inset-0 z-5',
                overlayOpacityClass,
                overlayBgClass,
                overlayClassName,
                newClassName
              )
        }
      ></div>
      <Container options={containerOptions} className="relative z-10">
        {children}
      </Container>
    </section>
  );
};
