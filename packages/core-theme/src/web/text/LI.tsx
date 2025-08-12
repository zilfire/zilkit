import { Text } from './index';
import { TextComponentProps } from '../../data-types/blocks/text/text-components';

export const LI: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'li'} />;
};

export default LI;
