import { SanityReference } from 'next-sanity';

export type NavLinkWithInternalPath = {
  _type: 'navLink';
  useInternalPath?: boolean;
  internalPath?: string;
  internalLink?: {
    _type: 'internalLink';
    path?: SanityReference;
    id?: string;
  };
  externalLink?: {
    _type: 'externalLink';
    href?: string;
  };
};
