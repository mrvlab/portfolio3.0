import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

/**
 * Details Item schema object. This object lets the user first select the type of details item and then
 * enter the appropriate content - either text, references to tags, or a link.
 */

export const detailsItem = defineType({
  name: 'detailsItem',
  title: 'Details Item',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'itemType',
      title: 'Item Type',
      type: 'string',
      initialValue: 'titleWithText',
      options: {
        list: [
          { title: 'Title with Text', value: 'titleWithText' },
          { title: 'Title with References', value: 'titleWithReferences' },
          { title: 'Title with Link', value: 'titleWithLink' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      hidden: ({ parent }) => parent?.itemType !== 'titleWithText',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { itemType?: string };
          if (parent?.itemType === 'titleWithText' && !value) {
            return 'Text is required when Item Type is Title with Text';
          }
          return true;
        }),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tags' }] }],
      hidden: ({ parent }) => parent?.itemType !== 'titleWithReferences',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { itemType?: string };
          if (
            parent?.itemType === 'titleWithReferences' &&
            (!value || value.length === 0)
          ) {
            return 'At least one tag is required when Item Type is Title with References';
          }
          return true;
        }),
    }),
    defineField({
      name: 'linkData',
      title: 'Link Data',
      type: 'object',
      hidden: ({ parent }) => parent?.itemType !== 'titleWithLink',
      fields: [
        defineField({
          name: 'linkLabel',
          title: 'Link Label',
          type: 'string',
          initialValue: 'Live Website',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { itemType?: string };
          if (parent?.itemType === 'titleWithLink' && !value) {
            return 'Link data is required when Item Type is Title with Link';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      itemType: 'itemType',
      text: 'text',
      tags: 'tags',
      linkLabel: 'linkData.linkLabel',
    },
    prepare(selection) {
      const { title, itemType, text, tags, linkLabel } = selection;

      let subtitle = '';
      if (itemType === 'titleWithText' && text) {
        subtitle = text;
      } else if (
        itemType === 'titleWithReferences' &&
        tags &&
        tags.length > 0
      ) {
        subtitle = `${tags.length} tag${tags.length > 1 ? 's' : ''}`;
      } else if (itemType === 'titleWithLink' && linkLabel) {
        subtitle = linkLabel;
      }

      return {
        title: title || 'Untitled Details Item',
        subtitle: subtitle || itemType || 'Details Item',
        media: DocumentIcon,
      };
    },
  },
});
