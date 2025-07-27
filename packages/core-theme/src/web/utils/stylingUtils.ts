import type {
  ThemeColor,
  ColorMode,
  TextAlign,
  TextSize,
  TextComponent,
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
};

export const getDefaultStyles = (component: TextComponent): DefaultStyles => {
  const defaultStyles: Record<TextComponent, DefaultStyles> = {
    p: {
      defaultSize: styleGuide.defaultStyles.componentStyles.p.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.p.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.p.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
      defaultLeading: styleGuide.defaultStyles.componentStyles.p.leading,
      defaultFontWeight: styleGuide.defaultStyles.componentStyles.p.fontWeight,
      defaultFontStyle: styleGuide.defaultStyles.componentStyles.p.fontStyle,
    },
    h1: {
      defaultSize: styleGuide.defaultStyles.componentStyles.h1.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.h1.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.h1.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
      defaultLeading: styleGuide.defaultStyles.componentStyles.h1.leading,
      defaultFontWeight: styleGuide.defaultStyles.componentStyles.h1.fontWeight,
      defaultFontStyle: styleGuide.defaultStyles.componentStyles.h1.fontStyle,
    },
    h2: {
      defaultSize: styleGuide.defaultStyles.componentStyles.h2.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.h2.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.h2.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
      defaultLeading: styleGuide.defaultStyles.componentStyles.h2.leading,
      defaultFontWeight: styleGuide.defaultStyles.componentStyles.h2.fontWeight,
      defaultFontStyle: styleGuide.defaultStyles.componentStyles.h2.fontStyle,
    },
    h3: {
      defaultSize: styleGuide.defaultStyles.componentStyles.h3.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.h3.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.h3.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
      defaultLeading: styleGuide.defaultStyles.componentStyles.h3.leading,
      defaultFontWeight: styleGuide.defaultStyles.componentStyles.h3.fontWeight,
      defaultFontStyle: styleGuide.defaultStyles.componentStyles.h3.fontStyle,
    },
    h4: {
      defaultSize: styleGuide.defaultStyles.componentStyles.h4.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.h4.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.h4.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
      defaultLeading: styleGuide.defaultStyles.componentStyles.h4.leading,
      defaultFontWeight: styleGuide.defaultStyles.componentStyles.h4.fontWeight,
      defaultFontStyle: styleGuide.defaultStyles.componentStyles.h4.fontStyle,
    },
    h5: {
      defaultSize: styleGuide.defaultStyles.componentStyles.h5.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.h5.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.h5.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
      defaultLeading: styleGuide.defaultStyles.componentStyles.h5.leading,
      defaultFontWeight: styleGuide.defaultStyles.componentStyles.h5.fontWeight,
      defaultFontStyle: styleGuide.defaultStyles.componentStyles.h5.fontStyle,
    },
    h6: {
      defaultSize: styleGuide.defaultStyles.componentStyles.h6.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.h6.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.h6.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
      defaultLeading: styleGuide.defaultStyles.componentStyles.h6.leading,
      defaultFontWeight: styleGuide.defaultStyles.componentStyles.h6.fontWeight,
      defaultFontStyle: styleGuide.defaultStyles.componentStyles.h6.fontStyle,
    },
    span: {
      defaultSize: styleGuide.defaultStyles.componentStyles.span.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.span.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.span.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
      defaultLeading: styleGuide.defaultStyles.componentStyles.span.leading,
      defaultFontWeight: styleGuide.defaultStyles.componentStyles.span.fontWeight,
      defaultFontStyle: styleGuide.defaultStyles.componentStyles.span.fontStyle,
    },
    li: {
      defaultSize: styleGuide.defaultStyles.componentStyles.li.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.li.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.li.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
      defaultLeading: styleGuide.defaultStyles.componentStyles.li.leading,
      defaultFontWeight: styleGuide.defaultStyles.componentStyles.li.fontWeight,
      defaultFontStyle: styleGuide.defaultStyles.componentStyles.li.fontStyle,
    },
    ol: {
      defaultSize: styleGuide.defaultStyles.componentStyles.ol.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.ol.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.ol.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
      defaultLeading: styleGuide.defaultStyles.componentStyles.ol.leading,
      defaultFontWeight: styleGuide.defaultStyles.componentStyles.ol.fontWeight,
      defaultFontStyle: styleGuide.defaultStyles.componentStyles.ol.fontStyle,
    },
    ul: {
      defaultSize: styleGuide.defaultStyles.componentStyles.ul.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.ul.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.ul.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
      defaultLeading: styleGuide.defaultStyles.componentStyles.ul.leading,
      defaultFontWeight: styleGuide.defaultStyles.componentStyles.ul.fontWeight,
      defaultFontStyle: styleGuide.defaultStyles.componentStyles.ul.fontStyle,
    },
  };

  return defaultStyles[component] || defaultStyles.p; // Fallback to paragraph defaults
};

const getTextColorClass = (
  component: TextComponent,
  themeColor: ThemeColor | undefined,
  colorMode: ColorMode | undefined
) => {
  const { defaultColor, defaultColorMode } = getDefaultStyles(component);
  return styleGuide.textColor[themeColor ?? defaultColor][colorMode ?? defaultColorMode];
};
const getFontSizeClass = (component: TextComponent, size: TextSize | undefined) => {
  const defaultSize = getDefaultStyles(component).defaultSize;
  return styleGuide.componentStyles[component].fontSize[size ?? defaultSize];
};
const getLeadingClass = (component: TextComponent, leading: Leading | undefined) => {
  const defaultLeading = getDefaultStyles(component).defaultLeading;
  return styleGuide.leading[leading ?? defaultLeading];
};

const getTextAlignClass = (component: TextComponent, align: TextAlign | undefined) => {
  const defaultTextAlign = getDefaultStyles(component).defaultTextAlign;
  return styleGuide.componentStyles[component].textAlign[align ?? defaultTextAlign];
};
const getSpacingClass = (component: TextComponent, size: TextSize | undefined) => {
  const defaultSize = getDefaultStyles(component).defaultSize;
  return styleGuide.componentStyles[component].spacing[size ?? defaultSize];
};
const getFontWeightClass = (component: TextComponent, fontWeight: FontWeight | undefined) => {
  const weight = fontWeight ?? styleGuide.defaultStyles.componentStyles[component].fontWeight;
  return typeof weight !== 'undefined' ? styleGuide.fontWeight[weight] : undefined;
};

const getFontStyleClass = (component: TextComponent, fontStyle: FontStyle | undefined) => {
  const style = fontStyle ?? styleGuide.defaultStyles.componentStyles[component].fontStyle;
  return typeof style !== 'undefined' ? styleGuide.fontStyle[style] : undefined;
};

export const getComponentClasses = (
  component: TextComponent,
  options: {
    size?: TextSize;
    align?: TextAlign;
    themeColor?: ThemeColor;
    colorMode?: ColorMode;
    weight?: FontWeight;
    style?: FontStyle;
    leading?: Leading;
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
  };
};
