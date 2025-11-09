# Sanity Utilities

[← Back to Sanity](./README.md) | [← Back to Home](../../README.md)

Utility functions for working with Sanity CMS data.

## Overview

Sanity utilities provide helper functions for:

- Path rendering
- Data transformation
- Query helpers
- Preview utilities

## Available Utilities

### render-link-path

Utility for rendering navigation link paths.

**Import:**

```typescript
import { renderLinkPath } from '@zilfire/core-theme/utils/render-link-path';
```

**Usage:**

```typescript
import type { NavLink } from '@zilfire/core-theme/data-types';

const link: NavLink = {
  _type: 'navLink',
  href: '/about',
  external: false,
};

const path = renderLinkPath(link);
// Returns: '/about'
```

**With External Links:**

```typescript
const externalLink: NavLink = {
  _type: 'navLink',
  href: 'https://example.com',
  external: true,
};

const path = renderLinkPath(externalLink);
// Returns: 'https://example.com'
```

---

## Query Helpers

### Fetching Blocks

Common query patterns for fetching content blocks.

**Hero Block Query:**

```typescript
const heroQuery = `
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
        external,
        openInNewTab
      }
    },
    secondaryButton {
      _type,
      text,
      link {
        _type,
        href,
        external,
        openInNewTab
      }
    }
  }
`;
```

**FAQ Block Query:**

```typescript
const faqQuery = `
  *[_type == "faqBlock"][0] {
    _type,
    heading,
    description,
    faqs[] {
      question,
      answer
    }
  }
`;
```

**Multiple Blocks Query:**

```typescript
const pageBlocksQuery = `
  *[_id == $pageId][0] {
    blocks[] {
      _type,
      _type == "heroBlock" => {
        heading,
        description,
        backgroundImage,
        primaryButton,
        secondaryButton
      },
      _type == "faqBlock" => {
        heading,
        description,
        faqs
      }
    }
  }.blocks
`;
```

---

## Data Transformation

### Portable Text Helpers

**Extract Plain Text:**

```typescript
import { PortableTextBlock } from '@portabletext/types';

export function portableTextToPlain(blocks: PortableTextBlock[]): string {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children.map((child) => child.text).join('');
    })
    .join('\n\n');
}

// Usage
const plainText = portableTextToPlain(heroData.description);
```

**Has Content Check:**

```typescript
export function hasPortableTextContent(blocks: PortableTextBlock[] | undefined): boolean {
  if (!blocks || blocks.length === 0) return false;

  return blocks.some((block) => {
    if (block._type !== 'block') return true;
    return block.children?.some((child) => child.text?.trim());
  });
}

// Usage
if (hasPortableTextContent(heroData.description)) {
  // Render description
}
```

---

### Image URL Helpers

**Get Image URL:**

```typescript
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Usage
const imageUrl = urlFor(heroData.backgroundImage).width(1920).height(1080).quality(80).url();
```

**Responsive Image URLs:**

```typescript
export function getResponsiveImageUrls(image: any) {
  return {
    sm: urlFor(image).width(640).url(),
    md: urlFor(image).width(768).url(),
    lg: urlFor(image).width(1024).url(),
    xl: urlFor(image).width(1280).url(),
    '2xl': urlFor(image).width(1536).url(),
  };
}
```

---

## Type Guards

**Check Block Type:**

```typescript
import type { HeroBlockData, FaqBlockData } from '@zilfire/core-theme/data-types';

export function isHeroBlock(block: any): block is HeroBlockData {
  return block?._type === 'heroBlock';
}

export function isFaqBlock(block: any): block is FaqBlockData {
  return block?._type === 'faqBlock';
}

// Usage
if (isHeroBlock(block)) {
  // TypeScript knows block is HeroBlockData
  console.log(block.heading);
}
```

---

## Preview Utilities

### Live Preview Setup

**Enable Preview Mode:**

```typescript
// app/api/preview/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  draftMode().enable();
  redirect(slug || '/');
}
```

**Disable Preview:**

```typescript
// app/api/exit-preview/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  draftMode().disable();
  redirect('/');
}
```

**Preview Client:**

```typescript
import { client } from '@/lib/sanity';

export function getPreviewClient() {
  return client.withConfig({
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    perspective: 'previewDrafts',
  });
}
```

---

## Caching Utilities

### Revalidate on Demand

**Setup Webhook:**

```typescript
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const body = await request.json();
  const { path, tag } = body;

  if (path) {
    revalidatePath(path);
  }

  if (tag) {
    revalidateTag(tag);
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
```

**Tagged Queries:**

```typescript
import { client } from '@/lib/sanity';

export async function getHeroBlock() {
  return await client.fetch(
    `*[_type == "heroBlock"][0]`,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ['heroBlock'],
      },
    }
  );
}
```

---

## Validation Helpers

**Validate Block Data:**

```typescript
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

export function validateHeroBlock(data: any): data is HeroBlockData {
  return (
    data?._type === 'heroBlock' &&
    typeof data.heading === 'string' &&
    (!data.description || Array.isArray(data.description))
  );
}

// Usage
const data = await fetchHeroBlock();
if (validateHeroBlock(data)) {
  // Safe to use as HeroBlockData
  return <HeroBlock data={data} context={context} />;
}
```

---

## Common Patterns

### Fetching with Error Handling

```typescript
import { client } from '@/lib/sanity';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

export async function getHeroBlockSafe(): Promise<HeroBlockData | null> {
  try {
    const data = await client.fetch<HeroBlockData>(`
      *[_type == "heroBlock"][0]
    `);

    return data || null;
  } catch (error) {
    console.error('Error fetching hero block:', error);
    return null;
  }
}
```

### Conditional Rendering Helper

```typescript
export function renderBlockIfValid<T>(
  data: T | null | undefined,
  validator: (data: any) => data is T,
  Component: React.ComponentType<{ data: T }>
): React.ReactNode {
  if (!data || !validator(data)) {
    return null;
  }

  return <Component data={data} />;
}

// Usage
renderBlockIfValid(heroData, validateHeroBlock, HeroBlock);
```

---

## Best Practices

1. **Cache queries** - Use Next.js caching for static content
2. **Type your queries** - Always specify TypeScript types
3. **Handle errors** - Wrap queries in try-catch
4. **Validate data** - Check structure before rendering
5. **Use projections** - Fetch only needed fields
6. **Revalidate efficiently** - Use tags for granular revalidation

---

## Examples

### Complete Fetching Flow

```typescript
import { client } from '@/lib/sanity';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';
import { HeroBlock } from '@zilfire/core-theme/web/blocks';

async function getHeroBlock(): Promise<HeroBlockData | null> {
  try {
    const data = await client.fetch<HeroBlockData>(
      `*[_type == "heroBlock"][0] {
        _type,
        heading,
        description,
        backgroundImage,
        primaryButton,
        secondaryButton
      }`,
      {},
      {
        cache: 'force-cache',
        next: { tags: ['heroBlock'], revalidate: 3600 },
      }
    );

    return data || null;
  } catch (error) {
    console.error('Error fetching hero block:', error);
    return null;
  }
}

export default async function HomePage() {
  const heroData = await getHeroBlock();

  if (!heroData) {
    return <div>No hero content available</div>;
  }

  return <HeroBlock data={heroData} context={themeContext} />;
}
```

---

[← Back to Sanity](./README.md) | [← Previous: Schema](./schema.md)
