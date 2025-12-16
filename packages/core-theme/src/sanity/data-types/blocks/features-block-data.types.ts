import { PortableTextBlock } from '@portabletext/types';
import type { IconData } from '../objects/icon.js';

export type FeatureItem = {
  _type: 'featureItem';
  _key: string;
  icon?: IconData;
  heading?: string;
  description?: PortableTextBlock[];
};

export type FeaturesBlockData = {
  _type: 'featuresBlock';
  title?: string;
  features?: FeatureItem[];
};
