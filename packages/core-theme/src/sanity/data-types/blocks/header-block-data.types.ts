import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import { NavMenuWithInternalPath } from '../objects/nav-link-data.types.js';

export type HeaderBlockData = {
  logo?: SanityImageWithAlt;
  navData?: NavMenuWithInternalPath;
};
