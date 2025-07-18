import { HTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

interface ParagraphProps extends HTMLAttributes<HTMLHeadElement> {
  className?: string;
  children?: React.ReactNode;
  colorScheme?: 'light' | 'dark' | 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const pClass = cva([], {
  variants: {
    colorScheme: {
      light: ['text-white'],
      dark: ['text-black'],
      primary: ['text-primary-700'],
      secondary: ['text-secondary-700'],
      accent: ['text-accent-800'],
    },
    size: {
      sm: ['leading-snug md: leading-normal', 'text-sm', 'mb-1', 'font-sembold'],
      md: ['leading-snug md:leading-normal', 'text-base', 'mb-1', 'font-semibold'],
      lg: ['leading-snug md:leading-normal', 'text-lg', 'mb-1', 'font-semibold'],
      xl: ['leading-snug md:leading-normal', 'text-lg md:text-2xl', 'mb-1', 'font-semibold'],
    },
  },
});

export const H5: React.FC<ParagraphProps> = ({
  children,
  className,
  colorScheme = 'dark',
  size = 'md',
}) => {
  return (
    <h3 className={clsx(pClass({ colorScheme, size }), 'leading-normal', className)}>{children}</h3>
  );
};
