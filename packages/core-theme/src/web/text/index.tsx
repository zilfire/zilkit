import type {
  ColorTone,
  TextComponent,
  TextComponentStyles,
  TextComponentVariant,
} from '../../types/style-types/index.js';
import { getTextComponentClasses } from './text-utils.js';
import clsx from 'clsx';

export * from './P.js';
export * from './H5.js';
export * from './H4.js';
export * from './H3.js';
export * from './H2.js';
export * from './H1.js';
export * from './Span.js';
export * from './OL.js';
export * from './UL.js';
export * from './LI.js';
export * from './portable-text-components.js';

export type TextComponentProps = TextComponentStyles & {
  variant?: TextComponentVariant;
  as?: TextComponent;
  children?: React.ReactNode;
  colorTone?: ColorTone;
};

export const Text: React.FC<TextComponentProps> = ({
  variant = 'p',
  as,
  children,
  className,
  textSize,
  textAlign,
  colorTone,
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
  styleOverride,
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
    colorTone,
    leading,
    weight: fontWeight,
    style: fontStyle,
    border,
    borderColor,
    listType,
    listPosition,
    fontFamily,
    styleOverride,
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
