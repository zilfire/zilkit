# Architecture

[← Back to Home](../README.md)

This document explains the architecture and design decisions behind `@zilfire/core-theme`.

## Package Structure

```
packages/core-theme/
├── src/
│   ├── index.ts                    # Main entry point (exports data types)
│   ├── types/                      # TypeScript type definitions
│   │   ├── context-types/          # React context types
│   │   ├── sanity-data-types/      # Sanity CMS data structure types
│   │   │   ├── blocks/             # Block content types
│   │   │   ├── objects/            # Object types
│   │   │   └── config/             # Configuration types
│   │   └── style-types/            # Style system types
│   │       ├── button-style-classes.ts
│   │       ├── color-style-classes.ts
│   │       ├── layout-style-classes.ts
│   │       └── text-style-classes.ts
│   ├── web/                        # React components
│   │   ├── blocks/                 # Page-level block components
│   │   │   ├── HeroBlock.tsx
│   │   │   └── FaqBlock.tsx
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Link.tsx
│   │   │   ├── Section.tsx
│   │   │   └── Container.tsx
│   │   ├── text/                   # Text components (Heading, Paragraph)
│   │   └── style/                  # Style utilities
│   │       ├── button-classes.ts
│   │       ├── color-classes.ts
│   │       ├── layout-classes.ts
│   │       ├── text-classes.ts
│   │       └── style-utils/        # Style utility functions
│   ├── sanity/                     # Sanity CMS integration
│   │   ├── schema/                 # Sanity schema definitions
│   │   │   ├── blocks/             # Block schemas
│   │   │   ├── objects/            # Object schemas
│   │   │   └── documents/          # Document schemas
│   │   └── utils/                  # Sanity utilities
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
- **`/web/blocks`**: Page-level block components
- **`/web/components`**: Reusable UI components
- **`/web/text`**: Text rendering components
- **`/sanity-schema`**: Sanity Studio schemas
- **`/data-types`**: Sanity data structure types
- **`/types`**: General TypeScript types
- **`/style-classes`**: Pre-built style classes

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
- `HeroBlock`: Hero section with heading, subheading, and buttons
- `FaqBlock`: FAQ section with collapsible questions

**Components** are smaller, reusable building blocks:
- `Button`: Styled button with variants
- `Link`: Navigation link
- `Section`: Layout container with spacing
- `Container`: Content width container

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
  return (
    <Section>
      {/* Your custom content */}
    </Section>
  );
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
