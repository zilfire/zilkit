import type { HeroBlockData } from '../../sanity/data-types/index.js';
import { PortableText } from 'next-sanity';
import { textComponents } from '../text/text-components.js';
import { ImageSection } from '../components/ImageSection.js';
import type { ImageSectionProps } from '../components/ImageSection.js';
import { H1 } from '../text/index.js';
import { ButtonGroup } from '../components/ButtonGroup.js';
import type { ButtonData } from '../../sanity/data-types/index.js';
import type { TextStyleOptions } from '../style/types/text-style-classes.js';

// Constants
const HERO_DEFAULT_SIZES =
  '(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, (max-width: 1536px) 1536px, 1920px' as const;
const HERO_DEFAULT_QUALITY = 80 as const;

const HERO_TEXT_STYLES = {
  styleOptions: { textColor: 'white' as const },
  classOverrides: {},
  size: 'lg',
} as const;

const HERO_TEXT_STYLES_CENTER = {
  styleOptions: { textColor: 'white' as const, textAlign: 'text-center' as const },
  size: 'lg',
} as const;

interface HeroSectionProps extends ImageSectionProps {
  data?: HeroBlockData;
}

export const HeroBlockHeading = ({
  data,
  id,
  styleOptions,
}: {
  data: HeroBlockData;
  id?: string;
  styleOptions?: TextStyleOptions;
}): React.ReactElement => {
  return (
    <H1
      id={id}
      size="lg"
      styleOptions={styleOptions}
      styleOverride={HERO_TEXT_STYLES.classOverrides}
    >
      {data.heading}
    </H1>
  );
};

export const HeroBlockDescription = ({
  data,
  id,
}: {
  data: HeroBlockData;
  id?: string;
}): React.ReactElement | null => {
  const { description } = data;

  if (!description) return null;

  // @todo: update style formatting options
  return (
    <div id={id}>
      <PortableText
        value={description}
        components={textComponents({
          styleOptions: {
            textColor: 'white',
            textSize: 'lg',
            textAlign: 'left',
            verticalSpacing: 'lg',
          },
        })}
      />
    </div>
  );
};

// Helper function to configure background image options
const getBackgroundImageOptions = (
  data: HeroBlockData | undefined,
  options: ImageSectionProps['backgroundImageOptions'] = {}
): ImageSectionProps['backgroundImageOptions'] => {
  if (!data?.backgroundImage) return options;

  return {
    imageSizes: options.imageSizes || HERO_DEFAULT_SIZES,
    quality: options.quality || HERO_DEFAULT_QUALITY,
    loading: options.loading || 'eager',
    priority: options.priority ?? true,
  };
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  children,
  verticalSpacing = 'xl',
  container = true,
  backgroundImageOptions = {},
  id,
  'aria-labelledby': ariaLabelledBy,
}) => {
  const finalBackgroundImageOptions = getBackgroundImageOptions(data, backgroundImageOptions);

  return (
    <ImageSection
      verticalSpacing={verticalSpacing}
      data={data}
      backgroundImageOptions={finalBackgroundImageOptions}
      overlayOptions={{ opacity: 0.6, color: 'black' }}
      container={container}
      id={id}
      aria-labelledby={ariaLabelledBy}
      contentOptions={{
        maxWidth: 'normal',
        className: 'mx-auto flex flex-col items-center',
      }}
    >
      {children}
    </ImageSection>
  );
};

// Component for rendering hero button group
const HeroButtonGroup = ({
  primaryButton,
  secondaryButton,
  id,
}: {
  primaryButton?: HeroBlockData['primaryButton'];
  secondaryButton?: HeroBlockData['secondaryButton'];
  id?: string;
}): React.ReactElement | null => {
  const buttons = [primaryButton, secondaryButton].filter(Boolean) as ButtonData[];

  if (buttons.length === 0) return null;

  return (
    <ButtonGroup
      id={id}
      buttons={buttons}
      gap="sm"
      buttonOptions={{ size: 'lg' }}
      secondaryVariant="outline"
    />
  );
};

interface HeroBlockContentIds {
  heading?: string;
  description?: string;
  buttonGroup?: string;
}

export interface HeroBlockProps {
  data: HeroBlockData;
  contentIds?: HeroBlockContentIds;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const HeroBlock = ({
  data,
  contentIds,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: HeroBlockProps): React.ReactElement => {
  return (
    <HeroSection data={data} id={id} aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
      <HeroBlockHeading
        data={data}
        id={contentIds?.heading}
        styleOptions={{ textAlign: 'center', textColor: 'white' }}
      />
      <HeroBlockDescription data={data} id={contentIds?.description} />
      <HeroButtonGroup
        primaryButton={data.primaryButton}
        secondaryButton={data.secondaryButton}
        id={contentIds?.buttonGroup}
      />
    </HeroSection>
  );
};
