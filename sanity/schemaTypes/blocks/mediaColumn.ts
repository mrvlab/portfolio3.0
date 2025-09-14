import { defineField, defineType } from 'sanity';
import { ImageIcon, ProjectsIcon, VideoIcon } from '@sanity/icons';

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
      type: 'mediaItem.mediaType',
      image: 'mediaItem.image',
      video: 'mediaItem.video',
      videoThumbnail: 'mediaItem.video.asset.thumbTime',
      alt: 'mediaItem.image.alt',
    },
    prepare({ type, image, video, videoThumbnail, alt }) {
      const isVideo = type === 'video';
      const subtitle = isVideo ? 'Video' : alt || 'Image';
      const media = isVideo
        ? videoThumbnail
          ? video
          : VideoIcon // Use video icon when thumbnail not ready
        : image || ImageIcon;

      return {
        title: 'Media Column',
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
