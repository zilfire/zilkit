# AI-Assisted Project Setup Guide

[← Back to Home](../README.md)

This guide provides comprehensive instructions for setting up a new project with `@zilfire/core-theme` that can be built to specification using AI assistants (like GitHub Copilot, Claude, or GPT-4).

## Overview

The `@zilfire/core-theme` package is designed to accelerate development of Next.js + Sanity CMS applications through:

- **Modular Components**: Pre-built blocks and components with TypeScript types
- **Sanity Schema**: Ready-to-use CMS schemas for content management
- **Type Safety**: Full TypeScript support for AI code generation
- **Composable Architecture**: Components designed for easy customization

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Initial Setup](#initial-setup)
4. [Configuration Files](#configuration-files)
5. [AI Prompt Templates](#ai-prompt-templates)
6. [Extending the Theme](#extending-the-theme)
7. [Common Patterns](#common-patterns)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- **Node.js** 18+ and **pnpm** (recommended) or npm/yarn
- **Sanity Account**: Sign up at [sanity.io](https://www.sanity.io/)
- **Sanity Project**: Create a project and note your `projectId` and `dataset`
- **AI Assistant**: GitHub Copilot, Claude, or similar with access to this guide

---

## Project Structure

A typical project using `@zilfire/core-theme` follows this structure:

```
my-project/
├── .env.local                    # Environment variables
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind CSS config
├── next.config.ts                # Next.js config
├── sanity.config.ts              # Sanity Studio config
├── src/
│   ├── app/                      # Next.js 15 App Router
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── [slug]/               # Dynamic pages
│   │   │   └── page.tsx
│   │   ├── studio/               # Sanity Studio route
│   │   │   └── [[...tool]]/
│   │   │       └── page.tsx
│   │   └── api/                  # API routes
│   │       ├── draft-mode/
│   │       └── revalidate/
│   ├── components/               # Custom components
│   ├── lib/                      # Utilities
│   │   ├── sanity.ts             # Sanity client
│   │   └── queries.ts            # GROQ queries
│   └── sanity/                   # Sanity schemas
│       └── schema/
│           ├── index.ts          # Schema exports
│           ├── documents/        # Document schemas
│           └── objects/          # Custom object schemas
└── public/                       # Static assets
```

---

## Initial Setup

### 1. Create Next.js Project

```bash
# Using pnpm (recommended)
pnpm create next-app@latest my-project --typescript --tailwind --app --eslint

cd my-project
```

### 2. Install Core Dependencies

```bash
pnpm add @zilfire/core-theme react@^19 react-dom@^19 sanity@^4 next-sanity@^10

# Additional Sanity plugins (optional but recommended)
pnpm add @sanity/vision @sanity/color-input @portabletext/react

# Development dependencies
pnpm add -D @types/node @types/react @types/react-dom
```

### 3. Set Up Environment Variables

Create `.env.local`:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Optional: For preview mode
SANITY_API_READ_TOKEN=your_read_token
SANITY_REVALIDATE_SECRET=your_secret_key
```

---

## Configuration Files

### TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Tailwind Configuration (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // Include core-theme components for proper class detection
    './node_modules/@zilfire/core-theme/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // Define your brand colors here
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### Sanity Configuration (`sanity.config.ts`)

```typescript
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { schemaDefs } from '@zilfire/core-theme/sanity-schema';
import { colorInput } from '@sanity/color-input';

// Import your custom schemas
import page from './src/sanity/schema/documents/page';
import settings from './src/sanity/schema/documents/settings';

export default defineConfig({
  name: 'default',
  title: 'My Project CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: '/studio',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    colorInput(),
  ],

  schema: {
    types: [
      // Include core-theme schemas
      ...schemaDefs,
      // Add your custom schemas
      page,
      settings,
    ],
  },
});
```

### Sanity Client (`src/lib/sanity.ts`)

```typescript
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
});
```

---

## AI Prompt Templates

Use these prompts to guide AI assistants in building your project:

### 1. Creating a New Page Type

```
I'm using @zilfire/core-theme in my Next.js + Sanity project. I need to create a new page type called "Service" with the following fields:
- title (string)
- slug (slug from title)
- description (text)
- features (array of objects with icon, title, description)
- contentBlocks (array of heroBlock, faqBlock, mediaContentBlock from core-theme)

Create the Sanity schema in src/sanity/schema/documents/service.ts following the pattern of the existing page schema.
```

### 2. Building a Custom Block

```
Using @zilfire/core-theme as reference, create a custom "Testimonials Block" with:

Sanity Schema (src/sanity/schema/blocks/testimonials-block.ts):
- heading (string)
- testimonials (array of objects: quote, author, role, company, avatar image)
- layout (string options: 'grid' | 'slider')

Data Type (src/types/testimonials.ts):
- TypeScript interface matching the schema

React Component (src/components/blocks/TestimonialsBlock.tsx):
- Import types from @zilfire/core-theme/data-types
- Use Section and Container components from @zilfire/core-theme/web/components
- Style with Tailwind classes similar to HeroBlock pattern
```

### 3. Creating a Page Template

```
Create a Next.js dynamic route page at src/app/services/[slug]/page.tsx that:
1. Fetches a service document from Sanity by slug
2. Renders service-specific content (title, description, features)
3. Uses core-theme blocks (HeroBlock, FaqBlock, MediaContentBlock) from the contentBlocks array
4. Includes proper TypeScript types
5. Implements static params generation for static site generation

Reference the pattern from the existing [slug]/page.tsx and use:
- @zilfire/core-theme/web/blocks for block components
- @zilfire/core-theme/data-types for type definitions
- ThemeContext from @zilfire/core-theme/data-types
```

### 4. Extending Existing Components

```
I need to extend the Button component from @zilfire/core-theme/web/components to add a new variant called "ghost".

Create src/components/ExtendedButton.tsx that:
1. Imports the original Button and ButtonProps
2. Extends ButtonProps to add 'ghost' to the style options
3. Uses class-variance-authority (cva) to add ghost variant styles
4. Maintains all original Button functionality
5. Exports as a drop-in replacement
```

### 5. Setting Up Navigation

```
Create a navigation component that:
1. Fetches navigation items from Sanity settings document
2. Uses Link component from @zilfire/core-theme/web/components
3. Implements mobile menu with hamburger toggle
4. Highlights active route
5. Includes proper accessibility attributes

The navigation should be placed in src/components/Navigation.tsx and used in src/app/layout.tsx.
```

### 6. Building Custom Sanity Objects

```
Create a custom Sanity object schema for a "Card" that can be reused across multiple blocks:

Schema (src/sanity/schema/objects/card.ts):
- title (string)
- description (text)
- image (image reference)
- link (reference to page or external URL)
- tags (array of strings)

Data Type (src/types/card.ts):
- TypeScript interface with proper types for image (using Sanity image type)
- Link handling for both internal and external

Component (src/components/Card.tsx):
- Uses ImageSection from @zilfire/core-theme/web/components
- Proper image optimization with next-sanity
- Link wrapping with proper accessibility
```

---

## Extending the Theme

### Custom Block Development Workflow

1. **Define the Schema** (`src/sanity/schema/blocks/custom-block.ts`)

```typescript
import { defineField, defineType } from 'sanity';

export const customBlock = defineType({
  name: 'customBlock',
  title: 'Custom Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    // Add more fields...
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Custom Block',
        subtitle: 'Custom Block',
      };
    },
  },
});
```

2. **Create Data Type** (`src/types/custom-block.ts`)

```typescript
import type { PortableTextBlock } from 'next-sanity';
import type { SanityImageData } from '@zilfire/core-theme/data-types';

export interface CustomBlockData {
  _type: 'customBlock';
  heading?: string;
  description?: PortableTextBlock[];
  image?: SanityImageData;
  // Add more fields...
}
```

3. **Build Component** (`src/components/blocks/CustomBlock.tsx`)

```typescript
import type { CustomBlockData } from '@/types/custom-block';
import type { ThemeContext } from '@zilfire/core-theme/data-types';
import { Section, Container } from '@zilfire/core-theme/web/components';
import { H2 } from '@zilfire/core-theme/web/text';

export interface CustomBlockProps {
  data: CustomBlockData;
  context: ThemeContext;
}

export const CustomBlock: React.FC<CustomBlockProps> = ({ data, context }) => {
  return (
    <Section verticalSpacing="lg">
      <Container>
        <H2>{data.heading}</H2>
        {/* Add more content... */}
      </Container>
    </Section>
  );
};
```

4. **Register in Schema** (`src/sanity/schema/index.ts`)

```typescript
import { schemaDefs } from '@zilfire/core-theme/sanity-schema';
import { customBlock } from './blocks/custom-block';

export default {
  types: [...schemaDefs, customBlock],
};
```

5. **Add to Page Renderer**

```typescript
// In your dynamic page component
import { CustomBlock } from '@/components/blocks/CustomBlock';

function renderBlock(block: any, context: ThemeContext) {
  switch (block._type) {
    case 'customBlock':
      return <CustomBlock key={block._key} data={block} context={context} />;
    // Other cases...
  }
}
```

---

## Common Patterns

### Pattern 1: Fetching and Rendering Content

```typescript
// src/app/[slug]/page.tsx
import { client } from '@/lib/sanity';
import { HeroBlock, FaqBlock } from '@zilfire/core-theme/web/blocks';
import type { HeroBlockData, FaqBlockData } from '@zilfire/core-theme/data-types';

interface PageData {
  title: string;
  contentBlocks: (HeroBlockData | FaqBlockData)[];
}

async function getPage(slug: string): Promise<PageData> {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title,
      contentBlocks[]{
        ...,
        _type == "heroBlock" => {
          ...,
          backgroundImage{
            ...,
            asset->
          },
          primaryButton{...},
          secondaryButton{...}
        },
        _type == "faqBlock" => {
          ...,
          faqs[]{...}
        }
      }
    }`,
    { slug }
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);
  const context = { renderLinkPath: (link) => link.href };

  return (
    <main>
      {page.contentBlocks?.map((block) => {
        switch (block._type) {
          case 'heroBlock':
            return <HeroBlock key={block._key} data={block} context={context} />;
          case 'faqBlock':
            return <FaqBlock key={block._key} data={block} context={context} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
```

### Pattern 2: Type-Safe Theme Context

```typescript
// src/lib/theme-context.ts
import type { ThemeContext } from '@zilfire/core-theme/data-types';

export function createThemeContext(): ThemeContext {
  return {
    renderLinkPath: (link) => {
      if (!link) return '#';

      if (link.linkType === 'internal' && link.internalLink?._type === 'page') {
        return `/pages/${link.internalLink.slug?.current || ''}`;
      }

      if (link.linkType === 'external') {
        return link.url || '#';
      }

      return '#';
    },
  };
}
```

### Pattern 3: Reusable Block Renderer

```typescript
// src/components/BlockRenderer.tsx
import type { ThemeContext } from '@zilfire/core-theme/data-types';
import { HeroBlock, FaqBlock, MediaContentBlock } from '@zilfire/core-theme/web/blocks';

interface BlockRendererProps {
  blocks: any[];
  context: ThemeContext;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks, context }) => {
  if (!blocks) return null;

  return (
    <>
      {blocks.map((block) => {
        if (!block._type) return null;

        switch (block._type) {
          case 'heroBlock':
            return <HeroBlock key={block._key} data={block} context={context} />;
          case 'faqBlock':
            return <FaqBlock key={block._key} data={block} context={context} />;
          case 'mediaContentBlock':
            return <MediaContentBlock key={block._key} data={block} context={context} />;
          default:
            console.warn(`Unknown block type: ${block._type}`);
            return null;
        }
      })}
    </>
  );
};
```

---

## AI Development Workflow

### Step 1: Define Requirements

Provide clear specifications to your AI assistant:

```
Project Goal: Build a marketing website for a SaaS product
Pages Needed: Home, Features, Pricing, About, Contact
Blocks Required: Hero, Features Grid, Testimonials, Pricing Cards, FAQ, CTA
Custom Components: Navigation, Footer, Newsletter Signup
```

### Step 2: Schema First

Always start with Sanity schemas:

```
Create schemas for all content types first:
1. Document schemas (page, settings)
2. Block schemas (custom blocks)
3. Object schemas (reusable components like cards, testimonials)
```

### Step 3: Type Definitions

Generate TypeScript types that match schemas:

```
For each schema, create corresponding TypeScript interfaces in src/types/
- Use existing types from @zilfire/core-theme/data-types as reference
- Extend base types where applicable
- Include proper optional/required fields
```

### Step 4: Component Development

Build components systematically:

```
For each block:
1. Create component file in src/components/blocks/
2. Import necessary core-theme components
3. Implement proper typing with ThemeContext
4. Add styling with Tailwind CSS
5. Include accessibility attributes (aria-labels, semantic HTML)
```

### Step 5: Integration

Wire everything together:

```
1. Register schemas in sanity.config.ts
2. Add components to block renderer
3. Create/update page templates
4. Test in Sanity Studio and frontend
```

---

## Troubleshooting

### Module Resolution Errors

**Problem**: `Cannot find module '@zilfire/core-theme/web/blocks'`

**Solution**:

```json
// Ensure tsconfig.json has:
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

### Tailwind Classes Not Applied

**Problem**: core-theme component styles not showing

**Solution**:

```javascript
// Add to tailwind.config.ts content array:
'./node_modules/@zilfire/core-theme/dist/**/*.js';
```

### Type Errors with Sanity Data

**Problem**: Type mismatch when passing Sanity data to components

**Solution**:

```typescript
// Use proper type assertions and checks:
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

const block = data.block as HeroBlockData;
if (block._type === 'heroBlock') {
  return <HeroBlock data={block} context={context} />;
}
```

### Image Optimization Issues

**Problem**: Images not loading or optimized

**Solution**:

```typescript
// Ensure proper image projection in GROQ queries:
backgroundImage{
  ...,
  asset->{
    _id,
    url,
    metadata {
      dimensions,
      lqip
    }
  }
}
```

---

## AI Assistant Best Practices

### 1. Provide Context

Always include:

- Package structure (this guide)
- Existing schema patterns (from core-theme)
- Component examples (HeroBlock, Button, etc.)
- Type definitions (ThemeContext, data types)

### 2. Be Specific

Instead of:

> "Create a testimonials section"

Use:

> "Create a testimonials block that integrates with @zilfire/core-theme, includes a Sanity schema with heading, testimonials array (quote, author, role, avatar), uses Section and Container components, and follows the pattern of HeroBlock for styling and structure."

### 3. Request Incremental Changes

Break complex features into steps:

1. Schema definition
2. Type definitions
3. Component implementation
4. Integration with page renderer
5. Testing guidance

### 4. Validate Output

Ask AI to:

- Generate TypeScript without type errors
- Follow core-theme patterns
- Include proper imports
- Add JSDoc comments for complex functions
- Include accessibility attributes

---

## Example: Complete Feature Implementation

Here's a complete prompt for AI to build a new feature:

```
Using @zilfire/core-theme (v0.0.6) in a Next.js 15 + Sanity v4 project, implement a "Team Section" feature:

1. Sanity Schema (src/sanity/schema/blocks/team-block.ts):
   - heading (string, required)
   - description (richText, optional)
   - teamMembers (array of objects):
     - name (string)
     - role (string)
     - bio (text)
     - image (image with alt text)
     - socialLinks (array: platform, url)
   - layout (string: 'grid' | 'list', default 'grid')

2. TypeScript Types (src/types/team.ts):
   - TeamBlockData interface
   - TeamMemberData interface
   - SocialLinkData interface
   - Import SanityImageData from @zilfire/core-theme/data-types

3. React Component (src/components/blocks/TeamBlock.tsx):
   - Use Section, Container, H2 from core-theme
   - Create TeamMemberCard sub-component
   - Implement both grid and list layouts
   - Use next-sanity for image optimization
   - Include proper TypeScript types with ThemeContext
   - Add hover effects and transitions
   - Ensure mobile responsiveness

4. Register schema in src/sanity/schema/index.ts

5. Add to BlockRenderer in src/components/BlockRenderer.tsx

6. Provide example GROQ query for fetching team data

Follow all core-theme patterns for structure, typing, and styling.
```

---

## Resources

- **Core Theme Docs**: [../README.md](../README.md)
- **Architecture**: [architecture.md](./architecture.md)
- **Component Reference**: [web/components.md](./web/components.md)
- **Sanity Schema Guide**: [sanity/schema.md](./sanity/schema.md)

---

## Next Steps

1. Follow [Getting Started](./getting-started.md) for basic setup
2. Review [Architecture](./architecture.md) to understand package structure
3. Study existing blocks in `src/web/blocks/` for patterns
4. Use AI prompt templates above to accelerate development
5. Extend with custom blocks and components as needed

---

**Ready to build?** Start with the initial setup steps and use the AI prompts to guide your development process. The core-theme package provides the foundation—AI helps you build on it quickly and efficiently.

[← Back to Home](../README.md)
