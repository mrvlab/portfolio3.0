import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import { caseStudyPagesSlugs, caseStudyQuery } from '@/sanity/lib/queries';
import { generateMetadata } from '@/utils/generateMetadata';

type Props = {
  params: Promise<{ slug: string }>;
};

export { generateMetadata };

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: caseStudyPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  });
  return data;
}

export default async function CaseStudyPage(props: Props) {
  const params = await props.params;
  const [{ data: caseStudy }] = await Promise.all([
    sanityFetch({ query: caseStudyQuery, params }),
  ]);

  if (!caseStudy?._id) {
    return notFound();
  }

  return (
    <>
      <div className=''>
        <div className='container grid gap-12'>
          <div>
            <div className='pb-6 grid gap-6 mb-6 border-b border-gray-100'>
              <div className='max-w-3xl flex flex-col gap-6'>
                <h2 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl'>
                  {caseStudy.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
