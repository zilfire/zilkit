import type { HeroBlockData } from '../../types/sanity-data-types/blocks/index.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import type React from 'react';
import { PortableText } from 'next-sanity';
import { textComponents } from '../text/text-components.js';
import { Section } from '../components/Section.js';
import type { SectionProps } from '../components/Section.js';
import { H1 } from '../text/index.js';
import { Button } from '../components/Button.js';
import { getHorizontalGapSpacingClass } from '../style/style-utils/layout-style-utils.js';
import clsx from 'clsx';

// Constants
const HERO_DEFAULT_SIZES =
  '(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, (max-width: 1536px) 1536px, 1920px' as const;
const HERO_DEFAULT_QUALITY = 80 as const;

const HERO_TEXT_STYLES = {
  styleOptions: { color: 'white' as const, size: 'lg' as const },
  classOverrides: {},
} as const;

const HERO_TEXT_STYLES_CENTER = {
  styleOptions: { color: 'white' as const, size: 'lg' as const },
  classOverrides: { textAlign: 'text-center' },
} as const;

interface HeroSectionProps extends SectionProps {
  data?: HeroBlockData;
}

export const SimpleHeroBlockHeading = ({ data }: { data: HeroBlockData }): React.ReactElement => {
  return (
    <H1
      styleOptions={HERO_TEXT_STYLES.styleOptions}
      classOverrides={HERO_TEXT_STYLES.classOverrides}
    >
      {data.heading}
    </H1>
  );
};

export const SimpleHeroBlockDescription = ({
  data,
  context,
}: {
  data: HeroBlockData;
  context: ThemeContext;
}): React.ReactElement | null => {
  const { description } = data;

  if (!description) return null;

  return (
    <PortableText
      value={description}
      components={textComponents(HERO_TEXT_STYLES_CENTER, context)}
    />
  );
};

// Helper function to configure background image options
const getBackgroundImageOptions = (
  data: HeroBlockData | undefined,
  options: SectionProps['backgroundImageOptions'] = {}
): SectionProps['backgroundImageOptions'] => {
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
  context,
  children,
  verticalSpacing = 'xl',
  container = true,
  backgroundImageOptions = {},
}) => {
  const finalBackgroundImageOptions = getBackgroundImageOptions(data, backgroundImageOptions);

  return (
    <Section
      context={context}
      verticalSpacing={verticalSpacing}
      data={data}
      backgroundImageOptions={finalBackgroundImageOptions}
      container={container}
      contentOptions={{
        maxWidth: 'normal',
        className: 'mx-auto flex flex-col items-center text-center',
      }}
    >
      {children}
    </Section>
  );
};

// Component for rendering hero button group
const HeroButtonGroup = ({
  primaryButton,
  secondaryButton,
  context,
}: {
  primaryButton?: HeroBlockData['primaryButton'];
  secondaryButton?: HeroBlockData['secondaryButton'];
  context: ThemeContext;
}): React.ReactElement | null => {
  if (!primaryButton && !secondaryButton) return null;

  const gapClass = getHorizontalGapSpacingClass('sm', context.styleClasses);

  return (
    <div className={clsx('flex flex-wrap', gapClass)}>
      {primaryButton && <Button context={context} data={primaryButton} options={{ size: 'lg' }} />}
      {secondaryButton && (
        <Button
          context={context}
          data={secondaryButton}
          options={{ variant: 'outline', size: 'lg' }}
        />
      )}
    </div>
  );
};

export const HeroBlock = ({
  data,
  context,
}: {
  data: HeroBlockData;
  context: ThemeContext;
}): React.ReactElement => {
  return (
    <HeroSection data={data} context={context}>
      <SimpleHeroBlockHeading data={data} />
      <SimpleHeroBlockDescription data={data} context={context} />
      <HeroButtonGroup
        primaryButton={data.primaryButton}
        secondaryButton={data.secondaryButton}
        context={context}
      />
    </HeroSection>
  );
};
