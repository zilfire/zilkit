import { AiOutlineStar as StarIcon } from 'react-icons/ai';

const logo = {
  name: 'logo',
  title: 'Logo',
  type: 'document',
  icon: StarIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Logo Name',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      required: true,
      options: {
        source: 'name',
        maxLength: 200,
      },
    },
    {
      name: 'path',
      title: 'Path',
      type: 'string',
      hidden: true,
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    },
    {
      name: 'logoImage',
      type: 'image',
      title: 'Logo Image',
      options: {
        hotspot: false,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logoImage',
    },
  },
};

export default logo;
