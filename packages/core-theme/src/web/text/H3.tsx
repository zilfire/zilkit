import { Text } from './Text.js';
import type { TextProps } from './Text.js';

interface H3Props extends Omit<TextProps, 'element'> {
  element?: never; // Prevent overriding the element
}

export const H3: React.FC<H3Props> = ({ children, ...props }) => {
  return (
    <Text {...props} element="h3">
      {children}
    </Text>
  );
};

export default H3;
