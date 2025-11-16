import { defineArrayMember, defineField, defineType } from 'sanity';
import { ProjectsIcon, VideoIcon } from '@sanity/icons';

export const mediaGrid = defineType({
  name: 'mediaGrid',
  title: 'Media Grid',
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
      name: 'flipLayout',
      title: 'Flip Layout',
      type: 'boolean',
      description:
        'When enabled, the media groups will be displayed in reverse order (flipped horizontally)',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'mediaItems',
      title: 'Media Groups',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'mediaGroup',
        }),
      ],
      group: 'content',
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
        const firstGroup = mediaItems[0];
        const firstMediaItem = firstGroup?.mediaItems?.[0];

        if (firstMediaItem) {
          const isVideo = firstMediaItem?.mediaType === 'video';
          const totalItems = mediaItems.reduce(
            (acc: number, group: { mediaItems?: unknown[] }) => {
              return acc + (group?.mediaItems?.length || 0);
            },
            0
          );

          subtitle = `${mediaItems.length} group${mediaItems.length > 1 ? 's' : ''}, ${totalItems} media item${totalItems > 1 ? 's' : ''}`;

          if (isVideo) {
            media = VideoIcon; // Use video icon for videos
          } else {
            media = firstMediaItem?.image || ProjectsIcon;
          }
        }
      }

      return {
        title: 'Media Grid',
        subtitle: subtitle,
        media: media || ProjectsIcon,
      };
    },
  },
});
