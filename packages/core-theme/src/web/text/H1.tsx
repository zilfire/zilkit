import { Text } from './index';
import { TextComponentProps } from './';

export const H1: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'h1'} />;
};

export default H1;
