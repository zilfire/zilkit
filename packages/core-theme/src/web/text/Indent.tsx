import { Text } from './Text.js';
import type { TextProps } from './Text.js';

interface IndentProps extends Omit<TextProps, 'element'> {
  element?: never; // Prevent overriding the element
}

export const Indent: React.FC<IndentProps> = ({ children, ...props }) => {
  return (
    <Text {...props} element="indent">
      {children}
    </Text>
  );
};

export default Indent;
