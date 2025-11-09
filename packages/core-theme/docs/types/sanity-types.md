# Sanity Data Types

[← Back to Types](./README.md) | [← Back to Home](../../README.md)

Sanity data types define the shape and structure of content from Sanity CMS. These types ensure type safety when fetching and rendering CMS content.

## Overview

Data types are organized into:
- **Block Types**: Page-level content blocks
- **Object Types**: Reusable content objects
- **Config Types**: Site configuration
- **External Types**: Third-party integrations

## Import Path

```typescript
import type {
  HeroBlockData,
  FaqBlockData,
  ButtonData,
} from '@zilfire/core-theme/data-types';
```

## Block Types

Blocks are large, page-level content sections.

### HeroBlockData

Hero section with heading, description, and call-to-action buttons.

```typescript
import { PortableTextBlock } from '@portabletext/types';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import type { ButtonData } from '../objects/button.js';

type HeroBlockData = {
  _type: 'heroBlock';
  heading?: string;
  description?: PortableTextBlock[];
  backgroundImage?: SanityImageWithAlt;
  primaryButton?: ButtonData;
  secondaryButton?: ButtonData;
};
```

**Usage:**
```typescript
import { HeroBlock } from '@zilfire/core-theme/web/blocks';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

async function getHeroData(): Promise<HeroBlockData> {
  return await sanityClient.fetch(`
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

export default async function Page() {
  const data = await getHeroData();
  return <HeroBlock {...data} />;
}
```

**Fields:**
- `_type`: Always `'heroBlock'` (discriminator)
- `heading`: Optional hero heading text
- `description`: Optional Portable Text content
- `backgroundImage`: Optional background image with alt text
- `primaryButton`: Optional primary CTA button
- `secondaryButton`: Optional secondary button

### FaqBlockData

FAQ section with collapsible questions and answers.

```typescript
import { PortableTextBlock } from "@portabletext/types";

type FaqBlockData = {
  _type: "faqBlock";
  heading?: string;
  description?: string;
  faqs: {
    question: string;
    answer: PortableTextBlock;
  }[];
};
```

**Usage:**
```typescript
import { FaqBlock } from '@zilfire/core-theme/web/blocks';
import type { FaqBlockData } from '@zilfire/core-theme/data-types';

const faqData: FaqBlockData = {
  _type: 'faqBlock',
  heading: 'Frequently Asked Questions',
  description: 'Find answers to common questions',
  faqs: [
    {
      question: 'How do I get started?',
      answer: {
        _type: 'block',
        children: [{ _type: 'span', text: 'Follow our getting started guide.' }],
      },
    },
  ],
};

export default function FaqPage() {
  return <FaqBlock {...faqData} />;
}
```

**Fields:**
- `_type`: Always `'faqBlock'`
- `heading`: Optional section heading
- `description`: Optional section description
- `faqs`: Array of FAQ items
  - `question`: Question text (required)
  - `answer`: Portable Text answer content (required)

## Object Types

Objects are smaller, reusable content structures.

### ButtonData

Button with text and navigation link.

```typescript
import type { NavLink } from './nav-link.js';

type ButtonData = {
  _type: 'button';
  text: string;
  link: NavLink;
};
```

**Usage:**
```typescript
import { Button } from '@zilfire/core-theme/web/components';
import type { ButtonData } from '@zilfire/core-theme/data-types';

const buttonData: ButtonData = {
  _type: 'button',
  text: 'Get Started',
  link: {
    _type: 'navLink',
    href: '/get-started',
    external: false,
  },
};

export default function MyComponent() {
  return <Button {...buttonData} />;
}
```

**Fields:**
- `_type`: Always `'button'`
- `text`: Button label text
- `link`: Navigation link object

### NavLink

Navigation link with internal/external URL handling.

```typescript
type NavLink = {
  _type: 'navLink';
  href: string;
  external?: boolean;
  openInNewTab?: boolean;
};
```

**Usage:**
```typescript
import { Link } from '@zilfire/core-theme/web/components';
import type { NavLink } from '@zilfire/core-theme/data-types';

const linkData: NavLink = {
  _type: 'navLink',
  href: 'https://example.com',
  external: true,
  openInNewTab: true,
};

export default function MyComponent() {
  return <Link {...linkData}>Visit Website</Link>;
}
```

**Fields:**
- `_type`: Always `'navLink'`
- `href`: URL or path
- `external`: Whether link is external (optional)
- `openInNewTab`: Whether to open in new tab (optional)

### SanityImageWithAlt

Image with alt text (from `@zilfire/next-sanity-image`).

```typescript
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';

// Represents a Sanity image reference with alt text
type SanityImageWithAlt = {
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
};
```

## Portable Text

Many data types use Portable Text for rich content.

### PortableTextBlock

```typescript
import { PortableTextBlock } from '@portabletext/types';

// Example structure
const content: PortableTextBlock[] = [
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'This is rich text content.',
        marks: ['strong'],
      },
    ],
  },
];
```

**Usage:**
```typescript
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

interface Props {
  content: PortableTextBlock[];
}

export default function RichContent({ content }: Props) {
  return <PortableText value={content} />;
}
```

## Config Types

Configuration types for site-wide settings.

### SiteConfig

```typescript
type SiteConfig = {
  _type: 'siteConfig';
  title: string;
  description?: string;
  logo?: SanityImageWithAlt;
  primaryColor?: string;
  secondaryColor?: string;
};
```

## Type Discrimination

Use the `_type` field for discriminated unions:

```typescript
type BlockData = HeroBlockData | FaqBlockData;

function renderBlock(block: BlockData) {
  switch (block._type) {
    case 'heroBlock':
      return <HeroBlock {...block} />;
    case 'faqBlock':
      return <FaqBlock {...block} />;
    default:
      return null;
  }
}
```

## Fetching with Type Safety

### Basic Fetch

```typescript
import { client } from '@/lib/sanity';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

async function getHeroBlock(): Promise<HeroBlockData | null> {
  const query = `*[_type == "heroBlock"][0]`;
  return await client.fetch<HeroBlockData>(query);
}
```

### Multiple Blocks

```typescript
import type { HeroBlockData, FaqBlockData } from '@zilfire/core-theme/data-types';

type PageBlock = HeroBlockData | FaqBlockData;

async function getPageBlocks(): Promise<PageBlock[]> {
  const query = `*[_type in ["heroBlock", "faqBlock"]]`;
  return await client.fetch<PageBlock[]>(query);
}
```

### With GROQ Projections

```typescript
async function getHeroWithButtons(): Promise<HeroBlockData> {
  const query = `
    *[_type == "heroBlock"][0] {
      _type,
      heading,
      description,
      backgroundImage {
        asset,
        alt
      },
      primaryButton {
        _type,
        text,
        link
      },
      secondaryButton {
        _type,
        text,
        link
      }
    }
  `;
  return await client.fetch<HeroBlockData>(query);
}
```

## Extending Data Types

### Add Custom Fields

```typescript
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

interface CustomHeroBlockData extends HeroBlockData {
  analytics?: {
    trackingId: string;
    eventName: string;
  };
}

const customHero: CustomHeroBlockData = {
  _type: 'heroBlock',
  heading: 'Welcome',
  analytics: {
    trackingId: 'GA-123456',
    eventName: 'hero_view',
  },
};
```

### Custom Blocks

```typescript
import { PortableTextBlock } from '@portabletext/types';

type CustomBlockData = {
  _type: 'customBlock';
  title: string;
  content: PortableTextBlock[];
  customField?: string;
};

type AllBlocks = HeroBlockData | FaqBlockData | CustomBlockData;
```

## Validation

### Runtime Validation with Zod

```typescript
import { z } from 'zod';
import type { ButtonData } from '@zilfire/core-theme/data-types';

const buttonDataSchema = z.object({
  _type: z.literal('button'),
  text: z.string().min(1),
  link: z.object({
    _type: z.literal('navLink'),
    href: z.string().url(),
    external: z.boolean().optional(),
    openInNewTab: z.boolean().optional(),
  }),
});

function validateButtonData(data: unknown): ButtonData {
  return buttonDataSchema.parse(data);
}
```

## Best Practices

### 1. Always Include `_type`

```typescript
// Good
const data: HeroBlockData = {
  _type: 'heroBlock',
  heading: 'Welcome',
};

// TypeScript will enforce _type presence
```

### 2. Use Discriminated Unions

```typescript
type ContentBlock = 
  | { _type: 'hero'; heading: string }
  | { _type: 'faq'; faqs: Array<any> };

function render(block: ContentBlock) {
  // TypeScript narrows types based on _type
  if (block._type === 'hero') {
    console.log(block.heading); // ✓ TypeScript knows about heading
  }
}
```

### 3. Type Sanity Queries

```typescript
// Always type your query results
const data = await client.fetch<HeroBlockData>(query);
```

### 4. Handle Optional Fields

```typescript
function renderHero(data: HeroBlockData) {
  return (
    <div>
      {data.heading && <h1>{data.heading}</h1>}
      {data.description && <PortableText value={data.description} />}
    </div>
  );
}
```

## Examples

### Complete Page with Multiple Blocks

```typescript
import type { HeroBlockData, FaqBlockData } from '@zilfire/core-theme/data-types';
import { HeroBlock, FaqBlock } from '@zilfire/core-theme/web/blocks';

type PageData = {
  hero: HeroBlockData;
  faq: FaqBlockData;
};

async function getPageData(): Promise<PageData> {
  return await client.fetch(`{
    "hero": *[_type == "heroBlock"][0],
    "faq": *[_type == "faqBlock"][0]
  }`);
}

export default async function Page() {
  const { hero, faq } = await getPageData();
  
  return (
    <>
      <HeroBlock {...hero} />
      <FaqBlock {...faq} />
    </>
  );
}
```

---

[← Back to Types](./README.md) | [← Previous: Style Types](./style-types.md)
