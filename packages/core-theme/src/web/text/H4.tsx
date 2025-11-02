import { Text } from './Text.js';
import type { TextProps } from './Text.js';

interface H4Props extends Omit<TextProps, 'element'> {
  element?: never; // Prevent overriding the element
}

export const H4: React.FC<H4Props> = ({ children, ...props }) => {
  return (
    <Text {...props} element="h4">
      {children}
    </Text>
  );
};

export default H4;
