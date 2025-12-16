import { defineField, defineType } from 'sanity';
import { iconRegistry } from '../../../assets/icon-registry';

// Generate options from icon registry
const iconOptions = Object.entries(iconRegistry).map(([key, config]) => ({
  title: config.title,
  value: key,
}));

export const icon = defineType({
  name: 'icon',
  title: 'Icon',
  type: 'object',
  fields: [
    defineField({
      name: 'iconKey',
      title: 'Select Icon',
      type: 'string',
      options: {
        list: iconOptions,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      iconKey: 'iconKey',
    },
    prepare({ iconKey }) {
      const iconConfig = iconRegistry[iconKey as keyof typeof iconRegistry];
      return {
        title: iconConfig?.title || 'Unknown Icon',
        subtitle: 'Icon',
      };
    },
  },
});
