export type StyleOption<T> = T | false;

export type StyleOverride<T extends string | number | symbol> =
  | Partial<Record<T, string | false>>
  | string;
