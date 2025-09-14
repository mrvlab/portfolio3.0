import React from 'react';
import {
  MediaGroup as MediaGroupType,
  HeaderQueryResult,
} from '@/sanity.types';
import Media from '../Media';

type IMediaGroup = {
  block: MediaGroupType;
  index: number;
  header?: HeaderQueryResult;
};

const MediaGroup = ({ block }: IMediaGroup) => {
  if (!block) return null;

  const { mediaItems } = block;

  return (
    <section>
      <div className='media-group'>
        {mediaItems?.map((mediaItem, idx) => (
          <div key={idx} className='media-item'>
            <Media
              media={mediaItem}
              alt={mediaItem.image?.alt || `Media item ${idx + 1}`}
              className='w-full h-full object-cover'
              priority={idx < 2}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MediaGroup;
