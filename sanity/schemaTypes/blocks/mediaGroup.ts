import { defineArrayMember, defineField, defineType } from 'sanity';
import { ProjectsIcon, VideoIcon } from '@sanity/icons';

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

      if (mediaItems && mediaItems.length > 0) {
        const firstItem = mediaItems[0];
        const isVideo = firstItem?.mediaType === 'video';

        subtitle = `${mediaItems.length} media item${mediaItems.length > 1 ? 's' : ''}`;

        if (isVideo) {
          media = firstItem?.video?.asset?.thumbTime
            ? firstItem.video
            : VideoIcon; // Use video icon when thumbnail not ready
        } else {
          media = firstItem?.image || ProjectsIcon;
        }
      }

      return {
        title: 'Media Group',
        subtitle: subtitle,
        media: media || ProjectsIcon,
      };
    },
  },
});
