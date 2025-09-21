import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference, or case study reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'url',
      options: {
        list: [
          { title: 'URL', value: 'href' },
          { title: 'Page', value: 'page' },
          { title: 'Case Study', value: 'caseStudy' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      hidden: ({ parent }) => parent?.linkType !== 'href',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string };

          // Check if URL is required
          if (parent?.linkType === 'href' && !value) {
            return 'URL is required when Link Type is URL';
          }

          // If URL is provided, validate the format
          if (value) {
            // Allow mailto: URLs
            if (value.startsWith('mailto:')) {
              return true;
            }

            // Allow tel: URLs
            if (value.startsWith('tel:')) {
              return true;
            }

            // Validate HTTP/HTTPS URLs
            try {
              const url = new URL(value);
              if (url.protocol === 'http:' || url.protocol === 'https:') {
                return true;
              }
            } catch (error) {
              return 'Please enter a valid URL (http://, https://, mailto:, or tel:)';
            }

            return 'Please enter a valid URL (http://, https://, mailto:, or tel:)';
          }

          return true;
        }),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.linkType !== 'page',
      validation: (Rule) =>
        // Custom validation to ensure page reference is provided if the link type is 'page'
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string };
          if (parent?.linkType === 'page' && !value) {
            return 'Page reference is required when Link Type is Page';
          }
          return true;
        }),
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study',
      type: 'reference',
      to: [{ type: 'caseStudy' }],
      hidden: ({ parent }) => parent?.linkType !== 'caseStudy',
      validation: (Rule) =>
        // Custom validation to ensure case study reference is provided if the link type is 'caseStudy'
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string };
          if (parent?.linkType === 'caseStudy' && !value) {
            return 'Case Study reference is required when Link Type is Case Study';
          }
          return true;
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
