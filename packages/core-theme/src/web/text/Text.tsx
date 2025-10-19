import type { TextElement, TextComponent } from '../../types/style-types/text-styles.js';

const DEFAULT_ELEMENT: TextElement = 'p';

export const Text = ({
  element = DEFAULT_ELEMENT,
  as,
  children,
}: {
  element: TextComponent;
  as?: TextElement;
  children: React.ReactNode;
}): React.ReactElement => {
  // If blockquote or indent variant, set default element to ensure a proper HTML tag is used.
  if (element === 'blockquote' || element === 'indent') {
    if (typeof as === 'undefined') {
      as = DEFAULT_ELEMENT;
    }
  }
  const Component = as || (element as TextElement);

  return <Component>{children}</Component>;
};
