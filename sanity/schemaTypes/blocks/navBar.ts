import { defineField, defineType } from 'sanity';
import { SparkleIcon } from '@sanity/icons';

export const navBar = defineType({
  name: 'navBar',
  title: 'Nav Bar',
  type: 'object',
  icon: SparkleIcon,
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'logo',
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled Nav Bar',
        subtitle: 'Nav Bar',
        media: SparkleIcon,
      };
    },
  },
});
