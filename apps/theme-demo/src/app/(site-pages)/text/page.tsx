import { Section, Container } from '@zilfire/core-theme/web/components';
import { Text, P, UL, OL, LI } from '@zilfire/core-theme/web/text';

export default function TextPage() {
  return (
    <Section>
      <Container>
        <h1>Text Component</h1>
        <Text variant="blockquote" border="md">
          This is a sample text component.
        </Text>
        <P>This is a paragraph component.</P>
        <UL>
          <LI>This is a list item.</LI>
          <LI>This is another list item.</LI>
        </UL>
        <OL>
          <LI>This is a list item.</LI>
          <LI>This is another list item.</LI>
        </OL>
      </Container>
    </Section>
  );
}
