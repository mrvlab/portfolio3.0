import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const tags = defineType({
  name: 'tags',
  title: 'Tags',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      name: 'name',
    },
    prepare(selection) {
      const { name } = selection;
      return Object.assign({}, selection, {
        subtitle: name,
      });
    },
  },
});
