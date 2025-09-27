// import { PortableTextBlock } from '@portabletext/types';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import type { ButtonData } from '../objects/button.js';

export type HeroBlockData = {
  _type: 'heroBlock';
  heading?: string;
  description?: string;
  backgroundImage?: SanityImageWithAlt;
  primaryButton?: ButtonData;
  secondaryButton?: ButtonData;
};
