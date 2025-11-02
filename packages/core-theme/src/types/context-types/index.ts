import type { SanityConfig } from '../sanity-data-types/config/index.js';
import type { StyleClassNames } from '../style-types/style-classes.js';

export type LinkComponent = React.ComponentType<{
  href: string;
  className?: string;
  children: React.ReactNode;
}>;

export type ThemeContext = {
  sanityConfig: SanityConfig;
  styleClasses: StyleClassNames;
  LinkComponent: LinkComponent;
};
