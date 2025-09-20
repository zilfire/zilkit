// @ts-ignore
import Link from 'next/link';
import { styleGuide } from '../../style/style-guide.js';
import {
  ThemeColor,
  ColorMode,
  ButtonSize,
  RoundingSize,
  FontWeight,
} from '../../style/style-types.js';
import clsx from 'clsx';

export type ButtonOptions = {
  colorMode?: ColorMode;
  backgroundColor?: ThemeColor;
  textColor?: ThemeColor;
  size?: ButtonSize;
  rounding?: RoundingSize;
  fontWeight?: FontWeight;
};

export type ButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  path: string;
  options?: ButtonOptions;
};

export const Button: React.FC<ButtonProps> = ({ onClick, children, path, options }) => {
  const {
    colorMode = 'dark',
    backgroundColor = 'primary',
    textColor = 'white',
    size = 'md',
    rounding = 'md',
    fontWeight = 'normal',
  } = options || {};

  const backgroundClass = styleGuide.bgColor[backgroundColor][colorMode];
  const textClass = styleGuide.textColor[textColor][colorMode];
  const fontSizeClass = styleGuide.componentStyles.button.fontSize[size];
  const spacingClass = styleGuide.componentStyles.button.spacing[size];
  const roundingClass = styleGuide.rounding[rounding];
  const fontWeightClass = styleGuide.fontWeight[fontWeight];

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
          'hover:brightness-90'
        )}
      >
        {children}
      </button>
    </Link>
  );
};
