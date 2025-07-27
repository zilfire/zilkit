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
  leading,
  weight,
  style,
}) => {
  const { textColor, fontSize, textLeading, fontWeight, fontStyle, textAlign, spacing } =
    getComponentClasses('p', {
      size,
      align,
      themeColor,
      colorMode,
      leading,
      weight,
      style,
    });

  return (
    <Tag
      className={clsx(
        typeof classOverride !== 'undefined'
          ? classOverride
          : clsx(
              fontSize,
              textColor,
              textAlign,
              textLeading,
              fontWeight,
              fontStyle,
              spacing,
              className
            )
      )}
    >
      {children}
    </Tag>
  );
};
