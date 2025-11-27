import type { TextSize } from '../../style/types/text-style-classes.js';
import type { GapSpacing } from '../../style/types/layout-style.types.js';

export const FAQ_DEFAULTS = {
  question: {
    color: 'black' as const,
  },
  answer: {
    color: 'muted' as const,
  },
  plusIcon: {
    color: 'primary' as const,
  },
  border: {
    color: 'muted' as const,
    thickness: 'thin' as const,
  },
  blockquote: {
    borderColor: 'primary' as const,
  },
  headline: {
    size: 'sm' as TextSize,
  },
  layout: {
    columnGap: 'lg' as GapSpacing,
  },
} as const;
