import type { HeroBlockData } from '../../sanity/data-types/blocks/index.js';
import SanityImage from '@zilfire/next-sanity-image';

type HeroBlockProps = {
  data: HeroBlockData;
};

export const sanityConfig = {
  sanityProjectId: '1b3whd1p',
  sanityDataset: 'production',
  sanityApiVersion: '2025-07-16',
  sanityUseCdn: true,
};

export const HeroBlock: React.FC<HeroBlockProps> = ({
  data: { heading, description, backgroundImage },
}) => {
  console.log('HeroBlock data:', { heading, description, backgroundImage });
  return (
    <div className="bg-gray-300 relative overflow-hidden">
      {backgroundImage && (
        <div className="absolute z-0 w-full h-full">
          <SanityImage
            imageObject={backgroundImage}
            alt={backgroundImage.alt || 'Hero Image'}
            sanityConfig={sanityConfig}
            layout="cover"
          />
        </div>
      )}
      {backgroundImage && <div className="absolute inset-0 bg-white opacity-50 z-5"></div>}
      <div className="container mx-auto px-4 py-20 text-center z-10 relative">
        <h2 className="text-4xl font-bold mb-4">{heading}</h2>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
};
