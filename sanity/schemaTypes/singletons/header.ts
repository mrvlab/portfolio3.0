import { LinkIcon, LaunchIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkReference',
      title: 'Link Reference',
      type: 'array',
      of: [
        {
          name: 'internalLink',
          title: 'Link (Internal)',
          type: 'object',
          description: 'Used to link to an existing page',
          fields: [
            {
              name: 'linkLabel',
              title: 'Link Label',
              description:
                'Used to override the default label for the page, if not provided, the page title will be used',
              type: 'string',
            },
            {
              name: 'page',
              title: 'Page',
              type: 'reference',
              to: [{ type: 'page' }],
            },
          ],
          preview: {
            select: {
              title: 'linkLabel',
              pageTitle: 'page.pageTitle',
            },
            prepare({ title, pageTitle }) {
              return {
                title: title ? title : pageTitle || 'No label',
                subtitle: pageTitle
                  ? `Link to: ${pageTitle}`
                  : 'No page selected',
              };
            },
          },
        },
        {
          type: 'object',
          name: 'externalLink',
          title: 'Link (External)',
          description: 'Used to override the default label for the page',
          fields: [
            {
              name: 'linkLabel',
              title: 'Link Label',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'link',
            },
          ],
          preview: {
            select: {
              title: 'linkLabel',
              url: 'link.href',
            },
            prepare({ title, url }) {
              return {
                title: title || 'No label',
                subtitle: url ? `Link to: ${url}` : 'No URL',
                media: LaunchIcon,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation Items',
        media: LinkIcon,
      };
    },
  },
});
