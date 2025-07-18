import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool, defineDocuments } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { faqBlock, blockContent, richText, figure } from '@zilfire/core-theme/sanity-schema';
import { colorInput } from '@sanity/color-input';
import navMenu from '@zilfire/sanity-nav-menu';
import form from '@zilfire/sanity-form';

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

// Define the singleton document types
const singletonTypes = new Set(['settings']);

export default defineConfig({
  name: 'default',
  title: 'Theme Demo CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton documents
            S.listItem()
              .title('Settings')
              .id('settings')
              .child(S.document().schemaType('settings').documentId('settings')),
            // Regular documents
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId()!)
            ),
          ]),
    }),
    visionTool(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable', // optional, but recommended
        },
      },
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/pages/:slug',
            filter: `_type == "page" && slug.current == $slug`,
          },
        ]),
      },
    }),
    colorInput(),
    navMenu(),
    form(),
  ],

  schema: {
    types: [
      faqBlock,
      blockContent,
      richText,
      figure,
      {
        name: 'settings',
        title: 'Settings',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Site Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Site Description',
            type: 'text',
            rows: 3,
          },
          {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
      },
      {
        name: 'page',
        title: 'Page',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
              {
                type: 'block',
              },
              {
                type: 'image',
                options: {
                  hotspot: true,
                },
              },
            ],
          },
          {
            name: 'faq',
            title: 'FAQ',
            type: 'faqBlock',
          },
        ],
        preview: {
          select: {
            title: 'title',
            slug: 'slug',
          },
          prepare({ title, slug }) {
            return {
              title,
              subtitle: slug?.current ? `/pages/${slug.current}` : 'No slug',
            };
          },
        },
      },
      {
        name: 'post',
        title: 'Blog Post',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
          },
          {
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
              {
                type: 'block',
              },
              {
                type: 'image',
                options: {
                  hotspot: true,
                },
              },
            ],
          },
          {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
          },
          {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
              layout: 'tags',
            },
          },
        ],
        preview: {
          select: {
            title: 'title',
            media: 'featuredImage',
            slug: 'slug',
          },
          prepare({ title, media, slug }) {
            return {
              title,
              media,
              subtitle: slug?.current ? `/blog/${slug.current}` : 'No slug',
            };
          },
        },
        orderings: [
          {
            title: 'Published at, new',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
          },
        ],
      },
    ],
  },

  document: {
    // For singleton types, filter out actions that are not applicable
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
