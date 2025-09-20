import type { SanityConfig, ThemeContext } from '@zilfire/core-theme/types';
import { sanityConfig } from '@/sanity/client';

export const themeContext: ThemeContext = {
  sanityConfig: sanityConfig,
};
