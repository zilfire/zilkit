import { P, H1, H2, H3, H4, H5, LI, OL, UL, Span } from './index';
import NextLink from 'next/link';

import {
  PortableTextReactComponents,
  PortableTextMarkComponentProps,
  PortableTextComponentProps,
  PortableTextBlock,
} from 'next-sanity';

type PortableTextOptions = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  colorScheme?: 'light' | 'dark' | 'primary' | 'secondary' | 'accent';
  normalSpan?: boolean;
  p?: {
    colorScheme?: 'light' | 'dark' | 'primary' | 'secondary' | 'accent';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    align?: 'left' | 'center' | 'right' | 'justify';
  };
};

export const portableTextComponents = (
  options: PortableTextOptions = {}
): PortableTextReactComponents => {
  const colorScheme = options.colorScheme || 'dark';
  const size = options.size || 'md';
  const normalSpan = options.normalSpan || false;

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
        if (normalSpan === true) {
          return (
            <Span colorScheme={colorScheme} size={size}>
              {props.children}
            </Span>
          );
        }
        const pSize = options.p?.size || size;
        const pColorScheme = options.p?.colorScheme || colorScheme;
        const pAlign = options.p?.align || undefined;

        return (
          <P colorScheme={pColorScheme} size={pSize} align={pAlign}>
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
