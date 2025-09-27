import type { SanityConfig, ThemeContext } from '@zilfire/core-theme/types';
import { sanityConfig } from '@/sanity/client';
import NextLink from 'next/link';

export const themeContext: ThemeContext = {
  sanityConfig: sanityConfig,
  LinkComponent: NextLink,
};
