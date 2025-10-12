import { styleGuide } from '../style/style-guide.js';
import type {
  ThemeColor,
  ColorTone,
  ButtonSize,
  RoundingSize,
  FontWeight,
  OpacityOption,
} from '../../types/style-types/index.js';
import clsx from 'clsx';
import { ButtonData } from '../../types/sanity-data-types/index.js';
import { ThemeContext } from '../../types/context-types/index.js';
import { renderLinkPath } from '../../utils/render-link-path.js';

export type ButtonVariant = 'outline' | 'solid';

export type ButtonOptions = {
  variant?: ButtonVariant;
  bgOpacity?: OpacityOption;
  bgColorTone?: ColorTone;
  bgColor?: ThemeColor;
  textColor?: ThemeColor;
  textColorTone?: ColorTone;
  size?: ButtonSize;
  rounding?: RoundingSize;
  fontWeight?: FontWeight;
  className?: string;
};

export type ButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  options?: ButtonOptions;
  data: ButtonData;
  context: ThemeContext;
};

export const Button: React.FC<ButtonProps> = ({ onClick, children, options, context, data }) => {
  const path = data.link ? renderLinkPath(data.link) : '';
  const content = data.text || children;
  const Link = context.LinkComponent;
  const {
    bgColorTone = '500',
    bgColor = 'primary',
    textColor = 'black',
    textColorTone = '700',
    size = 'md',
    rounding = 'md',
    fontWeight = 'normal',
    variant = 'solid',
    bgOpacity: optionsBgOpacity,
  } = options || {};

  let bgOpacity = optionsBgOpacity ? optionsBgOpacity : variant === 'outline' ? '0' : '50';

  const bgOpacityClass = styleGuide.bgOpacity[bgOpacity];
  const backgroundClass = styleGuide.bgColor[bgColor][bgColorTone];
  const textClass = styleGuide.textColor[textColor][textColorTone];
  const fontSizeClass = styleGuide.componentStyles.button.fontSize[size];
  const spacingClass = styleGuide.componentStyles.button.spacing[size];
  const roundingClass = styleGuide.rounding[rounding];
  const fontWeightClass = styleGuide.fontWeight[fontWeight];
  const className = options?.className || '';

  return (
    <Link href={path}>
      <button
        className={clsx(
          backgroundClass,
          textClass,
          fontSizeClass,
          spacingClass,
          roundingClass,
          fontWeightClass,
          bgOpacityClass,
          'hover:brightness-95 inline-block',
          className
        )}
      >
        {content}
      </button>
    </Link>
  );
};
