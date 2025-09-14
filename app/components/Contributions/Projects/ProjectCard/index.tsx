import Media from '@/app/components/Media';
import RightArrow from '@/app/components/Icons/RightArrow';
import React from 'react';
import { IContributionsBlock } from '../..';

type ProjectType = NonNullable<
  NonNullable<IContributionsBlock['projectsList']>[number]
>;

type IProjectCard = {
  project: ProjectType;
  index: number;
  hasPageBuilder?: boolean;
};

const ProjectCard = ({ project, index, hasPageBuilder }: IProjectCard) => {
  if (!project) return null;
  const { name, poster, date } = project;
  const isPageBuilder = hasPageBuilder ? 'group-hover:scale-105' : '';

  return (
    <>
      <div className='absolute top-6 left-6 right-6 flex lg:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300'>
        <span>{name}</span>
      </div>
      <div className='aspect-4/5 w-1/2 relative overflow-hidden'>
        {poster && (
          <Media
            media={poster}
            alt={poster.image?.alt || 'Project image'}
            className={`w-full h-full object-cover transition-transform duration-300 ${isPageBuilder}`}
            priority={index < 3}
          />
        )}
      </div>
      <div className='absolute bottom-6 left-6 right-6 flex justify-between lg:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300'>
        <span className={`${hasPageBuilder ? '' : 'w-full flex justify-end'}`}>
          {new Date(date || '').getFullYear()}
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

export default ProjectCard;
