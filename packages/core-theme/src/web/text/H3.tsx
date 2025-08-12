import { Text } from './index';
import { TextComponentProps } from '../../data-types/blocks/text/text-components';

export const H3: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'h3'} />;
};

export default H3;
