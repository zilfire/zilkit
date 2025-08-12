import { Text } from './index';
import { TextComponentProps } from '../../data-types/blocks/text/text-components';

export const H2: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'h2'} />;
};

export default H2;
