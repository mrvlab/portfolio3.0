import React from 'react';
import {
  MediaLayout as MediaLayoutType,
  HeaderQueryResult,
} from '@/sanity.types';
import Media from '../Media';

type IMediaLayout = {
  block: MediaLayoutType;
  index: number;
  header?: HeaderQueryResult;
};

const MediaLayout = ({ block }: IMediaLayout) => {
  if (!block) return null;

  const { mediaItems } = block;
  const flipLayout = (block as MediaLayoutType & { flipLayout?: boolean })
    .flipLayout;

  const displayItems = flipLayout
    ? [...(mediaItems || [])].reverse()
    : mediaItems;

  // On mobile (default), always span full width. On desktop (md:), use the specified span
  const getColumnSpanClass = (span: number | null | undefined) => {
    if (!span) return 'col-span-full'; // Default to full width
    const spanMap: Record<number, string> = {
      1: 'col-span-1 md:col-span-1 lg:col-span-1',
      2: 'col-span-1 md:col-span-2 lg:col-span-2',
      12: 'col-span-full',
    };
    return spanMap[span] || 'col-span-full';
  };

  return (
    <section
      id="media-layout"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {displayItems?.map((mediaGroup, groupIdx) => (
        <div
          key={groupIdx}
          id={`media-group-${groupIdx + 1}`}
          className={`grid ${getColumnSpanClass(
            (mediaGroup as { columnSpan?: number })?.columnSpan
          )} gap-5`}
        >
          {mediaGroup?.mediaItems?.map((mediaItem, itemIdx) => (
            <div
              key={itemIdx}
              id={`media-item-${groupIdx + 1}-${itemIdx + 1}`}
              className="w-full"
            >
              <Media
                media={mediaItem}
                alt={
                  mediaItem.image?.alt ||
                  `Media item ${groupIdx + 1}-${itemIdx + 1}`
                }
                className="w-full object-cover"
                priority={groupIdx < 1 && itemIdx < 2}
              />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default MediaLayout;
