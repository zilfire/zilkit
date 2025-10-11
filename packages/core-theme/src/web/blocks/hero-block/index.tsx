import type { HeroBlockData } from '../../../types/sanity-data-types/blocks/index.js';
import type { ThemeContext } from '../../../types/context-types/index.js';
import type {
  ThemeColor,
  ColorTone,
  OpacityOption,
  Size,
  FontWeight,
} from '../../../types/style-types/index.js';
import { H1, P } from '../../text/index.js';
import { Button } from '../../components/Button.js';
import { styleGuide } from '../../style/style-guide.js';
import clsx from 'clsx';
// import type { ContainerOptions } from '../../components/Container.js';
import { Section } from '../../components/Section.js';
import type {
  SectionOptions,
  OverlayOptions,
  BackgroundImageOptions,
  ContainerOptions,
} from '../../components/Section.js';

export type HeroContentAlignment = 'left' | 'center' | 'responsive';

export type HeroContentOptions = {
  contentGap?: Size;
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

export type HeroBlockProps = {
  data: HeroBlockData;
  context: ThemeContext;
  overlayOptions?: OverlayOptions;
  sectionOptions?: SectionOptions;
  containerOptions?: ContainerOptions;
  backgroundImageOptions?: BackgroundImageOptions;
  contentOptions?: HeroContentOptions;
  buttonOptions?: HeroButtonOptions;
};

const defaultOverlayColor: ThemeColor = 'black';
const defaultOverlayTone: ColorTone = '500';
const defaultOverlayOpacity: OpacityOption = '50';

const defaultContainerVerticalPadding: Size = 'xl';

const defaultContentGap: Size = 'xl';
const defaultContentAlignment: HeroContentAlignment = 'responsive';

const defaultHeadlineTextSize: Size = 'lg';
const defaultHeadlineColor: ThemeColor = 'white';
const defaultHeadlineColorTone: ColorTone = '500';

const defaultDescriptionTextSize: Size = 'lg';
const defaultDescriptionColor: ThemeColor = 'white';
const defaultDescriptionColorTone: ColorTone = '700';

const defaultPrimaryButtonBackgroundColor: ThemeColor = 'primary';
const defaultPrimaryButtonBackgroundColorTone: ColorTone = '500';
const defaultPrimaryButtonTextColor: ThemeColor = 'black';
const defaultPrimaryButtonTextColorTone: ColorTone = '500';
const defaultPrimaryButtonSize: Size = 'lg';
const defaultPrimaryButtonFontWeight: FontWeight = 'medium';
const defaultBGImageSizes = [600, 900, 1200, 1800, 2400];
const defaultBGImageQuality = 80;
const defaultBGImagePriority = true;

export const HeroBlock: React.FC<HeroBlockProps> = ({
  data,
  context,
  sectionOptions = {},
  overlayOptions = {},
  backgroundImageOptions = {},
  containerOptions = {},
  contentOptions = {},
  buttonOptions = {},
}) => {
  const { heading, description, backgroundImage, primaryButton } = data;

  // Set default overlay options if not provided
  overlayOptions.overlayColor = overlayOptions.overlayColor || defaultOverlayColor;
  overlayOptions.overlayColorTone = overlayOptions.overlayColorTone || defaultOverlayTone;
  overlayOptions.overlayOpacity = overlayOptions.overlayOpacity || defaultOverlayOpacity;

  // Set default background image options if not provided
  backgroundImageOptions.imageSizes = backgroundImageOptions.imageSizes || defaultBGImageSizes;
  backgroundImageOptions.quality = backgroundImageOptions.quality || defaultBGImageQuality;
  backgroundImageOptions.priority =
    backgroundImageOptions.priority !== undefined
      ? backgroundImageOptions.priority
      : defaultBGImagePriority;

  // Set default container options if not provided
  containerOptions.verticalPadding =
    containerOptions.verticalPadding || defaultContainerVerticalPadding;

  const {
    contentGap = defaultContentGap,
    headlineTextSize = defaultHeadlineTextSize,
    headlineColor = defaultHeadlineColor,
    headlineColorTone = defaultHeadlineColorTone,
    descriptionTextSize = defaultDescriptionTextSize,
    descriptionColor = defaultDescriptionColor,
    descriptionColorTone = defaultDescriptionColorTone,
    contentAlignment = defaultContentAlignment,
  } = contentOptions;

  const contentGapClass = styleGuide.spacing.verticalLineGap[contentGap];

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
    <Section
      themeContext={context}
      backgroundImage={backgroundImage}
      backgroundImageOptions={backgroundImageOptions}
      sectionOptions={sectionOptions}
      overlayOptions={overlayOptions}
      containerOptions={containerOptions}
    >
      <div className={clsx('w-full lg:w-2/3 xl:w-1/2 flex flex-col', contentGapClass)}>
        <H1
          textSize={headlineTextSize}
          textColor={headlineColor}
          styleOverride={['spacing']}
          colorTone={headlineColorTone}
          className={clsx(alignmentClass)}
        >
          {heading}
        </H1>
        <P
          textSize={descriptionTextSize}
          styleOverride={['spacing']}
          textColor={descriptionColor}
          colorTone={descriptionColorTone}
          className={clsx(alignmentClass)}
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
    </Section>
  );
};
