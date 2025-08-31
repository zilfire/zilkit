import { Text } from './index';
import { TextComponentProps } from './';

export const LI: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'li'} />;
};

export default LI;
