import { Text } from './Text.js';
import type { TextProps } from './Text.js';

interface LIProps extends Omit<TextProps, 'element'> {
  element?: never; // Prevent overriding the element
}

export const LI: React.FC<LIProps> = ({ children, ...props }) => {
  return (
    <Text {...props} element="li">
      {children}
    </Text>
  );
};

export default LI;
