import { Button } from './Button.js';
import type { ButtonData } from '../../types/sanity-data-types/index.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import type { GapSpacing } from '../../types/style-types/layout-style-classes.js';
import type { ButtonSize } from '../../types/style-types/button-style-classes.js';
import { getHorizontalGapSpacingClass } from '../style/style-utils/layout-style-utils.js';
import clsx from 'clsx';

export interface ButtonGroupProps {
  buttons: ButtonData[];
  context: ThemeContext;
  id?: string;
  className?: string;
  gap?: GapSpacing;
  wrap?: boolean;
  align?: 'start' | 'center' | 'end';
  buttonOptions?: {
    size?: ButtonSize;
    variant?: string;
    color?: string;
  };
  primaryVariant?: string;
  secondaryVariant?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  context,
  id,
  className,
  gap = 'sm',
  wrap = true,
  align = 'start',
  buttonOptions,
  primaryVariant,
  secondaryVariant,
}) => {
  if (!buttons || buttons.length === 0) return null;

  const gapClass = getHorizontalGapSpacingClass(gap, context.styleClasses);
  const alignClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  }[align];
  const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';

  return (
    <div id={id} className={clsx('flex', wrapClass, gapClass, alignClass, className)}>
      {buttons.map((button, index) => {
        const isFirst = index === 0;
        const variant =
          isFirst && primaryVariant
            ? primaryVariant
            : !isFirst && secondaryVariant
            ? secondaryVariant
            : buttonOptions?.variant;

        return (
          <Button
            key={index}
            context={context}
            data={button}
            options={{
              ...buttonOptions,
              variant,
            }}
          />
        );
      })}
    </div>
  );
};

export default ButtonGroup;
