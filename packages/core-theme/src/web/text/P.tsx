import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import type { ColorMode, ThemeColor, TextAlign, TextSize } from '../../data-types/utility/styling';
import { styleGuide } from '../utils/style-guide';

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children?: React.ReactNode;
  colorScheme?: 'light' | 'dark' | 'primary' | 'secondary' | 'accent';
  size?: TextSize;
  align?: TextAlign;
  colorMode?: ColorMode;
  themeColor?: ThemeColor;
}

export const P: React.FC<ParagraphProps> = ({
  children,
  className,
  size,
  align,
  colorMode,
  themeColor,
}) => {
  const defaultSize = styleGuide.defaultStyles.componentStyles.p.size;
  const defaultTextAlign = styleGuide.defaultStyles.componentStyles.p.align;
  const defaultColor = styleGuide.defaultStyles.componentStyles.p.color;
  const defaultColorMode = styleGuide.defaultStyles.colorMode;

  const colorClass =
    styleGuide.textColor[themeColor ?? defaultColor][colorMode ?? defaultColorMode];
  const fontSizeClass = styleGuide.componentStyles.p.fontSize[size ?? defaultSize];
  const leadingClass = styleGuide.componentStyles.p.leading[size ?? defaultSize];
  const textAlignClass = styleGuide.componentStyles.p.textAlign[align ?? defaultTextAlign];
  const spacingClass = styleGuide.componentStyles.p.spacing[size ?? defaultSize];

  return (
    <p
      className={clsx(
        fontSizeClass,
        colorClass,
        textAlignClass,
        leadingClass,
        spacingClass,
        className
      )}
    >
      {children}
    </p>
  );
};
