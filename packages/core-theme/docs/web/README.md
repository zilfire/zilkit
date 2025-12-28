# Web Components

[← Back to Home](../../README.md)

The web components package provides React components for building pages with `@zilfire/core-theme`.

## Overview

Components are organized into three categories:

1. **[Blocks](./blocks.md)** - Page-level content sections
2. **[Components](./components.md)** - Reusable UI elements
3. **[Text Components](../../README.md#text-components)** - Typography elements
4. **[Styling System](./styling.md)** - Style utilities and classes

## Import Paths

```typescript
// Blocks
import {
  HeroBlock,
  FaqBlock,
  FeaturesBlock,
  MediaContentBlock,
  HeaderBlock,
  FooterBlock,
} from '@zilfire/core-theme/web/blocks';

// Components
import {
  Button,
  ButtonGroup,
  Link,
  Section,
  Container,
  Image,
  ImageSection,
} from '@zilfire/core-theme/web/components';

// Text
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  P,
  Text,
  Span,
  Blockquote,
  Indent,
  OL,
  UL,
  LI,
} from '@zilfire/core-theme/web/text';
```

## Quick Start

### Using a Block

```typescript
import { HeroBlock } from '@zilfire/core-theme/web/blocks';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

const heroData: HeroBlockData = {
  _type: 'heroBlock',
  heading: 'Welcome to My Site',
  description: [
    /* Portable Text */
  ],
  primaryButton: {
    _type: 'button',
    text: 'Get Started',
    link: { _type: 'navLink', href: '/start' },
  },
};

export default function HomePage() {
  return <HeroBlock data={heroData} context={themeContext} />;
}
```

### Using Components

```typescript
import { Section, Container, Button } from '@zilfire/core-theme/web/components';

export default function MyPage() {
  return (
    <Section>
      <Container>
        <h1>My Content</h1>
        <Button data={{ _type: 'button', text: 'Click me', link: navLink }} context={themeContext}>
          Click me
        </Button>
      </Container>
    </Section>
  );
}
```

## Component Categories

### Blocks

Large, self-contained page sections that typically map to Sanity CMS content blocks.

**Available Blocks:**

- `HeroBlock` - Hero section with heading, description, background image, and CTAs
- `FaqBlock` - FAQ section with collapsible questions and answers
- `FeaturesBlock` - Feature showcase with icons and descriptions
- `MediaContentBlock` - Media with text content layout
- `HeaderBlock` - Site header with navigation
- `FooterBlock` - Site footer with logo and links

[→ Learn more about Blocks](./blocks.md)

### Components

Smaller, reusable building blocks for composing layouts and UI.

**Available Components:**

- `Button` - Styled button with variants and link support
- `ButtonGroup` - Group of buttons with spacing
- `Link` - Navigation link component
- `Section` - Layout section with spacing and background
- `Container` - Content width container
- `Image` - Optimized image component with Sanity integration
- `ImageSection` - Section with background image

[→ Learn more about Components](./components.md)

### Text Components

Typography components for headings, paragraphs, and formatted text.

**Available Text Components:**

- `H1`, `H2`, `H3`, `H4`, `H5` - Heading components
- `P` - Paragraph text
- `Text` - Base text component with full styling options
- `Span` - Inline text spans
- `Blockquote` - Quoted text
- `OL`, `UL`, `LI` - Ordered/unordered lists and list items
- `Indent` - Indented text blocks

### Styling

Utility classes and style utility functions for consistent styling.

**Features:**

- Pre-defined style classes
- Utility functions for dynamic styling
- Type-safe style composition
- Tailwind CSS integration

[→ Learn more about Styling](./styling.md)

## Theme Context

Some components use a `ThemeContext` for Sanity configuration.

```typescript
import { ThemeProvider, useThemeContext, useSanityConfig } from '@zilfire/core-theme/context';
import type { ThemeContext, SanityConfig } from '@zilfire/core-theme/context';

const sanityConfig: SanityConfig = {
  sanityProjectId: 'your-project-id',
  sanityDataset: 'production',
  sanityApiVersion: '2024-01-01',
  sanityUseCdn: true,
};

const themeContext: ThemeContext = {
  sanityConfig,
};
```

### Creating a Context Provider

```typescript
'use client';

import { createContext, useContext } from 'react';
import type { ThemeContext } from '@zilfire/core-theme/types';
import Link from 'next/link';
import Image from 'next/image';

const ThemeContextProvider = createContext<ThemeContext | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const context: ThemeContext = {
    styleClasses: {
      // Define your style classes
    },
    LinkComponent: Link,
    ImageComponent: Image,
  };

  return <ThemeContextProvider.Provider value={context}>{children}</ThemeContextProvider.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContextProvider);
  if (!context) throw new Error('useThemeContext must be used within ThemeProvider');
  return context;
}
```

## Composition Patterns

### Nesting Components

Components are designed to be nested for flexible layouts:

```typescript
<Section>
  <Container>
    <HeroBlock data={heroData} context={context}>
      <ButtonGroup>
        <Button data={primaryButton} context={context} />
        <Button data={secondaryButton} context={context} />
      </ButtonGroup>
    </HeroBlock>
  </Container>
</Section>
```

### Customizing Styles

Override styles using the component's prop system:

```typescript
<Button
  data={buttonData}
  context={context}
  options={{
    variant: 'primary',
    size: 'lg',
    className: 'custom-class',
    classOverride: { paddingX: 'px-8' },
  }}
/>
```

### Conditional Rendering

```typescript
function MyPage({ heroData }: { heroData: HeroBlockData }) {
  return (
    <>
      {heroData.heading && <HeroBlock data={heroData} context={context} />}
      {/* Other content */}
    </>
  );
}
```

## Responsive Design

Components use responsive utilities and Tailwind CSS classes:

```typescript
<Container className="px-4 md:px-6 lg:px-8">
  <Heading styleOptions={{ size: 'lg' }} className="text-2xl md:text-4xl lg:text-5xl">
    Responsive Heading
  </Heading>
</Container>
```

## Accessibility

Components follow accessibility best practices:

- Semantic HTML elements
- ARIA labels and attributes
- Keyboard navigation support
- Screen reader friendly

```typescript
<Button data={buttonData} context={context} ariaLabel="Submit form" type="submit" />
```

## Server vs Client Components

### Server Components (Default)

Most components can be used as React Server Components:

```typescript
// app/page.tsx (Server Component)
import { HeroBlock } from '@zilfire/core-theme/web/blocks';

export default async function Page() {
  const data = await fetchHeroData();
  return <HeroBlock data={data} context={context} />;
}
```

### Client Components

When you need interactivity:

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@zilfire/core-theme/web/components';

export default function InteractiveSection() {
  const [count, setCount] = useState(0);

  return (
    <Button
      data={{ _type: 'button', text: `Count: ${count}`, link: navLink }}
      context={context}
      onClick={() => setCount(count + 1)}
    />
  );
}
```

## Performance

### Code Splitting

Import only what you need:

```typescript
// Good: Import specific components
import { HeroBlock } from '@zilfire/core-theme/web/blocks';

// Avoid: Don't import entire package
import * as CoreTheme from '@zilfire/core-theme';
```

### Lazy Loading

Use dynamic imports for large components:

```typescript
import dynamic from 'next/dynamic';

const HeroBlock = dynamic(() =>
  import('@zilfire/core-theme/web/blocks').then((mod) => ({ default: mod.HeroBlock }))
);
```

## Best Practices

### 1. Use TypeScript

```typescript
import type { HeroBlockData } from '@zilfire/core-theme/data-types';
import { HeroBlock } from '@zilfire/core-theme/web/blocks';

// TypeScript ensures type safety
const data: HeroBlockData = {
  /* ... */
};
```

### 2. Centralize Theme Context

Create a single theme context and reuse it:

```typescript
// lib/theme-context.ts
export const themeContext: ThemeContext = {
  // ... configuration
};
```

### 3. Use Semantic HTML

Components output semantic HTML, maintain this in your usage:

```typescript
<main>
  <HeroBlock data={heroData} context={context} />
  <Section>{/* Main content */}</Section>
</main>
```

### 4. Handle Loading States

```typescript
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroBlock data={heroData} context={context} />
    </Suspense>
  );
}
```

## Examples

See the individual documentation pages for detailed examples:

- [Blocks Examples](./blocks.md#examples)
- [Components Examples](./components.md#examples)
- [Styling Examples](./styling.md#examples)

---

[← Back to Home](../../README.md) | [Blocks →](./blocks.md) | [Components →](./components.md) | [Styling →](./styling.md)
