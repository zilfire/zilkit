import { P, H1, H2, H3, H4, H5, LI, OL, UL, Span } from './index';
import { TextSize, TextAlign, ColorMode, ThemeColor } from '../../data-types/utility/styling';
import NextLink from 'next/link';

import {
  PortableTextReactComponents,
  PortableTextMarkComponentProps,
  PortableTextComponentProps,
  PortableTextBlock,
} from 'next-sanity';

type PortableTextOptions = {
  size?: TextSize;
  colorScheme?: 'light' | 'dark' | 'primary' | 'secondary' | 'accent';
  normalSpan?: boolean;
  className?: string;
  align?: TextAlign;
  colorMode?: ColorMode;
  themeColor?: ThemeColor;
  classOverride?: string; // Optional class override
  p?: {
    size?: TextSize;
    align?: TextAlign;
    className?: string;
    colorMode?: ColorMode;
    themeColor?: ThemeColor;
    classOverride?: string; // Optional class override
  };
  span?: {
    size?: TextSize;
    align?: TextAlign;
    className?: string;
    colorMode?: ColorMode;
    themeColor?: ThemeColor;
    classOverride?: string; // Optional class override
  };
};

export const portableTextComponents = (
  options: PortableTextOptions = {}
): PortableTextReactComponents => {
  const colorScheme = options.colorScheme || 'dark';
  const size = options.size || 'md';
  const normalSpan = options.normalSpan || false;
  const colorMode = options.colorMode || 'light';
  const themeColor = options.themeColor || 'black';
  const classOverride = options.classOverride;
  const className = options.className;

  return {
    types: {},
    marks: {
      internalLink: (props: PortableTextMarkComponentProps<any>) => {
        const { children, value } = props;
        const internalPath = value?.internalPath ?? '/';
        const id = value?.id ? `#${value.id}` : '';
        const href = `${internalPath}${id}`;

        console.log('internalLink props:', props);

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
          <UL colorScheme={colorScheme} size={size}>
            {props.children}
          </UL>
        );
      },
      number: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <OL colorScheme={colorScheme} size={size}>
            {props.children}
          </OL>
        );
      },
    },
    listItem: {
      bullet: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return <LI>{props.children}</LI>;
      },
      number: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return <LI>{props.children}</LI>;
      },
    },
    block: {
      normal: (props: PortableTextComponentProps<PortableTextBlock>) => {
        const spanSize = options.span?.size || size;
        const spanColorMode = options.span?.colorMode || colorMode;
        const spanAlign = options.span?.align || undefined;
        const spanThemeColor = options.span?.themeColor || themeColor;
        const spanClassOverride = options.span?.classOverride || classOverride;
        const spanClassName = options.span?.className || className;

        if (normalSpan === true) {
          return (
            <Span
              size={spanSize}
              align={spanAlign}
              themeColor={spanThemeColor}
              colorMode={spanColorMode}
              className={spanClassName}
              classOverride={spanClassOverride}
            >
              {props.children}
            </Span>
          );
        }
        const pSize = options.p?.size || size;
        const pColorMode = options.p?.colorMode || colorMode;
        const pAlign = options.p?.align || undefined;
        const pThemeColor = options.p?.themeColor || themeColor;
        const pClassOverride = options.p?.classOverride || classOverride;
        const pClassName = options.p?.className || className;

        return (
          <P
            size={pSize}
            align={pAlign}
            themeColor={pThemeColor}
            colorMode={pColorMode}
            className={pClassName}
            classOverride={pClassOverride}
          >
            {props.children}
          </P>
        );
      },
      h1: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <H1 colorScheme={colorScheme} size={size}>
            {props.children}
          </H1>
        );
      },
      h2: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <H2 colorScheme={colorScheme} size={size}>
            {props.children}
          </H2>
        );
      },
      h3: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <H3 colorScheme={colorScheme} size={size}>
            {props.children}
          </H3>
        );
      },
      h4: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <H4 colorScheme={colorScheme} size={size}>
            {props.children}
          </H4>
        );
      },
      h5: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <H5 colorScheme={colorScheme} size={size}>
            {props.children}
          </H5>
        );
      },
      blockquote: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <P
            colorScheme={colorScheme}
            size={size}
            className="ml-4 border border-l-4 border-gray-300 pl-4"
          >
            {props.children}
          </P>
        );
      },
      indent: (props: PortableTextComponentProps<PortableTextBlock>) => {
        return (
          <P colorScheme={colorScheme} size={size} className="ml-4">
            {props.children}
          </P>
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
