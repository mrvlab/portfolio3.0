import type { NameHero as NameHeroType, Header } from '@/sanity.types';
import Link from 'next/link';
import React from 'react';
import DarkModeToggle from '../DarkModeToggle';
import RichText from '../RichText/RichText';
import NavigationItems from '../NavigationItems';

type INameHero = {
  block: NameHeroType;
  index: number;
  header?: Header;
};

const NameHero = ({ block, header }: INameHero) => {
  if (!block) return null;

  const { logo, description } = block;

  return (
    <section className='grid grid-cols-4 grid-rows-6 gap-5 sm:grid-cols-8 lg:grid-cols-12 lg:grid-rows-4'>
      <h1 className='flex flex-col font-syne text-[clamp(3rem,16vw,18.188rem)] font-semibold col-span-3 row-span-3 sm:col-span-5 lg:col-span-9 lg:row-span-2 lg:text-[clamp(3rem,10vw,18.188rem)]'>
        <Link href='/'>{logo}</Link>
      </h1>
      <div className='grid col-span-1 row-start-1 row-span-3 col-start-4 sm:col-span-3 sm:row-span-full sm:whitespace-nowrap lg:col-start-10'>
        <div className='sticky top-0 flex flex-1 flex-col items-end h-fit py-6 gap-6 sm:items-center sm:flex-row-reverse sm:px-0 sm:py-6 sm:gap-6 md:gap-6 lg:pr-2'>
          <DarkModeToggle />
          <NavigationItems header={header} />
        </div>
      </div>
      <div className='flex col-start-2 col-span-full row-start-5 row-span-2 sm:col-start-3 sm:col-span-3 sm:row-start-5 sm:row-end-[-1] sm:items-start lg:col-start-5 lg:col-span-4 lg:row-start-3 lg:row-span-2'>
        <div className='flex flex-col justify-center text-scale-0 md:text-scale-1 h-full text-gray-600 dark:text-white/60 2xl:w-2/3'>
          {description && <RichText content={description} />}
        </div>
      </div>
    </section>
  );
};

export default NameHero;
