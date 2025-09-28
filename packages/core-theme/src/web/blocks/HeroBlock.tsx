import type { HeroBlockData } from '../../types/sanity-data-types/blocks/index.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import type { ThemeColor, ColorTone, OpacityOption, Size } from '../../types/style-types/index.js';
import { H1, P } from '../text/index.js';
import SanityImage from '@zilfire/next-sanity-image';
import { Button } from '../components/Button.js';
import { styleGuide } from '../style/style-guide.js';
import clsx from 'clsx';
import { getBGColorClass, getOpacityClass } from '../style/utils.js';
import { Container } from '../components/index.js';

type OverlayOptions = {
  themeColor?: ThemeColor;
  colorTone?: ColorTone;
  opacity?: OpacityOption;
};

type SectionOptions = {
  sectionSpacing?: Size;
};

export type HeroBlockOptions = {
  overlayOptions?: OverlayOptions;
  sectionOptions?: SectionOptions;
};

export type HeroBlockProps = {
  data: HeroBlockData;
  context: ThemeContext;
  options?: HeroBlockOptions;
};

const defaultOverlayColor = 'black';
const defaultOverlayTone = 'medium';
const defaultOverlayOpacity = 'shade';
const defaultSectionSpacing = 'xxl';

export const HeroBlock: React.FC<HeroBlockProps> = ({ data, context, options }) => {
  const { sanityConfig } = context;
  const { heading, description, backgroundImage, primaryButton } = data;
  const { overlayOptions = {}, sectionOptions = {} }: HeroBlockOptions = options || {};
  const {
    themeColor: overlayThemeColor = defaultOverlayColor,
    colorTone: overlayColorTone = defaultOverlayTone,
  } = overlayOptions;

  const sectionSpacing = sectionOptions.sectionSpacing || defaultSectionSpacing;
  const sectionSpacingClass = styleGuide.spacing.section[sectionSpacing];

  const overlayOpacity = overlayOptions.opacity ? overlayOptions.opacity : defaultOverlayOpacity;
  const overlayOpacityClass = getOpacityClass(overlayOpacity, styleGuide);

  console.log('overlay', overlayOptions);
  console.log('defaultOverlayOpacity', defaultOverlayOpacity);

  const overlayBgClass = getBGColorClass(overlayThemeColor, overlayColorTone, styleGuide);

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
      {backgroundImage && (
        <div className={clsx('absolute inset-0 z-5', overlayOpacityClass, overlayBgClass)}></div>
      )}
      <Container className={clsx('relative', sectionSpacingClass)}>
        <div className="lg:w-1/2 w-full">
          <H1 textSize="lg" textColor="white" styleOverride={[]} colorTone="medium">
            {heading}
          </H1>
          <P textSize="lg" styleOverride={[]} textColor="white">
            {description}
          </P>
          <div className="lg:text-left text-center">
            {primaryButton && (
              <Button
                context={context}
                data={primaryButton!}
                options={{
                  backgroundColor: 'primary',
                  colorTone: 'medium',
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
      </Container>
    </div>
  );
};
