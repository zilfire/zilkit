import { PortableTextBlock } from '@portabletext/types';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import type { ButtonData } from '../objects/button-data.types.js';

export type HeroBlockData = {
  _type: 'heroBlock';
  heading?: string;
  description?: PortableTextBlock[];
  backgroundImage?: SanityImageWithAlt;
  primaryButton?: ButtonData;
  secondaryButton?: ButtonData;
};
