// import { PortableTextBlock } from '@portabletext/types';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image';

export type HeroBlock = {
  _type: 'heroBlock';
  heading?: string;
  description?: string;
  backgroundImage?: SanityImageWithAlt;
};
