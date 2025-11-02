import type {
  TextElement,
  TextComponent,
  TextStyleGroup,
  TextClassOverrides,
} from '../../types/style-types/style-classes.js';
import { styleClassNames } from '../style/style-classes.js';
import { getTextClass } from '../style/style-utils.js';
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
  'border',
  'borderColor',
];

interface TextProps {
  element?: TextComponent;
  as?: TextElement;
  children: React.ReactNode;
  className?: string;
  classOverrides?: TextClassOverrides;
}

export type { TextProps };

const resolveComponent = (element: TextComponent, as?: TextElement): TextElement => {
  if (element === 'blockquote' || element === 'indent') {
    return as || DEFAULT_ELEMENT;
  }
  return as || (element as TextElement);
};

const handleStringOverrides = (classOverrides: string): string[] => [classOverrides];

const handleObjectOverrides = (
  classOverrides: Record<string, string>,
  element: TextComponent
): string[] => {
  const overrideKeys = Object.keys(classOverrides) as TextStyleGroup[];
  const providedClasses = Object.values(classOverrides).filter(Boolean) as string[];

  // Get remaining style groups that aren't overridden
  const remainingStyleGroups = TEXT_STYLE_GROUPS.filter((group) => !overrideKeys.includes(group));

  // Generate classes for remaining groups
  const generatedClasses = remainingStyleGroups
    .map((group: TextStyleGroup) => getTextClass(element, group, styleClassNames, {}))
    .filter(Boolean);

  // Combine provided override classes with generated classes
  return [...providedClasses, ...generatedClasses];
};

const generateDefaultClasses = (element: TextComponent): string[] => {
  return TEXT_STYLE_GROUPS.map((group: TextStyleGroup) =>
    getTextClass(element, group, styleClassNames, {})
  ).filter(Boolean);
};

const generateTextClasses = (
  element: TextComponent,
  classOverrides?: TextClassOverrides
): string[] => {
  if (typeof classOverrides === 'string') {
    return handleStringOverrides(classOverrides);
  }

  if (classOverrides && typeof classOverrides === 'object') {
    return handleObjectOverrides(classOverrides, element);
  }

  return generateDefaultClasses(element);
};

export const Text = ({
  element = DEFAULT_ELEMENT,
  as,
  children,
  className,
  classOverrides,
}: TextProps): React.ReactElement => {
  const Component = resolveComponent(element, as);
  const textClasses = generateTextClasses(element, classOverrides);

  return <Component className={clsx(textClasses, className)}>{children}</Component>;
};
