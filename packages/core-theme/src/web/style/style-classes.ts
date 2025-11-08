import type { StyleClassNames } from '../../types/style-types/style-class-names.js';
import { layoutClassNames } from './layout-classes.js';
import { buttonClassNames } from './button-classes.js';
import { textClassNames } from './text-classes.js';
import { colorClassNames } from './color-classes.js';

export const styleClassNames: StyleClassNames = {
  text: textClassNames,
  button: buttonClassNames,
  layout: layoutClassNames,
  color: colorClassNames,
};
