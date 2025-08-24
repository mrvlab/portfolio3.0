import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';
import * as blocks from '../blocks';

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {
      name: 'seo',
      title: 'Seo',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      of: Object.values(blocks).map((block) => ({
        type: block.name,
      })),
      options: {
        insertMenu: {
          // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/array-type#efb1fe03459d
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/blocksThumbnails/${schemaTypeName}.png`,
            },
          ],
        },
      },
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      fieldset: 'seo',
    }),
  ],
});
