import { PortableTextBlock } from '@portabletext/types';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';

export interface MediaContentBlockData {
  image?: SanityImageWithAlt;
  heading?: string;
  eyebrow?: string;
  subheading?: string;
  content?: PortableTextBlock[];
}
