import React from 'react';
import { IContributionsBlock } from '../index';
import ResolvedLink from '@/app/components/ResolvedLink';
import OpenLinkIcon from '@/app/components/Icons/OpenLinkIcon';

type IAgencyLink = {
  agencyWorkList: NonNullable<IContributionsBlock['agencyWorkList']>;
};

const AgencyLinks = ({ agencyWorkList }: IAgencyLink) => {
  if (!agencyWorkList) return null;
  return (
    <>
      {agencyWorkList.map((work) => (
        <li
          key={work._id}
          className='flex justify-between py-3 text-scale--2 group relative text-gray-600 dark:text-white/60 before:absolute before:left-0 before:bottom-0 before:h-[1.5px] before:w-full before:bg-gray-200 dark:before:bg-white/20 after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-full after:bg-gray-600 dark:after:bg-white/60 after:origin-left after:scale-x-0 after:transition-all after:duration-300 hover:after:scale-x-100 cursor-pointer'
        >
          <ResolvedLink
            className='flex justify-between w-full'
            link={work.agencyClientLink}
          >
            {work.agencyClient}
            <OpenLinkIcon
              color='var(--color-gray-200)'
              hoverColor='var(--color-gray-600)'
              darkColor='rgba(255, 255, 255, 0.2)'
              darkHoverColor='rgba(255, 255, 255, 0.6)'
              className='transition-all duration-300 group-hover:rotate-45'
            />
          </ResolvedLink>
        </li>
      ))}
    </>
  );
};

export default AgencyLinks;
