import { CaseIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const agencyWork = defineType({
  name: 'agencyWork',
  title: 'Agency Work',
  icon: CaseIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'agencyClient',
      title: 'Agency Client',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'agencyClientUrl',
      title: 'Agency Client URL',
      description: 'The URL of the agency client',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'agencyClient',
    },
    prepare({ title }) {
      return { title };
    },
  },
});
