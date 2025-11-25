import type { MediaContentBlockData } from '../../types/index.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import { Section } from '../components/Section.js';
import { H2, H3, H4, Span, P } from '../text/index.js';
import SanityImage from '@zilfire/next-sanity-image';
import { textComponents } from '../text/text-components.js';
import { PortableText } from 'next-sanity';
import { getHorizontalGapSpacingClass } from '../style/style-utils/layout-style-utils.js';
import clsx from 'clsx';
// import { verticalLineSpacing } from '../style/button-classes.js';

export interface MediaContentBlockProps {
  data?: MediaContentBlockData;
  context: ThemeContext;
}

export const MediaContentBlock: React.FC<MediaContentBlockProps> = ({ data, context }) => {
  if (!data) return null;
  const { image, heading, subheading, eyebrow, content } = data;

  const gapClass = getHorizontalGapSpacingClass('lg', context.styleClasses);
  const columnClass = 'w-full lg:w-6/12';

  return (
    <Section context={context}>
      <div className={clsx('flex flex-wrap lg:flex-nowrap', 'items-center', gapClass)}>
        <div className={clsx(columnClass)}>
          {image && <SanityImage imageObject={image} sanityConfig={context.sanityConfig} />}
        </div>
        <div className={clsx(columnClass)}>
          {eyebrow && (
            <Span className="uppercase" styleOptions={{ textColor: 'muted' }}>
              {eyebrow}
            </Span>
          )}
          {heading && (
            <H2 styleOptions={{}} classOverrides={{ verticalSpacing: '' }}>
              {heading}
            </H2>
          )}
          {subheading && <H4 styleOptions={{}}>{subheading}</H4>}
          {content && <PortableText value={content} components={textComponents({}, context)} />}
        </div>
      </div>
    </Section>
  );
};
