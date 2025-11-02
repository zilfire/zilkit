import { Text } from './Text.js';
import type { TextProps } from './Text.js';

interface PProps extends Omit<TextProps, 'element'> {
  element?: never; // Prevent overriding the element
}

export const P: React.FC<PProps> = ({ children, ...props }) => {
  return (
    <Text {...props} element="p">
      {children}
    </Text>
  );
};

export default P;
