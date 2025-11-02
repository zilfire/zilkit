import { Text } from './Text.js';
import type { TextProps } from './Text.js';

interface SpanProps extends Omit<TextProps, 'element'> {
  element?: never; // Prevent overriding the element
}

export const Span: React.FC<SpanProps> = ({ children, ...props }) => {
  return (
    <Text {...props} element="span">
      {children}
    </Text>
  );
};

export default Span;
