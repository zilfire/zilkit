import { Section } from '../components/Section.js';
import { iconRegistry } from '../assets/icon-registry.js';
import type { IconRegistry } from '../assets/icon-registry.js';

export interface FeaturesBlockProps {}

export type FeatureProps = {
  iconRegistry: IconRegistry;
  feature: {
    title: string;
    description: string;
    iconKey: string;
  };
};

export const Feature: React.FC<FeatureProps> = ({ iconRegistry, feature }) => {
  const { title, description, iconKey } = feature;
  const IconComponent = iconRegistry[iconKey]?.Icon;

  return (
    <div className="flex flex-col items-center text-center p-4">
      {IconComponent && (
        <div className="mb-4">
          <IconComponent className="w-16 h-16 text-primary-500" />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export const FeaturesBlock: React.FC<FeaturesBlockProps> = () => {
  return (
    <Section>
      <div>Header</div>
      <div className="grid grid-cols-4 gap-4">
        <Feature
          iconRegistry={iconRegistry}
          feature={{
            title: 'Feature 1',
            description: 'Description for feature 1',
            iconKey: 'dashboard',
          }}
        />
        <Feature
          iconRegistry={iconRegistry}
          feature={{
            title: 'Feature 2',
            description: 'Description for feature 2',
            iconKey: 'inputField',
          }}
        />
        <Feature
          iconRegistry={iconRegistry}
          feature={{
            title: 'Feature 3',
            description: 'Description for feature 3',
            iconKey: 'image',
          }}
        />
        <Feature
          iconRegistry={iconRegistry}
          feature={{ title: 'Feature 4', description: 'Description for feature 4', iconKey: 'cms' }}
        />
        <div>01</div>
        <div>02</div>
        <div>03</div>
        <div>04</div>
        <div>05</div>
        <div>06</div>
        <div>07</div>
        <div>08</div>
        <div>09</div>
        <div>10</div>
      </div>
    </Section>
  );
};
