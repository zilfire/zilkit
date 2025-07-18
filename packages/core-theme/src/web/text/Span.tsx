import { HTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

interface SpanProps extends HTMLAttributes<HTMLSpanElement> {
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
      sm: ['leading-snug md:leading-normal', 'text-xs md:text-sm'],
      md: ['leading-snug md:leading-normal', 'text-base'],
      lg: ['leading-snug md:leading-normal', 'text-base md:text-lg'],
      xl: ['leading-snug md:leading-normal', 'text-lg md:text-xl'],
      '2xl': ['leading-snug md:leading-normal', 'text-xl md:text-2xl'],
    },
    align: {
      left: ['text-left'],
      center: ['text-center'],
      right: ['text-right'],
      justify: ['text-justify'],
    },
  },
});

export const Span: React.FC<SpanProps> = ({
  children,
  className,
  colorScheme = 'dark',
  size = 'md',
  align = 'left',
}) => {
  return (
    <span className={clsx(pClass({ colorScheme, size, align }), 'leading-normal', className)}>
      {children}
    </span>
  );
};
