import Link from 'next/link';
import { studioUrl } from '@/sanity/env';

/**
 * Component shown when a page has no content blocks in the page builder.
 */
export default function EmptyPageState() {
  return (
    <div className='container'>
      <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
        This page has no content!
      </h1>
      <p className='mt-2 text-base text-gray-500'>
        Open the page in Sanity Studio to add content.
      </p>
      <div className='mt-10 flex'>
        <Link
          className='rounded-full flex gap-2 mr-6 items-center bg-black hover:bg-brand focus:bg-blue py-3 px-6 text-white transition-colors duration-200'
          href={`${studioUrl}/studio/intent/create/template=page;type=page}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          Add content to this page
        </Link>
      </div>
    </div>
  );
}
