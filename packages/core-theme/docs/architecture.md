# Architecture

[← Back to Home](../README.md)

This document explains the architecture and design decisions behind `@zilfire/core-theme`.

## Package Structure

```
packages/core-theme/
├── src/
│   ├── index.ts                    # Main entry point
│   ├── assets/                     # Static assets
│   │   ├── gridBG.ts               # Background patterns
│   │   └── icon-registry.tsx       # Icon component registry
│   ├── config/                     # Configuration
│   │   ├── context.ts              # ThemeProvider and hooks
│   │   └── utils/                  # Config utilities
│   │       └── render-link-path.ts
│   ├── web/                        # React components
│   │   ├── blocks/                 # Page-level block components
│   │   │   ├── HeroBlock.tsx
│   │   │   ├── FeaturesBlock.tsx
│   │   │   ├── MediaContentBlock.tsx
│   │   │   ├── FooterBlock.tsx
│   │   │   ├── faq-block/          # FAQ block with sub-components
│   │   │   └── header-block/       # Header/navigation block
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── ButtonGroup.tsx
│   │   │   ├── Link.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Image.tsx
│   │   │   └── ImageSection.tsx
│   │   ├── text/                   # Text components
│   │   │   ├── H1-H5.tsx           # Heading components
│   │   │   ├── P.tsx               # Paragraph
│   │   │   ├── Text.tsx            # Base text component
│   │   │   ├── Blockquote.tsx
│   │   │   ├── Span.tsx
│   │   │   ├── OL.tsx, UL.tsx, LI.tsx  # List components
│   │   │   └── Indent.tsx
│   │   └── style/                  # Style system
│   │       ├── classes/            # Style class definitions
│   │       │   ├── style-classes.ts
│   │       │   ├── button-classes.ts
│   │       │   ├── text-classes.ts
│   │       │   ├── layout-classes.ts
│   │       │   ├── border-classes.ts
│   │       │   └── background-classes.ts
│   │       ├── types/              # Style type definitions
│   │       └── utils/              # Style utility functions
│   ├── sanity/                     # Sanity CMS integration
│   │   ├── schema/                 # Sanity schema definitions
│   │   │   ├── blocks/             # Block schemas
│   │   │   ├── objects/            # Object schemas
│   │   │   └── documents/          # Document schemas
│   │   └── data-types/             # TypeScript types for Sanity data
│   │       ├── blocks/             # Block data types
│   │       └── objects/            # Object data types
│   └── utils/                      # General utilities
└── docs/                           # Documentation
```

## Design Principles

### 1. Modular Exports

The package uses multiple entry points to enable tree-shaking and reduce bundle size:

```typescript
// Import only what you need
import { Button } from '@zilfire/core-theme/web/components';
import { HeroBlock } from '@zilfire/core-theme/web/blocks';
import { bgPrimary } from '@zilfire/core-theme/style-classes';
```

Each export path corresponds to a specific concern:

- **Main export (`.`)**: Core types and data types
- **`/web/blocks`**: Page-level block components (HeroBlock, FaqBlock, FeaturesBlock, etc.)
- **`/web/components`**: Reusable UI components (Button, Section, Container, etc.)
- **`/web/text`**: Text rendering components (H1-H5, P, Text, Blockquote, etc.)
- **`/sanity-schema`**: Sanity Studio schemas (schemaDefs, blockSchemas, objectSchemas)
- **`/data-types`**: Sanity data structure types
- **`/context`**: ThemeProvider and context hooks
- **`/config-types`**: Configuration type definitions
- **`/style-classes`**: Pre-built style class names (styleClassNames)

### 2. Type Safety

The package is fully typed with TypeScript:

- **Style Types**: Type-safe style class definitions with string literal types
- **Data Types**: Structured types for all Sanity content
- **Component Props**: Strongly typed component interfaces
- **Utility Functions**: Typed helper functions with inference

```typescript
// Example: Type-safe button styles
import type { ButtonSize, ButtonStyle } from '@zilfire/core-theme/types';

const size: ButtonSize = 'large'; // ✓ Valid
const style: ButtonStyle = 'primary'; // ✓ Valid
```

### 3. Composition Over Configuration

Components are designed to be composable:

```typescript
// Compose components together
<Section>
  <Container>
    <HeroBlock {...heroData}>
      <ButtonGroup>
        <Button>Primary</Button>
        <Button style="secondary">Secondary</Button>
      </ButtonGroup>
    </HeroBlock>
  </Container>
</Section>
```

### 4. Sanity-First Architecture

The package is designed around Sanity CMS:

- **Schema-Driven**: Components map to Sanity schemas
- **Portable Text**: Built-in support for Portable Text rendering
- **Type Generation**: Data types match schema structure
- **Preview Support**: Components work in Sanity Studio previews

## Key Concepts

### Blocks vs Components

**Blocks** are page-level, self-contained sections:

- `HeroBlock`: Hero section with heading, description, background image, and CTAs
- `FaqBlock`: FAQ section with collapsible questions and answers
- `FeaturesBlock`: Feature showcase with icons and descriptions
- `MediaContentBlock`: Media with text content layout
- `HeaderBlock`: Site header with navigation
- `FooterBlock`: Site footer

**Components** are smaller, reusable building blocks:

- `Button`: Styled button with variants and link support
- `ButtonGroup`: Container for grouping buttons
- `Link`: Navigation link component
- `Section`: Layout section with spacing and background options
- `Container`: Content width container
- `Image`: Optimized image component
- `ImageSection`: Section with background image support

**Text Components** for typography:

- `H1`, `H2`, `H3`, `H4`, `H5`: Heading components
- `P`: Paragraph component
- `Text`: Base text component with full styling options
- `Blockquote`, `Span`, `OL`, `UL`, `LI`, `Indent`: Additional text elements

### Style System

The style system uses utility-first classes with type safety:

```typescript
// Pre-defined classes
import { textLarge, bgPrimary, buttonPrimary } from '@zilfire/core-theme/style-classes';

// Or use utility functions
import { getTextColor } from '@zilfire/core-theme/web/style/style-utils';
import { colorClassNames } from '@zilfire/core-theme/web/style/color-classes';

const className = getTextColor(colorClassNames, 'primary');
```

**Style Utilities** (`style-utils/`):

- `button-style-utils.ts`: Button style composition
- `color-style-utils.ts`: Color class helpers
- `layout-style-utils.ts`: Layout utilities
- `text-style-utils.ts`: Text style helpers

### Data Flow

```
Sanity CMS → Data Types → Components → Rendered Page

1. Content editors create content in Sanity Studio
2. Data is fetched with type safety (HeroBlockData)
3. Components receive typed props
4. Components render with styled output
```

## Technology Stack

- **React 19**: Latest React features
- **TypeScript 5**: Full type safety
- **Sanity v4**: Headless CMS
- **next-sanity**: Next.js integration
- **Tailwind CSS**: Utility-first styling (via class names)
- **clsx**: Conditional class composition
- **class-variance-authority**: Variant-based styling

## Build Process

The package uses TypeScript compiler (`tsc`) to:

1. Compile TypeScript to JavaScript (ESM)
2. Generate `.d.ts` type definition files
3. Preserve directory structure in `dist/`
4. Maintain `.js` extensions for ESM compatibility

```bash
# Development (watch mode)
pnpm dev

# Production build
pnpm build

# Clean build artifacts
pnpm clean
```

## Extension Points

The package is designed to be extended:

### Custom Blocks

Create your own blocks using the same patterns:

```typescript
import { Section } from '@zilfire/core-theme/web/components';
import type { BlockData } from '@zilfire/core-theme/data-types';

export function CustomBlock(props: BlockData) {
  return <Section>{/* Your custom content */}</Section>;
}
```

### Custom Styles

Extend the style system with your own utilities:

```typescript
import { colorClassNames } from '@zilfire/core-theme/web/style/color-classes';

export const customColors = {
  ...colorClassNames,
  textColors: {
    ...colorClassNames.textColors,
    custom: 'text-custom-500',
  },
};
```

### Custom Schemas

Extend Sanity schemas with your own types:

```typescript
import { blockSchemas } from '@zilfire/core-theme/sanity-schema';
import { defineType } from 'sanity';

export const customBlock = defineType({
  name: 'customBlock',
  type: 'object',
  // ... your schema
});

export const allSchemas = [...blockSchemas, customBlock];
```

## Performance Considerations

- **Tree-shaking**: Modular exports enable unused code elimination
- **Code splitting**: Components can be lazy-loaded
- **Type-only imports**: Use `import type` for types
- **Minimal runtime**: Small bundle size, most weight is in types

## Versioning

The package follows semantic versioning:

- **Major**: Breaking API changes
- **Minor**: New features, backward compatible
- **Patch**: Bug fixes

Current version: `0.0.6` (pre-release)

---

[← Back to Home](../README.md) | [Next: Types Overview →](./types/README.md)
