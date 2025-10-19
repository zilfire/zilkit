import clsx from 'clsx';
import type { Size } from '../../deprecated/types/style-types/index.js';
import { styleGuide } from '../style/style-guide.js';

export type ContainerOptions = {
  verticalPadding?: Size;
  containerClassName?: string;
  containerClassOverride?: boolean;
};

export type ContainerProps = {
  children?: React.ReactNode;
  options?: ContainerOptions;
  className?: string;
};

// @todo: make horizontal padding configurable via styleGuide
const horizontalPaddingClass = 'px-3 md:px-4 lg:px-6';

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  options = {},
}): React.ReactElement => {
  const { containerClassName, containerClassOverride, verticalPadding } = options;

  const verticalPaddingClass = verticalPadding ? styleGuide.spacing.section[verticalPadding] : '';

  return (
    <div
      className={
        containerClassOverride === true
          ? containerClassName
          : clsx(
              'container relative mx-auto ',
              horizontalPaddingClass,
              containerClassName,
              verticalPaddingClass,
              className
            )
      }
    >
      {children}
    </div>
  );
};
