import type { HeroBlockData } from '../../types/sanity-data-types/blocks/index.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import type {
  ThemeColor,
  ColorTone,
  OpacityOption,
  Size,
  FontWeight,
} from '../../types/style-types/index.js';
import { H1, P } from '../text/index.js';
import SanityImage from '@zilfire/next-sanity-image';
import { Button } from '../components/Button.js';
import { styleGuide } from '../style/style-guide.js';
import clsx from 'clsx';
import { getBGColorClass, getOpacityClass } from '../style/utils.js';
import { Container } from '../components/index.js';

export type HeroOverlayOptions = {
  overlayColor?: ThemeColor;
  overlayColorTone?: ColorTone;
  overlayOpacity?: OpacityOption;
};

export type HeroSectionOptions = {
  sectionSpacing?: Size;
  overlayColor?: ThemeColor;
  overlayColorTone?: ColorTone;
  overlayOpacity?: OpacityOption;
};

export type HeroContentAlignment = 'left' | 'center' | 'responsive';

export type HeroContentOptions = {
  contentSpacing?: Size;
  headlineTextSize?: Size;
  headlineColor?: ThemeColor;
  headlineColorTone?: ColorTone;
  descriptionTextSize?: Size;
  descriptionColor?: ThemeColor;
  descriptionColorTone?: ColorTone;
  contentAlignment?: HeroContentAlignment;
};

export type HeroButtonOptions = {
  primaryButtonBackgroundColor?: ThemeColor;
  primaryButtonBackgroundColorTone?: ColorTone;
  primaryButtonTextColor?: ThemeColor;
  primaryButtonTextColorTone?: ColorTone;
  primaryButtonSize?: Size;
  primaryButtonFontWeight?: FontWeight;
};

export type HeroBlockOptions = {
  overlayOptions?: HeroOverlayOptions;
  sectionOptions?: HeroSectionOptions;
  contentOptions?: HeroContentOptions;
  buttonOptions?: HeroButtonOptions;
};

export type HeroBlockProps = {
  data: HeroBlockData;
  context: ThemeContext;
  options?: HeroBlockOptions;
};

const defaultOverlayColor: ThemeColor = 'black';
const defaultOverlayTone: ColorTone = '500';
const defaultOverlayOpacity: OpacityOption = '50';
const defaultSectionSpacing: Size = 'xl';

const defaultContentSpacing: Size = 'xl';
const defaultHeadlineTextSize: Size = 'lg';
const defaultHeadlineColor: ThemeColor = 'white';
const defaultHeadlineColorTone: ColorTone = '500';
const defaultDescriptionTextSize: Size = 'lg';
const defaultDescriptionColor: ThemeColor = 'white';
const defaultDescriptionColorTone: ColorTone = '700';
const defaultContentAlignment: HeroContentAlignment = 'responsive';

const defaultPrimaryButtonBackgroundColor: ThemeColor = 'primary';
const defaultPrimaryButtonBackgroundColorTone: ColorTone = '500';
const defaultPrimaryButtonTextColor: ThemeColor = 'black';
const defaultPrimaryButtonTextColorTone: ColorTone = '500';
const defaultPrimaryButtonSize: Size = 'lg';
const defaultPrimaryButtonFontWeight: FontWeight = 'medium';

export const HeroBlock: React.FC<HeroBlockProps> = ({ data, context, options }) => {
  const { sanityConfig } = context;
  const { heading, description, backgroundImage, primaryButton } = data;
  const {
    overlayOptions = {},
    sectionOptions = {},
    contentOptions = {},
    buttonOptions = {},
  }: HeroBlockOptions = options || {};
  const {
    overlayColor = defaultOverlayColor,
    overlayColorTone = defaultOverlayTone,
    overlayOpacity = defaultOverlayOpacity,
  } = overlayOptions;
  const overlayOpacityClass = getOpacityClass(overlayOpacity, styleGuide);
  const overlayBgClass = getBGColorClass(overlayColor, overlayColorTone, styleGuide);

  const { sectionSpacing = defaultSectionSpacing } = sectionOptions;
  const sectionSpacingClass = styleGuide.spacing.section[sectionSpacing];

  const {
    contentSpacing = defaultContentSpacing,
    headlineTextSize = defaultHeadlineTextSize,
    headlineColor = defaultHeadlineColor,
    headlineColorTone = defaultHeadlineColorTone,
    descriptionTextSize = defaultDescriptionTextSize,
    descriptionColor = defaultDescriptionColor,
    descriptionColorTone = defaultDescriptionColorTone,
    contentAlignment = defaultContentAlignment,
  } = contentOptions;
  const contentSpacingClass = styleGuide.spacing.line[contentSpacing];

  const {
    primaryButtonBackgroundColor = defaultPrimaryButtonBackgroundColor,
    primaryButtonBackgroundColorTone = defaultPrimaryButtonBackgroundColorTone,
    primaryButtonTextColor = defaultPrimaryButtonTextColor,
    primaryButtonTextColorTone = defaultPrimaryButtonTextColorTone,
    primaryButtonSize = defaultPrimaryButtonSize,
    primaryButtonFontWeight = defaultPrimaryButtonFontWeight,
  } = buttonOptions;

  let alignmentClass: string;

  switch (contentAlignment) {
    case 'left':
      alignmentClass = 'text-left';
      break;
    case 'center':
      alignmentClass = 'text-center';
      break;
    case 'responsive':
    default:
      alignmentClass = 'text-center lg:text-left';
      break;
  }

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
        <div className="w-full lg:w-2/3 xl:w-1/2">
          <H1
            textSize={headlineTextSize}
            textColor={headlineColor}
            styleOverride={['spacing']}
            colorTone={headlineColorTone}
            className={clsx(contentSpacingClass, alignmentClass)}
          >
            {heading}
          </H1>
          <P
            textSize={descriptionTextSize}
            styleOverride={['spacing']}
            textColor={descriptionColor}
            colorTone={descriptionColorTone}
            className={clsx(contentSpacingClass, alignmentClass)}
          >
            {description}
          </P>
          <div className={clsx(alignmentClass)}>
            {primaryButton && (
              <Button
                context={context}
                data={primaryButton!}
                options={{
                  backgroundColor: primaryButtonBackgroundColor,
                  backgroundColorTone: primaryButtonBackgroundColorTone,
                  textColor: primaryButtonTextColor,
                  textColorTone: primaryButtonTextColorTone,
                  fontWeight: primaryButtonFontWeight,
                  size: primaryButtonSize,
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
