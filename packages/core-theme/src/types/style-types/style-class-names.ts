import type { TextClassNames } from './text-style-classes.js';
import type { LayoutClassNames } from './layout-style-classes.js';
import type { ButtonClassNames } from './button-style-classes.js';
import type { BorderClassNames } from './border-style-classes.js';
import type { BackgroundClassNames } from './background-style-classes.js';

export type ThemeColor = 'black' | 'white' | 'muted' | 'primary' | string;

export type StyleClassNames = {
  text: TextClassNames;
  layout: LayoutClassNames;
  button: ButtonClassNames;
  border: BorderClassNames;
  background: BackgroundClassNames;
};
