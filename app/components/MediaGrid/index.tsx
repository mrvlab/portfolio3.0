import React from 'react';
import { MediaGrid as MediaGridType, HeaderQueryResult } from '@/sanity.types';
import MediaColumn from './MediaColumn';

type IMediaGrid = {
  block: MediaGridType;
  index: number;
  header?: HeaderQueryResult;
};

const MediaGrid = ({ block }: IMediaGrid) => {
  if (!block) return null;

  const { mediaItems } = block;

  const totalColumns = mediaItems?.length || 0;

  return (
    <section
      id="media-grid"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {mediaItems?.map((mediaColumn, columnIdx) => (
        <MediaColumn
          key={columnIdx}
          mediaColumn={mediaColumn}
          columnIdx={columnIdx}
          totalColumns={totalColumns}
          flipLayout={block?.flipLayout}
        />
      ))}
    </section>
  );
};

export default MediaGrid;
