import { HTMLAttributes } from 'react';
// import { cva } from 'class-variance-authority';
import clsx from 'clsx';

interface LIProps extends HTMLAttributes<HTMLLIElement> {
  className?: string;
  children?: React.ReactNode;
  // colorScheme?: 'light' | 'dark' | 'primary' | 'secondary' | 'accent';
  // size?: 'sm' | 'md' | 'lg';
}

// const pClass = cva([], {
//   variants: {
//     colorScheme: {
//       light: ['text-white'],
//       dark: ['text-black'],
//       primary: ['text-primary-700'],
//       secondary: ['text-secondary-700'],
//       accent: ['text-accent-700'],
//     },
//     size: {
//       sm: ['leading-snug md:leading-normal', 'text-xs md:text-sm'],
//       md: ['leading-snug md:leading-normal', 'text-sm md:text-base'],
//       lg: ['leading-snug md:leading-normal', 'text-base md:text-lg'],
//     },
//   },
// });

export const LI: React.FC<LIProps> = ({
  children,
  className,
  // colorScheme = 'dark',
  // size = 'md',
}) => {
  return <li className={clsx('leading-normal', className)}>{children}</li>;
};
