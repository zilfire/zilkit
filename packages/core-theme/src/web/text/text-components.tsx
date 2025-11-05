import {
  PortableTextReactComponents,
  PortableTextMarkComponentProps,
  PortableTextComponentProps,
  PortableTextBlock,
} from 'next-sanity';
import { ThemeContext } from '../../types/context-types/index.js';
import type { TextStyleOptions } from './Text.js';
import { Text } from './Text.js';
import clsx from 'clsx';
import {
  TextComponent,
  TextElement,
  TextClassOverrides,
} from '../../types/style-types/text-style-classes.js';

type ComponentOptions = {
  componentClassName?: string;
  componentClassOverrides?: TextClassOverrides;
  componentStyleOptions?: TextStyleOptions;
};

type PortableTextOptions = {
  normalSpan?: boolean;
  className?: string;
  classOverrides?: TextClassOverrides;
  styleOptions?: TextStyleOptions;
  componentOptions?: Partial<Record<TextComponent, ComponentOptions>>;
};

/**
 * Props for the RenderedText component
 *
 * Style Priority (highest to lowest):
 * 1. componentStyleOptions (component-specific overrides)
 * 2. styleOptions (global base styles)
 * 3. Default Text component styles
 *
 * Class Priority (highest to lowest):
 * 1. componentClassName and componentClassOverrides (component-specific)
 * 2. className and classOverrides (global defaults)
 * 3. Default Text component classes
 */

type RenderedTextProps = {
  options?: PortableTextOptions;
  element?: TextComponent;
  as?: TextElement;
  children?: React.ReactNode;
  renderClassName?: string;
};

const RenderedText: React.FC<RenderedTextProps> = ({
  as,
  element = 'p',
  children,
  options,
  renderClassName,
}) => {
  const componentOption = options?.componentOptions?.[element];

  // Style options: base styleOptions + component-specific componentStyleOptions
  const styleOptions = {
    ...options?.styleOptions,
    ...componentOption?.componentStyleOptions,
  };

  // Class handling: global defaults + component-specific overrides
  const classOverrides = componentOption?.componentClassOverrides || options?.classOverrides;
  const className = componentOption?.componentClassName || options?.className;

  return (
    <Text
      element={element}
      as={as}
      className={clsx(className, renderClassName)}
      classOverrides={classOverrides}
      styleOptions={styleOptions}
    >
      {children}
    </Text>
  );
};

/**
 * Creates portable text components with integrated style options
 *
 * @param options - Configuration options for the portable text components
 * @param context - Theme context containing style classes and components
 *
 * @example Basic usage with global style and class options
 * ```tsx
 * const components = textComponents({
 *   className: 'prose prose-lg',
 *   classOverrides: 'text-gray-800',
 *   styleOptions: {
 *     variant: 'body',
 *     size: 'md',
 *     color: 'primary'
 *   }
 * }, themeContext);
 * ```
 *
 * @example Component-specific overrides
 * ```tsx
 * const components = textComponents({
 *   // Global defaults for all components
 *   className: 'prose',
 *   classOverrides: 'text-gray-700',
 *   styleOptions: {
 *     variant: 'body',
 *     size: 'md'
 *   },
 *   componentOptions: {
 *     h1: {
 *       componentClassName: 'heading-primary',
 *       componentClassOverrides: 'text-blue-900 font-bold',
 *       componentStyleOptions: {
 *         variant: 'heading',
 *         size: 'xl',
 *         bold: true
 *       }
 *     },
 *     h2: {
 *       componentStyleOptions: {
 *         variant: 'heading',
 *         size: 'lg'
 *         // className and classOverrides inherit from global defaults
 *       }
 *     }
 *   }
 * }, themeContext);
 * ```
 *
 * Style Priority (highest to lowest):
 * 1. componentStyleOptions - Component-specific style overrides
 * 2. styleOptions - Global base styles applied to all components
 * 3. Default Text component styles
 *
 * Class Priority (highest to lowest):
 * 1. componentClassName and componentClassOverrides - Component-specific
 * 2. className and classOverrides - Global defaults for all components
 * 3. Default Text component classes
 */
export const textComponents = (
  options: PortableTextOptions = {},
  context: ThemeContext
): PortableTextReactComponents => {
  const normalSpan = options.normalSpan || false;
  const { LinkComponent } = context;

  return {
    types: {},
    marks: {
      internalLink: (props: PortableTextMarkComponentProps<any>) => {
        const { children, value } = props;
        const internalPath = value?.internalPath ?? '/';
        const id = value?.id ? `#${value.id}` : '';
        const href = `${internalPath}${id}`;

        return (
          <LinkComponent className="text-blue-600" href={href}>
            {children}
          </LinkComponent>
        );
      },
      link: (props: PortableTextMarkComponentProps<any>) => {
        const { children, value } = props;
        const href = value?.href || '#';
        return (
          <LinkComponent className="text-blue-600" href={href}>
            {children}
          </LinkComponent>
        );
      },
    },
    list: {
      bullet: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText element="ul" options={options}>
            {props.children}
          </RenderedText>
        );
      },
      number: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText element="ol" options={options}>
            {props.children}
          </RenderedText>
        );
      },
    },
    listItem: {
      bullet: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText element="li" options={options}>
            {props.children}
          </RenderedText>
        );
      },
      number: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText element="li" options={options}>
            {props.children}
          </RenderedText>
        );
      },
    },
    block: {
      normal: (props: PortableTextComponentProps<PortableTextBlock>) => {
        if (normalSpan === true) {
          return (
            <RenderedText element="span" as="span" options={options}>
              {props.children}
            </RenderedText>
          );
        }

        return (
          <RenderedText element="p" options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h1: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText element="h1" options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h2: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText element="h2" options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h3: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText element="h3" options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h4: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText element="h4" options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h5: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText element="h5" options={options}>
            {props.children}
          </RenderedText>
        );
      },
      blockquote: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText element="blockquote" options={options}>
            {props.children}
          </RenderedText>
        );
      },
      indent: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText element="indent" options={options}>
            {props.children}
          </RenderedText>
        );
      },
    },
    hardBreak: () => <br />,
    unknownType: () => null,
    unknownMark: () => null,
    unknownList: () => null,
    unknownListItem: () => null,
    unknownBlockStyle: () => null,
  };
};
