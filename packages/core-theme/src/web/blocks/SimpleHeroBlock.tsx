import type { HeroBlockData } from '../../types/sanity-data-types/blocks/index.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import { PortableText } from 'next-sanity';
import { textComponents } from '../text/text-components.js';
// import SanityImage from '@zilfire/next-sanity-image';
import { Section } from '../components/Section.js';
import { Container } from '../components/Container.js';
import { H1 } from '../text/index.js';
import { Button } from '../components/Button.js';

// import clsx from 'clsx';

// export type BackgroundImageOptions = {
//   imageSizes?: string | number[];
//   quality?: number;
//   priority?: boolean;
//   onLoad?: () => void;
//   onError?: () => void;
//   loading?: 'lazy' | 'eager';
// };

// todo: fix line decoration styles
export const SimpleHeroBlockHeading = ({ data }: { data: HeroBlockData }) => {
  return (
    <H1 styleOptions={{ color: 'white' }} classOverrides={{}}>
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

export const SimpleHeroBlock = ({
  data,
  context,
}: {
  data: HeroBlockData;
  context: ThemeContext;
}) => {
  return (
    <Section data={data} context={context} verticalSpacing="xl">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <SimpleHeroBlockHeading data={data} />
          <SimpleHeroBlockDescription data={data} context={context} />
          {(data.primaryButton || data.secondaryButton) && (
            <div className="mb-6 flex flex-wrap gap-4">
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
        </div>
      </Container>
    </Section>
  );
};
