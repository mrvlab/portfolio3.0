import { ImageIcon, TiersIcon, VideoIcon } from '@sanity/icons';
import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';
import * as blocks from '../blocks';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  icon: TiersIcon,
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      options: { collapsible: true, collapsed: true },
    },
  ],
  groups: [
    {
      name: 'projectCard',
      title: 'Project Card',
    },
    {
      name: 'pageBuilder',
      title: 'Page Builder',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'projectCard',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'pageBuilder',
      description:
        'A slug is required for the case study to show up in the preview',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'mediaType',
      group: 'projectCard',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      group: 'pageBuilder',
      of: Object.values(blocks)
        .filter((block) => block.name !== 'contributions')
        .map((block) => ({
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
      name: 'date',
      title: 'Date',
      type: 'datetime',
      group: 'projectCard',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
      fieldset: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      date: 'date',
      posterType: 'poster.mediaType',
      posterImage: 'poster.image',
      posterVideo: 'poster.video',
    },
    prepare({
      title,
      date,
      posterType,
      posterImage,
      posterVideo,
    }) {
      const subtitles = [
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean);

      const isVideo = posterType === 'video';
      const media = isVideo
        ? VideoIcon
        : posterImage || ImageIcon;

      return {
        title: title || 'Untitled Case Study',
        media: media,
        subtitle: subtitles.join(' '),
      };
    },
  },
});
