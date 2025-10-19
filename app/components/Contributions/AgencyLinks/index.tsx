'use client';
import React, { useEffect, useState } from 'react';
import { IContributionsBlock } from '../index';
import ResolvedLink from '@/app/components/ResolvedLink';
import OpenLinkCircleIcon from '@/app/components/Icons/OpenLinkCircleIcon';

type IAgencyLink = {
  agencyWorkList: NonNullable<IContributionsBlock['agencyWorkList']>;
};

const AgencyLinks = ({ agencyWorkList }: IAgencyLink) => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!agencyWorkList) return;

    agencyWorkList.forEach((work, index) => {
      const timer = setTimeout(() => {
        setVisibleItems((prev) => new Set(prev).add(work._id));
      }, index * 100);

      return () => clearTimeout(timer);
    });
  }, [agencyWorkList]);

  if (!agencyWorkList) return null;
  return (
    <>
      {agencyWorkList.map((work) => {
        const isVisible = visibleItems.has(work._id);

        return (
          <li
            key={work._id}
            className={`flex justify-between py-3 text-scale-0 md:text-scale-1 group relative text-gray-600 dark:text-white/60 before:absolute before:left-0 before:bottom-0 before:h-[1.5px] before:w-full before:bg-gray-200 dark:before:bg-white/20 after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-full after:bg-gray-600 dark:after:bg-white/60 after:origin-left after:scale-x-0 after:transition-all after:duration-300 hover:after:scale-x-100 cursor-pointer transition-all duration-600 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-full lg:-translate-x-full'
            }`}
          >
            <ResolvedLink
              className='flex justify-between w-full'
              link={work.agencyClientLink}
            >
              {work.agencyClient}
              <OpenLinkCircleIcon
                color='var(--color-light-200)'
                hoverColor='var(--color-light-600)'
                darkColor='rgba(255, 255, 255, 0.2)'
                darkHoverColor='rgba(255, 255, 255, 0.6)'
                className='transition-all duration-300 group-hover:rotate-45'
              />
            </ResolvedLink>
          </li>
        );
      })}
    </>
  );
};

export default AgencyLinks;
