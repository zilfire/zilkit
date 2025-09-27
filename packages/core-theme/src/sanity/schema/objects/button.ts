import { defineField, defineType } from 'sanity';

export const button = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Button Link',
      type: 'navLink',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
