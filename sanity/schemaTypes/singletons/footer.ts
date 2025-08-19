import { DoubleChevronDownIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: DoubleChevronDownIcon,
  fields: [
    defineField({
      name: 'rights',
      title: 'Rights',
      type: 'string',
      description: 'The rights text to display in the footer.',
    }),
  ],
  preview: {
    select: {
      title: 'rights',
      rights: 'rights',
    },
    prepare({ rights }) {
      return {
        title: rights,
        media: DoubleChevronDownIcon,
      };
    },
  },
});
