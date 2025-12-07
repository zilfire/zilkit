'use client';

import { ThemeProvider as CoreThemeProvider } from '@zilfire/core-theme/context';
import { themeContext } from '@/context';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <CoreThemeProvider value={themeContext}>{children}</CoreThemeProvider>;
}
