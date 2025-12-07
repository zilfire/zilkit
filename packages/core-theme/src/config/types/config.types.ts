import type { StyleClassNames } from '../../web/style/types/style.types.js';

export type ThemeContext = {
  sanityConfig: SanityConfig;
};

export type SanityConfig = {
  sanityProjectId: string;
  sanityDataset: string;
  sanityApiVersion: string;
  sanityUseCdn?: boolean;
};
