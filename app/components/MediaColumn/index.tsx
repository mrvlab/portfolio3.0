import React from 'react';
import { GetPageQueryResult } from '@/sanity.types';
import SanityImage from '../SanityImage';

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

  console.log(mediaItem);

  return (
    <section>
      {mediaItem?.media?.asset && (
        <SanityImage
          image={mediaItem.media}
          alt={mediaItem.media.alt || 'Media column image'}
          className='w-full'
          priority={true}
        />
      )}
    </section>
  );
};

export default MediaColumn;
