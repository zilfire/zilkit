export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'secondary-accent'
  | 'neutral'
  | 'white'
  | 'black';

export type FontStyle = 'normal' | 'italic';

export type ColorMode =
  | 'darkest' //950 | 200 - The deepest, almost black.
  | 'dark' //900 | 200 - Standard dark backgrounds.
  | 'deep' //700 | 200- A deeper shade of color, used for emphasis.
  | 'medium' //500 | 950 or 50 - Mid backbground color
  | 'surface' //200 | 800 - Used for cards, sheets, or surfaces above the background.
  | 'light'; //50 | 800 - Standard light backgrounds.
