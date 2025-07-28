import { Text } from './';
import {
  TextSize,
  TextAlign,
  ColorMode,
  ThemeColor,
  TextComponent,
  FontStyle,
  FontWeight,
} from '../../data-types/utility/styling';
import NextLink from 'next/link';
import clsx from 'clsx';

import {
  PortableTextReactComponents,
  PortableTextMarkComponentProps,
  PortableTextComponentProps,
  PortableTextBlock,
} from 'next-sanity';

// @todo: Refactor to include font style (italic, normal) and weight.

type ComponentOptions = {
  size?: TextSize;
  align?: TextAlign;
  className?: string;
  colorMode?: ColorMode;
  themeColor?: ThemeColor;
  classOverride?: string; // Optional class override
  weight?: FontWeight;
  style?: FontStyle;
};

type PortableTextOptions = {
  size?: TextSize;
  normalSpan?: boolean;
  className?: string;
  align?: TextAlign;
  colorMode?: ColorMode;
  themeColor?: ThemeColor;
  classOverride?: string; // Optional class override
  weight?: FontWeight;
  style?: FontStyle;
  componentOptions?: Partial<Record<TextComponent, ComponentOptions>>;
};

type RenderedTextProps = {
  options: PortableTextOptions;
  as: TextComponent;
  children?: React.ReactNode;
  renderClassName?: string;
};

const RenderedText: React.FC<RenderedTextProps> = ({ as, children, options, renderClassName }) => {
  const size = options.size || 'md';
  const colorMode = options.colorMode || 'light';
  const themeColor = options.themeColor || 'black';
  const classOverride = options.classOverride;
  const className = options.className;

  const textSize = options.componentOptions?.[as]?.size || size;
  const textColorMode = options.componentOptions?.[as]?.colorMode || colorMode;
  const textAlign = options.componentOptions?.[as]?.align || undefined;
  const textThemeColor = options.componentOptions?.[as]?.themeColor || themeColor;
  const textClassOverride = options.componentOptions?.[as]?.classOverride || classOverride;
  const textClassName = options.componentOptions?.[as]?.className || className;
  const textStyle = options.componentOptions?.[as]?.style || options.style;
  const textWeight = options.componentOptions?.[as]?.weight || options.weight;

  return (
    <Text
      as={as}
      size={textSize}
      align={textAlign}
      themeColor={textThemeColor}
      colorMode={textColorMode}
      className={clsx(textClassName, renderClassName)}
      classOverride={textClassOverride}
      style={textStyle}
      weight={textWeight}
    >
      {children}
    </Text>
  );
};

export const portableTextComponents = (
  options: PortableTextOptions = {}
): PortableTextReactComponents => {
  const normalSpan = options.normalSpan || false;

  return {
    types: {},
    marks: {
      internalLink: (props: PortableTextMarkComponentProps<any>) => {
        const { children, value } = props;
        const internalPath = value?.internalPath ?? '/';
        const id = value?.id ? `#${value.id}` : '';
        const href = `${internalPath}${id}`;

        // console.log('internalLink props:', props);

        return (
          <NextLink className="text-blue-600" href={href}>
            {children}
          </NextLink>
        );
      },
      link: (props: PortableTextMarkComponentProps<any>) => {
        const { children, value } = props;
        const href = value?.href || '#';
        return (
          <NextLink className="text-blue-600" href={href}>
            {children}
          </NextLink>
        );
      },
    },
    list: {
      bullet: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText as={'ul'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      number: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText as={'ol'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
    },
    listItem: {
      bullet: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText as={'li'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      number: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText as={'li'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
    },
    block: {
      normal: (props: PortableTextComponentProps<PortableTextBlock>) => {
        if (normalSpan === true) {
          return (
            <RenderedText as={'span'} options={options}>
              {props.children}
            </RenderedText>
          );
        }

        return (
          <RenderedText as={'p'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h1: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText as={'h1'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h2: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText as={'h2'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h3: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText as={'h3'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h4: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText as={'h4'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h5: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText as={'h5'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      blockquote: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText
            as={'h5'}
            options={options}
            renderClassName="ml-4 border border-l-4 border-gray-300 pl-4"
          >
            {props.children}
          </RenderedText>
        );
      },
      indent: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText as={'h5'} options={options} renderClassName="ml-4">
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
