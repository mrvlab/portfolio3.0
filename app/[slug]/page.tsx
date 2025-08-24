import Head from 'next/head';

import PageBuilderPage from '@/app/components/PageBuilder';
import { sanityFetch } from '@/sanity/lib/live';
import { getPageQuery, pagesSlugs } from '@/sanity/lib/queries';
import { GetPageQueryResult } from '@/sanity.types';
import { generateMetadata } from '@/utils/generateMetadata';
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
    sanityFetch({ query: getPageQuery, params }),
  ]);

  if (!page?._id) {
    notFound();
  }

  return (
    <div className='my-12 lg:my-24'>
      <Head>
        <title>{page.name}</title>
      </Head>
      <div className=''>
        <div className='container'>
          <div className='pb-6 border-b border-gray-100'>
            <div className='max-w-3xl'>
              <h2 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl'>
                {page.name}
              </h2>
              <p className='mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light'>
                {page.seo?.metaDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
      <PageBuilderPage page={page as GetPageQueryResult} />
    </div>
  );
}
