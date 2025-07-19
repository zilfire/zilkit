import { HTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import type { ColorMode, ThemeColor, TextAlign, TextSize } from '../../data-types/utility/styling';
import { colorGrid } from '../utils/colorGrid';
import { styleGuide } from '../utils/textStyleUtils';

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
  const colorClass =
    styleGuide.textColor[themeColor || styleGuide.defaults.p.textColor][
      colorMode || styleGuide.defaults.colorMode
    ];
  const fontSizeClass = styleGuide.typography.p.fontSize[size || styleGuide.defaults.p.size];
  const leadingClass = styleGuide.typography.p.leading[size || styleGuide.defaults.p.size];
  const spacingClass = styleGuide.typography.p.spacing[size || styleGuide.defaults.p.size];
  const textAlignClass = styleGuide.textAlign[align || styleGuide.defaults.p.textAlign];

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
