import { ImageIcon, VideoIcon } from '@sanity/icons';
import { defineField, defineType, ObjectInputProps, unset } from 'sanity';
import InputSlider from '../components/InputSlider';
import { useEffect } from 'react';

// Custom input component that clears inactive media fields
function MediaTypeInput(props: ObjectInputProps) {
  const { value, onChange } = props;

  useEffect(() => {
    if (!value) return;

    const mediaTypeValue = value.mediaType;

    // Clear video when image is selected
    if (mediaTypeValue === 'image' && value.video) {
      onChange(unset(['video']));
    }

    // Clear image when video is selected
    if (mediaTypeValue === 'video' && value.image) {
      onChange(unset(['image']));
    }
  }, [value, onChange]);

  return props.renderDefault(props);
}

export const mediaType = defineType({
  name: 'mediaType',
  title: 'Media Type',
  type: 'object',
  icon: ImageIcon,
  components: {
    input: MediaTypeInput,
  },
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true, metadata: ['lqip'], collapsed: false },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
        defineField({
          name: 'customImageSettings',
          title: 'Custom Image Settings',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'imageBrightness',
          title: 'Image Brightness',
          description:
            'Controls the brightness of the image (0-100%). Higher values make the image brighter, lower values make it darker.',
          type: 'number',
          initialValue: 100,
          components: {
            input: InputSlider,
          },
          validation: (Rule) => Rule.min(0).max(100),
          hidden: ({ parent }) => !parent?.customImageSettings,
        }),
        defineField({
          name: 'imageQuality',
          title: 'Image Quality',
          description:
            'Image compression quality (0-100). Higher = better quality, larger files. Lower = lower quality, smaller files',
          type: 'number',
          initialValue: 75,
          components: {
            input: InputSlider,
          },
          validation: (Rule) => Rule.min(0).max(100),
          hidden: ({ parent }) => !parent?.customImageSettings,
        }),
      ],
      hidden: ({ parent }) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'mux.video',
      options: {
        metadata: ['lqip'],
        collapsed: false,
      },
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
  ],
  preview: {
    select: {
      type: 'mediaType',
      title: 'image.alt',
      image: 'image',
      video: 'video',
      videoThumbnail: 'video.asset.thumbTime',
    },
    prepare({ type, title, image, video, videoThumbnail }) {
      const isVideo = type === 'video';
      return {
        title: isVideo
          ? video?.asset?.playbackId
            ? 'Video'
            : 'Video (Processing...)'
          : title || 'Image',
        media: isVideo
          ? videoThumbnail
            ? video
            : VideoIcon // Use video icon when thumbnail not ready
          : image || ImageIcon,
      };
    },
  },
});
