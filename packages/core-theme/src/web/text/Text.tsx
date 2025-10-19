import type {
  TextElement,
  TextComponent,
  TextStyleGroup,
  TextClassOverrides,
} from '../../types/style-types/style-classes.js';
import { styleClasses } from '../style/text-styles.js';
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

  if (classOverrides !== 'all') {
    if (Array.isArray(classOverrides)) {
      // Filter out classOverrides from textStyleGroups before mapping
      const filteredStyleGroups = textStyleGroups.filter(
        (group) => !classOverrides.includes(group)
      );

      textClasses = filteredStyleGroups.map((group: TextStyleGroup) =>
        getTextClass(element, group, styleClasses, {})
      );
    } else if (classOverrides) {
      // Single classOverride - filter it out
      const filteredStyleGroups = textStyleGroups.filter((group) => group !== classOverrides);

      textClasses = filteredStyleGroups.map((group: TextStyleGroup) =>
        getTextClass(element, group, styleClasses, {})
      );
    } else {
      // No classOverrides - use all style groups
      textClasses = textStyleGroups.map((group: TextStyleGroup) =>
        getTextClass(element, group, styleClasses, {})
      );
    }
  }

  return <Component className={clsx(textClasses, className)}>{children}</Component>;
};
