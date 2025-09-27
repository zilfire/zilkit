import { defineField, defineType } from 'sanity';

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'figure',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'button',
      options: {
        collapsable: true,
        collapsed: false,
      },
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'button',
      options: {
        collapsable: true,
        collapsed: false,
      },
    }),
  ],
});
