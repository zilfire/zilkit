import { Text } from './index';
import { TextComponentProps } from '../../data-types/blocks/text/text-components';

export const H4: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'h4'} />;
};

export default H4;
