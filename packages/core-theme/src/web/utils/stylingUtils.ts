import type {
  ThemeColor,
  ColorMode,
  TextAlign,
  TextSize,
  TextComponent,
} from '../../data-types/utility/styling';
import { styleGuide } from '../utils/style-guide';

type DefaultStyles = {
  defaultSize: TextSize;
  defaultTextAlign: TextAlign;
  defaultColor: ThemeColor;
  defaultColorMode: ColorMode;
};

export const getDefaultStyles = (component: TextComponent): DefaultStyles => {
  const defaultStyles: Record<TextComponent, DefaultStyles> = {
    p: {
      defaultSize: styleGuide.defaultStyles.componentStyles.p.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.p.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.p.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
    },
    h1: {
      defaultSize: styleGuide.defaultStyles.componentStyles.h1.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.h1.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.h1.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
    },
    h2: {
      defaultSize: styleGuide.defaultStyles.componentStyles.h2.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.h2.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.h2.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
    },
    h3: {
      defaultSize: styleGuide.defaultStyles.componentStyles.h3.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.h3.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.h3.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
    },
    h4: {
      defaultSize: styleGuide.defaultStyles.componentStyles.h4.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.h4.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.h4.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
    },
    h5: {
      defaultSize: styleGuide.defaultStyles.componentStyles.h5.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.h5.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.h5.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
    },
    h6: {
      defaultSize: styleGuide.defaultStyles.componentStyles.h6.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.h6.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.h6.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
    },
    span: {
      defaultSize: styleGuide.defaultStyles.componentStyles.span.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.span.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.span.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
    },
    li: {
      defaultSize: styleGuide.defaultStyles.componentStyles.li.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.li.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.li.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
    },
    ol: {
      defaultSize: styleGuide.defaultStyles.componentStyles.ol.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.ol.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.ol.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
    },
    ul: {
      defaultSize: styleGuide.defaultStyles.componentStyles.ul.size,
      defaultTextAlign: styleGuide.defaultStyles.componentStyles.ul.align,
      defaultColor: styleGuide.defaultStyles.componentStyles.ul.color,
      defaultColorMode: styleGuide.defaultStyles.colorMode,
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
const getLeadingClass = (component: TextComponent, size: TextSize | undefined) => {
  const defaultSize = getDefaultStyles(component).defaultSize;
  return styleGuide.componentStyles[component].leading[size ?? defaultSize];
};
const getTextAlignClass = (component: TextComponent, align: TextAlign | undefined) => {
  const defaultTextAlign = getDefaultStyles(component).defaultTextAlign;
  return styleGuide.componentStyles[component].textAlign[align ?? defaultTextAlign];
};
const getSpacingClass = (component: TextComponent, size: TextSize | undefined) => {
  const defaultSize = getDefaultStyles(component).defaultSize;
  return styleGuide.componentStyles[component].spacing[size ?? defaultSize];
};

export const getComponentClasses = (
  component: TextComponent,
  options: {
    size?: TextSize;
    align?: TextAlign;
    themeColor?: ThemeColor;
    colorMode?: ColorMode;
  } = {}
) => {
  return {
    textColor: getTextColorClass(component, options.themeColor, options.colorMode),
    fontSize: getFontSizeClass(component, options.size),
    leading: getLeadingClass(component, options.size),
    textAlign: getTextAlignClass(component, options.align),
    spacing: getSpacingClass(component, options.size),
  };
};
