import type {
  ColorMode,
  TextComponent,
  TextComponentStyles,
  TextComponentVariant,
} from '../style/style-types';
import { getTextComponentClasses } from './text-utils';
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
export * from './portable-text-components';

export type TextComponentProps = TextComponentStyles & {
  variant?: TextComponentVariant;
  as?: TextComponent;
  children?: React.ReactNode;
  colorMode?: ColorMode;
};

export const Text: React.FC<TextComponentProps> = ({
  variant = 'p',
  as,
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
  listType,
  listPosition,
  fontFamily,
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
    listType: listTypeClass,
    listPosition: listPositionClass,
    fontFamily: fontFamilyClass,
  } = getTextComponentClasses(variant, {
    size: textSize,
    align: textAlign,
    themeColor: textColor,
    colorMode,
    leading,
    weight: fontWeight,
    style: fontStyle,
    border,
    borderColor,
    listType,
    listPosition,
    fontFamily,
  });

  let variantTag = undefined;
  if (typeof variant !== 'undefined' && variant !== 'indent') {
    variantTag = as || variant;
  }
  const Tag = as || variantTag || 'p';

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
              listTypeClass,
              listPositionClass,
              fontFamilyClass,
              className
            )
      )}
    >
      {children}
    </Tag>
  );
};
