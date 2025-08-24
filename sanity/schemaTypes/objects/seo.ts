import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description:
        'Title used for search engines. If blank, the page name will be used.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description:
        'Description for search engines. If blank, the page heading will be used.',
      validation: (Rule) =>
        Rule.max(155).warning(
          'Longer descriptions may be truncated by search engines'
        ),
    }),
    defineField({
      name: 'metaImage',
      title: 'Meta Image',
      type: 'mediaType',
    }),
  ],
});
