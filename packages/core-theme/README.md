# @zilfire/core-theme

A comprehensive React component library and type system for building Next.js applications with Sanity CMS integration.

## 📦 Installation

```bash
npm install @zilfire/core-theme
# or
pnpm add @zilfire/core-theme
# or
yarn add @zilfire/core-theme
```

## 🚀 Quick Start

```typescript
import { HeroBlock } from '@zilfire/core-theme/web/blocks';
import { Button } from '@zilfire/core-theme/web/components';
import { textLarge } from '@zilfire/core-theme/style-classes';

function MyComponent() {
  return (
    <HeroBlock
      heading="Welcome"
      subheading="Get started with core-theme"
    />
  );
}
```

## 📚 Documentation

### Getting Started
- [Installation & Setup](./docs/getting-started.md) - Get up and running quickly
- [Architecture Overview](./docs/architecture.md) - Understand the package structure

### Core Features

#### 🎨 [Web Components](./docs/web/README.md)
- [Blocks](./docs/web/blocks.md) - Page-level building blocks (HeroBlock, FaqBlock)
- [Components](./docs/web/components.md) - Reusable UI components (Button, Link, Section)
- [Styling System](./docs/web/styling.md) - Utility classes and style utilities

#### 📐 [Types](./docs/types/README.md)
- [Style Types](./docs/types/style-types.md) - Type-safe styling system
- [Sanity Data Types](./docs/types/sanity-types.md) - CMS content types

#### 🔧 [Sanity Integration](./docs/sanity/README.md)
- [Schema Definitions](./docs/sanity/schema.md) - Sanity Studio schema
- [Utilities](./docs/sanity/utils.md) - Helper functions for Sanity data

### API Reference
- [Blocks API](./docs/api/blocks.md) - Complete block component reference
- [Components API](./docs/api/components.md) - Component props and usage
- [Utilities API](./docs/api/utilities.md) - Helper function documentation

## 🔗 Package Exports

This package provides multiple entry points for tree-shaking:

```typescript
// Main exports (types and data types)
import { /* types */ } from '@zilfire/core-theme';

// Web components
import { HeroBlock, FaqBlock } from '@zilfire/core-theme/web/blocks';
import { Button, Link, Section } from '@zilfire/core-theme/web/components';
import { Heading, Paragraph } from '@zilfire/core-theme/web/text';

// Sanity schema
import { blockSchemas } from '@zilfire/core-theme/sanity-schema';

// Data types
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

// Type system
import type { ButtonStyleClasses } from '@zilfire/core-theme/types';

// Style classes
import { textLarge, bgPrimary } from '@zilfire/core-theme/style-classes';
```

## 🛠️ Peer Dependencies

This package requires:

- `react` >= 19.0.0
- `react-dom` >= 19.0.0
- `sanity` >= 4.0.0
- `next-sanity` >= 10.0.0

## 📄 License

ISC

## 🔗 Links

- [GitHub Repository](https://github.com/zilfire/core-theme)
- [Report Issues](https://github.com/zilfire/core-theme/issues)

---

**Version:** 0.0.6
