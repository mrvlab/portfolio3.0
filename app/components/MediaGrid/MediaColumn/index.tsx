import React from 'react';
import { MediaGroup } from '@/sanity.types';
import Media from '../../Media';
import { getColumnSpanClass } from '../getColumnSpanClass';
import { getColumnOrder } from '../getColumnOrder';

type IMediaColumn = {
  mediaColumn: MediaGroup;
  columnIdx: number;
  totalColumns: number;
  flipLayout?: boolean;
};

const MediaColumn = ({
  mediaColumn,
  columnIdx,
  totalColumns,
  flipLayout,
}: IMediaColumn) => {
  const columnOrder = getColumnOrder(
    flipLayout,
    mediaColumn.columnSpan,
    columnIdx,
    totalColumns
  );

  const columnSpan = getColumnSpanClass(mediaColumn.columnSpan);

  return (
    <div
      key={columnIdx}
      id={`media-column-${columnIdx + 1}`}
      className={`grid gap-5 ${columnSpan} ${columnOrder}`}
    >
      {mediaColumn?.mediaItems?.map((mediaItem, itemIdx) => (
        <div
          key={itemIdx}
          id={`media-column-${columnIdx + 1}-${itemIdx + 1}`}
          className="w-full"
        >
          <Media
            media={mediaItem}
            alt={
              mediaItem.image?.alt ||
              `Media item ${columnIdx + 1}-${itemIdx + 1}`
            }
            className="w-full object-cover"
            priority={columnIdx < 1 && itemIdx < 2}
          />
        </div>
      ))}
    </div>
  );
};

export default MediaColumn;
