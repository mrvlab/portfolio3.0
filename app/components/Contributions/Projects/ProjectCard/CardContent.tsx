import React from 'react';
import Media from '@/app/components/Media';
import RightArrow from '@/app/components/Icons/RightArrow';
import { IContributionsBlock } from '../..';
import { documentDataAttr } from '@/sanity/lib/utils';

type ProjectType = NonNullable<
  NonNullable<IContributionsBlock['projectsList']>[number]
>;

type ICardContent = {
  project: ProjectType;
  index: number;
  hasPageBuilder?: boolean;
};

const CardContent = ({ project, index, hasPageBuilder }: ICardContent) => {
  const { name, poster, date, _id, _type } = project;
  const isPageBuilder = hasPageBuilder ? 'group-hover:scale-105' : '';

  // Create data attributes for Sanity presentation tool highlighting
  const posterDataAttr = documentDataAttr(_id, _type, 'poster');
  const nameDataAttr = documentDataAttr(_id, _type, 'name');
  const dateDataAttr = documentDataAttr(_id, _type, 'date');

  return (
    <>
      <div className="absolute top-6 left-6 right-6 flex lg:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
        <span data-sanity={nameDataAttr}>{name}</span>
      </div>
      <div
        className={`aspect-4/5 w-1/2 relative overflow-hidden transition-transform duration-300 ${isPageBuilder}`}
      >
        {poster && (
          <Media
            media={poster}
            alt={poster.image?.alt || 'Project image'}
            className={`w-full h-full object-cover`}
            priority={index < 3}
            dataSanity={posterDataAttr}
            videoObjectFitCover={poster.video ? true : false}
          />
        )}
      </div>
      <div className="absolute bottom-6 left-6 right-6 flex justify-between lg:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
        <span className={`${hasPageBuilder ? '' : 'w-full flex justify-end'}`}>
          <span data-sanity={dateDataAttr}>
            {new Date(date || '').getFullYear()}
          </span>
        </span>
        {hasPageBuilder && (
          <span>
            <RightArrow />
          </span>
        )}
      </div>
    </>
  );
};

export default CardContent;
