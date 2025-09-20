import { Text } from './index.js';
import type { TextComponentProps } from './index.js';
import clsx from 'clsx';

export const OL: React.FC<TextComponentProps> = (props) => {
  return <Text {...props} variant={props.variant ?? 'ol'} className={clsx('', props.className)} />;
};

export default OL;
