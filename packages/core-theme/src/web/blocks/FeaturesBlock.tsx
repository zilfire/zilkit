import { Section } from '../components/Section.js';
import type { SectionStyleOptions } from '../components/Section.js';
import { iconRegistry } from '../../assets/icon-registry.js';
import type { IconRegistry } from '../../assets/icon-registry.js';
import type {
  FeaturesBlockData,
  FeatureItem,
} from '../../sanity/data-types/blocks/features-block-data.types.js';
import { PortableText } from 'next-sanity';
import { textComponents } from '../text/text-components.js';
import { H2, H3 } from '../text/index.js';

export interface FeaturesBlockProps {
  data: FeaturesBlockData;
  sectionStyleOptions?: Record<string, unknown>;
  id?: string;
}

export type FeatureProps = {
  iconRegistry: IconRegistry;
  feature: FeatureItem;
};

export const Feature: React.FC<FeatureProps> = ({ iconRegistry, feature }) => {
  const { heading, description, icon } = feature;
  const { iconKey } = icon || {};
  const IconComponent = iconKey && iconRegistry[iconKey]?.Icon;

  return (
    <div className="flex flex-col items-center text-center p-4">
      {IconComponent && (
        <div className="mb-4">
          <IconComponent className="w-16 h-16 text-primary-500" />
        </div>
      )}
      <H3 className="" size="sm">
        {heading}
      </H3>
      {description && (
        <div className="text-base text-gray-600">
          <PortableText value={description} components={textComponents()} />
        </div>
      )}
    </div>
  );
};

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({ data, id, sectionStyleOptions }) => {
  const { title, features } = data;
  return (
    <Section styleOptions={sectionStyleOptions} id={id}>
      {title && <H2 styleOptions={{ textAlign: 'center', verticalSpacing: 'lg' }}>{title}</H2>}
      {features && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
          {features?.map((feature, index) => (
            <Feature key={index} iconRegistry={iconRegistry} feature={feature} />
          ))}
        </div>
      )}
    </Section>
  );
};
