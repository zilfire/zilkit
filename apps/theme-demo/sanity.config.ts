import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["settings"])

export default defineConfig({
  name: 'default',
  title: 'Theme Demo CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

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
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('settings')
              ),
            // Regular documents
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId()!)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [
      {
        name: 'settings',
        title: 'Settings',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Site Title',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'description',
            title: 'Site Description',
            type: 'text',
            rows: 3
          },
          {
            name: 'primaryColor',
            title: 'Primary Color',
            type: 'color',
            options: {
              disableAlpha: true
            }
          },
          {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
              hotspot: true
            }
          }
        ]
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
            validation: Rule => Rule.required()
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
              {
                type: 'block'
              },
              {
                type: 'image',
                options: {
                  hotspot: true
                }
              }
            ]
          },
          {
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: [
              {
                name: 'metaTitle',
                title: 'Meta Title',
                type: 'string'
              },
              {
                name: 'metaDescription',
                title: 'Meta Description',
                type: 'text',
                rows: 3
              }
            ]
          }
        ],
        preview: {
          select: {
            title: 'title',
            slug: 'slug'
          },
          prepare({title, slug}) {
            return {
              title,
              subtitle: slug?.current ? `/${slug.current}` : 'No slug'
            }
          }
        }
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
            validation: Rule => Rule.required()
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3
          },
          {
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: {
              hotspot: true
            }
          },
          {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
              {
                type: 'block'
              },
              {
                type: 'image',
                options: {
                  hotspot: true
                }
              }
            ]
          },
          {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
          },
          {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{type: 'string'}],
            options: {
              layout: 'tags'
            }
          }
        ],
        preview: {
          select: {
            title: 'title',
            media: 'featuredImage'
          }
        },
        orderings: [
          {
            title: 'Published at, new',
            name: 'publishedAtDesc',
            by: [
              {field: 'publishedAt', direction: 'desc'}
            ]
          }
        ]
      }
    ],
  },

  document: {
    // For singleton types, filter out actions that are not applicable
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
