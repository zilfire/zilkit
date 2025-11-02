import clsx from 'clsx';

interface SectionProps {
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ className, children }) => {
  return <section className={clsx('relative z-10', className)}>{children}</section>;
};
