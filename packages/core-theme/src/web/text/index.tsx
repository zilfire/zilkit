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
  variant = 'p',
  as: Tag = 'p',
  children,
  className,
  textSize,
  textAlign,
  colorMode,
  textColor,
  classOverride,
  leading,
  fontWeight,
  fontStyle,
  border,
  borderColor,
}) => {
  const {
    textColor: textColorClass,
    fontSize: fontSizeClass,
    textLeading: textLeadingClass,
    fontStyle: fontStyleClass,
    fontWeight: fontWeightClass,
    textAlign: textAlignClass,
    spacing: spacingClass,
    border: borderClass,
    borderColor: borderColorClass,
  } = getComponentClasses(variant, {
    size: textSize,
    align: textAlign,
    themeColor: textColor,
    colorMode,
    leading,
    weight: fontWeight,
    style: fontStyle,
    border,
    borderColor,
  });
  console.log('variant:', variant);

  return (
    <Tag
      className={clsx(
        typeof classOverride !== 'undefined'
          ? classOverride
          : clsx(
              fontSizeClass,
              textColorClass,
              textAlignClass,
              textLeadingClass,
              fontStyleClass,
              fontWeightClass,
              spacingClass,
              borderClass,
              borderColorClass,
              className
            )
      )}
    >
      {children}
    </Tag>
  );
};
