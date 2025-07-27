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
  leading,
  weight,
  style,
}) => {
  const { textColor, fontSize, textLeading, fontStyle, fontWeight, textAlign, spacing } =
    getComponentClasses(Tag, {
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
              fontStyle,
              fontWeight,
              spacing,
              className
            )
      )}
    >
      {children}
    </Tag>
  );
};
