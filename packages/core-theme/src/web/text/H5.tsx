import { Text } from './index.js';
import type { TextComponentProps } from './index.js';

export const H5: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'h5'} />;
};

export default H5;
