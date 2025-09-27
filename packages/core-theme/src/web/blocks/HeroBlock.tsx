import type { HeroBlockData } from '../../types/sanity-data-types/blocks/index.js';
import type { ThemeContext } from '../../types/context/index.js';
import { H1, P } from '../text/index.js';
import SanityImage from '@zilfire/next-sanity-image';
import { Button } from '../components/Button.js';
import { styleGuide } from '../style/style-guide.js';
import clsx from 'clsx';
import type { ThemeColor, ColorTone, OpacityOption } from '../style/style-types.js';
import { getBGColorClass, getOpacityClass } from '../style/utils.js';

type OverlayOptions = {
  themeColor?: ThemeColor;
  colorTone?: ColorTone;
  opacity?: OpacityOption;
};

export type HeroBlockOptions = {
  overlayOptions?: OverlayOptions;
};

export type HeroBlockProps = {
  data: HeroBlockData;
  context: ThemeContext;
  options?: HeroBlockOptions;
};

const textBlockSpacing = styleGuide.spacing.line.lg;
const sectionPadding = styleGuide.spacing.section.xxl;

const defaultOverlayColor = 'black';
const defaultOverlayTone = 'medium';
const defaultOverlayOpacity = 'shade';

export const HeroBlock: React.FC<HeroBlockProps> = ({ data, context, options }) => {
  const { sanityConfig } = context;
  const { heading, description, backgroundImage, primaryButton } = data;
  const { overlayOptions = {} }: HeroBlockOptions = options || {};
  const {
    themeColor: overlayThemeColor = defaultOverlayColor,
    colorTone: overlayColorTone = defaultOverlayTone,
  } = overlayOptions;

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
      <div
        className={clsx('container mx-auto text-center lg:text-left z-10 relative', sectionPadding)}
      >
        <div className="lg:w-1/2 w-full">
          <H1
            textSize="lg"
            textColor="white"
            styleOverride={['spacing']}
            className={textBlockSpacing}
            colorTone="medium"
          >
            {heading}
          </H1>
          <P
            textSize="lg"
            styleOverride={['spacing']}
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
      </div>
    </div>
  );
};
