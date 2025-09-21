import { sanityFetch } from '@/sanity/lib/live';
import { footerQuery } from '@/sanity/lib/queries';
import React from 'react';

const Footer = async () => {
  const [{ data: footer }] = await Promise.all([
    sanityFetch({ query: footerQuery }),
  ]);
  if (!footer) return null;
  const { rights } = footer;
  return (
    <footer className='flex justify-center text-scale-0 text-gray-600 dark:text-white/60 py-2.5 mb-5'>
      {rights} &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
