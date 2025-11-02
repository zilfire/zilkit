import clsx from 'clsx';
import type { ThemeContext } from '../../types/context-types/index.js';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import SanityImage from '@zilfire/next-sanity-image';

interface SectionProps {
  className?: string;
  children?: React.ReactNode;
  classOverride?: string;
  context?: ThemeContext;
}

export type SectionBackgroundImageOptions = {
  imageSizes?: string | number[];
  quality?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
};

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

export const Section: React.FC<SectionProps> = ({ className, children, classOverride }) => {
  return (
    <section className={classOverride ? classOverride : clsx('relative', className)}>
      {children}
    </section>
  );
};

export default Section;
