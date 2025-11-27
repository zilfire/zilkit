import type { MediaContentBlockData } from '../../sanity/data-types/index.js';
import type { ThemeContext } from '../../sanity/data-types/index.js';
import { Section } from '../components/Section.js';
import { H2, H3, H4, Span, P } from '../text/index.js';
import SanityImage from '@zilfire/next-sanity-image';
import { textComponents } from '../text/text-components.js';
import { PortableText } from 'next-sanity';
import { getGapSpacingClass } from '../style/utils/layout-style-utils.js';
import clsx from 'clsx';

export interface MediaContentBlockProps {
  data?: MediaContentBlockData;
  context: ThemeContext;
}

export const MediaContentBlock: React.FC<MediaContentBlockProps> = ({ data, context }) => {
  if (!data) return null;
  const { image, heading, subheading, eyebrow, content } = data;

  const gapClass = getGapSpacingClass('lg', context.styleClasses);
  const columnClass = 'w-full lg:w-6/12';

  return (
    <Section context={context}>
      <div className={clsx('flex flex-wrap lg:flex-nowrap', 'items-center', gapClass)}>
        <div className={clsx(columnClass)}>
          {image && <SanityImage imageObject={image} sanityConfig={context.sanityConfig} />}
        </div>
        <div className={clsx(columnClass)}>
          {eyebrow && (
            <P className="uppercase" styleOptions={{ textColor: 'muted', verticalSpacing: false }}>
              {eyebrow}
            </P>
          )}
          {heading && <H2 styleOptions={{ verticalSpacing: 'sm' }}>{heading}</H2>}
          {subheading && <H4 styleOptions={{}}>{subheading}</H4>}
          {content && <PortableText value={content} components={textComponents({}, context)} />}
        </div>
      </div>
    </Section>
  );
};
