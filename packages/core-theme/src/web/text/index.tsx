import { TextComponentProps } from '../../data-types/blocks/text/text-components';
import { getComponentClasses } from '../utils/stylingUtils';
import clsx from 'clsx';

export * from './P';
export * from './H5';
export * from './H4';
export * from './H3';
export * from './H2';
export * from './H1';
export * from './Span';
export * from './OL';
export * from './UL';
export * from './LI';
export * from './PortableTextComponents';

export const Text: React.FC<TextComponentProps> = ({
  as: Tag = 'p',
  children,
  className,
  size,
  align,
  colorMode,
  themeColor,
  classOverride,
}) => {
  const { textColor, fontSize, leading, textAlign, spacing } = getComponentClasses(Tag, {
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
