import { defineField, defineType } from 'sanity';
import InputSlider from '../components/InputSlider';

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
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true, metadata: ['lqip'], collapsed: false },
        }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      initialValue: false,
      description:
        'Prevent this page from being indexed by search engines. Check this box to add a "noindex" meta tag.',
    }),
  ],
});
