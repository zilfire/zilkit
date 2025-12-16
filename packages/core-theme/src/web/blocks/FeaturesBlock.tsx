import { Section } from '../components/Section.js';
import { iconRegistry } from '../../assets/icon-registry.js';
import type { IconRegistry } from '../../assets/icon-registry.js';
import type {
  FeaturesBlockData,
  FeatureItem,
} from '../../sanity/data-types/blocks/features-block-data.types.js';

export interface FeaturesBlockProps {
  data: FeaturesBlockData;
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
      <h3 className="text-lg font-semibold mb-2">{heading}</h3>
      {/* <p className="text-sm text-gray-600">{description}</p> */}
    </div>
  );
};

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({ data }) => {
  const { title, features } = data;
  console.log('FeaturesBlock data:', data);
  return (
    <Section>
      {title && <div>{title}</div>}
      {features && (
        <div className="grid grid-cols-4 gap-4">
          {features?.map((feature, index) => (
            <Feature key={index} iconRegistry={iconRegistry} feature={feature} />
          ))}
        </div>
      )}
    </Section>
  );
};
