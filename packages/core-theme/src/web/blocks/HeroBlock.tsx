import type { HeroBlockData } from '../../types/sanity-data-types/blocks/index.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import { PortableText } from 'next-sanity';
import { textComponents } from '../text/text-components.js';
import { Section } from '../components/Section.js';
import type { SectionProps } from '../components/Section.js';
import { H1 } from '../text/index.js';
import { Button } from '../components/Button.js';

// import clsx from 'clsx';

interface HeroSectionProps extends SectionProps {
  data?: HeroBlockData;
}

export const SimpleHeroBlockHeading = ({ data }: { data: HeroBlockData }) => {
  return (
    <H1 styleOptions={{ color: 'white', size: 'lg' }} classOverrides={{}}>
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
}) => {
  const { description } = data;
  return (
    <>
      {description && (
        <PortableText
          value={description}
          components={textComponents(
            {
              styleOptions: { color: 'white', size: 'lg' },
              classOverrides: { textAlign: 'text-center' },
            },
            context
          )}
        />
      )}
    </>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  context,
  children,
  verticalSpacing = 'xl',
  container = true,
  backgroundImageOptions = {},
}) => {
  if (data?.backgroundImage) {
    const defaultSizes =
      '(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, (max-width: 1536px) 1536px, 1920px';
    backgroundImageOptions.imageSizes = backgroundImageOptions.imageSizes || defaultSizes;
    backgroundImageOptions.quality = backgroundImageOptions.quality || 80;
    backgroundImageOptions.loading = backgroundImageOptions.loading || 'eager';
    backgroundImageOptions.priority = backgroundImageOptions.priority || true;
  }

  return (
    <Section
      context={context}
      verticalSpacing={verticalSpacing}
      data={data}
      backgroundImageOptions={backgroundImageOptions}
      container={container}
      contentOptions={{ className: 'max-w-4xl mx-auto flex flex-col items-center text-center' }}
    >
      {children}
    </Section>
  );
};

export const HeroBlock = ({ data, context }: { data: HeroBlockData; context: ThemeContext }) => {
  return (
    <HeroSection data={data} context={context}>
      <SimpleHeroBlockHeading data={data} />
      <SimpleHeroBlockDescription data={data} context={context} />
      {(data.primaryButton || data.secondaryButton) && (
        <div className="flex flex-wrap gap-4">
          {data.primaryButton && (
            <Button context={context} data={data.primaryButton} options={{ size: 'lg' }} />
          )}
          {data.secondaryButton && (
            <Button
              context={context}
              data={data.secondaryButton}
              options={{ variant: 'outline', size: 'lg' }}
            />
          )}
        </div>
      )}
    </HeroSection>
  );
};
