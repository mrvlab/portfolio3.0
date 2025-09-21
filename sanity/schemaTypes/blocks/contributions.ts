import { defineArrayMember, defineField, defineType } from 'sanity';
import { MasterDetailIcon, VideoIcon } from '@sanity/icons';

export const contributions = defineType({
  name: 'contributions',
  title: 'Contributions',
  type: 'object',
  icon: MasterDetailIcon,
  groups: [
    {
      name: 'Agency',
      title: 'Agency',
    },
    {
      name: 'Projects',
      title: 'Projects',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'Agency',
    }),
    defineField({
      name: 'agencyWorkList',
      title: 'Agency Work List',
      type: 'array',
      group: 'Agency',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'agencyWork' }],
        }),
      ],
    }),
    defineField({
      name: 'projectListLabel',
      title: 'Project List Label',
      type: 'string',
      group: 'Projects',
    }),
    defineField({
      name: 'projectsList',
      title: 'Projects List',
      type: 'array',
      group: 'Projects',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      projectsListFirstPosterType: 'projectsList.0.poster.type',
      projectsListFirstPosterImage: 'projectsList.0.poster.image',
      projectsListFirstPosterVideo: 'projectsList.0.poster.video',
      projectsListFirstPosterVideoThumbnail:
        'projectsList.0.poster.video.asset.thumbTime',
    },
    prepare({
      title,
      projectsListFirstPosterType,
      projectsListFirstPosterImage,
      projectsListFirstPosterVideo,
      projectsListFirstPosterVideoThumbnail,
    }) {
      const isVideo = projectsListFirstPosterType === 'video';
      const media = isVideo
        ? projectsListFirstPosterVideoThumbnail
          ? projectsListFirstPosterVideo
          : VideoIcon // Use video icon when thumbnail not ready
        : projectsListFirstPosterImage || MasterDetailIcon;

      return {
        title: title || 'Untitled Contributions',
        subtitle: 'Contributions',
        media: media,
      };
    },
  },
});
