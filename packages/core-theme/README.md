# @zilfire/core-theme

Part of the [Zilfire Core](../../README.md) monorepo.

A comprehensive React component library and type system for building Next.js applications with Sanity CMS integration.

> ⚠️ **Warning: Active Development**
>
> This package is under active development and the API is subject to change. Breaking changes may occur between versions until the beta release. **Beta launch is expected in Q2 2026.**
>
> Use in production at your own risk.

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
import { ThemeProvider } from '@zilfire/core-theme/context';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

const heroData: HeroBlockData = {
  _type: 'heroBlock',
  heading: 'Welcome',
  description: [/* Portable Text */],
};

function MyComponent() {
  return <HeroBlock data={heroData} />;
}
```

## 📚 Documentation

### Getting Started

- [Installation & Setup](./docs/getting-started.md) - Get up and running quickly
- [AI-Assisted Setup](./docs/ai-setup-guide.md) - Build projects with AI assistance
- [Architecture Overview](./docs/architecture.md) - Understand the package structure
- [FAQ](./docs/faq.md) - Frequently asked questions

### Core Features

#### 🎨 [Web Components](./docs/web/README.md)

- [Blocks](./docs/web/blocks.md) - Page-level building blocks (HeroBlock, FaqBlock, FeaturesBlock, etc.)
- [Components](./docs/web/components.md) - Reusable UI components (Button, Link, Section, etc.)
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
import /* types */ '@zilfire/core-theme';

// Web blocks
import {
  HeroBlock,
  FaqBlock,
  FeaturesBlock,
  MediaContentBlock,
  HeaderBlock,
  FooterBlock,
} from '@zilfire/core-theme/web/blocks';

// Web components
import {
  Button,
  ButtonGroup,
  Link,
  Section,
  Container,
  ImageSection,
} from '@zilfire/core-theme/web/components';

// Text components
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  P,
  Text,
  Blockquote,
  Span,
  OL,
  UL,
  LI,
  Indent,
} from '@zilfire/core-theme/web/text';

// Sanity schema
import {
  schemaDefs,
  blockSchemas,
  objectSchemas,
  documentSchemas,
} from '@zilfire/core-theme/sanity-schema';

// Data types
import type {
  HeroBlockData,
  FaqBlockData,
  FeaturesBlockData,
  MediaContentBlockData,
  ButtonData,
  NavLinkData,
} from '@zilfire/core-theme/data-types';

// Context
import { ThemeProvider, useThemeContext, useSanityConfig } from '@zilfire/core-theme/context';

// Style classes
import { styleClassNames } from '@zilfire/core-theme/style-classes';
```

## 🛠️ Peer Dependencies

This package requires:

- `react` >= 19.0.0
- `react-dom` >= 19.0.0
- `next` >= 15.0.0
- `sanity` >= 4.0.0
- `next-sanity` >= 10.0.0

## 📄 License

ISC

## 🔗 Links

- [GitHub Repository](https://github.com/zilfire/core-theme)
- [Report Issues](https://github.com/zilfire/core-theme/issues)

---

**Version:** 0.0.6
