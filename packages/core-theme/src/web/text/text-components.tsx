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
import type {
  TextComponent,
  TextElement,
  TextClassOverrides,
  TextElementSize,
  TextVariant,
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
  size?: TextElementSize;
  variant?: TextVariant;
};

type RenderedTextProps = {
  options?: PortableTextOptions;
  element?: TextComponent;
  as?: TextElement;
  children?: React.ReactNode;
  renderClassName?: string;
  size?: TextElementSize;
  variant?: TextVariant;
};

const RenderedText: React.FC<RenderedTextProps> = ({
  as,
  element = 'p',
  children,
  options,
  renderClassName,
}) => {
  const componentOption = options?.componentOptions?.[element];

  const { size = 'md', variant = 'normal' } = options || {};

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
      size={size}
      variant={variant}
    >
      {children}
    </Text>
  );
};

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
