# API Reference - Utilities

[← Back to Home](../../README.md)

Complete API reference for utility functions.

## Style Utilities

### getButtonClasses

Generates button class names based on variant, size, and custom options.

**Import:**

```typescript
import { getButtonClasses } from '@zilfire/core-theme/web/style/style-utils/button-style-utils';
```

**Signature:**

```typescript
function getButtonClasses(
  styleClasses: StyleClassNames,
  options: {
    variant?: string;
    size?: ButtonSize;
    color?: string;
    className?: string;
    classOverride?: ButtonClassOverride;
  }
): string;
```

**Parameters:**

| Parameter               | Type                  | Description                                   |
| ----------------------- | --------------------- | --------------------------------------------- |
| `styleClasses`          | `StyleClassNames`     | Theme style classes                           |
| `options.variant`       | `string`              | Button variant (e.g., 'primary', 'secondary') |
| `options.size`          | `ButtonSize`          | Button size                                   |
| `options.color`         | `string`              | Color theme                                   |
| `options.className`     | `string`              | Additional classes                            |
| `options.classOverride` | `ButtonClassOverride` | Override specific categories                  |

**Returns:** `string` - Composed class names

**Example:**

```typescript
const classes = getButtonClasses(themeContext.styleClasses, {
  variant: 'primary',
  size: 'lg',
  classOverride: { paddingX: 'px-8' },
});
// Returns: "bg-primary-600 text-white px-8 py-3 text-lg rounded-lg ..."
```

---

### getBackgroundColor

Gets a background color class by theme color key.

**Import:**

```typescript
import { getBackgroundColor } from '@zilfire/core-theme/web/style/style-utils/color-style-utils';
```

**Signature:**

```typescript
function getBackgroundColor(colorClassNames: ColorClassNames, key: ThemeColor): string | undefined;
```

**Parameters:**

| Parameter         | Type              | Description                                      |
| ----------------- | ----------------- | ------------------------------------------------ |
| `colorClassNames` | `ColorClassNames` | Color class definitions                          |
| `key`             | `ThemeColor`      | Color key ('black', 'white', 'primary', 'muted') |

**Returns:** `string | undefined` - Background color class

**Example:**

```typescript
import { colorClassNames } from '@zilfire/core-theme/web/style/color-classes';

const bgClass = getBackgroundColor(colorClassNames, 'primary');
// Returns: "bg-primary-600"
```

---

### getTextColor

Gets a text color class by theme color key.

**Import:**

```typescript
import { getTextColor } from '@zilfire/core-theme/web/style/style-utils/color-style-utils';
```

**Signature:**

```typescript
function getTextColor(colorClassNames: ColorClassNames, key: ThemeColor): string | undefined;
```

**Parameters:**

| Parameter         | Type              | Description             |
| ----------------- | ----------------- | ----------------------- |
| `colorClassNames` | `ColorClassNames` | Color class definitions |
| `key`             | `ThemeColor`      | Color key               |

**Returns:** `string | undefined` - Text color class

**Example:**

```typescript
const textClass = getTextColor(colorClassNames, 'white');
// Returns: "text-white"
```

---

### getBorderColor

Gets a border color class by theme color key.

**Import:**

```typescript
import { getBorderColor } from '@zilfire/core-theme/web/style/style-utils/color-style-utils';
```

**Signature:**

```typescript
function getBorderColor(colorClassNames: ColorClassNames, key: ThemeColor): string | undefined;
```

**Parameters:**

| Parameter         | Type              | Description             |
| ----------------- | ----------------- | ----------------------- |
| `colorClassNames` | `ColorClassNames` | Color class definitions |
| `key`             | `ThemeColor`      | Color key               |

**Returns:** `string | undefined` - Border color class

**Example:**

```typescript
const borderClass = getBorderColor(colorClassNames, 'primary');
// Returns: "border-primary-600"
```

---

## Path Utilities

### renderLinkPath

Renders a link path from NavLink data.

**Import:**

```typescript
import { renderLinkPath } from '@zilfire/core-theme/utils/render-link-path';
```

**Signature:**

```typescript
function renderLinkPath(link: NavLink): string;
```

**Parameters:**

| Parameter | Type      | Description          |
| --------- | --------- | -------------------- |
| `link`    | `NavLink` | Navigation link data |

**Returns:** `string` - Rendered path

**Example:**

```typescript
const link: NavLink = {
  _type: 'navLink',
  href: '/about',
  external: false,
};

const path = renderLinkPath(link);
// Returns: "/about"
```

---

## Type Guards

### isHeroBlock

Type guard to check if data is HeroBlockData.

**Signature:**

```typescript
function isHeroBlock(data: any): data is HeroBlockData;
```

**Parameters:**

| Parameter | Type  | Description   |
| --------- | ----- | ------------- |
| `data`    | `any` | Data to check |

**Returns:** `boolean` - True if data is HeroBlockData

**Example:**

```typescript
if (isHeroBlock(blockData)) {
  // TypeScript knows blockData is HeroBlockData
  console.log(blockData.heading);
}
```

---

### isFaqBlock

Type guard to check if data is FaqBlockData.

**Signature:**

```typescript
function isFaqBlock(data: any): data is FaqBlockData;
```

**Parameters:**

| Parameter | Type  | Description   |
| --------- | ----- | ------------- |
| `data`    | `any` | Data to check |

**Returns:** `boolean` - True if data is FaqBlockData

**Example:**

```typescript
if (isFaqBlock(blockData)) {
  // TypeScript knows blockData is FaqBlockData
  console.log(blockData.faqs);
}
```

---

## Data Transformation

### portableTextToPlain

Converts Portable Text to plain text string.

**Signature:**

```typescript
function portableTextToPlain(blocks: PortableTextBlock[]): string;
```

**Parameters:**

| Parameter | Type                  | Description          |
| --------- | --------------------- | -------------------- |
| `blocks`  | `PortableTextBlock[]` | Portable Text blocks |

**Returns:** `string` - Plain text content

**Example:**

```typescript
const plainText = portableTextToPlain(heroData.description);
// Returns: "Get started with our platform today"
```

---

### hasPortableTextContent

Checks if Portable Text blocks have content.

**Signature:**

```typescript
function hasPortableTextContent(blocks: PortableTextBlock[] | undefined): boolean;
```

**Parameters:**

| Parameter | Type                               | Description          |
| --------- | ---------------------------------- | -------------------- |
| `blocks`  | `PortableTextBlock[] \| undefined` | Portable Text blocks |

**Returns:** `boolean` - True if has content

**Example:**

```typescript
if (hasPortableTextContent(heroData.description)) {
  return <PortableText value={heroData.description} />;
}
```

---

## Constants

### Button Style Categories

**Import:**

```typescript
import {
  buttonSizeClassCategories,
  buttonColorClassCategories,
  buttonStyleClassCategories,
} from '@zilfire/core-theme/web/style/style-utils/button-style-utils';
```

**buttonSizeClassCategories:**

```typescript
const buttonSizeClassCategories: readonly ButtonSizeClassCategory[] = [
  'paddingY',
  'paddingX',
  'fontSize',
  'fontWeight',
  'rounding',
  'verticalSpacing',
  'horizontalSpacing',
];
```

**buttonColorClassCategories:**

```typescript
const buttonColorClassCategories: readonly ButtonColorClassCategory[] = [
  'backgroundColor',
  'textColor',
  'borderColor',
];
```

**buttonStyleClassCategories:**

```typescript
const buttonStyleClassCategories: readonly ButtonStyleClassCategory[] = ['pointer', 'border'];
```

---

## Pre-defined Classes

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
} from '@zilfire/core-theme/web/style/color-classes';
```

**Values:**

```typescript
const textBlack = 'text-black';
const textWhite = 'text-white';
const textPrimary = 'text-primary-600';
const textMuted = 'text-gray-600';

const bgBlack = 'bg-black';
const bgWhite = 'bg-white';
const bgPrimary = 'bg-primary-600';
const bgMuted = 'bg-gray-200';

const borderBlack = 'border-black';
const borderWhite = 'border-white';
const borderPrimary = 'border-primary-600';
const borderMuted = 'border-gray-600';
```

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

---

## Type Definitions

### ThemeColor

```typescript
type ThemeColor = 'black' | 'white' | 'muted' | 'primary' | string;
```

### ButtonSize

```typescript
type ButtonSize = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
```

### ButtonClassOverride

```typescript
type ButtonClassOverride = Partial<Record<ButtonClassCategory, string>> | string;
```

### ColorClassNames

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

---

## Usage Examples

### Complete Button Styling

```typescript
import { getButtonClasses } from '@zilfire/core-theme/web/style/style-utils/button-style-utils';
import type { ThemeContext } from '@zilfire/core-theme/types';

function StyledButton({ context }: { context: ThemeContext }) {
  const classes = getButtonClasses(context.styleClasses, {
    variant: 'primary',
    size: 'lg',
    color: 'blue',
    classOverride: {
      paddingX: 'px-10',
      rounding: 'rounded-full',
    },
  });

  return <button className={classes}>Click me</button>;
}
```

### Dynamic Color Application

```typescript
import {
  getBackgroundColor,
  getTextColor,
} from '@zilfire/core-theme/web/style/style-utils/color-style-utils';
import { colorClassNames } from '@zilfire/core-theme/web/style/color-classes';
import type { ThemeColor } from '@zilfire/core-theme/types';

function ThemedBox({ color }: { color: ThemeColor }) {
  const bgClass = getBackgroundColor(colorClassNames, color);
  const textClass = getTextColor(colorClassNames, color === 'white' ? 'black' : 'white');

  return <div className={`${bgClass} ${textClass} p-4 rounded`}>Themed content</div>;
}
```

---

[← Back to Home](../../README.md) | [← Previous: Components API](./components.md)
