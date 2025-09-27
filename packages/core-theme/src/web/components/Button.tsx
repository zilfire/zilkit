import { styleGuide } from '../style/style-guide.js';
import type {
  ThemeColor,
  ColorTone,
  ButtonSize,
  RoundingSize,
  FontWeight,
} from '../style/style-types.js';
import clsx from 'clsx';
import { ButtonData } from '../../types/sanity-data-types/index.js';
import { ThemeContext } from '../../types/context/index.js';
import { renderLinkPath } from '../../utils/render-link-path.js';

export type ButtonOptions = {
  colorTone?: ColorTone;
  backgroundColor?: ThemeColor;
  textColor?: ThemeColor;
  size?: ButtonSize;
  rounding?: RoundingSize;
  fontWeight?: FontWeight;
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
    colorTone = 'medium',
    backgroundColor = 'primary',
    textColor = 'black',
    size = 'md',
    rounding = 'md',
    fontWeight = 'normal',
  } = options || {};

  const backgroundClass = styleGuide.bgColor[backgroundColor][colorTone];
  const textClass = styleGuide.textColor[textColor][colorTone];
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
          'hover:brightness-95 inline-block'
        )}
      >
        {content}
      </button>
    </Link>
  );
};
