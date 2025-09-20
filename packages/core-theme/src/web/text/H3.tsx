import { Text } from './index.js';
import type { TextComponentProps } from './index.js';

export const H3: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'h3'} />;
};

export default H3;
