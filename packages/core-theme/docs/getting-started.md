# Getting Started

[← Back to Home](../README.md)

This guide will help you get started with `@zilfire/core-theme` in your Next.js and Sanity project.

## Installation

### 1. Install the Package

```bash
pnpm add @zilfire/core-theme
# or
npm install @zilfire/core-theme
# or
yarn add @zilfire/core-theme
```

### 2. Install Peer Dependencies

Ensure you have the required peer dependencies installed:

```bash
pnpm add react@^19.0.0 react-dom@^19.0.0 sanity@^4.0.0 next-sanity@^10.0.0
```

## Basic Setup

### Using Web Components

Import and use components in your Next.js pages or components:

```typescript
// app/page.tsx
import { HeroBlock } from '@zilfire/core-theme/web/blocks';
import { Button } from '@zilfire/core-theme/web/components';

export default function HomePage() {
  return (
    <main>
      <HeroBlock
        heading="Welcome to My Site"
        subheading="Built with core-theme"
        buttons={[
          {
            text: 'Get Started',
            href: '/get-started',
            style: 'primary'
          }
        ]}
      />
    </main>
  );
}
```

### Using Style Classes

Import pre-built utility classes:

```typescript
import { textLarge, bgPrimary, buttonPrimary } from '@zilfire/core-theme/style-classes';

function MyComponent() {
  return (
    <div className={bgPrimary}>
      <h1 className={textLarge}>Hello World</h1>
    </div>
  );
}
```

### Setting Up Sanity Schema

Add core-theme schemas to your Sanity configuration:

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity';
import { blockSchemas, objectSchemas, documentSchemas } from '@zilfire/core-theme/sanity-schema';

export default defineConfig({
  // ... other config
  schema: {
    types: [
      ...blockSchemas,
      ...objectSchemas,
      ...documentSchemas,
      // ... your custom schemas
    ],
  },
});
```

## TypeScript Configuration

Ensure your `tsconfig.json` has module resolution set up correctly:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "module": "ESNext",
    "target": "ES2022",
    "jsx": "preserve"
  }
}
```

## Next Steps

Now that you have the basics set up, explore:

- [Architecture Overview](./architecture.md) - Understand the package structure
- [Web Components](./web/README.md) - Learn about available components
- [Styling System](./web/styling.md) - Master the styling utilities
- [Sanity Integration](./sanity/README.md) - Set up your CMS

## Common Use Cases

### Building a Landing Page

```typescript
import { HeroBlock, FaqBlock } from '@zilfire/core-theme/web/blocks';
import { Section, Container } from '@zilfire/core-theme/web/components';

export default function LandingPage() {
  return (
    <>
      <HeroBlock
        heading="My Product"
        subheading="The best solution for your needs"
      />
      
      <Section>
        <Container>
          {/* Your content */}
        </Container>
      </Section>
      
      <FaqBlock
        heading="Frequently Asked Questions"
        faqs={[/* FAQ data */]}
      />
    </>
  );
}
```

### Using with Sanity Data

```typescript
import { client } from '@/lib/sanity';
import { HeroBlock } from '@zilfire/core-theme/web/blocks';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

async function getHeroData(): Promise<HeroBlockData> {
  return client.fetch('*[_type == "hero"][0]');
}

export default async function Page() {
  const heroData = await getHeroData();
  
  return <HeroBlock {...heroData} />;
}
```

## Troubleshooting

### Module Resolution Issues

If you encounter import errors, ensure:
1. Your `package.json` has `"type": "module"`
2. You're using `.js` extensions in imports within the package
3. Your bundler supports ESM

### Styling Not Applied

Make sure you have Tailwind CSS configured and the necessary classes are included in your Tailwind content paths:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@zilfire/core-theme/dist/**/*.js',
  ],
  // ... rest of config
}
```

---

[← Back to Home](../README.md) | [Next: Architecture →](./architecture.md)
