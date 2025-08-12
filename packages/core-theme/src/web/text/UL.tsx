import { Text } from './index';
import { TextComponentProps } from '../../data-types/blocks/text/text-components';
import clsx from 'clsx';

export const UL: React.FC<TextComponentProps> = (props) => {
  return (
    <Text
      {...props}
      variant={props.variant ?? 'ul'}
      className={clsx('list-disc list-inside', props.className)}
    />
  );
};

export default UL;
