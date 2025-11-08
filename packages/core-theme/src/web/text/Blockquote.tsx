import { Text } from './Text.js';
import type { TextProps } from './Text.js';

interface BlockquoteProps extends Omit<TextProps, 'element'> {
  element?: never; // Prevent overriding the element
}

export const Blockquote: React.FC<BlockquoteProps> = ({ children, ...props }) => {
  return (
    <Text {...props} element="blockquote">
      {children}
    </Text>
  );
};

export default Blockquote;
