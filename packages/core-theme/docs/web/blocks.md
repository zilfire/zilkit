# Blocks

[← Back to Web](./README.md) | [← Back to Home](../../README.md)

Blocks are page-level content sections that map to Sanity CMS content.

## Available Blocks

### HeroBlock

Hero section with heading, description, background image, and call-to-action buttons.

**Import:**

```typescript
import { HeroBlock } from '@zilfire/core-theme/web/blocks';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';
```

**Props:**

```typescript
interface HeroBlockProps {
  data: HeroBlockData;
  context: ThemeContext;
  backgroundImageOptions?: {
    imageSizes?: string;
    quality?: number;
  };
  className?: string;
}
```

**Example:**

```typescript
const heroData: HeroBlockData = {
  _type: 'heroBlock',
  heading: 'Build Amazing Websites',
  description: [
    /* Portable Text content */
  ],
  backgroundImage: {
    asset: { _ref: '...', _type: 'reference' },
    alt: 'Hero background',
  },
  primaryButton: {
    _type: 'button',
    text: 'Get Started',
    link: { _type: 'navLink', href: '/start' },
  },
  secondaryButton: {
    _type: 'button',
    text: 'Learn More',
    link: { _type: 'navLink', href: '/about' },
  },
};

<HeroBlock data={heroData} context={themeContext} />;
```

**Features:**

- Full-width hero section
- Optional background image with responsive sizing
- Centered text layout
- Primary and secondary CTA buttons
- Portable Text description support
- Customizable image quality and sizes

---

### FaqBlock

FAQ section with collapsible question and answer items.

**Import:**

```typescript
import { FaqBlock } from '@zilfire/core-theme/web/blocks';
import type { FaqBlockData } from '@zilfire/core-theme/data-types';
```

**Props:**

```typescript
interface FaqBlockProps {
  data: FaqBlockData;
  context: ThemeContext;
  className?: string;
}
```

**Example:**

```typescript
const faqData: FaqBlockData = {
  _type: 'faqBlock',
  heading: 'Frequently Asked Questions',
  description: 'Find answers to common questions',
  faqs: [
    {
      question: 'How do I get started?',
      answer: {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Follow our getting started guide in the documentation.' },
        ],
      },
    },
    {
      question: 'Is it free?',
      answer: {
        _type: 'block',
        children: [{ _type: 'span', text: 'Yes, it is open source and free to use.' }],
      },
    },
  ],
};

<FaqBlock data={faqData} context={themeContext} />;
```

**Features:**

- Collapsible FAQ items
- Portable Text answers for rich formatting
- Optional heading and description
- Accessible keyboard navigation
- Smooth animations

---

## Usage with Sanity

### Fetching Block Data

```typescript
import { client } from '@/lib/sanity';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

async function getHeroBlock(): Promise<HeroBlockData> {
  return await client.fetch(`
    *[_type == "heroBlock"][0] {
      _type,
      heading,
      description,
      backgroundImage {
        asset,
        alt,
        hotspot,
        crop
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
  `);
}

export default async function Page() {
  const heroData = await getHeroBlock();
  return <HeroBlock data={heroData} context={themeContext} />;
}
```

### Dynamic Block Rendering

```typescript
import { HeroBlock, FaqBlock } from '@zilfire/core-theme/web/blocks';
import type { HeroBlockData, FaqBlockData } from '@zilfire/core-theme/data-types';

type BlockData = HeroBlockData | FaqBlockData;

function renderBlock(block: BlockData, context: ThemeContext) {
  switch (block._type) {
    case 'heroBlock':
      return <HeroBlock key={block._type} data={block} context={context} />;
    case 'faqBlock':
      return <FaqBlock key={block._type} data={block} context={context} />;
    default:
      return null;
  }
}

export default async function Page() {
  const blocks: BlockData[] = await fetchPageBlocks();

  return <>{blocks.map((block) => renderBlock(block, themeContext))}</>;
}
```

## Customization

### Custom Styling

```typescript
<HeroBlock
  data={heroData}
  context={themeContext}
  className="custom-hero-class"
  backgroundImageOptions={{
    imageSizes: '100vw',
    quality: 90,
  }}
/>
```

### Extending Blocks

Create custom blocks using the same patterns:

```typescript
import { Section, Container } from '@zilfire/core-theme/web/components';
import type { ThemeContext } from '@zilfire/core-theme/types';

interface CustomBlockData {
  _type: 'customBlock';
  title: string;
  content: string;
}

interface CustomBlockProps {
  data: CustomBlockData;
  context: ThemeContext;
}

export function CustomBlock({ data, context }: CustomBlockProps) {
  return (
    <Section>
      <Container>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
      </Container>
    </Section>
  );
}
```

## Best Practices

1. **Always provide context** - Blocks require `ThemeContext` for rendering
2. **Type your data** - Use TypeScript types for Sanity data
3. **Handle missing data** - Check for optional fields before rendering
4. **Optimize images** - Configure appropriate `imageSizes` for backgrounds
5. **Use semantic HTML** - Blocks output semantic markup, maintain it in your layouts

---

[← Back to Web](./README.md) | [Next: Components →](./components.md)
