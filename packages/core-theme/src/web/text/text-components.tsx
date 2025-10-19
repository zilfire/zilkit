import {
  PortableTextReactComponents,
  PortableTextMarkComponentProps,
  PortableTextComponentProps,
  PortableTextBlock,
} from 'next-sanity';
import { ThemeContext } from '../../types/context-types/index.js';
import { Text } from './Text.js';
import clsx from 'clsx';
import {
  TextStyleGroup,
  TextElement,
  TextComponent,
  TextSize,
  TextClassOverrides,
} from '../../types/style-types/style-classes.js';

type TextComponentOptions = {
  textSize?: TextSize;
  variant?: string;
  className?: string;
  classOverride?: TextClassOverrides;
};

type PortableTextOptions = TextComponentOptions & {
  normalSpan?: boolean;
  componentOptions?: Partial<Record<TextComponent, TextComponentOptions>>;
};

type PortableTextProps = {
  options?: PortableTextOptions;
  context: ThemeContext;
};

// export const textComponents = (
//   options: TextComponentOptions = {},
//   context: ThemeContext
// ): PortableTextReactComponents => {
//   return {
//     types: {},
//     marks: {},
//     block: {
//       normal: (props: PortableTextComponentProps<PortableTextBlock>) => (
//         <Text variant="p" as="p" {...options}>
//           {props.children}
//         </Text>
//       ),
//     },
//   };
// };
