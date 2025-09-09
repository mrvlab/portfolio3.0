import { defineField, defineType } from 'sanity';
import { ImageIcon, ProjectsIcon } from '@sanity/icons';

export const mediaColumn = defineType({
  name: 'mediaColumn',
  title: 'Media Column',
  type: 'object',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'mediaItem',
      title: 'Media Item',
      type: 'mediaType',
    }),
  ],
  preview: {
    select: {
      mediaItem: 'mediaItem.media',
    },

    prepare({ mediaItem }) {
      let subtitle = '';
      let media = null;

      if (mediaItem) {
        subtitle = `${mediaItem.alt}`;
        media = mediaItem.media;
      }
      return {
        title: 'Media Column',
        subtitle: subtitle,
        media: media || ImageIcon,
      };
    },
  },
});
