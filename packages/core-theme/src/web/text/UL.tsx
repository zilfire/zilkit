import { Text } from './index';
import { TextComponentProps } from './';
import clsx from 'clsx';

export const UL: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'ul'} className={clsx('', props.className)} />;
};

export default UL;
