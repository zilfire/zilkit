import type {
  TextElement,
  TextComponent,
  TextStyleGroup,
  TextClassOverrides,
  TextLineDecoration,
  TextElementSize,
  TextSize,
  TextVariant,
  TextAlign,
} from '../../types/style-types/text-style-classes.js';
import { styleClassNames } from '../style/style-classes.js';
import { getTextClass } from '../style/style-utils/text-style-utils.js';
import clsx from 'clsx';

const DEFAULT_ELEMENT: TextElement = 'p';

const TEXT_STYLE_GROUPS: TextStyleGroup[] = [
  'textSize',
  'textAlign',
  'textColor',
  'leading',
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

export interface TextStyleOptions {
  textSize?: TextSize;
  textAlign?: TextAlign;
  bold?: boolean;
  italic?: boolean;
  lineDecoration?: TextLineDecoration | false;
  color?: string | false;
}

export interface TextProps {
  variant?: TextVariant;
  size?: TextElementSize;
  element?: TextComponent;
  as?: TextElement;
  children: React.ReactNode;
  className?: string;
  classOverrides?: TextClassOverrides;
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
  classOverrides?: TextClassOverrides
): string | string[] => {
  if (typeof classOverrides === 'string') {
    return classOverrides;
  }

  return TEXT_STYLE_GROUPS.map((group: TextStyleGroup) =>
    getTextClass(element, group, size, variant, styleClassNames, {
      ...styleOptions,
      classOverrides,
    })
  ).filter(Boolean);
};

export const Text = ({
  element = DEFAULT_ELEMENT,
  as,
  children,
  className,
  classOverrides,
  styleOptions = {},
  size = 'md',
  variant = 'normal',
  id,
}: TextProps): React.ReactElement => {
  const Component = resolveComponent(element, as);
  const textClasses = generateTextClasses(element, size, variant, styleOptions, classOverrides);
  return (
    <Component id={id} className={clsx(textClasses, className)}>
      {children}
    </Component>
  );
};
