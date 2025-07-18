import { HTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children?: React.ReactNode;
  colorScheme?: 'light' | 'dark' | 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl' | `2xl`;
  align?: 'left' | 'center' | 'right' | 'justify';
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
  colorScheme = 'dark',
  size = 'md',
  align = 'left',
}) => {
  return (
    <p className={clsx(pClass({ colorScheme, size, align }), 'leading-normal', className)}>
      {children}
    </p>
  );
};
