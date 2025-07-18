import { defineType } from 'sanity';

export const figure = defineType({
  name: 'figure',
  title: 'Figure',
  type: 'image',
  fields: [
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
});
