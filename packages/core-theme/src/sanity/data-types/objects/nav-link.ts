import type { SanityReference } from 'next-sanity';

export type NavLink = {
  _type: 'navLink';
  internalPath?: string;
  useInternalPath?: boolean;
  internalLink?: InternalLink;
  externalLink?: ExternalLink;
};

export type InternalLink = {
  _type: 'internalLink';
  path?: SanityReference;
  id?: string;
};

export type ExternalLink = {
  _type: 'externalLink';
  href?: string;
};
