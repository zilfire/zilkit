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

const pClass = cva([], {
  variants: {
    colorScheme: {
      light: ['text-white'],
      dark: ['text-black'],
      primary: ['text-primary-700'],
      secondary: ['text-secondary-700'],
      accent: ['text-accent-700'],
    },
    size: {
      sm: ['leading-snug md: leading-normal', 'text-xs md:text-sm', 'mb-4 md:mb-6'],
      md: ['leading-snug md:leading-normal', 'text-base', 'mb-4 md:mb-6'],
      lg: ['leading-snug md:leading-normal', 'text-base md:text-lg', 'mb-6 md:mb-8'],
      xl: ['leading-snug md:leading-normal', 'text-lg md:text-xl', 'mb-6 md:mb-8'],
      '2xl': ['leading-snug md:leading-normal', 'text-xl md:text-2xl', 'mb-6 md:mb-8'],
    },
    align: {
      left: ['text-left'],
      center: ['text-center'],
      right: ['text-right'],
      justify: ['text-justify'],
    },
  },
});

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
  const fontSizeClass = styleGuide.textSize.p[size || styleGuide.defaults.p.size];
  const textAlignClass = styleGuide.textAlign[align || styleGuide.defaults.p.textAlign];

  return (
    <p className={clsx(fontSizeClass, colorClass, textAlignClass, 'leading-normal', className)}>
      {children}
    </p>
  );
};
