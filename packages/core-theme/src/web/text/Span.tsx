import { Text } from './index';
import { TextComponentProps } from '../../data-types/blocks/text/text-components';

export const Span: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'span'} />;
};

export default Span;
