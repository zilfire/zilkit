import type { NavLink } from './nav-link-data.types.js';

export type ButtonData = {
  _type: 'button';
  text: string;
  link: NavLink;
};
