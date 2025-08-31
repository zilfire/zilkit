import { Text } from './index';
import { TextComponentProps } from './';

export const H5: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'h5'} />;
};

export default H5;
