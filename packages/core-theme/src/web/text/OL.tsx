import { HTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

interface OLProps extends HTMLAttributes<HTMLOListElement> {
  className?: string;
  children?: React.ReactNode;
  colorScheme?: 'light' | 'dark' | 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl' | `2xl`;
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
      md: ['leading-snug md:leading-normal', 'text-sm md:text-base', 'mb-4 md:mb-6'],
      lg: ['leading-snug md:leading-normal', 'text-base md:text-lg', 'mb-6 md:mb-8'],
      xl: ['leading-snug md:leading-normal', 'text-lg md:text-xl', 'mb-6 md:mb-8'],
      '2xl': ['leading-snug md:leading-normal', 'text-xl md:text-2xl', 'mb-6 md:mb-8'],
    },
  },
});

export const OL: React.FC<OLProps> = ({
  children,
  className,
  colorScheme = 'dark',
  size = 'md',
}) => {
  return (
    <ol
      className={clsx(
        pClass({ colorScheme, size }),
        'leading-normal',
        'list-decimal',
        'list-outside',
        'pl-8',
        className
      )}
    >
      {children}
    </ol>
  );
};
