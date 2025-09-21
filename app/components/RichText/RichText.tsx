import type { RichText as SanityRichText } from '@/sanity.types';
import { PortableText } from '@portabletext/react';
import React from 'react';

const RichText = ({ content }: { content: SanityRichText }) => {
  if (!content) return null;
  return (
    <div className=''>
      <PortableText value={content} />
    </div>
  );
};

export default RichText;
