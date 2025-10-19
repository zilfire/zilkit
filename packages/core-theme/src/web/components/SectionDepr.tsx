import clsx from 'clsx';
import { styleGuide } from '../../deprecated/web/style/style-guide.js';

const sectionSpacing = styleGuide.spacing.section;

type SectionProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  size?: keyof typeof sectionSpacing;
};

export const Section = ({ children, className, id, size }: SectionProps): React.ReactElement => {
  const sectionSpacingClass = sectionSpacing[size || 'md'];
  return (
    <section className={clsx(sectionSpacingClass, className)} id={id}>
      {children}
    </section>
  );
};
