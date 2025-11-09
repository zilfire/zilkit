# Components

[← Back to Web](./README.md) | [← Back to Home](../../README.md)

Reusable UI components for building layouts and interfaces.

## Available Components

### Button

Styled button component with variants and sizes.

**Import:**
```typescript
import { Button } from '@zilfire/core-theme/web/components';
```

**Props:**
```typescript
interface ButtonProps {
  context: ThemeContext;
  data: ButtonData;
  children?: React.ReactNode;
  options?: {
    variant?: string;
    size?: ButtonSize;
    color?: string;
    className?: string;
    classOverride?: ButtonClassOverride;
  };
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}
```

**Example:**
```typescript
<Button
  data={{
    _type: 'button',
    text: 'Get Started',
    link: { _type: 'navLink', href: '/start' },
  }}
  context={themeContext}
  options={{
    variant: 'primary',
    size: 'lg',
  }}
/>
```

---

### ButtonGroup

Container for grouping buttons with consistent spacing.

**Import:**
```typescript
import { ButtonGroup } from '@zilfire/core-theme/web/components';
```

**Example:**
```typescript
<ButtonGroup>
  <Button data={primaryButton} context={context} />
  <Button data={secondaryButton} context={context} />
</ButtonGroup>
```

---

### Link

Navigation link component.

**Import:**
```typescript
import { Link } from '@zilfire/core-theme/web/components';
```

**Props:**
```typescript
interface LinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  openInNewTab?: boolean;
  className?: string;
}
```

**Example:**
```typescript
<Link href="/about" className="text-primary-600">
  Learn More
</Link>

<Link href="https://example.com" external openInNewTab>
  External Link
</Link>
```

---

### Section

Layout section with configurable spacing and background.

**Import:**
```typescript
import { Section } from '@zilfire/core-theme/web/components';
```

**Props:**
```typescript
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  paddingY?: string;
  backgroundColor?: string;
  id?: string;
}
```

**Example:**
```typescript
<Section paddingY="py-16" backgroundColor="bg-gray-50">
  <Container>
    {/* Your content */}
  </Container>
</Section>
```

---

### Container

Content width container for consistent max-width layouts.

**Import:**
```typescript
import { Container } from '@zilfire/core-theme/web/components';
```

**Props:**
```typescript
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
```

**Example:**
```typescript
<Container maxWidth="lg" className="px-4">
  <h1>Contained Content</h1>
</Container>
```

---

### ImageSection

Section with background image support.

**Import:**
```typescript
import { ImageSection } from '@zilfire/core-theme/web/components';
```

**Props:**
```typescript
interface ImageSectionProps {
  children: React.ReactNode;
  backgroundImage?: SanityImageWithAlt;
  backgroundImageOptions?: {
    imageSizes?: string;
    quality?: number;
  };
  className?: string;
}
```

**Example:**
```typescript
<ImageSection
  backgroundImage={{
    asset: { _ref: '...', _type: 'reference' },
    alt: 'Background',
  }}
  backgroundImageOptions={{
    imageSizes: '100vw',
    quality: 80,
  }}
>
  <Container>
    {/* Your content */}
  </Container>
</ImageSection>
```

---

## Component Composition

### Layout Pattern

```typescript
import { Section, Container } from '@zilfire/core-theme/web/components';

export default function Page() {
  return (
    <main>
      <Section>
        <Container>
          <h1>Welcome</h1>
          <p>Content here</p>
        </Container>
      </Section>
      
      <Section backgroundColor="bg-gray-100" paddingY="py-20">
        <Container maxWidth="lg">
          <h2>Features</h2>
        </Container>
      </Section>
    </main>
  );
}
```

### Button Groups

```typescript
import { ButtonGroup, Button } from '@zilfire/core-theme/web/components';

<ButtonGroup>
  <Button
    data={primaryData}
    context={context}
    options={{ variant: 'primary', size: 'lg' }}
  />
  <Button
    data={secondaryData}
    context={context}
    options={{ variant: 'secondary', size: 'lg' }}
  />
</ButtonGroup>
```

### Nested Sections

```typescript
<Section paddingY="py-0">
  <ImageSection
    backgroundImage={heroImage}
    backgroundImageOptions={{ quality: 90 }}
  >
    <Container>
      <h1>Hero Content</h1>
    </Container>
  </ImageSection>
</Section>
```

## Styling Components

### Using className

```typescript
<Button
  data={buttonData}
  context={context}
  options={{
    className: 'shadow-lg hover:shadow-xl transition-shadow',
  }}
/>
```

### Class Overrides

```typescript
<Button
  data={buttonData}
  context={context}
  options={{
    classOverride: {
      paddingX: 'px-8',
      paddingY: 'py-4',
      fontSize: 'text-xl',
    },
  }}
/>
```

### Responsive Styling

```typescript
<Container className="px-4 md:px-6 lg:px-8">
  <Section paddingY="py-8 md:py-12 lg:py-16">
    {/* Responsive spacing */}
  </Section>
</Container>
```

## Accessibility

### ARIA Labels

```typescript
<Button
  data={buttonData}
  context={context}
  ariaLabel="Submit contact form"
/>
```

### Semantic HTML

Components use semantic HTML elements by default:

```typescript
<Section> // renders <section>
<Container> // renders <div> with container classes
<Button> // renders <button> or <a> based on link presence
```

### Keyboard Navigation

All interactive components support keyboard navigation out of the box.

## Best Practices

1. **Use Container inside Section** - For consistent layouts
2. **Leverage ButtonGroup** - For button spacing
3. **Provide context** - Always pass `ThemeContext` to components that need it
4. **Type your props** - Use TypeScript for prop safety
5. **Compose components** - Build complex UIs from simple components
6. **Use semantic HTML** - Maintain proper document structure

---

[← Back to Web](./README.md) | [← Previous: Blocks](./blocks.md) | [Next: Styling →](./styling.md)
