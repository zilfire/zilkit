import { Text } from './Text.js';
import type { TextProps } from './Text.js';

interface ULProps extends Omit<TextProps, 'element'> {
  element?: never; // Prevent overriding the element
}

export const UL: React.FC<ULProps> = ({ children, ...props }) => {
  return (
    <Text {...props} element="ul">
      {children}
    </Text>
  );
};

export default UL;
