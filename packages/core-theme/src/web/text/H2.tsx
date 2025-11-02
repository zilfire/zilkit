import { Text } from './Text.js';
import type { TextProps } from './Text.js';

interface H2Props extends Omit<TextProps, 'element'> {
  element?: never; // Prevent overriding the element
}

export const H2: React.FC<H2Props> = ({ children, ...props }) => {
  return (
    <Text {...props} element="h2">
      {children}
    </Text>
  );
};

export default H2;
