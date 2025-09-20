// import { PortableTextBlock } from '@portabletext/types';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';

export type HeroBlockData = {
  _type: 'heroBlock';
  heading?: string;
  description?: string;
  backgroundImage?: SanityImageWithAlt;
};
