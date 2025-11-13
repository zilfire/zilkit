import { defineQuery, SanityDocument } from 'next-sanity';
import type { HeroBlockData, MediaContentBlockData } from '@zilfire/core-theme/data-types';

export type HomeQueryData = SanityDocument & {
  hero?: HeroBlockData;
  mediaContent?: MediaContentBlockData;
};

const navLinkProjection = `
  ...,
  defined(useInternalPath) && useInternalPath == true => {"internalPath": internalLink.path->path}
`;

export const HOME_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "siteHome"][0]{
    ...,
    hero {
      ...,
      primaryButton {
        ...,
        link {${navLinkProjection}}
      }
      
    }
  }
  `);
