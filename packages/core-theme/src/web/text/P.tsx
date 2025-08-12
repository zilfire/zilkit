import { Text } from './index';
import { TextComponentProps } from '../../data-types/blocks/text/text-components';

export const P: React.FC<TextComponentProps> = (props) => {
  props.variant = props.variant ?? 'p';
  return <Text {...props} />;
};

export default P;
