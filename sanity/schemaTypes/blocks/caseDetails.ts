import { defineArrayMember, defineField, defineType } from 'sanity';
import { CaseIcon } from '@sanity/icons';

export const caseDetails = defineType({
  name: 'caseDetails',
  title: 'Case Details',
  type: 'object',
  icon: CaseIcon,
  groups: [
    {
      name: 'descriptionGroup',
      title: 'Description',
    },
    {
      name: 'detailsGroup',
      title: 'Details',
    },
    {
      name: 'creditsGroup',
      title: 'Credits',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'descriptionGroup',
    }),
    defineField({
      name: 'descriptionLabel',
      title: 'Description Label',
      type: 'string',
      group: 'descriptionGroup',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      group: 'descriptionGroup',
    }),

    defineField({
      name: 'detailsLabel',
      title: 'Details Label',
      type: 'string',
      group: 'detailsGroup',
    }),
    defineField({
      name: 'detailsItems',
      title: 'Details Items',
      type: 'array',
      group: 'detailsGroup',
      of: [
        defineArrayMember({
          type: 'detailsItem',
        }),
      ],
    }),
    defineField({
      name: 'creditsLabel',
      title: 'Credits Label',
      type: 'string',
      group: 'creditsGroup',
    }),
    defineField({
      name: 'creditsItems',
      title: 'Credits Items',
      type: 'array',
      group: 'creditsGroup',
      of: [
        defineArrayMember({
          type: 'detailsItem',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled Case Details',
        subtitle: 'Case Details',
        media: CaseIcon,
      };
    },
  },
});
