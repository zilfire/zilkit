import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'logo',
          title: 'Logo',
          type: 'reference',
          to: [{ type: 'logo' }],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'navMenu',
          title: 'Navigation Menu',
          type: 'reference',
          to: [{ type: 'navMenu' }],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'footerLogo',
          title: 'Footer Logo',
          type: 'reference',
          to: [{ type: 'logo' }],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
});
