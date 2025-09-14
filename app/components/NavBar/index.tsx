import React from 'react';
import { HeaderQueryResult } from '@/sanity.types';
import NavigationItems from '../NavigationItems';
import DarkModeToggle from '../DarkModeToggle';
import Link from 'next/link';

type INavBar = {
  index?: number;
  header?: HeaderQueryResult;
};

const NavBar = ({ header }: INavBar) => {
  return (
    <section>
      <nav className='flex items-start justify-between sm:items-center'>
        <Link href='/' className='font-syne text-scale-2 font-semibold'>
          {'Marvin Kiyingi'}
        </Link>
        <div className='flex flex-col items-end gap-6 sm:flex-row-reverse sm:gap-4 sm:items-center '>
          <DarkModeToggle />
          {header && <NavigationItems header={header} />}
        </div>
      </nav>
    </section>
  );
};

export default NavBar;
