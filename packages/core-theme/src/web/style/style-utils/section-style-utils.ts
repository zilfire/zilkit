import type { BackgroundColor } from '../../../types/style-types/section-style-classes.js';
import { StyleClassNames } from '../../../types/style-types/style-class-names.js';

export const getBackgroundColorClass = (color: BackgroundColor, styleClasses: StyleClassNames) => {
  return styleClasses.section.backgroundColors[color] || '';
};
