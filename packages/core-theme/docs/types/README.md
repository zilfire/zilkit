# Types

[← Back to Home](../../README.md)

The type system in `@zilfire/core-theme` provides comprehensive TypeScript definitions for all components, styles, and data structures.

## Overview

The types are organized into three main categories:

1. **[Style Types](./style-types.md)** - Type-safe styling system
2. **[Sanity Data Types](./sanity-types.md)** - CMS content structure types
3. **[Context Types](../../README.md#context-types)** - React context definitions

## Import Paths

```typescript
// Import all types
import type { ButtonSize, HeroBlockData } from '@zilfire/core-theme/types';

// Import specific type categories
import type { ButtonStyleClasses } from '@zilfire/core-theme/types';
import type { HeroBlockData } from '@zilfire/core-theme/data-types';
```

## Type Categories

### Style Types

Define the type-safe styling system for components:

- **Button Styles**: Size, color, and variant types
- **Color Styles**: Background, text, and border colors
- **Layout Styles**: Spacing, alignment, and container types
- **Text Styles**: Typography classes and variants

[→ Learn more about Style Types](./style-types.md)

### Sanity Data Types

Define the shape of data from Sanity CMS:

- **Block Types**: `HeroBlockData`, `FaqBlockData`
- **Object Types**: `ButtonData`, `LinkData`, `ImageData`
- **Config Types**: Site configuration and settings
- **External Types**: Third-party integrations

[→ Learn more about Sanity Data Types](./sanity-types.md)

### Context Types

Define React context shapes for shared state:

```typescript
import type { ThemeContext } from '@zilfire/core-theme/types';
```

## Usage Examples

### Style Types

```typescript
import type { ButtonSize, ButtonStyleClasses } from '@zilfire/core-theme/types';

function MyButton() {
  const size: ButtonSize = 'large';
  const styles: ButtonStyleClasses = {
    base: {
      paddingX: 'px-6',
      paddingY: 'py-3',
      fontSize: 'text-lg',
    },
  };

  return <button className={/* computed classes */}>Click me</button>;
}
```

### Data Types

```typescript
import type { HeroBlockData } from '@zilfire/core-theme/data-types';
import { HeroBlock } from '@zilfire/core-theme/web/blocks';

async function getHeroData(): Promise<HeroBlockData> {
  // Fetch from Sanity with type safety
  return {
    _type: 'heroBlock',
    heading: 'Welcome',
    description: [
      /* Portable Text */
    ],
    primaryButton: {
      _type: 'button',
      text: 'Get Started',
      link: '/start',
    },
  };
}

export default async function Page() {
  const data = await getHeroData();
  return <HeroBlock {...data} />;
}
```

## Type Safety Benefits

### 1. Compile-Time Checking

```typescript
import type { ButtonSize } from '@zilfire/core-theme/types';

const size: ButtonSize = 'large'; // ✓ Valid
const invalid: ButtonSize = 'huge'; // ✗ Type error
```

### 2. IntelliSense Support

TypeScript provides autocomplete for all available options:

```typescript
import type { ThemeColor } from '@zilfire/core-theme/types';

const color: ThemeColor = 'pr|'; // IntelliSense shows: primary, black, white, muted
```

### 3. Refactoring Safety

When types change, TypeScript catches all usage sites that need updates.

### 4. Documentation

Types serve as inline documentation:

```typescript
interface ButtonProps {
  /** The button text content */
  text: string;
  /** Button size variant */
  size?: ButtonSize;
  /** Button style variant */
  style?: 'primary' | 'secondary' | 'tertiary';
}
```

## Type Utilities

### Extracting Types

```typescript
import type { ComponentProps } from 'react';
import { Button } from '@zilfire/core-theme/web/components';

type ButtonProps = ComponentProps<typeof Button>;
```

### Extending Types

```typescript
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

interface ExtendedHeroBlock extends HeroBlockData {
  customField?: string;
}
```

### Conditional Types

```typescript
import type { ButtonSize } from '@zilfire/core-theme/types';

type LargeButtons = Extract<ButtonSize, 'lg' | 'xl' | 'xxl'>;
type SmallButtons = Exclude<ButtonSize, LargeButtons>;
```

## Type Reference

### Common Types

```typescript
// Theme colors
type ThemeColor = 'black' | 'white' | 'muted' | 'primary' | string;

// Button sizes
type ButtonSize = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

// Alignment options
type Alignment = 'left' | 'center' | 'right';

// Spacing values
type Spacing = 'none' | 'small' | 'medium' | 'large' | 'xlarge';
```

### Generic Types

```typescript
// Style class categories with generics
type StyleClassCategory<T extends string> = Record<T, string>;

// Override patterns
type ButtonClassOverride = Partial<Record<ButtonClassCategory, string>> | string;
```

## Best Practices

### 1. Use Type Imports

```typescript
// Preferred: Type-only import
import type { HeroBlockData } from '@zilfire/core-theme/data-types';

// Avoid: Value import for types
import { HeroBlockData } from '@zilfire/core-theme/data-types';
```

### 2. Leverage Type Inference

```typescript
// Let TypeScript infer when possible
const data = await getHeroData(); // Type inferred as HeroBlockData
```

### 3. Use Const Assertions

```typescript
const sizes = ['xs', 'sm', 'md', 'lg'] as const;
type Size = (typeof sizes)[number]; // 'xs' | 'sm' | 'md' | 'lg'
```

### 4. Document Custom Types

```typescript
/**
 * Extended hero block with custom analytics tracking
 */
interface TrackedHeroBlock extends HeroBlockData {
  /** Google Analytics tracking ID */
  trackingId?: string;
}
```

## Next Steps

- [Style Types Reference](./style-types.md) - Deep dive into style types
- [Sanity Data Types Reference](./sanity-types.md) - CMS data structure types
- [API Reference](../api/README.md) - Component prop types

---

[← Back to Home](../../README.md) | [Style Types →](./style-types.md) | [Data Types →](./sanity-types.md)
