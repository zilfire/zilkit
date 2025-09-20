import { Text } from './index.js';
import type { TextComponentProps } from './index.js';

export const Span: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'span'} />;
};

export default Span;
