import { getButtonClasses } from '../style/style-utils/button-style-utils.js';
import { ButtonClassOverride } from '../../types/style-types/button-style-classes.js';
import { ThemeContext } from '../../types/index.js';
import type { ButtonSize } from '../../types/style-types/button-style-classes.js';
import { ButtonData } from '../../types/sanity-data-types/index.js';
import { renderLinkPath } from '../../utils/render-link-path.js';

interface ButtonProps {
  context: ThemeContext;
  // onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  data: ButtonData;
  options?: {
    variant?: string;
    size?: ButtonSize;
    color?: string;
    className?: string;
    classOverride?: ButtonClassOverride;
  };
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  context,
  // onClick,
  children,
  data,
  options: { variant, size, color, className, classOverride } = {},
  type = 'button',
  disabled = false,
  ariaLabel,
}) => {
  const content = data.text || children;
  const Link = context.LinkComponent;
  const path = data.link ? renderLinkPath(data.link) : '';
  // const hasLink = Boolean(path);

  const buttonClasses = getButtonClasses(context.styleClasses, {
    variant,
    size,
    color,
    className,
    classOverride,
  });

  // const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
  //   // If there's an onClick handler and no link, call it
  //   // If there's a link, let the Link component handle navigation
  //   if (onClick && !hasLink) {
  //     onClick(event);
  //   }
  // };

  // If there's a link, wrap button in Link component
  // if (hasLink) {
  return (
    <Link href={path}>
      <button className={buttonClasses} type={type} disabled={disabled} aria-label={ariaLabel}>
        {content}
      </button>
    </Link>
  );
  // }

  // Otherwise, render a button with onClick handler
  // return (
  //   <button
  //     className={buttonClasses}
  //     onClick={handleClick}
  //     type={type}
  //     disabled={disabled}
  //     aria-label={ariaLabel}
  //   >
  //     {content}
  //   </button>
  // );
};
