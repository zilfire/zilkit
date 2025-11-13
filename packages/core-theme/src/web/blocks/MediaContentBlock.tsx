import type { MediaContentBlockData } from '../../types/index.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import { Section } from '../components/Section.js';
import { H2, Span } from '../text/index.js';
import SanityImage from '@zilfire/next-sanity-image';
import { textComponents } from '../text/text-components.js';
import { PortableText } from 'next-sanity';
import { getHorizontalGapSpacingClass } from '../style/style-utils/layout-style-utils.js';
import clsx from 'clsx';

export interface MediaContentBlockProps {
  data?: MediaContentBlockData;
  context: ThemeContext;
}

export const MediaContentBlock: React.FC<MediaContentBlockProps> = ({ data, context }) => {
  if (!data) return null;
  const { image, heading, subheading, eyebrow, content } = data;

  const gapClass = getHorizontalGapSpacingClass('lg', context.styleClasses);

  return (
    <Section context={context}>
      <div className={clsx('flex flex-wrap lg:flex-nowrap', 'items-center', gapClass)}>
        <div className="w-full lg:w-1/2">
          {image && <SanityImage imageObject={image} sanityConfig={context.sanityConfig} />}
        </div>
        <div className="w-full lg:w-1/2">
          {eyebrow && <Span>{eyebrow}</Span>}
          {heading && <H2>{heading}</H2>}
          {subheading && <Span>{subheading}</Span>}
          {content && <PortableText value={content} components={textComponents({}, context)} />}
        </div>
      </div>
    </Section>
  );
};
