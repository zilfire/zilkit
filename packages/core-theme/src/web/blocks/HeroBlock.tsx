import type { HeroBlockData } from '../../types/sanity-data-types/blocks/index.js';
import type { ThemeContext } from '../../types/context/index.js';
import { H1, P } from '../text/index.js';
import SanityImage from '@zilfire/next-sanity-image';
import { Button } from '../components/button/index.js';

export type HeroBlockProps = {
  data: HeroBlockData;
  context: ThemeContext;
};

export const HeroBlock: React.FC<HeroBlockProps> = ({
  data: { heading, description, backgroundImage },
  context: { sanityConfig },
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
      {backgroundImage && <div className="absolute inset-0 bg-white opacity-60 z-5"></div>}
      <div className="container mx-auto px-4 py-48 text-center z-10 relative">
        <div className="w-1/2">
          <H1 textSize="lg" textColor="primary" styleOverride={['textColor']}>
            {heading}
          </H1>
          <P textSize="lg">{description}</P>
          <div className="text-left">
            <Button
              path="/some-internal-path"
              options={{
                backgroundColor: 'primary',
                textColor: 'white',
                size: 'md',
                rounding: 'sm',
              }}
            >
              Click me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
