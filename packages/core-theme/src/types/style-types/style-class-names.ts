import type { TextClassNames } from './text-style-classes.js';
import type { LayoutClassNames } from './layout-style-classes.js';
import type { ButtonClassNames } from './button-style-classes.js';
import type { ColorClassNames } from './color-style-classes.js';

export type StyleClassNames = {
  text: TextClassNames;
  layout: LayoutClassNames;
  button: ButtonClassNames;
  color: ColorClassNames;
};
