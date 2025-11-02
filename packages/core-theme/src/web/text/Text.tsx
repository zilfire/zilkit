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

export const Text = ({
  element = DEFAULT_ELEMENT,
  as,
  children,
  className,
  classOverrides,
}: {
  element?: TextComponent;
  as?: TextElement;
  children: React.ReactNode;
  className?: string;
  classOverrides?: TextClassOverrides;
}): React.ReactElement => {
  // If blockquote or indent variant, set default element to ensure a proper HTML tag is used.
  if (element === 'blockquote' || element === 'indent') {
    if (typeof as === 'undefined') {
      as = DEFAULT_ELEMENT;
    }
  }
  const Component = as || (element as TextElement);

  const textStyleGroups: TextStyleGroup[] = [
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

  let textClasses: string[] = [];

  if (typeof classOverrides === 'string') {
    // If classOverrides is a string, use it in place of all textStyleGroup classNames
    textClasses = [classOverrides];
  } else if (classOverrides && typeof classOverrides === 'object') {
    // If classOverrides is a Record, use provided string classNames and generate the rest
    const overrideKeys = Object.keys(classOverrides) as TextStyleGroup[];
    const providedClasses = Object.values(classOverrides).filter(Boolean) as string[];

    // Get remaining style groups that aren't overridden
    const remainingStyleGroups = textStyleGroups.filter((group) => !overrideKeys.includes(group));

    // Generate classes for remaining groups
    const generatedClasses = remainingStyleGroups.map((group: TextStyleGroup) =>
      getTextClass(element, group, styleClassNames, {})
    );

    // Combine provided override classes with generated classes
    textClasses = [...providedClasses, ...generatedClasses];
  } else {
    // No classOverrides - use all style groups
    textClasses = textStyleGroups.map((group: TextStyleGroup) =>
      getTextClass(element, group, styleClassNames, {})
    );
  }

  return <Component className={clsx(textClasses, className)}>{children}</Component>;
};
