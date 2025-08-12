import { Text } from './index';
import { TextComponentProps } from '../../data-types/blocks/text/text-components';
import clsx from 'clsx';

export const OL: React.FC<TextComponentProps> = (props) => {
  return (
    <Text
      {...props}
      variant={props.variant ?? 'ol'}
      className={clsx('list-decimal list-inside', props.className)}
    />
  );
};

export default OL;
