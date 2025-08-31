import { Text } from './index';
import { TextComponentProps } from './';

export const P: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'p'} />;
};

export default P;
