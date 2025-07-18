import type { ThemeColor } from '../../data-types/utility/styling';

export function getBorderColor(
  color: ThemeColor,
  defaultColorClass: string = 'border-primary-500'
) {
  switch (color) {
    case 'primary':
      return 'border-primary-500';
    case 'secondary':
      return 'border-secondary-500';
    case 'accent':
      return 'border-accent-500';
    case 'secondary-accent':
      return 'border-secondary-accent-500';
    case 'neutral':
      return 'border-neutral-500';
    case 'white':
      return 'border-white-500';
    case 'black':
      return 'border-black-500';
    default:
      return defaultColorClass;
  }
}

export function getFontColor(color: ThemeColor, defaultColorClass: string = 'text-black') {
  switch (color) {
    case 'primary':
      return 'text-primary-700';
    case 'secondary':
      return 'text-secondary-700';
    case 'accent':
      return 'text-accent-700';
    case 'secondary-accent':
      return 'text-secondary-accent-700';
    case 'neutral':
      return 'text-neutral-700';
    case 'white':
      return 'text-white';
    case 'black':
      return 'text-black';
    default:
      return defaultColorClass;
  }
}
