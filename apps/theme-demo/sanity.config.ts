import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool, defineDocuments } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { UpdatePathFromSlugAction } from '@/sanity/utils/update-path-action';
import { colorInput } from '@sanity/color-input';
import navMenu from '@zilfire/sanity-nav-menu';
import form from '@zilfire/sanity-form';
import schema from '@/sanity/schema';

// Define the actions that should be available for singleton documents
// const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

// Define the singleton document types
const singletonTypes = new Set(['settings', 'homePage', 'linkPlaceholder']);

// const sitePageDocumentTypes = ['homePage', 'page', 'service'];

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
            S.listItem()
              .title('HomePage')
              .id('siteHome')
              .child(S.document().schemaType('homePage').documentId('siteHome')),
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
          {
            route: '/',
            filter: `_type == "homePage" && _id == "siteHome"`,
          },
        ]),
      },
    }),
    colorInput(),
    navMenu([{ type: 'page' }, { type: 'homePage' }]),
    form(),
  ],
  schema,
  document: {
    // For singleton types, filter out actions that are not applicable
    //   actions: (input, context) =>
    //     singletonTypes.has(context.schemaType)
    //       ? input.filter(({ action }) => action && singletonActions.has(action))
    //       : input,
    actions: (prev) => {
      return [(props) => UpdatePathFromSlugAction(props, new Set(['homePage', 'page'])), ...prev];
    },
  },
});
