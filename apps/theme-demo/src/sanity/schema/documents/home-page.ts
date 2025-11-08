import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'path',
      title: 'Path',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'heroBlock',
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    defineField({
      name: 'faq',
      title: 'FAQ Section',
      type: 'faqBlock',
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
  ],
});
