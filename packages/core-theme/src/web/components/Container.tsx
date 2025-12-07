import { getContainerXPaddingClass, getContainerClass } from '../style/utils/layout-style-utils.js';
import type { ThemeContext } from '../../sanity/data-types/index.js';
import { styleClassNames } from '../style/classes/style-classes.js';
import clsx from 'clsx';

interface ContainerProps {
  children: React.ReactNode;
  context: ThemeContext;
}

// todo: add responsive padding props
export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className={clsx(
        getContainerClass(styleClassNames),
        getContainerXPaddingClass('md', styleClassNames)
      )}
    >
      {children}
    </div>
  );
};
