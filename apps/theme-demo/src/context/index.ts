import type { ThemeContext } from '@zilfire/core-theme/config-types';
import { styleClassNames } from '@zilfire/core-theme/style-classes';
import { sanityConfig } from '@/sanity/client';
import NextLink from 'next/link';

export const themeContext: ThemeContext = {
  sanityConfig: sanityConfig,
  LinkComponent: NextLink,
  styleClasses: styleClassNames,
};
