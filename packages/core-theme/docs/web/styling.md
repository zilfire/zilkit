# Styling System

[← Back to Web](./README.md) | [← Back to Home](../../README.md)

The styling system provides type-safe utility classes and functions for consistent component styling.

## Overview

The styling system includes:

- Pre-defined utility classes
- Style utility functions
- Type-safe style composition
- Tailwind CSS integration

## Import Path

```typescript
// Import style classes
import { textLarge, bgPrimary, buttonPrimary } from '@zilfire/core-theme/style-classes';

// Import class collections
import { colorClassNames } from '@zilfire/core-theme/web/style/color-classes';
import { buttonClassNames } from '@zilfire/core-theme/web/style/button-classes';
```

## Style Classes

### Color Classes

**Import:**

```typescript
import {
  // Text colors
  textBlack,
  textWhite,
  textPrimary,
  textMuted,
  // Background colors
  bgBlack,
  bgWhite,
  bgPrimary,
  bgMuted,
  // Border colors
  borderBlack,
  borderWhite,
  borderPrimary,
  borderMuted,
  // Collection
  colorClassNames,
} from '@zilfire/core-theme/web/style/color-classes';
```

**Usage:**

```typescript
<div className={bgPrimary}>
  <h1 className={textWhite}>Styled Heading</h1>
</div>
```

**Color Class Names Object:**

```typescript
const colorClassNames: ColorClassNames = {
  backgroundColors: {
    black: 'bg-black',
    white: 'bg-white',
    muted: 'bg-gray-200',
    primary: 'bg-primary-600',
  },
  borderColors: {
    black: 'border-black',
    white: 'border-white',
    muted: 'border-gray-600',
    primary: 'border-primary-600',
  },
  textColors: {
    black: 'text-black',
    white: 'text-white',
    muted: 'text-gray-600',
    primary: 'text-primary-600',
  },
};
```

---

### Button Classes

**Import:**

```typescript
import { buttonClassNames } from '@zilfire/core-theme/web/style/button-classes';
```

Button classes organized by variant, size, and color.

---

### Text Classes

**Import:**

```typescript
import {
  textXs,
  textSm,
  textBase,
  textLg,
  textXl,
  text2Xl,
  text3Xl,
  text4Xl,
} from '@zilfire/core-theme/web/style/text-classes';
```

**Usage:**

```typescript
<h1 className={text4Xl}>Large Heading</h1>
<p className={textBase}>Body text</p>
```

---

### Layout Classes

**Import:**

```typescript
import { layoutClassNames } from '@zilfire/core-theme/web/style/layout-classes';
```

Layout utilities for spacing, containers, and alignment.

---

## Style Utilities

### Color Style Utils

**Import:**

```typescript
import {
  getBackgroundColor,
  getTextColor,
  getBorderColor,
} from '@zilfire/core-theme/web/style/style-utils/color-style-utils';
```

**Usage:**

```typescript
import { colorClassNames } from '@zilfire/core-theme/web/style/color-classes';

const bgClass = getBackgroundColor(colorClassNames, 'primary');
const textClass = getTextColor(colorClassNames, 'white');
const borderClass = getBorderColor(colorClassNames, 'muted');

<div className={`${bgClass} ${textClass} ${borderClass}`}>Styled content</div>;
```

---

### Button Style Utils

**Import:**

```typescript
import {
  getButtonClasses,
  buttonSizeClassCategories,
  buttonColorClassCategories,
} from '@zilfire/core-theme/web/style/style-utils/button-style-utils';
```

**Usage:**

```typescript
import type { ThemeContext } from '@zilfire/core-theme/types';

const buttonClasses = getButtonClasses(themeContext.styleClasses, {
  variant: 'primary',
  size: 'lg',
  color: 'blue',
  className: 'extra-class',
  classOverride: { paddingX: 'px-8' },
});

<button className={buttonClasses}>Styled Button</button>;
```

---

### Text Style Utils

**Import:**

```typescript
import { getTextClasses } from '@zilfire/core-theme/web/style/style-utils/text-style-utils';
```

**Usage:**

```typescript
const textClasses = getTextClasses({
  size: 'lg',
  weight: 'bold',
  color: 'primary',
});

<h1 className={textClasses}>Heading</h1>;
```

---

### Layout Style Utils

**Import:**

```typescript
import { getLayoutClasses } from '@zilfire/core-theme/web/style/style-utils/layout-style-utils';
```

**Usage:**

```typescript
const layoutClasses = getLayoutClasses({
  padding: 'lg',
  margin: 'md',
  container: true,
});

<div className={layoutClasses}>Laid out content</div>;
```

---

## Style Composition

### Using clsx

Compose classes conditionally:

```typescript
import { clsx } from 'clsx';
import { bgPrimary, bgMuted, textWhite } from '@zilfire/core-theme/style-classes';

function MyComponent({ isPrimary }: { isPrimary: boolean }) {
  return (
    <div className={clsx(textWhite, isPrimary ? bgPrimary : bgMuted, 'rounded-lg p-4')}>
      Content
    </div>
  );
}
```

### With Class Variance Authority

Use CVA for variant-based styling:

```typescript
import { cva } from 'class-variance-authority';
import { bgPrimary, bgMuted } from '@zilfire/core-theme/style-classes';

const buttonVariants = cva('base-button-class', {
  variants: {
    variant: {
      primary: bgPrimary,
      secondary: bgMuted,
    },
    size: {
      sm: 'px-3 py-1 text-sm',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
  },
});

function Button({ variant, size }: { variant?: 'primary' | 'secondary'; size?: 'sm' | 'lg' }) {
  return <button className={buttonVariants({ variant, size })}>Click</button>;
}
```

---

## Customization

### Extending Color Classes

```typescript
import { colorClassNames } from '@zilfire/core-theme/web/style/color-classes';

export const customColorClassNames = {
  ...colorClassNames,
  backgroundColors: {
    ...colorClassNames.backgroundColors,
    custom: 'bg-custom-500',
    accent: 'bg-accent-600',
  },
  textColors: {
    ...colorClassNames.textColors,
    custom: 'text-custom-500',
    accent: 'text-accent-600',
  },
};
```

### Creating Custom Utilities

```typescript
import type { ThemeColor } from '@zilfire/core-theme/types';

export function getCustomColor(color: ThemeColor): string {
  const colorMap: Record<ThemeColor, string> = {
    black: 'bg-black',
    white: 'bg-white',
    primary: 'bg-blue-600',
    muted: 'bg-gray-400',
  };

  return colorMap[color] || 'bg-gray-500';
}
```

---

## Tailwind CSS Integration

### Configuration

Add core-theme to your Tailwind content:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@zilfire/core-theme/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          // ... other shades
          600: '#2563eb',
          // ... other shades
        },
      },
    },
  },
};
```

### Using Tailwind Classes

Combine core-theme classes with Tailwind utilities:

```typescript
import { textPrimary, bgWhite } from '@zilfire/core-theme/style-classes';

<div className={`${bgWhite} ${textPrimary} rounded-lg shadow-md p-6`}>Combined styling</div>;
```

---

## Responsive Styling

### Breakpoint Utilities

Use Tailwind's responsive prefixes:

```typescript
<div className="px-4 md:px-6 lg:px-8">
  <h1 className="text-2xl md:text-4xl lg:text-5xl">Responsive Heading</h1>
</div>
```

### Responsive Button Sizes

```typescript
<Button
  data={buttonData}
  context={context}
  options={{
    className: 'text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8',
  }}
/>
```

---

## Best Practices

1. **Use pre-defined classes** - Leverage existing utility classes
2. **Type-safe composition** - Use TypeScript for style definitions
3. **Avoid inline styles** - Use utility classes instead
4. **Compose conditionally** - Use `clsx` for dynamic classes
5. **Extend, don't replace** - Add to existing classes rather than overriding
6. **Document custom styles** - Comment custom utility functions

---

## Examples

### Complete Styled Component

```typescript
import { clsx } from 'clsx';
import { bgPrimary, textWhite, borderPrimary } from '@zilfire/core-theme/style-classes';

interface CardProps {
  title: string;
  content: string;
  featured?: boolean;
}

export function Card({ title, content, featured }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg p-6 border-2',
        featured ? [bgPrimary, textWhite] : 'bg-white',
        borderPrimary,
        'shadow-md hover:shadow-lg transition-shadow'
      )}
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{content}</p>
    </div>
  );
}
```

### Dynamic Theme Colors

```typescript
import {
  getBackgroundColor,
  getTextColor,
} from '@zilfire/core-theme/web/style/style-utils/color-style-utils';
import { colorClassNames } from '@zilfire/core-theme/web/style/color-classes';
import type { ThemeColor } from '@zilfire/core-theme/types';

interface ThemedBoxProps {
  color: ThemeColor;
  children: React.ReactNode;
}

export function ThemedBox({ color, children }: ThemedBoxProps) {
  const bgClass = getBackgroundColor(colorClassNames, color);
  const textClass = getTextColor(colorClassNames, color === 'white' ? 'black' : 'white');

  return <div className={`${bgClass} ${textClass} p-4 rounded`}>{children}</div>;
}
```

---

[← Back to Web](./README.md) | [← Previous: Components](./components.md)
