import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import {
  caseStudyPagesSlugs,
  caseStudyQuery,
  headerQuery,
} from '@/sanity/lib/queries';
import { generateMetadata } from '@/utils/generateMetadata';
import PageBuilderPage from '@/app/components/PageBuilder/PageBuilderPage';

type Props = {
  params: Promise<{ slug: string }>;
};

export { generateMetadata };

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: caseStudyPagesSlugs,
    perspective: 'published',
    stega: false,
  });
  return data;
}

export default async function CaseStudyPage(props: Props) {
  const params = await props.params;
  const [{ data: caseStudy }, { data: header }] = await Promise.all([
    sanityFetch({ query: caseStudyQuery, params }),
    sanityFetch({ query: headerQuery }),
  ]);

  if (!caseStudy?._id) {
    return notFound();
  }

  return (
    <>
      <PageBuilderPage page={caseStudy} header={header} />
      {/* <div className='border-t border-gray-100 bg-gray-50'>
        <div className='container'>
          <aside className='py-12 sm:py-20'>
            <Suspense>{await AllCaseStudies()}</Suspense>
          </aside>
        </div>
      </div> */}
    </>
  );
}
