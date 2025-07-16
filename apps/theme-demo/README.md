# Theme Demo

A Next.js application with TypeScript, TailwindCSS, and Sanity CMS for theme development and testing.

## Features

- ⚡ **Next.js 15** with App Router
- 🎨 **TailwindCSS 3.4.17** for styling
- 📝 **TypeScript** for type safety
- 🗄️ **Sanity CMS** for content management
- 🖼️ **Portable Text** for rich content rendering
- 🌙 **Dark mode** support

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set up Sanity CMS

1. Create a new Sanity project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Update `.env.local` with your Sanity project details:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```

### 3. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Access the CMS Studio

Visit [http://localhost:3000/studio](http://localhost:3000/studio) to access the Sanity Studio and manage your content.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── studio/          # Sanity Studio route
│   │   ├── page.tsx         # Homepage
│   │   └── layout.tsx       # Root layout
├── components/
│   ├── PortableText.tsx     # Portable Text renderer
│   └── SanityImage.tsx      # Sanity image component
├── lib/
│   ├── sanity.ts           # Sanity client configuration
│   └── queries.ts          # GROQ queries
├── sanity.config.ts        # Sanity studio configuration
└── .env.example           # Environment variables template
```

## Content Types

The CMS includes the following content types:

- **Settings**: Site-wide settings (title, description, logo, primary color)
- **Pages**: Static pages with rich content
- **Posts**: Blog posts with featured images and tags

## Development

### Running Tests

```bash
pnpm test
```

### Building for Production

```bash
pnpm build
```

### Linting

```bash
pnpm lint
```

## Deployment

When deploying, make sure to:

1. Set up your environment variables in your hosting platform
2. Add your deployment URL to your Sanity project's CORS origins
3. Consider using Sanity's CDN for production by setting `useCdn: true` in the client configuration

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
