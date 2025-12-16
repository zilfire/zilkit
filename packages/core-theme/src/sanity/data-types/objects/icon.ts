import { iconRegistry } from '../../../assets/icon-registry';

export type IconData = {
  _type: 'icon';
  iconKey: keyof typeof iconRegistry;
};
