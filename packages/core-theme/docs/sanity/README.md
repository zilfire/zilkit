# Sanity Integration

[← Back to Home](../../README.md)

Sanity integration provides schema definitions and utilities for working with Sanity CMS.

## Overview

The Sanity integration includes:

- **[Schema Definitions](./schema.md)** - Sanity Studio schemas
- **[Utilities](./utils.md)** - Helper functions for Sanity data

## Import Path

```typescript
// Import all schemas
import { schemaDefs } from '@zilfire/core-theme/sanity-schema';

// Import specific schema categories
import { blockSchemas, objectSchemas, documentSchemas } from '@zilfire/core-theme/sanity-schema';
```

## Quick Start

### Adding Schemas to Sanity Config

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity';
import { schemaDefs } from '@zilfire/core-theme/sanity-schema';

export default defineConfig({
  name: 'default',
  title: 'My Project',
  projectId: 'your-project-id',
  dataset: 'production',

  plugins: [
    // ... your plugins
  ],

  schema: {
    types: [
      ...schemaDefs, // Add all core-theme schemas
      // ... your custom schemas
    ],
  },
});
```

### Using Individual Schema Collections

```typescript
import { blockSchemas, objectSchemas, documentSchemas } from '@zilfire/core-theme/sanity-schema';

export default defineConfig({
  // ... config
  schema: {
    types: [
      ...blockSchemas, // Hero, FAQ blocks
      ...objectSchemas, // Button, Link, Figure
      ...documentSchemas, // Document types
      // ... your custom schemas
    ],
  },
});
```

## Available Schemas

### Block Schemas

Page-level content blocks:

- **heroBlock** - Hero section
- **faqBlock** - FAQ section

[→ Learn more about Schemas](./schema.md)

### Object Schemas

Reusable content objects:

- **button** - Button with link
- **blockContent** - Rich text content
- **richText** - Enhanced portable text
- **figure** - Image with caption

[→ Learn more about Schemas](./schema.md)

### Document Schemas

Document types for pages and content:

- Custom document types can extend these schemas

## Fetching Data

### Basic Query

```typescript
import { client } from '@/lib/sanity';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

async function getHeroBlock(): Promise<HeroBlockData> {
  return await client.fetch(`
    *[_type == "heroBlock"][0] {
      _type,
      heading,
      description,
      backgroundImage,
      primaryButton,
      secondaryButton
    }
  `);
}
```

### With Projections

```typescript
const query = `
  *[_type == "heroBlock"][0] {
    _type,
    heading,
    description,
    backgroundImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt,
      hotspot,
      crop
    },
    primaryButton {
      _type,
      text,
      link {
        _type,
        href,
        external
      }
    }
  }
`;

const heroData = await client.fetch<HeroBlockData>(query);
```

## Studio Customization

### Custom Preview

```typescript
import { defineType } from 'sanity';

export const customHeroBlock = defineType({
  name: 'heroBlock',
  type: 'object',
  title: 'Hero Block',
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hero Block',
        subtitle: subtitle?.[0]?.children?.[0]?.text || '',
        media,
      };
    },
  },
});
```

### Adding Fields

Extend existing schemas:

```typescript
import { heroBlock } from '@zilfire/core-theme/sanity-schema';

export const extendedHeroBlock = {
  ...heroBlock,
  fields: [
    ...heroBlock.fields,
    {
      name: 'customField',
      type: 'string',
      title: 'Custom Field',
    },
  ],
};
```

## Best Practices

1. **Import schemas individually** - Better tree-shaking
2. **Type your queries** - Use TypeScript types from data-types
3. **Use projections** - Fetch only needed fields
4. **Validate data** - Check for required fields
5. **Handle drafts** - Use `_id` to filter drafts if needed

## Next Steps

- [Schema Reference](./schema.md) - Complete schema documentation
- [Utilities](./utils.md) - Helper functions
- [Data Types](../types/sanity-types.md) - TypeScript types for Sanity data

---

[← Back to Home](../../README.md) | [Schema →](./schema.md) | [Utils →](./utils.md)
