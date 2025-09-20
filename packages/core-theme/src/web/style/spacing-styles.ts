import {
  lineSpacingXS,
  lineSpacingSM,
  lineSpacingMD,
  lineSpacingLG,
  lineSpacingXL,
  lineSpacing2XL,
  sectionSpacingXS,
  sectionSpacingSM,
  sectionSpacingMD,
  sectionSpacingLG,
  sectionSpacingXL,
  sectionSpacing2XL,
  containerPadding,
} from './style-variables.js';

export const spacingStyles = {
  line: {
    xs: lineSpacingXS,
    sm: lineSpacingSM,
    md: lineSpacingMD,
    lg: lineSpacingLG,
    xl: lineSpacingXL,
    '2xl': lineSpacing2XL,
  },
  section: {
    xs: sectionSpacingXS,
    sm: sectionSpacingSM,
    md: sectionSpacingMD,
    lg: sectionSpacingLG,
    xl: sectionSpacingXL,
    '2xl': sectionSpacing2XL,
  },
  containerPadding,
};
