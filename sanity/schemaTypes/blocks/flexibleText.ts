import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export const flexibleText = defineType({
  name: 'flexibleText',
  title: 'Flexible Text',
  type: 'object',
  icon: DocumentTextIcon,
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
      description: 'Enable to flip the layout of the text block',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title for the text block',
      group: 'content',
    }),
    defineField({
      name: 'paragraph',
      title: 'Paragraph',
      type: 'richText',
      description: 'Rich text content with formatting options',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      paragraph: 'paragraph',
    },
    prepare({ title, paragraph }) {
      // Extract plain text from the rich text (portable text) for subtitle
      let subtitle = 'Flexible Text';

      if (paragraph && Array.isArray(paragraph)) {
        // Find the first text block
        const firstBlock = paragraph.find(
          (block: { _type: string }) => block._type === 'block'
        ) as { children?: { text?: string }[] } | undefined;

        if (firstBlock && firstBlock.children) {
          // Extract text from all children and join them
          const text = firstBlock.children
            .map((child: { text?: string }) => child.text)
            .filter(Boolean)
            .join('');

          // Truncate to a reasonable length for subtitle
          subtitle = text.length > 60 ? `${text.substring(0, 60)}...` : text;
        }
      }

      return {
        title: title || 'Untitled Flexible Text',
        subtitle: subtitle,
        media: DocumentTextIcon,
      };
    },
  },
});
