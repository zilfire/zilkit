# Frequently Asked Questions

[← Back to Home](../README.md)

Common questions and answers about `@zilfire/core-theme`.

---

## General Questions

### What is @zilfire/core-theme?

`@zilfire/core-theme` is a comprehensive React component library and type system for building Next.js applications with Sanity CMS integration. It provides pre-built blocks, reusable UI components, a type-safe styling system, and Sanity schema definitions.

### Who is this package for?

This package is ideal for developers building:

- Next.js websites with Sanity CMS
- Marketing sites with hero sections, FAQs, and content blocks
- Projects requiring a consistent design system with TypeScript support
- Teams wanting pre-built, customizable components that integrate with Sanity Studio

### What are the main features?

- **Web Components**: Pre-built blocks (HeroBlock, FaqBlock, FeaturesBlock, MediaContentBlock, HeaderBlock, FooterBlock) and UI components (Button, Link, Section)
- **Text Components**: Typography components (H1-H5, P, Text, Blockquote, lists)
- **Sanity Integration**: Schema definitions that map directly to React components
- **Type Safety**: Full TypeScript support with style types and data types
- **Tree-Shaking**: Modular exports to minimize bundle size
- **Styling System**: Utility-first classes with type-safe definitions
- **Context System**: ThemeProvider for Sanity configuration

---

## Installation & Setup

### What are the peer dependencies?

The package requires:

- `react` >= 19.0.0
- `react-dom` >= 19.0.0
- `next` >= 15.0.0
- `sanity` >= 4.0.0
- `next-sanity` >= 10.0.0

### How do I install the package?

```bash
# Using pnpm (recommended)
pnpm add @zilfire/core-theme

# Using npm
npm install @zilfire/core-theme

# Using yarn
yarn add @zilfire/core-theme
```

### Do I need to configure anything after installation?

Yes, you'll need to:

1. Add the Sanity schemas to your `sanity.config.ts`
2. Import and use components in your Next.js pages
3. Optionally configure your `tsconfig.json` for proper module resolution

See the [Getting Started guide](./getting-started.md) for detailed setup instructions.

---

## Components & Blocks

### What's the difference between Blocks and Components?

**Blocks** are page-level, self-contained sections designed to map to Sanity CMS content:

- `HeroBlock` - Hero section with heading, description, background image, and CTAs
- `FaqBlock` - FAQ section with collapsible question/answer items
- `FeaturesBlock` - Feature showcase section
- `MediaContentBlock` - Media with text content
- `HeaderBlock` - Site header/navigation
- `FooterBlock` - Site footer

**Components** are smaller, reusable building blocks:

- `Button` - Styled button with variants
- `Link` - Navigation link
- `Section` - Layout container with spacing
- `Container` - Content width container
- `ButtonGroup` - Button grouping container

### How do I use a block component?

```typescript
import { HeroBlock } from '@zilfire/core-theme/web/blocks';

<HeroBlock
  data={heroData}
  context={themeContext}
  backgroundImageOptions={{
    imageSizes: '100vw',
    quality: 85,
  }}
/>;
```

### Can I customize the styling of components?

Yes! Components accept:

- `className` prop for additional CSS classes
- `options.classOverride` for replacing default classes
- Style utility functions for programmatic styling

```typescript
<Button
  data={buttonData}
  context={context}
  options={{
    variant: 'primary',
    size: 'lg',
    className: 'my-custom-class',
  }}
/>
```

### What is the ThemeContext and why is it required?

`ThemeContext` provides Sanity configuration to components that need it:

```typescript
import { ThemeProvider } from '@zilfire/core-theme/context';
import type { ThemeContext } from '@zilfire/core-theme/context';

const themeContext: ThemeContext = {
  sanityConfig: {
    sanityProjectId: 'your-project-id',
    sanityDataset: 'production',
    sanityApiVersion: '2024-01-01',
  },
};
```

Components use this context for Sanity image rendering and other CMS-related functionality.

---

## Sanity Integration

### How do I add core-theme schemas to Sanity?

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity';
import { schemaDefs } from '@zilfire/core-theme/sanity-schema';

export default defineConfig({
  // ... other config
  schema: {
    types: [
      ...schemaDefs,
      // ... your custom schemas
    ],
  },
});
```

### Can I use only some of the schemas?

Yes, schemas are exported in categories:

```typescript
import {
  blockSchemas, // HeroBlock, FaqBlock, etc.
  objectSchemas, // Button, Link, Figure
  documentSchemas, // Document types
} from '@zilfire/core-theme/sanity-schema';
```

### Do the components work with Sanity Studio previews?

Yes! Components are designed to work in Sanity Studio's preview mode. They render correctly with live data updates.

### What data types are available?

Import data types to type your Sanity query results:

```typescript
import type {
  HeroBlockData,
  FaqBlockData,
  FeaturesBlockData,
  MediaContentBlockData,
  HeaderBlockData,
  ButtonData,
  NavLinkData,
} from '@zilfire/core-theme/data-types';
```

---

## Styling System

### How does the style system work?

The package uses utility-first classes with full TypeScript support:

```typescript
import { styleClassNames } from '@zilfire/core-theme/style-classes';

// Access organized style classes
const { text, button, layout, border, background } = styleClassNames;
```

Style classes are organized into categories:

- `text` - Text/typography classes
- `button` - Button variant classes
- `layout` - Layout and spacing classes
- `border` - Border classes
- `background` - Background color classes

### What style types are available?

- `ButtonSize` - Button size variants (`sm`, `md`, `lg`)
- `ButtonStyle` - Button style variants (`primary`, `secondary`, `outline`)
- `ColorStyleClasses` - Color-related classes
- `TextStyleClasses` - Typography classes
- `LayoutStyleClasses` - Layout and spacing classes

### Can I use my own Tailwind classes alongside core-theme?

Absolutely! The style classes are regular CSS class strings that work alongside any CSS framework.

---

## TypeScript

### Is TypeScript required?

No, but it's highly recommended. The package provides comprehensive type definitions that improve developer experience with autocomplete and type checking.

### How do I import types?

```typescript
// Context types
import type { ThemeContext, SanityConfig } from '@zilfire/core-theme/context';

// Data types for Sanity content
import type {
  HeroBlockData,
  FaqBlockData,
  FeaturesBlockData,
  MediaContentBlockData,
  ButtonData,
  NavLinkData,
} from '@zilfire/core-theme/data-types';

// Style types
import type { ButtonSize, ButtonClassOverride } from '@zilfire/core-theme/style-classes';
```

### Why am I getting type errors with component props?

Ensure you're:

1. Using the correct data type for the component
2. Using the correct import path
3. Providing required props (like `data` for blocks)

```typescript
// Correct
import { HeroBlock } from '@zilfire/core-theme/web/blocks';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

const data: HeroBlockData = {
  _type: 'heroBlock',
  heading: 'Hello',
  // ... other fields
};

<HeroBlock data={data} />
```

---

## Bundle Size & Performance

### Does the package support tree-shaking?

Yes! The package uses multiple entry points to enable tree-shaking. Only import what you need:

```typescript
// ✅ Good - only imports Button
import { Button } from '@zilfire/core-theme/web/components';

// ❌ Avoid - imports everything
import * as CoreTheme from '@zilfire/core-theme';
```

### What's the recommended import strategy?

Import from specific paths:

```typescript
// Web blocks
import { HeroBlock, FaqBlock, FeaturesBlock } from '@zilfire/core-theme/web/blocks';

// Web components
import { Button, Link, Section, Container } from '@zilfire/core-theme/web/components';

// Text components
import { H1, H2, P, Text } from '@zilfire/core-theme/web/text';

// Sanity schemas
import { schemaDefs, blockSchemas } from '@zilfire/core-theme/sanity-schema';

// Context
import { ThemeProvider, useThemeContext } from '@zilfire/core-theme/context';

// Types (no runtime cost)
import type { HeroBlockData, FeaturesBlockData } from '@zilfire/core-theme/data-types';
```

---

## Troubleshooting

### Components aren't rendering correctly

1. Ensure peer dependencies are installed with correct versions
2. Check that `ThemeContext` is properly configured
3. Verify your Sanity data matches the expected schema

### Sanity Studio shows schema errors

1. Ensure you're using compatible Sanity version (>= 4.0.0)
2. Check for duplicate schema names if mixing with custom schemas
3. Verify all schemas are imported correctly in `sanity.config.ts`

### TypeScript errors in VS Code

1. Restart the TypeScript server (`Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server")
2. Ensure `tsconfig.json` has proper module resolution settings
3. Check that the package is installed correctly in `node_modules`

### Images aren't loading

1. Verify your Sanity project ID and dataset are correct
2. Check that image assets exist in Sanity
3. Ensure you're using the correct image component with proper `context`

---

## Contributing & Support

### How do I report bugs?

Open an issue on the [GitHub repository](https://github.com/zilfire/core-theme) with:

- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Package version and environment details

### Can I contribute to the package?

Yes! Contributions are welcome. Please read the contributing guidelines in the repository.

### Where can I get help?

- Check this FAQ and the [documentation](../README.md)
- Search existing GitHub issues
- Open a new issue for bugs or feature requests
