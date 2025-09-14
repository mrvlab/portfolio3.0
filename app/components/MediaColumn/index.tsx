import React from 'react';
import { GetPageQueryResult } from '@/sanity.types';
import Media from '../Media';

type IMediaColumnBlock = Extract<
  NonNullable<NonNullable<GetPageQueryResult>['pageBuilder']>[number],
  { _type: 'mediaColumn' }
>;
interface IMediaColumn {
  block: IMediaColumnBlock;
}

const MediaColumn = ({ block }: IMediaColumn) => {
  if (!block) return null;

  const { mediaItem } = block;

  return (
    <section>
      {mediaItem && (
        <Media
          media={mediaItem}
          alt={mediaItem.image?.alt || 'Media column content'}
          className='w-full'
          priority={true}
        />
      )}
    </section>
  );
};

export default MediaColumn;
