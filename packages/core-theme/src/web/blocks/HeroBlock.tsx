import type { HeroBlockData } from '../../types/sanity-data-types/blocks/index.js';
import type { ThemeContext } from '../../types/context/index.js';
import { H1, P } from '../text/index.js';
import SanityImage from '@zilfire/next-sanity-image';
import { Button } from '../components/Button.js';
import { styleGuide } from '../style/style-guide.js';
import clsx from 'clsx';

export type HeroBlockProps = {
  data: HeroBlockData;
  context: ThemeContext;
};

const textBlockSpacing = styleGuide.spacing.line.lg;
const sectionPadding = styleGuide.spacing.section.xl;

export const HeroBlock: React.FC<HeroBlockProps> = ({ data, context }) => {
  const { sanityConfig } = context;
  const { heading, description, backgroundImage, primaryButton } = data;
  console.log('HeroBlock data:', data);
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
      {backgroundImage && <div className="absolute inset-0 bg-black opacity-30 z-5"></div>}
      <div
        className={clsx('container mx-auto text-center lg:text-left z-10 relative', sectionPadding)}
      >
        <div className="lg:w-1/2 w-full">
          <H1
            textSize="lg"
            textColor="primary"
            styleOverride={['textAlign', 'spacing']}
            className={textBlockSpacing}
            colorShade="medium"
          >
            {heading}
          </H1>
          <P
            textSize="lg"
            styleOverride={['textAlign', 'spacing']}
            className={textBlockSpacing}
            textColor="white"
          >
            {description}
          </P>
          <div className="lg:text-left text-center">
            {primaryButton && (
              <Button
                context={context}
                data={primaryButton!}
                options={{
                  backgroundColor: 'primary',
                  colorShade: 'medium',
                  textColor: 'black',
                  fontWeight: 'medium',
                  size: 'lg',
                  rounding: 'sm',
                }}
              >
                Click me
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
