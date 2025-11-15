import { ImageIcon, ProjectsIcon, VideoIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const mediaGroup = defineType({
  name: 'mediaGroup',
  title: 'Media Group',
  type: 'object',
  icon: ProjectsIcon,
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
    }),
    defineField({
      name: 'mediaItems',
      title: 'Media Items',
      type: 'array',
      of: [defineArrayMember({ type: 'mediaType' })],
    }),
  ],
  preview: {
    select: {
      mediaItems: 'mediaItems',
      columnSpan: 'columnSpan',
      firstMediaType: 'mediaItems[0].mediaType',
      firstImage: 'mediaItems[0].image',
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
