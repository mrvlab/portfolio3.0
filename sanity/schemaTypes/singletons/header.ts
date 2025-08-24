import { LinkIcon, LaunchIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        defineField({
          name: 'navigationItem',
          title: 'Navigation Item',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              linkType: 'link.linkType',
              href: 'link.href',
              pageTitle: 'link.page.name',
              caseStudyTitle: 'link.caseStudy.name',
            },
            prepare(selection) {
              const { title, linkType, href, pageTitle, caseStudyTitle } =
                selection;
              let subtitle = 'Link to: ';

              if (linkType === 'href' && href) {
                subtitle += href;
              } else if (linkType === 'page' && pageTitle) {
                subtitle += `Page: ${pageTitle}`;
              } else if (linkType === 'caseStudy' && caseStudyTitle) {
                subtitle += `Case Study: ${caseStudyTitle}`;
              } else {
                subtitle += 'No link configured';
              }

              return {
                title,
                subtitle,
                media: LinkIcon,
              };
            },
          },
        }),
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
