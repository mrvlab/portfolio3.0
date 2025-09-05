import React from 'react';
import { MediaGroup as MediaGroupType } from '@/sanity.types';

type IMediaGroup = {
  block: MediaGroupType;
  index: number;
  header?: unknown;
};

const MediaGroup = ({ block }: IMediaGroup) => {
  if (!block) return null;

  const { mediaItems } = block;

  return (
    <section>
      <div className='media-group'>
        {mediaItems?.map((mediaItem, idx) => (
          <div key={idx} className='media-item'>
            {/* Render media item based on its type */}
            {JSON.stringify(mediaItem)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MediaGroup;
