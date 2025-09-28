import type { SanityConfig } from '../sanity-data-types/config/index.js';

export type LinkComponent = React.ComponentType<{
  href: string;
  className?: string;
  children: React.ReactNode;
}>;

export type ThemeContext = {
  sanityConfig: SanityConfig;
  LinkComponent: LinkComponent;
};
