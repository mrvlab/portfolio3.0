import React from 'react';
import type { Header, HeaderQueryResult, Link } from '@/sanity.types';
import ResolvedLink from '../ResolvedLink';

interface NavigationItemsProps {
  header?: Header | HeaderQueryResult;
  className?: string;
  itemClassName?: string;
}

const NavigationItems = ({
  header,
  className = '',
  itemClassName = 'link text-scale-0 md:text-scale-1',
}: NavigationItemsProps) => {
  if (!header?.navigationItems?.length) return null;

  return (
    <nav
      className={`flex flex-col items-end h-fit gap-6 sm:items-center sm:flex-row-reverse sm:px-0 ${className}`}
    >
      {header.navigationItems.map((item, index: number) => (
        <ResolvedLink
          key={index}
          link={item.link as Link}
          className={itemClassName}
        >
          {item.label}
        </ResolvedLink>
      ))}
    </nav>
  );
};

export default NavigationItems;
