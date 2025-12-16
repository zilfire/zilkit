import { defineQuery, SanityDocument } from 'next-sanity';
import type {
  HeroBlockData,
  MediaContentBlockData,
  NavMenuWithInternalPath,
  FeaturesBlockData,
} from '@zilfire/core-theme/data-types';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';

export type HomeQueryData = SanityDocument & {
  hero?: HeroBlockData;
  mediaContent?: MediaContentBlockData;
  features?: FeaturesBlockData;
};

export type LayoutQueryData = SanityDocument & {
  navData?: NavMenuWithInternalPath;
  logo?: SanityImageWithAlt;
  footerLogo?: SanityImageWithAlt;
};

const navMenuProjection = `{
  ...,
  navElements[]{
    ...,
    navItem {
      ...,
      link {
        ...,
        defined(useInternalPath) && useInternalPath == true => {"internalPath": internalLink.path->path}
      }
    },
    children[]{
      ...,
      link {
        ...,
        defined(useInternalPath) && useInternalPath == true => {"internalPath": internalLink.path->path}
      }
    }
  }
}`;

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

export const LAYOUT_QUERY = defineQuery(`*[_id == "settings" ][0]{
  "logo": header.logo->logoImage,
  "navData": header.navMenu->${navMenuProjection},
  "footerLogo": footer.footerLogo->logoImage
}
`);
