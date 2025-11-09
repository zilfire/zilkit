# Sanity Schema Definitions

[← Back to Sanity](./README.md) | [← Back to Home](../../README.md)

Complete reference for Sanity Studio schema definitions in `@zilfire/core-theme`.

## Import Schemas

```typescript
import {
  // All schemas
  schemaDefs,

  // By category
  blockSchemas,
  objectSchemas,
  documentSchemas,

  // Individual schemas
  heroBlock,
  faqBlock,
  button,
  blockContent,
  richText,
  figure,
} from '@zilfire/core-theme/sanity-schema';
```

## Block Schemas

### heroBlock

Hero section with heading, description, background image, and CTA buttons.

**Schema:**

```typescript
{
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'richText',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'figure',
    },
    {
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'button',
    },
    {
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'button',
    },
  ],
}
```

**Usage in Sanity Studio:**

```typescript
import { defineType } from 'sanity';
import { heroBlock } from '@zilfire/core-theme/sanity-schema';

export default defineConfig({
  schema: {
    types: [heroBlock],
  },
});
```

---

### faqBlock

FAQ section with collapsible questions and answers.

**Schema:**

```typescript
{
  name: 'faqBlock',
  title: 'FAQ Block',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'blockContent',
            },
          ],
        },
      ],
    },
  ],
}
```

---

## Object Schemas

### button

Button with text and navigation link.

**Schema:**

```typescript
{
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      title: 'Button Link',
      type: 'navLink',
      validation: (Rule) => Rule.required(),
    },
  ],
}
```

---

### figure

Image with alt text, caption, and crop/hotspot.

**Schema:**

```typescript
{
  name: 'figure',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and accessibility',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
  ],
}
```

---

### blockContent

Standard Portable Text content.

**Schema:**

```typescript
{
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
              },
            ],
          },
        ],
      },
    },
  ],
}
```

---

### richText

Enhanced Portable Text with additional features.

**Schema:**

```typescript
{
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [
    {
      type: 'block',
      // ... enhanced configuration
    },
    {
      type: 'figure', // Can embed images
    },
  ],
}
```

---

## Document Schemas

Document schemas define top-level content types. Extend these for your pages and content.

### Example: Page Document

```typescript
import { defineType, defineField } from 'sanity';
import { heroBlock, faqBlock } from '@zilfire/core-theme/sanity-schema';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blocks',
      title: 'Page Blocks',
      type: 'array',
      of: [{ type: heroBlock.name }, { type: faqBlock.name }],
    }),
  ],
});
```

---

## Customizing Schemas

### Extending an Existing Schema

```typescript
import { heroBlock } from '@zilfire/core-theme/sanity-schema';
import { defineType, defineField } from 'sanity';

export const customHeroBlock = defineType({
  ...heroBlock,
  name: 'customHeroBlock',
  title: 'Custom Hero Block',
  fields: [
    ...heroBlock.fields,
    defineField({
      name: 'customField',
      title: 'Custom Field',
      type: 'string',
    }),
  ],
});
```

### Custom Validation

```typescript
import { button } from '@zilfire/core-theme/sanity-schema';

export const validatedButton = {
  ...button,
  fields: button.fields.map((field) => {
    if (field.name === 'text') {
      return {
        ...field,
        validation: (Rule: any) => Rule.required().min(3).max(50),
      };
    }
    return field;
  }),
};
```

### Custom Previews

```typescript
export const heroBlockWithPreview = {
  ...heroBlock,
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hero Block',
        subtitle: subtitle?.[0]?.children?.[0]?.text,
        media,
      };
    },
  },
};
```

---

## Schema Patterns

### Reusable Field Groups

```typescript
import { defineField } from 'sanity';

const seoFields = [
  defineField({
    name: 'metaTitle',
    title: 'Meta Title',
    type: 'string',
  }),
  defineField({
    name: 'metaDescription',
    title: 'Meta Description',
    type: 'text',
  }),
];

export const pageWithSeo = {
  // ... other fields
  fields: [
    // ... page fields
    ...seoFields,
  ],
};
```

### Conditional Fields

```typescript
defineField({
  name: 'buttonStyle',
  title: 'Button Style',
  type: 'string',
  options: {
    list: ['primary', 'secondary', 'custom'],
  },
}),
defineField({
  name: 'customColor',
  title: 'Custom Color',
  type: 'string',
  hidden: ({ parent }) => parent?.buttonStyle !== 'custom',
}),
```

---

## Best Practices

1. **Use validation** - Ensure required fields are filled
2. **Add descriptions** - Help editors understand field purpose
3. **Configure previews** - Make content browsable in Studio
4. **Group related fields** - Use fieldsets for organization
5. **Use consistent naming** - Follow camelCase convention
6. **Add initial values** - Set sensible defaults

---

## Example: Complete Schema Setup

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity';
import { schemaDefs } from '@zilfire/core-theme/sanity-schema';

// Custom schemas
import { page } from './schemas/documents/page';
import { siteSettings } from './schemas/singletons/site-settings';

export default defineConfig({
  name: 'default',
  title: 'My Project',
  projectId: 'your-project-id',
  dataset: 'production',

  schema: {
    types: [
      // Core-theme schemas
      ...schemaDefs,

      // Your custom schemas
      page,
      siteSettings,
    ],
  },
});
```

---

[← Back to Sanity](./README.md) | [Next: Utilities →](./utils.md)
