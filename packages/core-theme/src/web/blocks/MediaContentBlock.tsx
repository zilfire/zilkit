import type { MediaContentBlockData } from '../../sanity/data-types/index.js';
import { Section } from '../components/Section.js';
import type { SectionStyleOptions } from '../components/Section.js';
import { H2, H4, P } from '../text/index.js';
import Image from '../components/Image.js';
import { textComponents } from '../text/text-components.js';
import { PortableText } from 'next-sanity';
import { getGapSpacingClass } from '../style/utils/layout-style-utils.js';
import { styleClassNames } from '../style/classes/style-classes.js';
import clsx from 'clsx';

export interface MediaContentBlockProps {
  data?: MediaContentBlockData;
  sectionStyleOptions?: SectionStyleOptions;
  id?: string;
}

export const MediaContentBlock: React.FC<MediaContentBlockProps> = ({
  data,
  sectionStyleOptions,
  id,
}) => {
  if (!data) return null;
  const { image, heading, subheading, eyebrow, content } = data;

  const gapClass = getGapSpacingClass('lg', styleClassNames);
  const columnClass = 'w-full lg:w-6/12';

  return (
    <Section styleOptions={sectionStyleOptions} id={id}>
      <div className={clsx('flex flex-wrap lg:flex-nowrap', 'items-center', gapClass)}>
        <div className={clsx(columnClass)}>{image && <Image imageObject={image} />}</div>
        <div className={clsx(columnClass)}>
          {eyebrow && (
            <P className="uppercase" styleOptions={{ textColor: 'muted', verticalSpacing: false }}>
              {eyebrow}
            </P>
          )}
          {heading && <H2 styleOptions={{ verticalSpacing: 'md' }}>{heading}</H2>}
          {subheading && <H4 styleOptions={{}}>{subheading}</H4>}
          {content && (
            <PortableText value={content} components={textComponents({ className: 'last:mb-0' })} />
          )}
        </div>
      </div>
    </Section>
  );
};
