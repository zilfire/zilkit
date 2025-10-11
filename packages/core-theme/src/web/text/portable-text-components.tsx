import { Text } from './index.js';
import type {
  TextSize,
  TextAlign,
  ColorTone,
  ThemeColor,
  TextComponent,
  TextComponentVariant,
  FontStyle,
  FontWeight,
} from '../../types/style-types/index.js';
import { ThemeContext } from '../../types/context-types/index.js';
import clsx from 'clsx';

import {
  PortableTextReactComponents,
  PortableTextMarkComponentProps,
  PortableTextComponentProps,
  PortableTextBlock,
} from 'next-sanity';

type ComponentOptions = {
  size?: TextSize;
  align?: TextAlign;
  className?: string;
  colorTone?: ColorTone;
  themeColor?: ThemeColor;
  classOverride?: string; // Optional class override
  weight?: FontWeight;
  style?: FontStyle;
  border?: TextSize; // Optional border style
  borderColor?: ThemeColor; // Optional border color
};

type PortableTextOptions = {
  size?: TextSize;
  normalSpan?: boolean;
  className?: string;
  align?: TextAlign;
  colorTone?: ColorTone;
  themeColor?: ThemeColor;
  classOverride?: string; // Optional class override
  weight?: FontWeight;
  style?: FontStyle;
  componentOptions?: Partial<Record<TextComponent, ComponentOptions>>;
};

type RenderedTextProps = {
  options?: PortableTextOptions;
  variant?: TextComponentVariant;
  as?: TextComponent;
  children?: React.ReactNode;
  renderClassName?: string;
};

const RenderedText: React.FC<RenderedTextProps> = ({
  as = 'p',
  variant = 'p',
  children,
  options,
  renderClassName,
}) => {
  const size = options?.size || 'md';
  const colorTone = options?.colorTone || '700';
  const themeColor = options?.themeColor || 'black';
  const classOverride = options?.classOverride;
  const className = options?.className;

  const textSize = options?.componentOptions?.[as]?.size || size;
  const textColorTone = options?.componentOptions?.[as]?.colorTone || colorTone;
  const textAlign = options?.componentOptions?.[as]?.align || undefined;
  const textThemeColor = options?.componentOptions?.[as]?.themeColor || themeColor;
  const textClassOverride = options?.componentOptions?.[as]?.classOverride || classOverride;
  const textClassName = options?.componentOptions?.[as]?.className || className;
  const textStyle = options?.componentOptions?.[as]?.style || options?.style;
  const textWeight = options?.componentOptions?.[as]?.weight || options?.weight;
  const textBorder = options?.componentOptions?.[as]?.border || undefined;
  const textBorderColor = options?.componentOptions?.[as]?.borderColor || undefined;

  return (
    <Text
      variant={variant}
      as={as}
      textSize={textSize}
      textAlign={textAlign}
      textColor={textThemeColor}
      colorTone={textColorTone}
      className={clsx(textClassName, renderClassName)}
      classOverride={textClassOverride}
      fontStyle={textStyle}
      fontWeight={textWeight}
      border={textBorder}
      borderColor={textBorderColor}
    >
      {children}
    </Text>
  );
};

export const portableTextComponents = (
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

        // console.log('internalLink props:', props);

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
          <RenderedText variant={'ul'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      number: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText variant={'ol'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
    },
    listItem: {
      bullet: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText variant={'li'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      number: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText variant={'li'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
    },
    block: {
      normal: (props: PortableTextComponentProps<PortableTextBlock>) => {
        if (normalSpan === true) {
          return (
            <RenderedText variant={'span'} as="span" options={options}>
              {props.children}
            </RenderedText>
          );
        }

        return (
          <RenderedText variant={'p'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h1: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText variant={'h1'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h2: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText variant={'h2'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h3: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText variant={'h3'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h4: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText variant={'h4'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      h5: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText variant={'h5'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      blockquote: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText variant={'blockquote'} options={options}>
            {props.children}
          </RenderedText>
        );
      },
      indent: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <RenderedText variant={'indent'} options={options}>
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
