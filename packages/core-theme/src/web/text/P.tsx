import { Text } from './index.js';
import type { TextComponentProps } from './index.js';

export const P: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'p'} />;
};

export default P;
