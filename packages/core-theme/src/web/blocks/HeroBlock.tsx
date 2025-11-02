import type { HeroBlockData } from '../../types/sanity-data-types/blocks/index.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import type {
  ThemeColor,
  ColorTone,
  Size,
  FontWeight,
  TextComponent,
  OpacityOption,
} from '../../deprecated/types/style-types/index.js';
// import { Text } from '../text/index.js';
// import type { TextComponentProps } from '../text/index.js';
import { Button } from '../components/Button.js';
import type { ButtonOptions, ButtonVariant } from '../components/Button.js';
import { styleGuide } from '../../deprecated/web/style/style-guide.js';
import clsx from 'clsx';
import { Section } from '../components/Section.js';
import type {
  SectionOptions,
  OverlayOptions,
  BackgroundImageOptions,
  ContainerOptions,
} from '../components/Section.js';
import { PortableText } from 'next-sanity';
import { textComponents } from '../text/text-components.js';

export { textComponents } from '../text/text-components.js';

export type HeroContentAlignment = 'left' | 'center' | 'responsive';

// export type HeadlineOptions = TextComponentProps;
// export type DescriptionOptions = TextComponentProps;
export type HeadlineOptions = {
  className?: string;
};
export type DescriptionOptions = {
  className?: string;
};

export type HeroContentOptions = {
  contentGap?: Size;
  headlineOptions?: HeadlineOptions;
  descriptionOptions?: DescriptionOptions;
  contentAlignment?: HeroContentAlignment;
  primaryButtonOptions?: ButtonOptions;
  secondaryButtonOptions?: ButtonOptions;
};

export type HeroBlockProps = {
  data: HeroBlockData;
  context: ThemeContext;
  overlayOptions?: OverlayOptions;
  sectionOptions?: SectionOptions;
  containerOptions?: ContainerOptions;
  backgroundImageOptions?: BackgroundImageOptions;
  contentOptions?: HeroContentOptions;
};

// Overlay Default Styles
const defaultOverlayColor: ThemeColor = 'black';
const defaultOverlayTone: ColorTone = '500';
const defaultOverlayOpacity: OpacityOption = '50';

// Container Default Styles
const defaultContainerVerticalPadding: Size = 'xl';

// Content Block Default Styles
const defaultContentGap: Size = 'xl';
const defaultContentAlignment: HeroContentAlignment = 'responsive';

// Headline Default Styles
const defaultHeadlineTextSize: Size = 'lg';
const defaultHeadlineColor: ThemeColor = 'white';
const defaultHeadlineColorTone: ColorTone = '500';
const defaultHeadlineTag: TextComponent = 'h1';

// Description Default Styles
const defaultDescriptionTextSize: Size = 'lg';
const defaultDescriptionColor: ThemeColor = 'white';
const defaultDescriptionColorTone: ColorTone = '700';

// Button Default Styles
const defaultPrimaryButtonVariant: ButtonVariant = 'solid';
const defaultPrimaryButtonBGOpacity: OpacityOption = '100';
const defaultPrimaryButtonBGColor: ThemeColor = 'primary';
const defaultPrimaryButtonBGColorTone: ColorTone = '500';
const defaultPrimaryButtonTextColor: ThemeColor = 'black';
const defaultPrimaryButtonTextColorTone: ColorTone = '500';
const defaultPrimaryButtonSize: Size = 'lg';
const defaultPrimaryButtonFontWeight: FontWeight = 'medium';

// Secondary Button Default Styles
const defaultSecondaryButtonVariant: ButtonVariant = 'outline';
const defaultSecondaryButtonBGOpacity: OpacityOption = '20';
const defaultSecondaryButtonBGColor: ThemeColor = 'black';
const defaultSecondaryButtonBGColorTone: ColorTone = '500';
const defaultSecondaryButtonTextColor: ThemeColor = 'primary';
const defaultSecondaryButtonTextColorTone: ColorTone = '500';
const defaultSecondaryButtonSize: Size = 'lg';
const defaultSecondaryButtonFontWeight: FontWeight = 'medium';

// Background Image Default Styles
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
}) => {
  const { heading, description, backgroundImage, primaryButton, secondaryButton } = data;
  const { primaryButtonOptions = {}, secondaryButtonOptions = {} } = contentOptions;

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

  // Set default description options if not provided
  const descriptionOptions = contentOptions.descriptionOptions || {};

  // descriptionOptions.textSize = descriptionOptions.textSize || defaultDescriptionTextSize;
  // descriptionOptions.textColor = descriptionOptions.textColor || defaultDescriptionColor;
  // descriptionOptions.colorTone = descriptionOptions.colorTone || defaultDescriptionColorTone;

  descriptionOptions.className = descriptionOptions.className
    ? clsx(descriptionOptions.className, 'last:mb-0')
    : 'last:mb-0';

  // Content Options
  const {
    contentGap = defaultContentGap,
    headlineOptions = {},
    contentAlignment = defaultContentAlignment,
  } = contentOptions;
  const contentGapClass = styleGuide.spacing.verticalLineGap[contentGap];

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

  // Set default headline options if not provided
  // headlineOptions.textSize = headlineOptions.textSize || defaultHeadlineTextSize;
  // headlineOptions.textColor = headlineOptions.textColor || defaultHeadlineColor;
  // headlineOptions.colorTone = headlineOptions.colorTone || defaultHeadlineColorTone;

  // Set Primary Button Default Options
  primaryButtonOptions.variant = primaryButtonOptions.variant || defaultPrimaryButtonVariant;
  primaryButtonOptions.bgOpacity = primaryButtonOptions.bgOpacity || defaultPrimaryButtonBGOpacity;
  primaryButtonOptions.bgColor = primaryButtonOptions.bgColor || defaultPrimaryButtonBGColor;
  primaryButtonOptions.bgColorTone =
    primaryButtonOptions.bgColorTone || defaultPrimaryButtonBGColorTone;
  primaryButtonOptions.textColor = primaryButtonOptions.textColor || defaultPrimaryButtonTextColor;
  primaryButtonOptions.textColorTone =
    primaryButtonOptions.textColorTone || defaultPrimaryButtonTextColorTone;
  primaryButtonOptions.size = primaryButtonOptions.size || defaultPrimaryButtonSize;
  primaryButtonOptions.fontWeight =
    primaryButtonOptions.fontWeight || defaultPrimaryButtonFontWeight;

  // Set Secondary Button Default Options
  secondaryButtonOptions.variant = secondaryButtonOptions.variant || defaultSecondaryButtonVariant;
  secondaryButtonOptions.bgOpacity =
    secondaryButtonOptions.bgOpacity || defaultSecondaryButtonBGOpacity;
  secondaryButtonOptions.bgColor = secondaryButtonOptions.bgColor || defaultSecondaryButtonBGColor;
  secondaryButtonOptions.bgColorTone =
    secondaryButtonOptions.bgColorTone || defaultSecondaryButtonBGColorTone;
  secondaryButtonOptions.textColor =
    secondaryButtonOptions.textColor || defaultSecondaryButtonTextColor;
  secondaryButtonOptions.textColorTone =
    secondaryButtonOptions.textColorTone || defaultSecondaryButtonTextColorTone;
  secondaryButtonOptions.size = secondaryButtonOptions.size || defaultSecondaryButtonSize;
  secondaryButtonOptions.fontWeight =
    secondaryButtonOptions.fontWeight || defaultSecondaryButtonFontWeight;

  secondaryButtonOptions.className = clsx(
    secondaryButtonOptions.className,
    'border border-primary-500 border-2'
  );

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
        {/* <Text
          as={headlineOptions.as || defaultHeadlineTag}
          variant="h1"
          {...headlineOptions}
          styleOverride={['spacing', 'textAlign']}
          className={clsx(alignmentClass)}
        >
          {headlineOptions.children || heading}
        </Text> */}
        <h1 className={clsx('text-4xl font-bold', alignmentClass)}>{heading}</h1>
        {description && (
          <div className="">
            <PortableText value={description} components={textComponents({}, context)} />
          </div>
        )}
        <div className={clsx(alignmentClass)}>
          {primaryButton && (
            <Button context={context} data={primaryButton!} options={primaryButtonOptions}>
              Click me
            </Button>
          )}
          {secondaryButton && (
            <Button context={context} data={secondaryButton!} options={secondaryButtonOptions}>
              Click me
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
};
