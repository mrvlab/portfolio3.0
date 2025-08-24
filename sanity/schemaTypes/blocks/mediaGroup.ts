import { defineArrayMember, defineField, defineType } from 'sanity';
import { ProjectsIcon } from '@sanity/icons';

export const mediaGroup = defineType({
  name: 'mediaGroup',
  title: 'Media Group',
  type: 'object',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'mediaItems',
      title: 'Media Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'mediaType',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      mediaItems: 'mediaItems',
    },
    prepare({ mediaItems }) {
      let subtitle = '';
      let media = null;

      if (mediaItems.length > 0) {
        subtitle = `${mediaItems.length} media item${mediaItems.length > 1 ? 's' : ''}`;
        media = mediaItems[0].media;
      }
      return {
        title: 'Media Group',
        subtitle: subtitle,
        media: media || ProjectsIcon,
      };
    },
  },
});
