# API Reference - Components

[← Back to Home](../../README.md)

Complete API reference for UI components.

## Button

Styled button component with variants, sizes, and link support.

### Props

```typescript
interface ButtonProps {
  context: ThemeContext;
  data: ButtonData;
  children?: React.ReactNode;
  options?: ButtonOptions;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}

interface ButtonOptions {
  variant?: string;
  size?: ButtonSize;
  color?: string;
  className?: string;
  classOverride?: ButtonClassOverride;
}

type ButtonSize = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type ButtonClassOverride = Partial<Record<ButtonClassCategory, string>> | string;
```

### Parameters

| Parameter   | Type                              | Required | Default     | Description                            |
| ----------- | --------------------------------- | -------- | ----------- | -------------------------------------- |
| `context`   | `ThemeContext`                    | Yes      | -           | Theme configuration                    |
| `data`      | `ButtonData`                      | Yes      | -           | Button data with text and link         |
| `children`  | `React.ReactNode`                 | No       | `data.text` | Button content (overrides `data.text`) |
| `options`   | `ButtonOptions`                   | No       | `{}`        | Styling options                        |
| `type`      | `'button' \| 'submit' \| 'reset'` | No       | `'button'`  | Button type attribute                  |
| `disabled`  | `boolean`                         | No       | `false`     | Disable button                         |
| `ariaLabel` | `string`                          | No       | -           | Accessibility label                    |

### Example

```typescript
import { Button } from '@zilfire/core-theme/web/components';

<Button
  data={{
    _type: 'button',
    text: 'Get Started',
    link: { _type: 'navLink', href: '/start' },
  }}
  context={themeContext}
  options={{
    variant: 'primary',
    size: 'lg',
    classOverride: { paddingX: 'px-8' },
  }}
  ariaLabel="Get started with our platform"
/>;
```

---

## ButtonGroup

Container for grouping buttons with consistent spacing.

### Props

```typescript
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  spacing?: string;
  orientation?: 'horizontal' | 'vertical';
}
```

### Parameters

| Parameter     | Type                         | Required | Default        | Description            |
| ------------- | ---------------------------- | -------- | -------------- | ---------------------- |
| `children`    | `React.ReactNode`            | Yes      | -              | Button components      |
| `className`   | `string`                     | No       | -              | Additional CSS classes |
| `spacing`     | `string`                     | No       | `'gap-4'`      | Gap between buttons    |
| `orientation` | `'horizontal' \| 'vertical'` | No       | `'horizontal'` | Layout direction       |

### Example

```typescript
import { ButtonGroup, Button } from '@zilfire/core-theme/web/components';

<ButtonGroup spacing="gap-6">
  <Button data={primaryButton} context={context} />
  <Button data={secondaryButton} context={context} />
</ButtonGroup>;
```

---

## Link

Navigation link component with internal/external handling.

### Props

```typescript
interface LinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  openInNewTab?: boolean;
  className?: string;
  ariaLabel?: string;
}
```

### Parameters

| Parameter      | Type              | Required | Default | Description            |
| -------------- | ----------------- | -------- | ------- | ---------------------- |
| `href`         | `string`          | Yes      | -       | URL or path            |
| `children`     | `React.ReactNode` | Yes      | -       | Link content           |
| `external`     | `boolean`         | No       | `false` | Is external link       |
| `openInNewTab` | `boolean`         | No       | `false` | Open in new tab        |
| `className`    | `string`          | No       | -       | Additional CSS classes |
| `ariaLabel`    | `string`          | No       | -       | Accessibility label    |

### Example

```typescript
import { Link } from '@zilfire/core-theme/web/components';

<Link href="/about" className="text-primary-600">
  Learn More
</Link>

<Link
  href="https://example.com"
  external
  openInNewTab
  ariaLabel="Visit external site"
>
  External Link
</Link>
```

---

## Section

Layout section with configurable spacing and background.

### Props

```typescript
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  paddingY?: string;
  paddingX?: string;
  backgroundColor?: string;
  id?: string;
  as?: 'section' | 'div' | 'article';
}
```

### Parameters

| Parameter         | Type                              | Required | Default     | Description            |
| ----------------- | --------------------------------- | -------- | ----------- | ---------------------- |
| `children`        | `React.ReactNode`                 | Yes      | -           | Section content        |
| `className`       | `string`                          | No       | -           | Additional CSS classes |
| `paddingY`        | `string`                          | No       | `'py-12'`   | Vertical padding       |
| `paddingX`        | `string`                          | No       | `'px-4'`    | Horizontal padding     |
| `backgroundColor` | `string`                          | No       | -           | Background color class |
| `id`              | `string`                          | No       | -           | HTML id attribute      |
| `as`              | `'section' \| 'div' \| 'article'` | No       | `'section'` | HTML element type      |

### Example

```typescript
import { Section } from '@zilfire/core-theme/web/components';

<Section paddingY="py-20" backgroundColor="bg-gray-50" id="features">
  <Container>{/* Content */}</Container>
</Section>;
```

---

## Container

Content width container for consistent max-width layouts.

### Props

```typescript
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: ContainerSize;
  centerContent?: boolean;
}

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
```

### Parameters

| Parameter       | Type              | Required | Default | Description                 |
| --------------- | ----------------- | -------- | ------- | --------------------------- |
| `children`      | `React.ReactNode` | Yes      | -       | Container content           |
| `className`     | `string`          | No       | -       | Additional CSS classes      |
| `maxWidth`      | `ContainerSize`   | No       | `'xl'`  | Maximum width               |
| `centerContent` | `boolean`         | No       | `false` | Center content horizontally |

### Example

```typescript
import { Container } from '@zilfire/core-theme/web/components';

<Container maxWidth="lg" className="px-6">
  <h1>Contained Content</h1>
  <p>This content respects the max-width.</p>
</Container>;
```

---

## ImageSection

Section with background image support.

### Props

```typescript
interface ImageSectionProps {
  children: React.ReactNode;
  backgroundImage?: SanityImageWithAlt;
  backgroundImageOptions?: BackgroundImageOptions;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: string;
}

interface BackgroundImageOptions {
  imageSizes?: string;
  quality?: number;
  priority?: boolean;
}
```

### Parameters

| Parameter                | Type                     | Required | Default           | Description            |
| ------------------------ | ------------------------ | -------- | ----------------- | ---------------------- |
| `children`               | `React.ReactNode`        | Yes      | -                 | Section content        |
| `backgroundImage`        | `SanityImageWithAlt`     | No       | -                 | Background image       |
| `backgroundImageOptions` | `BackgroundImageOptions` | No       | `{ quality: 80 }` | Image options          |
| `className`              | `string`                 | No       | -                 | Additional CSS classes |
| `overlay`                | `boolean`                | No       | `false`           | Add dark overlay       |
| `overlayOpacity`         | `string`                 | No       | `'opacity-50'`    | Overlay opacity        |

### Example

```typescript
import { ImageSection } from '@zilfire/core-theme/web/components';

<ImageSection
  backgroundImage={{
    asset: { _ref: 'image-id', _type: 'reference' },
    alt: 'Background',
  }}
  backgroundImageOptions={{
    imageSizes: '100vw',
    quality: 90,
    priority: true,
  }}
  overlay
  overlayOpacity="opacity-60"
>
  <Container>
    <h1 className="text-white">Content over image</h1>
  </Container>
</ImageSection>;
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

### SanityImageWithAlt

```typescript
interface SanityImageWithAlt {
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}
```

---

[← Back to Home](../../README.md) | [← Previous: Blocks API](./blocks.md) | [Utilities API →](./utilities.md)
