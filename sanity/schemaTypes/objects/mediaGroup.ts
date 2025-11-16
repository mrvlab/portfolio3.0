import { ImageIcon, ProjectsIcon, VideoIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const mediaGroup = defineType({
  name: 'mediaGroup',
  title: 'Media Group',
  type: 'object',
  icon: ProjectsIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      name: 'columnSpan',
      title: 'Column Span',
      type: 'number',
      description:
        'Number of columns this group should span on desktop. Options: 1 Column, 2 Columns, or Full Width. Note: This setting is based on desktop designs. On mobile, the group will span the full width regardless of this setting.',
      options: {
        list: [
          { title: 'Span 1 Column', value: 1 },
          { title: 'Span 2 Columns', value: 2 },
          { title: 'Span Full Width', value: 12 },
        ],
      },
      initialValue: 12,
      validation: (Rule) => Rule.min(1).max(12),
      group: 'settings',
    }),

    defineField({
      name: 'mediaItems',
      title: 'Media Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          groups: [
            {
              name: 'content',
              title: 'Content',
            },
            {
              name: 'settings',
              title: 'Settings',
            },
          ],
          fields: [
            defineField({
              name: 'media',
              title: 'Media',
              type: 'mediaType',
              group: 'content',
            }),
            defineField({
              name: 'fullHeight',
              title: 'Full Height',
              type: 'boolean',
              description:
                'Enable to set the column to the full height of the container',
              initialValue: false,
              group: 'settings',
            }),
            defineField({
              name: 'stickyToTop',
              title: 'Sticky to Top',
              type: 'boolean',
              description:
                'Enable to make the media item sticky to the top of the column. This will only work if the full height is enabled.',
              initialValue: false,
              group: 'settings',
            }),
            defineField({
              name: 'border',
              title: 'Border',
              type: 'boolean',
              description: 'Enable to add a border to the media',
              initialValue: true,
              group: 'settings',
            }),
            defineField({
              name: 'borderColorLight',
              title: 'Border Color Light',
              type: 'color',
              group: 'settings',
            }),
            defineField({
              name: 'borderColorDark',
              title: 'Border Color Dark',
              type: 'color',
              group: 'settings',
            }),
          ],
          preview: {
            select: {
              mediaType: 'media.mediaType',
              image: 'media.image',
              alt: 'media.image.alt',
              fullHeight: 'fullHeight',
              stickyToTop: 'stickyToTop',
              border: 'border',
            },
            prepare({
              mediaType,
              image,
              alt,
              fullHeight,
              stickyToTop,
              border,
            }) {
              const altLabel = alt ? `Alt: ${alt}` : '';

              return {
                title: `${mediaType === 'video' ? 'Video' : 'Image'} | ${altLabel}`,
                subtitle:
                  `Full Height: ${fullHeight ? '🟢' : '🔴'} | Border: ${border ? '🟢' : '🔴'} | Sticky: ${stickyToTop ? '🟢' : '🔴'}` ||
                  '',
                media: image || (mediaType === 'video' ? VideoIcon : ImageIcon),
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      mediaItems: 'mediaItems',
      columnSpan: 'columnSpan',
      firstMediaType: 'mediaItems[0].media.mediaType',
      firstImage: 'mediaItems[0].media.image',
    },
    prepare({ mediaItems, columnSpan, firstMediaType, firstImage }) {
      let subtitle = '';
      let media:
        | typeof VideoIcon
        | typeof ImageIcon
        | typeof ProjectsIcon
        | typeof firstImage = ProjectsIcon;

      if (mediaItems && mediaItems.length > 0) {
        const itemCount = `${mediaItems.length} media item${mediaItems.length > 1 ? 's' : ''}`;
        const spanInfo = columnSpan
          ? ` · span ${columnSpan} col${columnSpan > 1 ? 's' : ''}`
          : '';
        subtitle = itemCount + spanInfo;

        // Check if it's a video - explicitly check mediaType field
        const isVideo = firstMediaType === 'video';

        if (isVideo) {
          media = VideoIcon;
        } else {
          media = firstImage || ImageIcon;
        }
      }

      return {
        title: 'Media Group',
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
