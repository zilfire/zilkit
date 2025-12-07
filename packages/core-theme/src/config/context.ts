import { createContext, useContext } from 'react';

export type ThemeContext = {
  sanityConfig: SanityConfig;
};

export type SanityConfig = {
  sanityProjectId: string;
  sanityDataset: string;
  sanityApiVersion: string;
  sanityUseCdn?: boolean;
};

// Create the context with undefined as default
const ThemeConfigContext = createContext<ThemeContext | undefined>(undefined);

/**
 * Hook to access the ThemeContext
 * @throws Error if used outside of ThemeProvider
 * @returns ThemeContext object
 */
export function useThemeContext(): ThemeContext {
  const context = useContext(ThemeConfigContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Provider component for ThemeContext
 */
export const ThemeProvider = ThemeConfigContext.Provider;

/**
 * Get Sanity configuration from ThemeContext
 * @returns SanityConfig object
 */
export function useSanityConfig(): SanityConfig {
  const { sanityConfig } = useThemeContext();
  return sanityConfig;
}
