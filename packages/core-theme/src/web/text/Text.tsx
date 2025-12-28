import type {
  TextElement,
  TextComponent,
  TextStyleGroup,
  TextStyleOverride,
  TextElementSize,
  TextVariant,
  TextStyleOptions,
} from '../style/types/text-style-classes.js';
import { getTextClass } from '../style/utils/text-style-utils.js';
import clsx from 'clsx';

const DEFAULT_ELEMENT: TextElement = 'p';

// todo: revisit leading -- currently part of font-size in tailwind config

const TEXT_STYLE_GROUPS: TextStyleGroup[] = [
  'textSize',
  'textAlign',
  'textColor',
  'fontWeight',
  'fontStyle',
  'fontFamily',
  'listType',
  'listPosition',
  'verticalSpacing',
  'horizontalSpacing',
  'lineDecoration',
  'border',
  'borderColor',
];

export interface TextProps {
  variant?: TextVariant;
  size?: TextElementSize;
  element?: TextComponent;
  as?: TextElement;
  children: React.ReactNode;
  className?: string;
  styleOverride?: TextStyleOverride;
  styleOptions?: TextStyleOptions;
  id?: string;
}

const resolveComponent = (element: TextComponent, as?: TextElement): TextElement => {
  if (element === 'blockquote' || element === 'indent') {
    return as || DEFAULT_ELEMENT;
  }
  return as || (element as TextElement);
};

const generateTextClasses = (
  element: TextComponent,
  size: TextElementSize,
  variant: string,
  styleOptions: TextStyleOptions,
  styleOverride: TextStyleOverride
): string | string[] => {
  if (typeof styleOverride === 'string') {
    return styleOverride;
  }

  return TEXT_STYLE_GROUPS.map((group: TextStyleGroup) =>
    getTextClass(element, group, size, variant, styleOptions, styleOverride)
  ).filter(Boolean) as string[];
};

export const Text = ({
  element = DEFAULT_ELEMENT,
  as,
  children,
  className,
  styleOverride = {},
  styleOptions = {},
  size = 'md',
  variant = 'normal',
  id,
}: TextProps): React.ReactElement => {
  const Component = resolveComponent(element, as);
  const textClasses = generateTextClasses(element, size, variant, styleOptions, styleOverride);

  return (
    <Component id={id} className={clsx(textClasses, className)}>
      {children}
    </Component>
  );
};
