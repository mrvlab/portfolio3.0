import React from 'react';
import { GetPageQueryResult, HeaderQueryResult } from '@/sanity.types';
import AgencyLinks from './AgencyLinks';
import Projects from './Projects';

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
    <section className='grid grid-cols-4 gap-5 sm:grid-cols-8 lg:grid-cols-12 lg:grid-rows-9 lg:h-full lg:overflow-hidden'>
      <h2 className='flex h-fit col-span-full row-start-1 row-span-1 text-scale-1 sm:col-start-1 sm:col-span-4 lg:col-span-3 lg:row-span-1'>
        <div className='flex pb-20 lg:pb-0'>{title}</div>
      </h2>
      <div className='flex flex-col col-start-2 col-span-full row-span-5 pb-7 relative sm:col-start-6 sm:col-span-3 lg:pb-0 lg:col-start-1 lg:col-span-3 lg:row-start-3 lg:row-span-full'>
        <ul className='flex flex-col lg:col-span-3 lg:row-start-2 lg:row-span-full lg:h-full lg:overflow-y-scroll scrollbar-hide  overflow-x-hidden'>
          {agencyWorkList && agencyWorkList.length > 0 && (
            <AgencyLinks agencyWorkList={agencyWorkList} />
          )}
        </ul>
      </div>
      <h3 className='col-span-full row-span-1 h-fit font-sans font-normal sm:col-start-1 sm:col-span-4 lg:col-start-5 lg:col-span-8 lg:row-span-full lg:row-start-1'>
        <div className='flex gap-2 w-fit text-scale--1 text-gray-600 dark:text-white/60'>
          <div>{projectsList?.length}</div>
          <div>⏤</div>
          <div>{projectListLabel}</div>
        </div>
      </h3>
      <div className='flex flex-col col-span-full row-span-5 relative text-scale--1 sm:col-start-1 sm:col-span-4 lg:col-start-5 lg:col-span-8 lg:row-span-full lg:row-start-2'>
        <ul className='flex flex-col gap-6 h-full lg:flex-row lg:overflow-x-scroll scrollbar-hide'>
          {projectsList && projectsList.length > 0 && (
            <Projects projectsList={projectsList} />
          )}
        </ul>
      </div>
    </section>
  );
};

export default Contributions;
