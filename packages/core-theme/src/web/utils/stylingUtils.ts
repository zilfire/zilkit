import type {
  ThemeColor,
  ColorMode,
  TextAlign,
  TextSize,
  TextComponent,
  TextComponentVariant,
  FontStyle,
  FontWeight,
  Leading,
} from '../../data-types/utility/styling';
import { styleGuide } from '../utils/style-guide';

type DefaultStyles = {
  defaultSize: TextSize;
  defaultTextAlign: TextAlign;
  defaultColor: ThemeColor;
  defaultColorMode: ColorMode;
  defaultLeading: Leading;
  defaultFontWeight?: FontWeight;
  defaultFontStyle?: FontStyle;
  defaultBorder?: TextSize; // Optional border style
  defaultBorderColor?: ThemeColor; // Optional border color
};

export const getDefaultStyles = (component: TextComponentVariant): DefaultStyles => {
  const buildDefaultStyles = (): Record<TextComponentVariant, DefaultStyles> => {
    const components = Object.keys(
      styleGuide.defaultStyles.componentStyles
    ) as TextComponentVariant[];
    const result: Record<TextComponentVariant, DefaultStyles> = {} as Record<
      TextComponentVariant,
      DefaultStyles
    >;
    for (const component of components) {
      const compStyles = styleGuide.defaultStyles.componentStyles[component];
      result[component] = {
        defaultSize: compStyles.textSize,
        defaultTextAlign: compStyles.textAlign,
        defaultColor: compStyles.textColor,
        defaultColorMode: styleGuide.defaultStyles.colorMode,
        defaultLeading: compStyles.leading,
        defaultFontWeight: compStyles.fontWeight,
        defaultFontStyle: compStyles.fontStyle,
        defaultBorder: compStyles.border,
        defaultBorderColor: compStyles.borderColor,
      };
    }
    return result;
  };

  const defaultStyles = buildDefaultStyles();

  return defaultStyles[component] || defaultStyles.p; // Fallback to paragraph defaults
};

const getTextColorClass = (
  component: TextComponentVariant,
  themeColor: ThemeColor | undefined,
  colorMode: ColorMode | undefined
) => {
  const { defaultColor, defaultColorMode } = getDefaultStyles(component);
  return styleGuide.textColor[themeColor ?? defaultColor][colorMode ?? defaultColorMode];
};
const getFontSizeClass = (component: TextComponentVariant, size: TextSize | undefined) => {
  const defaultSize = getDefaultStyles(component).defaultSize;
  return styleGuide.componentStyles[component].fontSize[size ?? defaultSize];
};
const getLeadingClass = (component: TextComponentVariant, leading: Leading | undefined) => {
  const defaultLeading = getDefaultStyles(component).defaultLeading;
  return styleGuide.leading[leading ?? defaultLeading];
};

const getTextAlignClass = (component: TextComponentVariant, align: TextAlign | undefined) => {
  const defaultTextAlign = getDefaultStyles(component).defaultTextAlign;
  return styleGuide.componentStyles[component].textAlign[align ?? defaultTextAlign];
};
const getSpacingClass = (component: TextComponentVariant, size: TextSize | undefined) => {
  const defaultSize = getDefaultStyles(component).defaultSize;
  return styleGuide.componentStyles[component].spacing[size ?? defaultSize];
};
const getFontWeightClass = (
  component: TextComponentVariant,
  fontWeight: FontWeight | undefined
) => {
  const weight = fontWeight ?? styleGuide.defaultStyles.componentStyles[component].fontWeight;
  return typeof weight !== 'undefined' ? styleGuide.fontWeight[weight] : undefined;
};

const getFontStyleClass = (component: TextComponentVariant, fontStyle: FontStyle | undefined) => {
  const style = fontStyle ?? styleGuide.defaultStyles.componentStyles[component].fontStyle;
  return typeof style !== 'undefined' ? styleGuide.fontStyle[style] : undefined;
};

const getBorderClass = (component: TextComponentVariant, size: TextSize | undefined) => {
  const defaultBorder = getDefaultStyles(component).defaultBorder;
  const borderKey = size ?? defaultBorder ?? 'md';
  if (!borderKey) return '';

  const borderStyles = styleGuide.componentStyles[component].border;
  return borderStyles ? borderStyles[borderKey] ?? '' : '';
};

const getBorderColorClass = (component: TextComponentVariant, color: ThemeColor | undefined) => {
  const defaultColor = getDefaultStyles(component).defaultBorderColor;
  const borderColorKey = color ?? defaultColor ?? 'neutral';
  if (!borderColorKey) return '';

  const borderColorStyles = styleGuide.componentStyles[component].borderColor;
  return borderColorStyles ? borderColorStyles[borderColorKey] ?? '' : '';
};

export const getComponentClasses = (
  component: TextComponentVariant,
  options: {
    size?: TextSize;
    align?: TextAlign;
    themeColor?: ThemeColor;
    colorMode?: ColorMode;
    weight?: FontWeight;
    style?: FontStyle;
    leading?: Leading;
    border?: TextSize;
    borderColor?: ThemeColor;
  } = {}
) => {
  return {
    textColor: getTextColorClass(component, options.themeColor, options.colorMode),
    fontSize: getFontSizeClass(component, options.size),
    textLeading: getLeadingClass(component, options.leading),
    textAlign: getTextAlignClass(component, options.align),
    spacing: getSpacingClass(component, options.size),
    fontWeight: getFontWeightClass(component, options.weight),
    fontStyle: getFontStyleClass(component, options.style),
    border: getBorderClass(component, options.border),
    borderColor: getBorderColorClass(component, options.borderColor),
  };
};
