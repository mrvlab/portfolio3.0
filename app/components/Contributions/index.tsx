import React from 'react';
import { GetPageQueryResult, HeaderQueryResult } from '@/sanity.types';

export type IContributionsBlock = Extract<
  NonNullable<NonNullable<GetPageQueryResult>['pageBuilder']>[number],
  { _type: 'contributions' }
>;

type IContributions = {
  block: IContributionsBlock;
  index: number;
  header?: HeaderQueryResult;
};

const Contributions = ({ block }: IContributions) => {
  if (!block) return null;

  const contributionsBlock = block;

  const { title, projectListLabel, projectsList, agencyWorkList } =
    contributionsBlock;

  return (
    <section className='grid grid-cols-4 grid-rows-6 gap-5 sm:grid-cols-8 lg:grid-cols-12 lg:grid-rows-9 lg:h-full'>
      <h2 className='flex h-fit col-span-full row-start-1 row-span-1 text-scale-1 lg:col-span-3 lg:row-span-1'>
        {title}
      </h2>
      <div className='flex flex-col col-start-2 col-span-full row-span-5 pb-7 relative overflow-hidden text-scale--1 lg:pb-0 lg:col-start-1 lg:col-span-3 lg:row-span-full lg:row-start-3'>
        <ul className='flex flex-col col-span-full row-span-1 lg:col-span-3 lg:row-start-2 lg:row-span-full lg:h-full'>
          {agencyWorkList?.map((work) => (
            <li key={work._id}>{work.agencyClient}</li>
          ))}
        </ul>
      </div>
      <h3 className='col-span-full row-span-1 h-fit font-sans font-normal lg:col-start-5 lg:col-span-8 lg:row-span-full lg:row-start-1'>
        <div className='flex gap-2 w-fit text-scale--1 text-gray-600'>
          <div>{projectsList?.length}</div>
          <div>⏤</div>
          <div>{projectListLabel}</div>
        </div>
      </h3>
      <div className='flex flex-col col-span-full row-span-5 pb-7 relative overflow-hidden text-scale--1 lg:pb-0 lg:col-start-5 lg:col-span-8 lg:row-span-full lg:row-start-2'>
        <ul className='flex flex-col gap-6 lg:aspect-portrait'>
          {projectsList?.map((project) => (
            <li key={project._id}>{project.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Contributions;
