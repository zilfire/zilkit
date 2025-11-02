import type { HeroBlockData } from '../../types/sanity-data-types/blocks/index.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import { PortableText } from 'next-sanity';
import { textComponents } from '../text/text-components.js';
import SanityImage from '@zilfire/next-sanity-image';
import { Section, SectionBackgroundImage } from '../components/Section.js';
import type { SectionBackgroundImageOptions } from '../components/Section.js';
import clsx from 'clsx';

// export type BackgroundImageOptions = {
//   imageSizes?: string | number[];
//   quality?: number;
//   priority?: boolean;
//   onLoad?: () => void;
//   onError?: () => void;
//   loading?: 'lazy' | 'eager';
// };

// const sectionSpacingXS = 'py-10 md:py-18 lg:py-24';
// const sectionSpacingSM = 'py-16 md:py-24 lg:py-32';
// const sectionSpacingMD = 'py-20 md:py-32 lg:py-36';
// const sectionSpacingLG = 'py-24 md:py-36 lg:py-40';
const sectionSpacingXL = 'py-32 md:py-40 lg:py-48';
// const sectionSpacingxxl = 'py-40 md:py-64 lg:py-72';

export const SimpleHeroBlockHeading = ({ data }: { data: HeroBlockData }) => {
  return <h1>{data.heading}</h1>;
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
      {description && <PortableText value={description} components={textComponents({}, context)} />}
    </>
  );
};

export const SimpleHeroSection = (props: {
  data?: HeroBlockData;
  children?: React.ReactNode;
  className?: string;
  classOverride?: string;
  context: ThemeContext;
}) => {
  return <Section {...props}></Section>;
};

export const SimpleHeroBGImage = ({
  data,
  context,
  options,
}: {
  data: HeroBlockData;
  context: ThemeContext;
  options?: SectionBackgroundImageOptions;
}) => {
  return <SectionBackgroundImage data={data} context={context} options={options} />;
};

export const SimpleHeroOverlay = ({}) => {
  return <div className={clsx('absolute inset-0 z-5 bg-black opacity-30')}></div>;
};

export const SimpleHeroContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={clsx('relative z-10 container mx-auto', sectionSpacingXL)}>{children}</div>
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
    <SimpleHeroSection data={data} context={context}>
      {/* <SimpleHeroBGImage data={data} context={context} /> */}
      <SimpleHeroOverlay />
      <SimpleHeroContainer>
        <SimpleHeroBlockHeading data={data} />
        <SimpleHeroBlockDescription data={data} context={context} />
      </SimpleHeroContainer>
    </SimpleHeroSection>
  );
};
