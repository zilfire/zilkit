import { Section, Container } from '@zilfire/core-theme/web/components';
import { Text } from '@zilfire/core-theme/web/text';

export default function TextPage() {
  return (
    <Section>
      <Container>
        <h1>Text Component</h1>
        <Text variant="blockquote" borderColor="primary" border="xs" as="h3">
          This is a sample text component.
        </Text>
      </Container>
    </Section>
  );
}
