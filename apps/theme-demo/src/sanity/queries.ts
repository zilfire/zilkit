import { defineQuery, SanityDocument } from 'next-sanity';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

export const HOME_QUERY = defineQuery(`*[_type == "homePage" && _id == "siteHome"][0]`);

export type HomeQueryData = SanityDocument & {
  hero?: HeroBlockData;
};
