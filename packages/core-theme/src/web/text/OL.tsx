import { Text } from './Text.js';
import type { TextProps } from './Text.js';

interface OLProps extends Omit<TextProps, 'element'> {
  element?: never; // Prevent overriding the element
}

export const OL: React.FC<OLProps> = ({ children, ...props }) => {
  return (
    <Text {...props} element="ol">
      {children}
    </Text>
  );
};

export default OL;
