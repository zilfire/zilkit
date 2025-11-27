import type { TextClassNames } from './text-style-classes.js';
import type { LayoutClassNames } from './layout-style.types.js';
import type { ButtonClassNames } from './button-style.types.js';
import type { BorderClassNames } from './border-style.types.js';
import type { BackgroundClassNames } from './background-style.types.js';

export type ThemeColor = 'black' | 'white' | 'muted' | 'primary' | string;

export type StyleClassNames = {
  text: TextClassNames;
  layout: LayoutClassNames;
  button: ButtonClassNames;
  border: BorderClassNames;
  background: BackgroundClassNames;
};

export type StyleOption<T> = T | false;

export type StyleOverride<T extends string | number | symbol> =
  | Partial<Record<T, string | false>>
  | string;
