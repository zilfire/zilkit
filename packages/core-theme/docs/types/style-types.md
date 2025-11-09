# Style Types

[← Back to Types](./README.md) | [← Back to Home](../../README.md)

Style types provide a type-safe styling system for all components in `@zilfire/core-theme`.

## Overview

The style type system ensures:

- Type-safe style class definitions
- Compile-time validation of style values
- IntelliSense support for available styles
- Consistent styling across components

## Import Path

```typescript
import type {
  ButtonSize,
  ButtonStyleClasses,
  ColorClassNames,
  ThemeColor,
} from '@zilfire/core-theme/types';
```

## Button Style Types

### ButtonSize

Defines available button sizes:

```typescript
type ButtonSize = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
```

**Usage:**

```typescript
import type { ButtonSize } from '@zilfire/core-theme/types';
import { Button } from '@zilfire/core-theme/web/components';

function MyComponent() {
  const size: ButtonSize = 'lg';
  return <Button size={size}>Click me</Button>;
}
```

### ButtonClassCategory

Categories of button style classes:

```typescript
type ButtonColorClassCategory = 'backgroundColor' | 'textColor' | 'borderColor';

type ButtonSizeClassCategory =
  | 'paddingY'
  | 'paddingX'
  | 'fontSize'
  | 'fontWeight'
  | 'rounding'
  | 'verticalSpacing'
  | 'horizontalSpacing';

type ButtonStyleClassCategory = 'pointer' | 'border';

type ButtonClassCategory =
  | ButtonColorClassCategory
  | ButtonSizeClassCategory
  | ButtonStyleClassCategory;
```

### ButtonStyleClassCategories

Interface for defining button style classes:

```typescript
interface ButtonColorStyleClassCategories {
  backgroundColor?: string;
  backgroundOpacity?: string;
  textColor?: string;
  borderColor?: string;
}

interface ButtonSizeStyleClassCategories {
  paddingY?: string;
  paddingX?: string;
  fontSize?: string;
  fontWeight?: string;
  rounding?: string;
  verticalSpacing?: string;
  horizontalSpacing?: string;
}

interface ButtonClassCategories {
  pointer?: string;
  border?: string;
}

type ButtonStyleClassCategories = ButtonColorStyleClassCategories &
  ButtonSizeStyleClassCategories &
  ButtonClassCategories;
```

**Usage:**

```typescript
const buttonStyles: ButtonStyleClassCategories = {
  paddingX: 'px-6',
  paddingY: 'py-3',
  fontSize: 'text-lg',
  fontWeight: 'font-semibold',
  backgroundColor: 'bg-primary-600',
  textColor: 'text-white',
  rounding: 'rounded-lg',
  pointer: 'cursor-pointer',
};
```

### ButtonClassOverride

Allows partial or complete style overrides:

```typescript
type ButtonClassOverride = Partial<Record<ButtonClassCategory, string>> | string;
```

**Usage:**

```typescript
// Partial override
const override: ButtonClassOverride = {
  paddingX: 'px-8',
  backgroundColor: 'bg-blue-500',
};

// Complete override
const completeOverride: ButtonClassOverride = 'custom-button-class';
```

## Color Style Types

### ThemeColor

Base theme color type:

```typescript
type ThemeColor = 'black' | 'white' | 'muted' | 'primary' | string;
```

### ColorClassNames

Interface for color class collections:

```typescript
interface ColorClassNames {
  backgroundColors?: {
    black: string;
    white: string;
    muted: string;
    primary: string;
  } & Partial<Record<ThemeColor, string>>;

  borderColors: {
    black: string;
    white: string;
    muted: string;
    primary: string;
  } & Partial<Record<ThemeColor, string>>;

  textColors?: {
    black: string;
    white: string;
    muted: string;
    primary: string;
  } & Partial<Record<ThemeColor, string>>;
}
```

**Usage:**

```typescript
import { colorClassNames } from '@zilfire/core-theme/web/style/color-classes';
import type { ColorClassNames } from '@zilfire/core-theme/types';

const colors: ColorClassNames = {
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

## Layout Style Types

### Container and Spacing

Layout-related type definitions:

```typescript
type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type Alignment = 'left' | 'center' | 'right';
```

## Text Style Types

### Typography

Text-related type definitions:

```typescript
type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type FontWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
type TextAlign = 'left' | 'center' | 'right' | 'justify';
```

## Style Class Names Type

Comprehensive style class name type:

```typescript
interface StyleClassNames {
  buttonClasses?: ButtonStyleClassCategories;
  colorClasses?: ColorClassNames;
  layoutClasses?: LayoutClassNames;
  textClasses?: TextClassNames;
}
```

## Advanced Usage

### Creating Custom Style Types

Extend existing types for custom needs:

```typescript
import type { ButtonStyleClassCategories } from '@zilfire/core-theme/types';

interface CustomButtonStyles extends ButtonStyleClassCategories {
  animation?: string;
  shadow?: string;
}

const customStyles: CustomButtonStyles = {
  paddingX: 'px-6',
  paddingY: 'py-3',
  animation: 'animate-pulse',
  shadow: 'shadow-lg',
};
```

### Type Guards

Create type guards for runtime checking:

```typescript
import type { ButtonSize } from '@zilfire/core-theme/types';

function isButtonSize(value: unknown): value is ButtonSize {
  return typeof value === 'string' && ['base', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(value);
}

// Usage
const size = 'lg';
if (isButtonSize(size)) {
  // TypeScript knows size is ButtonSize here
}
```

### Discriminated Unions

Use discriminated unions for variant styles:

```typescript
type ButtonVariant =
  | { style: 'primary'; color: 'blue' | 'green' }
  | { style: 'secondary'; color: 'gray' }
  | { style: 'tertiary'; color?: never };

function renderButton(variant: ButtonVariant) {
  if (variant.style === 'primary') {
    // variant.color is 'blue' | 'green'
  }
}
```

## Utility Types

### Style Class Utilities

```typescript
// Extract specific categories
type ColorCategories = Pick<
  ButtonStyleClassCategories,
  'backgroundColor' | 'textColor' | 'borderColor'
>;

// Make all optional
type PartialButtonStyles = Partial<ButtonStyleClassCategories>;

// Make all required
type RequiredButtonStyles = Required<ButtonStyleClassCategories>;
```

## Type Validation

### Runtime Validation

Combine with validation libraries:

```typescript
import { z } from 'zod';
import type { ButtonSize } from '@zilfire/core-theme/types';

const buttonSizeSchema = z.enum(['base', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']);

function validateSize(size: unknown): ButtonSize {
  return buttonSizeSchema.parse(size);
}
```

## Best Practices

### 1. Use Const Assertions

```typescript
const sizes = ['xs', 'sm', 'md', 'lg'] as const;
type Size = (typeof sizes)[number];
```

### 2. Prefer Type Over Interface for Unions

```typescript
// Good: Type for union
type ButtonSize = 'sm' | 'md' | 'lg';

// Avoid: Interface cannot represent unions
```

### 3. Use Readonly for Immutable Data

```typescript
interface ReadonlyStyles {
  readonly paddingX: string;
  readonly paddingY: string;
}
```

### 4. Document Complex Types

```typescript
/**
 * Defines all style class categories for button components.
 * Includes color, size, and general style classes.
 */
interface ButtonStyleClassCategories {
  // ...
}
```

## Examples

### Complete Button Styling

```typescript
import type { ButtonSize, ButtonStyleClassCategories } from '@zilfire/core-theme/types';
import { clsx } from 'clsx';

function getButtonClasses(size: ButtonSize, styles: ButtonStyleClassCategories): string {
  return clsx(
    styles.paddingX,
    styles.paddingY,
    styles.fontSize,
    styles.fontWeight,
    styles.backgroundColor,
    styles.textColor,
    styles.rounding,
    styles.pointer
  );
}
```

### Theme-aware Colors

```typescript
import type { ThemeColor, ColorClassNames } from '@zilfire/core-theme/types';

function getColorClass(
  theme: ColorClassNames,
  color: ThemeColor,
  type: 'text' | 'background' | 'border'
): string | undefined {
  switch (type) {
    case 'text':
      return theme.textColors?.[color];
    case 'background':
      return theme.backgroundColors?.[color];
    case 'border':
      return theme.borderColors?.[color];
  }
}
```

---

[← Back to Types](./README.md) | [Next: Sanity Data Types →](./sanity-types.md)
