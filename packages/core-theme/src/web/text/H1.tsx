import { Text } from './index.js';
import type { TextComponentProps } from './index.js';

export const H1: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'h1'} />;
};

export default H1;
