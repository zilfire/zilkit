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
  TextComponent,
  TextElement,
  TextClassOverrides,
} from '../../types/style-types/style-classes.js';

type ComponentOptions = {
  className?: string;
  classOverrides?: TextClassOverrides;
};

type PortableTextOptions = ComponentOptions & {
  normalSpan?: boolean;
  componentOptions?: Partial<Record<TextComponent, ComponentOptions>>;
};

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
  const classOverrides =
    options?.componentOptions?.[element]?.classOverrides || options?.classOverrides;
  const className = options?.componentOptions?.[element]?.className || options?.className;

  return (
    <Text
      element={element}
      as={as}
      className={clsx(className, renderClassName)}
      classOverrides={classOverrides}
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
