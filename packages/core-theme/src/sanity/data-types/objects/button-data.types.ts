import type { NavLinkWithInternalPath } from '../index.js';

export type ButtonData = {
  _type: 'button';
  text: string;
  link: NavLinkWithInternalPath;
};
