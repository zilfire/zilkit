import { getContainerPaddingClass } from '../style/style-utils/layout-style-utils.js';
import type { ThemeContext } from '../../types/index.js';
import clsx from 'clsx';

interface ContainerProps {
  children: React.ReactNode;
  context: ThemeContext;
}

// todo: add responsive padding props
export const Container: React.FC<ContainerProps> = ({ children, context: { styleClasses } }) => {
  return (
    <div className={clsx('container mx-auto', getContainerPaddingClass('md', styleClasses))}>
      {children}
    </div>
  );
};
