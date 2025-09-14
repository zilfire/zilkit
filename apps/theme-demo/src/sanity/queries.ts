import { defineQuery, SanityDocument } from 'next-sanity';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

export type HomeQueryData = SanityDocument & {
  hero?: HeroBlockData;
};

export const HOME_QUERY = defineQuery(`*[_type == "homePage" && _id == "siteHome"][0]`);
