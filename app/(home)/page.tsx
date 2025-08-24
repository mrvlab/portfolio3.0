import Head from 'next/head';

import PageBuilderPage from '@/app/components/PageBuilder';
import { sanityFetch } from '@/sanity/lib/live';
import { getHomePageQuery, pagesSlugs } from '@/sanity/lib/queries';
import { GetPageQueryResult } from '@/sanity.types';

import { generateMetadata } from '@/utils/generateMetadata';
import { Suspense } from 'react';
import { AllCaseStudies } from '../components/CaseStudies';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export { generateMetadata };

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    perspective: 'published',
    stega: false,
  });
  return data;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const [{ data: page }] = await Promise.all([
    sanityFetch({ query: getHomePageQuery, params }),
  ]);

  if (!page?._id) {
    notFound();
  }

  return (
    <div className='my-12 lg:my-24'>
      <Head>
        <title>{page.name}</title>
      </Head>

      <PageBuilderPage page={page as GetPageQueryResult} />
      <div className='border-t border-gray-100 bg-gray-50'>
        <div className='container'>
          <aside className='py-12 sm:py-20'>
            <Suspense>{await AllCaseStudies()}</Suspense>
          </aside>
        </div>
      </div>
    </div>
  );
}
