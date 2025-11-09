# API Reference - Blocks

[← Back to Home](../../README.md)

Complete API reference for block components.

## HeroBlock

Hero section with heading, description, background image, and CTA buttons.

### Props

```typescript
interface HeroBlockProps {
  data: HeroBlockData;
  context: ThemeContext;
  backgroundImageOptions?: BackgroundImageOptions;
  className?: string;
}

interface HeroBlockData {
  _type: 'heroBlock';
  heading?: string;
  description?: PortableTextBlock[];
  backgroundImage?: SanityImageWithAlt;
  primaryButton?: ButtonData;
  secondaryButton?: ButtonData;
}

interface BackgroundImageOptions {
  imageSizes?: string;
  quality?: number;
}
```

### Parameters

| Parameter                | Type                     | Required | Default                                | Description                        |
| ------------------------ | ------------------------ | -------- | -------------------------------------- | ---------------------------------- |
| `data`                   | `HeroBlockData`          | Yes      | -                                      | Hero block content data            |
| `context`                | `ThemeContext`           | Yes      | -                                      | Theme configuration context        |
| `backgroundImageOptions` | `BackgroundImageOptions` | No       | `{ imageSizes: '100vw', quality: 80 }` | Background image rendering options |
| `className`              | `string`                 | No       | -                                      | Additional CSS classes             |

### Data Fields

#### HeroBlockData

| Field             | Type                  | Required | Description                    |
| ----------------- | --------------------- | -------- | ------------------------------ |
| `_type`           | `'heroBlock'`         | Yes      | Discriminator type             |
| `heading`         | `string`              | No       | Main hero heading text         |
| `description`     | `PortableTextBlock[]` | No       | Rich text description          |
| `backgroundImage` | `SanityImageWithAlt`  | No       | Background image with alt text |
| `primaryButton`   | `ButtonData`          | No       | Primary CTA button             |
| `secondaryButton` | `ButtonData`          | No       | Secondary CTA button           |

### Example

```typescript
import { HeroBlock } from '@zilfire/core-theme/web/blocks';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

const heroData: HeroBlockData = {
  _type: 'heroBlock',
  heading: 'Build Amazing Websites',
  description: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: 'Get started today' }],
    },
  ],
  backgroundImage: {
    asset: { _ref: 'image-id', _type: 'reference' },
    alt: 'Hero background',
  },
  primaryButton: {
    _type: 'button',
    text: 'Get Started',
    link: { _type: 'navLink', href: '/start' },
  },
};

<HeroBlock
  data={heroData}
  context={themeContext}
  backgroundImageOptions={{
    imageSizes: '100vw',
    quality: 90,
  }}
/>;
```

---

## FaqBlock

FAQ section with collapsible questions and answers.

### Props

```typescript
interface FaqBlockProps {
  data: FaqBlockData;
  context: ThemeContext;
  className?: string;
}

interface FaqBlockData {
  _type: 'faqBlock';
  heading?: string;
  description?: string;
  faqs: FaqItem[];
}

interface FaqItem {
  question: string;
  answer: PortableTextBlock;
}
```

### Parameters

| Parameter   | Type           | Required | Default | Description                 |
| ----------- | -------------- | -------- | ------- | --------------------------- |
| `data`      | `FaqBlockData` | Yes      | -       | FAQ block content data      |
| `context`   | `ThemeContext` | Yes      | -       | Theme configuration context |
| `className` | `string`       | No       | -       | Additional CSS classes      |

### Data Fields

#### FaqBlockData

| Field         | Type         | Required | Description         |
| ------------- | ------------ | -------- | ------------------- |
| `_type`       | `'faqBlock'` | Yes      | Discriminator type  |
| `heading`     | `string`     | No       | Section heading     |
| `description` | `string`     | No       | Section description |
| `faqs`        | `FaqItem[]`  | Yes      | Array of FAQ items  |

#### FaqItem

| Field      | Type                | Required | Description      |
| ---------- | ------------------- | -------- | ---------------- |
| `question` | `string`            | Yes      | Question text    |
| `answer`   | `PortableTextBlock` | Yes      | Rich text answer |

### Example

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
    {
      question: 'Is it free?',
      answer: {
        _type: 'block',
        children: [{ _type: 'span', text: 'Yes, completely free and open source.' }],
      },
    },
  ],
};

<FaqBlock data={faqData} context={themeContext} />;
```

---

## Shared Types

### ThemeContext

```typescript
interface ThemeContext {
  styleClasses: StyleClassNames;
  LinkComponent: React.ComponentType<any>;
  ImageComponent: React.ComponentType<any>;
}

interface StyleClassNames {
  buttonClasses?: ButtonStyleClassCategories;
  colorClasses?: ColorClassNames;
  layoutClasses?: LayoutClassNames;
  textClasses?: TextClassNames;
}
```

### SanityImageWithAlt

```typescript
interface SanityImageWithAlt {
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
}
```

### ButtonData

```typescript
interface ButtonData {
  _type: 'button';
  text: string;
  link: NavLink;
}

interface NavLink {
  _type: 'navLink';
  href: string;
  external?: boolean;
  openInNewTab?: boolean;
}
```

---

[← Back to Home](../../README.md) | [Components API →](./components.md)
