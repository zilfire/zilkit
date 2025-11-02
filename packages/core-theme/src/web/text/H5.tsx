import { Text } from './Text.js';
import type { TextProps } from './Text.js';

interface H5Props extends Omit<TextProps, 'element'> {
  element?: never; // Prevent overriding the element
}

export const H5: React.FC<H5Props> = ({ children, ...props }) => {
  return (
    <Text {...props} element="h5">
      {children}
    </Text>
  );
};

export default H5;
