import type {
  ThemeColor,
  ColorShade,
  TextAlign,
  TextSize,
  TextComponentVariant,
  FontStyle,
  FontWeight,
  Leading,
  ListType,
  ListPosition,
  TextStylesOverride,
  TextStylesForOverride,
} from '../style/style-types.js';
import { styleGuide } from '../style/style-guide.js';
import { isArray } from 'sanity';

type DefaultStyles = {
  defaultSize: TextSize;
  defaultTextAlign: TextAlign;
  defaultColor: ThemeColor;
  defaultColorShade: ColorShade;
  defaultLeading: Leading;
  defaultFontWeight?: FontWeight;
  defaultFontStyle?: FontStyle;
  defaultBorder?: TextSize;
  defaultBorderColor?: ThemeColor;
  defaultListType?: ListType;
  defaultListPosition?: ListPosition;
  defaultFontFamily?: string;
};

type StyleOptions = {
  size?: TextSize;
  align?: TextAlign;
  themeColor?: ThemeColor;
  colorShade?: ColorShade;
  weight?: FontWeight;
  style?: FontStyle;
  leading?: Leading;
  border?: TextSize;
  borderColor?: ThemeColor;
  listType?: ListType;
  listPosition?: ListPosition;
  fontFamily?: string;
  styleOverride?: TextStylesOverride;
};

// Cache
const styleCache = new Map<TextComponentVariant, DefaultStyles>();
const componentClassCache = new Map<string, ReturnType<typeof getTextComponentClasses>>();

// Validation
function isValidComponent(component: TextComponentVariant): boolean {
  return component in styleGuide.defaultStyles.componentStyles;
}

// Cache Management
export const clearStyleCache = (): void => {
  styleCache.clear();
  componentClassCache.clear();
};

export const preloadComponentStyles = (components: TextComponentVariant[]): void => {
  components.forEach(getDefaultStyles);
};

/**
 * Gets the default styles for a component
 * @param component The component variant to get styles for
 * @throws Error if component variant is invalid
 */
export const getDefaultStyles = (component: TextComponentVariant): DefaultStyles => {
  if (!isValidComponent(component)) {
    throw new Error(`Invalid component: ${component}`);
  }

  if (!styleCache.has(component)) {
    try {
      const compStyles = styleGuide.defaultStyles.componentStyles[component];
      styleCache.set(component, {
        defaultSize: compStyles.textSize,
        defaultTextAlign: compStyles.textAlign,
        defaultColor: compStyles.textColor,
        defaultColorShade: compStyles.colorShade,
        defaultLeading: compStyles.leading,
        defaultFontWeight: compStyles.fontWeight,
        defaultFontStyle: compStyles.fontStyle,
        defaultBorder: compStyles.border,
        defaultBorderColor: compStyles.borderColor,
        defaultListType: compStyles.listType,
        defaultListPosition: compStyles.listPosition,
        defaultFontFamily: compStyles.fontFamily,
      });
    } catch (error) {
      console.error(`Error creating default styles for ${component}:`, error);
      throw new Error(`Failed to create default styles for ${component}`);
    }
  }

  return styleCache.get(component)!;
};

const checkOverride = (
  stylesOverride: TextStylesOverride | undefined,
  override: TextStylesForOverride
): boolean => {
  if (
    typeof stylesOverride !== 'undefined' &&
    (stylesOverride == override ||
      (Array.isArray(stylesOverride) && stylesOverride.includes(override)))
  ) {
    return true;
  }
  return false;
};

const getTextColorClass = (component: TextComponentVariant, options: StyleOptions = {}): string => {
  try {
    const { themeColor, colorShade, styleOverride } = options;

    if (checkOverride(styleOverride, 'textColor')) return '';

    const { defaultColor, defaultColorShade } = getDefaultStyles(component);
    const color = themeColor ?? defaultColor;
    const shade = colorShade ?? defaultColorShade;
    console.log('getTextColorClass:', { component, color, shade });

    if (!(color in styleGuide.textColor)) {
      throw new Error(`Invalid theme color: ${color}`);
    }

    return styleGuide.textColor[color][shade];
  } catch (error) {
    console.error(`Error getting text color class:`, error);
    return styleGuide.textColor.neutral.medium; // Fallback
  }
};

const getFontSizeClass = (component: TextComponentVariant, options: StyleOptions = {}) => {
  const { size, styleOverride } = options;

  if (checkOverride(styleOverride, 'textSize')) return '';

  const defaultSize = getDefaultStyles(component).defaultSize;
  return styleGuide.componentStyles[component].fontSize[size ?? defaultSize];
};

const getLeadingClass = (component: TextComponentVariant, options: StyleOptions = {}) => {
  const { leading, styleOverride } = options;

  if (checkOverride(styleOverride, 'leading')) return '';

  const defaultLeading = getDefaultStyles(component).defaultLeading;
  return styleGuide.leading[leading ?? defaultLeading];
};

const getTextAlignClass = (component: TextComponentVariant, options: StyleOptions = {}) => {
  const { align, styleOverride } = options;

  if (checkOverride(styleOverride, 'textAlign')) return '';

  const defaultTextAlign = getDefaultStyles(component).defaultTextAlign;
  const compStyles = styleGuide.componentStyles[component];
  if (compStyles && compStyles.textAlign) {
    return compStyles.textAlign[align ?? defaultTextAlign];
  }
  return '';
};
const getSpacingClass = (component: TextComponentVariant, options: StyleOptions = {}) => {
  const { size, styleOverride } = options;

  if (checkOverride(styleOverride, 'spacing')) return '';

  const defaultSize = getDefaultStyles(component).defaultSize;
  return styleGuide.componentStyles[component].spacing[size ?? defaultSize];
};
const getFontWeightClass = (component: TextComponentVariant, options: StyleOptions = {}) => {
  const { weight: fontWeight, styleOverride } = options;

  if (checkOverride(styleOverride, 'fontWeight')) return '';

  const weight = fontWeight ?? getDefaultStyles(component).defaultFontWeight;
  return typeof weight !== 'undefined' ? styleGuide.fontWeight[weight] : undefined;
};

const getFontStyleClass = (component: TextComponentVariant, options: StyleOptions = {}) => {
  const { style: fontStyle, styleOverride } = options;

  if (checkOverride(styleOverride, 'fontStyle')) return '';

  const style = fontStyle ?? getDefaultStyles(component).defaultFontStyle;
  return typeof style !== 'undefined' ? styleGuide.fontStyle[style] : undefined;
};

const getBorderClass = (component: TextComponentVariant, options: StyleOptions = {}) => {
  const { size, styleOverride } = options;

  if (checkOverride(styleOverride, 'border')) return '';

  const defaultBorder = getDefaultStyles(component).defaultBorder;
  const borderKey = size ?? defaultBorder ?? 'md';
  if (!borderKey) return '';

  const borderStyles = styleGuide.componentStyles[component].border;
  return borderStyles ? borderStyles[borderKey] ?? '' : '';
};

const getBorderColorClass = (component: TextComponentVariant, options: StyleOptions = {}) => {
  const { borderColor, styleOverride } = options;

  if (checkOverride(styleOverride, 'border')) return '';

  const defaultColor = getDefaultStyles(component).defaultBorderColor;
  const borderColorKey = borderColor ?? defaultColor ?? 'neutral';
  if (!borderColorKey) return '';

  const borderColorStyles = styleGuide.componentStyles[component].borderColor;
  return borderColorStyles ? borderColorStyles[borderColorKey] ?? '' : '';
};

const getListTypeClass = (component: TextComponentVariant, options: StyleOptions = {}) => {
  const { listType, styleOverride } = options;

  if (checkOverride(styleOverride, 'listType')) return '';

  const defaultListType = getDefaultStyles(component).defaultListType;
  if (!listType && !defaultListType) return undefined;
  return listType ? listType : styleGuide.listType[defaultListType ?? 'disc'];
};

const getListPositionClass = (component: TextComponentVariant, options: StyleOptions = {}) => {
  const { listPosition, styleOverride } = options;

  if (checkOverride(styleOverride, 'listPosition')) return '';

  const defaultListPosition = getDefaultStyles(component).defaultListPosition;
  if (!listPosition && !defaultListPosition) return undefined;
  return listPosition ? listPosition : styleGuide.listPosition[defaultListPosition ?? 'inside'];
};

const getFontFamilyClass = (component: TextComponentVariant, options: StyleOptions = {}) => {
  const { fontFamily, styleOverride } = options;

  if (checkOverride(styleOverride, 'fontFamily')) return '';

  return fontFamily ?? getDefaultStyles(component).defaultFontFamily;
};

export const getTextComponentClasses = (
  component: TextComponentVariant,
  options: StyleOptions = {}
): Record<string, string | undefined> => {
  const cacheKey = `${component}-${JSON.stringify(options)}`;

  if (!componentClassCache.has(cacheKey)) {
    const classes = {
      textColor: getTextColorClass(component, options),
      fontSize: getFontSizeClass(component, options),
      textLeading: getLeadingClass(component, options),
      textAlign: getTextAlignClass(component, options),
      spacing: getSpacingClass(component, options),
      fontWeight: getFontWeightClass(component, options),
      fontStyle: getFontStyleClass(component, options),
      border: getBorderClass(component, options),
      borderColor: getBorderColorClass(component, options),
      listType: getListTypeClass(component, options),
      listPosition: getListPositionClass(component, options),
      fontFamily: getFontFamilyClass(component, options),
    };

    componentClassCache.set(cacheKey, classes);
  }

  return componentClassCache.get(cacheKey)!;
};
