import type { TextSize } from '../../../types/style-types/text-style-classes.js';
import type {
  GapSpacingOption,
  ColumnLayout,
} from '../../../types/style-types/layout-style-classes.js';

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
    columnGap: 'lg' as GapSpacingOption,
    firstColumn: 'third' as ColumnLayout,
    secondColumn: 'twoThirds' as ColumnLayout,
  },
} as const;
