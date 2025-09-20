import { Text } from './index.js';
import type { TextComponentProps } from './index.js';
import clsx from 'clsx';

export const UL: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'ul'} className={clsx('', props.className)} />;
};

export default UL;
