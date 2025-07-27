import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { getComponentClasses } from '../utils/stylingUtils';
import { TextComponentProps } from '../../data-types/blocks/text/text-components';

type SpanProps = TextComponentProps & HTMLAttributes<HTMLSpanElement>;

export const Span: React.FC<SpanProps> = ({
  children,
  className,
  size,
  align,
  colorMode,
  themeColor,
  classOverride,
}) => {
  const { textColor, fontSize, leading, textAlign, spacing } = getComponentClasses('span', {
    size,
    align,
    themeColor,
    colorMode,
  });

  return (
    <span
      className={clsx(
        typeof classOverride !== 'undefined'
          ? classOverride
          : clsx(fontSize, textColor, textAlign, leading, spacing, className)
      )}
    >
      {children}
    </span>
  );
};
