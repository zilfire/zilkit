import { Text } from './Text.js';
import type { TextProps } from './Text.js';

interface H1Props extends Omit<TextProps, 'element'> {
  element?: never; // Prevent overriding the element
}

export const H1: React.FC<H1Props> = ({ children, ...props }) => {
  return <Text {...props} element="h1">{children}</Text>;
};

export default H1;
