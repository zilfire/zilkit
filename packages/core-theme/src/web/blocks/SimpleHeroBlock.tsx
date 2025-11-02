import type { HeroBlockData } from '../../types/sanity-data-types/blocks/index.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import { PortableText } from 'next-sanity';
import { textComponents } from '../text/text-components.js';
import SanityImage from '@zilfire/next-sanity-image';
import clsx from 'clsx';

export type BackgroundImageOptions = {
  imageSizes?: string | number[];
  quality?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
};

// const sectionSpacingXS = 'py-10 md:py-18 lg:py-24';
// const sectionSpacingSM = 'py-16 md:py-24 lg:py-32';
// const sectionSpacingMD = 'py-20 md:py-32 lg:py-36';
// const sectionSpacingLG = 'py-24 md:py-36 lg:py-40';
const sectionSpacingXL = 'py-32 md:py-40 lg:py-48';
// const sectionSpacingxxl = 'py-40 md:py-64 lg:py-72';

export const SimpleHeroBlockHeading = ({ data }: { data: HeroBlockData }) => {
  return <h1>{data.heading}</h1>;
};

export const SimpleHeroBlockDescription = ({
  data,
  context,
}: {
  data: HeroBlockData;
  context: ThemeContext;
}) => {
  const { description } = data;
  return (
    <>
      {description && <PortableText value={description} components={textComponents({}, context)} />}
    </>
  );
};

export const SimpleHeroSection = ({
  children,
  className,
  classOverride,
}: {
  data?: HeroBlockData;
  children?: React.ReactNode;
  className?: string;
  classOverride?: string;
}) => {
  // const { heading, description, backgroundImage, primaryButton, secondaryButton } = data;

  return <section className={clsx(classOverride ?? `relative`, className)}>{children}</section>;
};

export const SimpleHeroBGImage = ({
  data,
  context,
  options,
}: {
  data: HeroBlockData;
  context: ThemeContext;
  options?: BackgroundImageOptions;
}) => {
  const { backgroundImage } = data || {};
  const { sanityConfig } = context;
  const { imageSizes, quality, priority, onLoad, onError, loading } = options || {};

  if (!backgroundImage) return null;
  return (
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
  );
};

export const SimpleHeroOverlay = ({}) => {
  return <div className={clsx('absolute inset-0 z-5 bg-black opacity-30')}></div>;
};

export const SimpleHeroContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={clsx('relative z-10 container mx-auto', sectionSpacingXL)}>{children}</div>
  );
};

export const SimpleHeroBlock = ({
  data,
  context,
}: {
  data: HeroBlockData;
  context: ThemeContext;
}) => {
  return (
    <SimpleHeroSection data={data}>
      <SimpleHeroBGImage data={data} context={context} />
      <SimpleHeroOverlay />
      <SimpleHeroContainer>
        <SimpleHeroBlockHeading data={data} />
        <SimpleHeroBlockDescription data={data} context={context} />
      </SimpleHeroContainer>
    </SimpleHeroSection>
  );
};
