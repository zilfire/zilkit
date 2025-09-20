import { Text } from './index.js';
import type { TextComponentProps } from './index.js';

export const LI: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'li'} />;
};

export default LI;
