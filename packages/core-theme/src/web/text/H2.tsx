import { Text } from './index.js';
import type { TextComponentProps } from './index.js';

export const H2: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'h2'} />;
};

export default H2;
