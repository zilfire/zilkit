import { Text } from './index';
import { TextComponentProps } from '../../data-types/blocks/text/text-components';

export const P: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'p'} />;
};

export default P;
