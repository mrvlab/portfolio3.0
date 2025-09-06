import Head from 'next/head';

import PageBuilderPage from '@/app/components/PageBuilder/PageBuilderPage/index';
import { sanityFetch } from '@/sanity/lib/live';
import { getPageQuery, pagesSlugs, headerQuery } from '@/sanity/lib/queries';
import { GetPageQueryResult, HeaderQueryResult } from '@/sanity.types';

import { generateMetadata } from '@/utils/generateMetadata';
import { Fragment } from 'react';
import { notFound } from 'next/navigation';

export { generateMetadata };

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    perspective: 'published',
    stega: false,
  });
  return data;
}

export default async function Page() {
  const [{ data: page }, { data: header }] = await Promise.all([
    sanityFetch({ query: getPageQuery, params: { slug: '/' } }),
    sanityFetch({ query: headerQuery }),
  ]);

  if (!page?._id) {
    notFound();
  }

  return (
    <Fragment>
      <Head>
        <title>{page.name}</title>
      </Head>

      <PageBuilderPage
        page={page as GetPageQueryResult}
        header={header as HeaderQueryResult}
      />
      {/* <div className='border-t border-gray-100 bg-gray-50'>
        <div className='container'>
          <aside className='py-12 sm:py-20'>
            <Suspense>{await AllCaseStudies()}</Suspense>
          </aside>
        </div>
      </div> */}
    </Fragment>
  );
}
