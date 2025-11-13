import type { MediaContentBlockData } from '../../types/index.js';
import type { ThemeContext } from '../../types/context-types/index.js';
import { Section } from '../components/Section.js';
import { H2, Span } from '../text/index.js';

export interface MediaContentBlockProps {
  data?: MediaContentBlockData;
  context: ThemeContext;
}

export const MediaContentBlock: React.FC<MediaContentBlockProps> = ({ data, context }) => {
  if (!data) return null;
  const { image, heading, subheading, eyebrow, content } = data;
  return (
    <Section context={context}>
      {eyebrow && <Span>{eyebrow}</Span>}
      {heading && <H2>{heading}</H2>}
    </Section>
  );
};
