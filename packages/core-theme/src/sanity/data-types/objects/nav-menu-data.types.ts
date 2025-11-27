import { SanityDocument, SanityReference } from 'next-sanity';

export type NavLinkWithInternalPath = {
  _type: 'navLink';
  useInternalPath?: boolean;
  internalPath?: string;
  internalLink?: {
    _type: 'internalLink';
    path: SanityReference;
    id?: string;
  };
  externalLink?: {
    _type: 'externalLink';
    href: string;
  };
};

export type NavLink = {
  _type: 'navLink';
  useInternalPath?: boolean;
  internalLink?: {
    _type: 'internalLink';
    path: SanityReference;
    id?: string;
  };
  externalLink?: {
    _type: 'externalLink';
    href: string;
  };
};

export type NavItem = {
  _type: 'navItem';
  text: string;
  link?: NavLink;
};

export type NavItemWithInternalPath = {
  _type: 'navItem';
  text: string;
  link?: NavLinkWithInternalPath;
};

export type NavElement = {
  _key: string;
  _type: 'navElement';
  navItem: NavItem;
  children?: NavItem[];
};

export type NavElementWithInternalPath = {
  _key: string;
  _type: 'navElement';
  navItem: NavItemWithInternalPath;
  children?: NavItemWithInternalPath[];
};

export type NavMenu = SanityDocument & {
  name: string;
  slug: {
    current: string;
    _type: 'slug';
  };
  navElements: NavElement[];
};

export type NavMenuWithInternalPath = SanityDocument & {
  name: string;
  slug: {
    current: string;
    _type: 'slug';
  };
  navElements: NavElementWithInternalPath[];
};
