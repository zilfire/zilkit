import type { StyleClassNames } from '../../../web/style/types/style.types.js';

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

export type SanityConfig = {
  sanityProjectId: string;
  sanityDataset: string;
  sanityApiVersion: string;
  sanityUseCdn?: boolean;
};
