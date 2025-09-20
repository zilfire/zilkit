import { Text } from './index.js';
import type { TextComponentProps } from './index.js';

export const H4: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'h4'} />;
};

export default H4;
