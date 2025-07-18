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
      primary: ['text-primary-800'],
      secondary: ['text-secondary-800'],
      accent: ['text-accent-800'],
    },
    size: {
      sm: ['leading-snug md:leading-normal', 'text-xl md:text-3xl', 'mb-3', 'font-bold'],
      md: ['leading-snug md:leading-normal', 'text-2xl md:text-4xl', 'mb-3', 'font-bold'],
      lg: ['leading-snug md:leading-normal', 'text-3xl md:text-5xl', 'mb-3', 'font-bold'],
      xl: ['leading-snug md:leading-normal', 'text-4xl md:text-5xl', 'mb-3', 'font-bold'],
    },
  },
});

export const H2: React.FC<ParagraphProps> = ({
  children,
  className,
  colorScheme = 'dark',
  size = 'md',
}) => {
  return (
    <h2 className={clsx(pClass({ colorScheme, size }), 'leading-normal', className)}>{children}</h2>
  );
};
