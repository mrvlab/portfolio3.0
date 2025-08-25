import { BlockElementIcon, ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const nameHero = defineType({
  name: 'nameHero',
  title: 'Name Hero',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'richText',
    }),
  ],
  preview: {
    select: {
      logoMobile: 'logoMobile.media',
      logoDesktop: 'logoDesktop.media',
      descriptionChildren: 'description.0.children',
    },
    prepare(selection) {
      const { logoMobile, logoDesktop, descriptionChildren } = selection;

      const title = Array.isArray(descriptionChildren)
        ? descriptionChildren
            .filter((c: { _type?: string }) => c?._type === 'span')
            .map((s: { text?: string }) => s.text || '')
            .join('') || 'Untitled Name Hero'
        : '';

      return {
        title: title,
        subtitle: 'Name Hero',
        media: logoMobile || logoDesktop || ImageIcon,
      };
    },
  },
});
