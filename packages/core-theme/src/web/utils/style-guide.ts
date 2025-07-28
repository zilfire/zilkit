import { StyleGuide } from '@/data-types/utility/styling';
import { componentStyles } from './element-styles';
import { defaultStyles } from './default-styles';

const primaryDarkestBg = 'bg-primary-950';
const primaryDarkBg = 'bg-primary-900';
const primaryDeepBg = 'bg-primary-700';
const primaryMediumBg = 'bg-primary-500';
const primarySurfaceBg = 'bg-primary-200';
const primaryLightBg = 'bg-primary-50';

const secondaryDarkestBg = 'bg-secondary-950';
const secondaryDarkBg = 'bg-secondary-900';
const secondaryDeepBg = 'bg-secondary-700';
const secondaryMediumBg = 'bg-secondary-500';
const secondarySurfaceBg = 'bg-secondary-200';
const secondaryLightBg = 'bg-secondary-50';

const accentDarkestBg = 'bg-accent-950';
const accentDarkBg = 'bg-accent-900';
const accentDeepBg = 'bg-accent-700';
const accentMediumBg = 'bg-accent-500';
const accentSurfaceBg = 'bg-accent-200';
const accentLightBg = 'bg-accent-50';

const secondaryAccentDarkestBg = 'bg-secondary-accent-950';
const secondaryAccentDarkBg = 'bg-secondary-accent-900';
const secondaryAccentDeepBg = 'bg-secondary-accent-700';
const secondaryAccentMediumBg = 'bg-secondary-accent-500';
const secondaryAccentSurfaceBg = 'bg-secondary-accent-200';
const secondaryAccentLightBg = 'bg-secondary-accent-50';

const neutralDarkestBg = 'bg-neutral-950';
const neutralDarkBg = 'bg-neutral-900';
const neutralDeepBg = 'bg-neutral-700';
const neutralMediumBg = 'bg-neutral-500';
const neutralSurfaceBg = 'bg-neutral-200';
const neutralLightBg = 'bg-neutral-50';

const whiteDarkestBg = 'bg-white';
const whiteDarkBg = 'bg-white';
const whiteDeepBg = 'bg-white';
const whiteMediumBg = 'bg-white';
const whiteSurfaceBg = 'bg-white';
const whiteLightBg = 'bg-white';

const blackDarkestBg = 'bg-black';
const blackDarkBg = 'bg-black';
const blackDeepBg = 'bg-black';
const blackMediumBg = 'bg-black';
const blackSurfaceBg = 'bg-black';
const blackLightBg = 'bg-black';

const primaryTextDarkest = 'text-primary-200';
const primaryTextDark = 'text-primary-200';
const primaryTextDeep = 'text-primary-200';
const primaryTextMedium = 'text-primary-50';
const primaryTextSurface = 'text-primary-800';
const primaryTextLight = 'text-primary-800';

const secondaryTextDarkest = 'text-secondary-200';
const secondaryTextDark = 'text-secondary-200';
const secondaryTextDeep = 'text-secondary-200';
const secondaryTextMedium = 'text-secondary-50';
const secondaryTextSurface = 'text-secondary-800';
const secondaryTextLight = 'text-secondary-800';

const accentTextDarkest = 'text-accent-200';
const accentTextDark = 'text-accent-200';
const accentTextDeep = 'text-accent-200';
const accentTextMedium = 'text-accent-50';
const accentTextSurface = 'text-accent-800';
const accentTextLight = 'text-accent-800';

const secondaryAccentTextDarkest = 'text-secondary-accent-200';
const secondaryAccentTextDark = 'text-secondary-accent-200';
const secondaryAccentTextDeep = 'text-secondary-accent-200';
const secondaryAccentTextMedium = 'text-secondary-accent-50';
const secondaryAccentTextSurface = 'text-secondary-accent-800';
const secondaryAccentTextLight = 'text-secondary-accent-800';

const neutralTextDarkest = 'text-neutral-200';
const neutralTextDark = 'text-neutral-200';
const neutralTextDeep = 'text-neutral-200';
const neutralTextMedium = 'text-neutral-50';
const neutralTextSurface = 'text-neutral-800';
const neutralTextLight = 'text-neutral-800';

const whiteTextDarkest = 'text-white';
const whiteTextDark = 'text-white';
const whiteTextDeep = 'text-white';
const whiteTextMedium = 'text-white';
const whiteTextSurface = 'text-white';
const whiteTextLight = 'text-white';

const blackTextDarkest = 'text-black';
const blackTextDark = 'text-black';
const blackTextDeep = 'text-black';
const blackTextMedium = 'text-black';
const blackTextSurface = 'text-black';
const blackTextLight = 'text-black';

export const styleGuide: StyleGuide = {
  defaultStyles,
  bgColor: {
    primary: {
      darkest: primaryDarkestBg,
      dark: primaryDarkBg,
      deep: primaryDeepBg,
      medium: primaryMediumBg,
      surface: primarySurfaceBg,
      light: primaryLightBg,
    },
    secondary: {
      darkest: secondaryDarkestBg,
      dark: secondaryDarkBg,
      deep: secondaryDeepBg,
      medium: secondaryMediumBg,
      surface: secondarySurfaceBg,
      light: secondaryLightBg,
    },
    accent: {
      darkest: accentDarkestBg,
      dark: accentDarkBg,
      deep: accentDeepBg,
      medium: accentMediumBg,
      surface: accentSurfaceBg,
      light: accentLightBg,
    },
    'secondary-accent': {
      darkest: secondaryAccentDarkestBg,
      dark: secondaryAccentDarkBg,
      deep: secondaryAccentDeepBg,
      medium: secondaryAccentMediumBg,
      surface: secondaryAccentSurfaceBg,
      light: secondaryAccentLightBg,
    },
    neutral: {
      darkest: neutralDarkestBg,
      dark: neutralDarkBg,
      deep: neutralDeepBg,
      medium: neutralMediumBg,
      surface: neutralSurfaceBg,
      light: neutralLightBg,
    },
    white: {
      darkest: whiteDarkestBg,
      dark: whiteDarkBg,
      deep: whiteDeepBg,
      medium: whiteMediumBg,
      surface: whiteSurfaceBg,
      light: whiteLightBg,
    },
    black: {
      darkest: blackDarkestBg,
      dark: blackDarkBg,
      deep: blackDeepBg,
      medium: blackMediumBg,
      surface: blackSurfaceBg,
      light: blackLightBg,
    },
  },
  textColor: {
    primary: {
      darkest: primaryTextDarkest,
      dark: primaryTextDark,
      deep: primaryTextDeep,
      medium: primaryTextMedium,
      surface: primaryTextSurface,
      light: primaryTextLight,
    },
    secondary: {
      darkest: secondaryTextDarkest,
      dark: secondaryTextDark,
      deep: secondaryTextDeep,
      medium: secondaryTextMedium,
      surface: secondaryTextSurface,
      light: secondaryTextLight,
    },
    accent: {
      darkest: accentTextDarkest,
      dark: accentTextDark,
      deep: accentTextDeep,
      medium: accentTextMedium,
      surface: accentTextSurface,
      light: accentTextLight,
    },
    'secondary-accent': {
      darkest: secondaryAccentTextDarkest,
      dark: secondaryAccentTextDark,
      deep: secondaryAccentTextDeep,
      medium: secondaryAccentTextMedium,
      surface: secondaryAccentTextSurface,
      light: secondaryAccentTextLight,
    },
    neutral: {
      darkest: neutralTextDarkest,
      dark: neutralTextDark,
      deep: neutralTextDeep,
      medium: neutralTextMedium,
      surface: neutralTextSurface,
      light: neutralTextLight,
    },
    white: {
      darkest: whiteTextDarkest,
      dark: whiteTextDark,
      deep: whiteTextDeep,
      medium: whiteTextMedium,
      surface: whiteTextSurface,
      light: whiteTextLight,
    },
    black: {
      darkest: blackTextDarkest,
      dark: blackTextDark,
      deep: blackTextDeep,
      medium: blackTextMedium,
      surface: blackTextSurface,
      light: blackTextLight,
    },
  },
  fontWeight: {
    thin: 'font-thin',
    extralight: 'font-extralight',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  },
  fontStyle: {
    normal: 'non-italic',
    italic: 'italic',
  },
  leading: {
    none: 'leading-none',
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  },
  componentStyles,
};
