import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { getComponentClasses } from '../utils/stylingUtils';
import { TextComponentProps } from '../../data-types/blocks/text/text-components';

type ParagraphProps = TextComponentProps & HTMLAttributes<HTMLParagraphElement>;

export const P: React.FC<ParagraphProps> = ({
  as: Tag = 'p',
  children,
  className,
  size,
  align,
  colorMode,
  themeColor,
  classOverride,
}) => {
  const { textColor, fontSize, leading, textAlign, spacing } = getComponentClasses('p', {
    size,
    align,
    themeColor,
    colorMode,
  });

  return (
    <Tag
      className={clsx(
        typeof classOverride !== 'undefined'
          ? classOverride
          : clsx(fontSize, textColor, textAlign, leading, spacing, className)
      )}
    >
      {children}
    </Tag>
  );
};
