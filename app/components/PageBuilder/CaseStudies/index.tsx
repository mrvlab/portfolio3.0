import Link from 'next/link';

import { sanityFetch } from '@/sanity/lib/live';
import {
  moreCaseStudiesQuery,
  allCaseStudiesQuery,
} from '@/sanity/lib/queries';
import {
  AllCaseStudiesQueryResult,
  MoreCaseStudiesQueryResult,
} from '@/sanity.types';
import { documentDataAttr } from '@/sanity/lib/utils';
import { notFound } from 'next/navigation';

const CaseStudy = ({
  caseStudy,
}: {
  caseStudy: AllCaseStudiesQueryResult[number];
}) => {
  const { _id, name, slug, seo, _type } = caseStudy;

  return (
    <article
      data-sanity={documentDataAttr(_id, _type, 'name')}
      key={_id}
      className='border border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col justify-between transition-colors hover:bg-white relative'
    >
      <Link
        className='hover:text-brand underline transition-colors'
        href={`/projects/${slug?.current || ''}`}
      >
        <span className='absolute inset-0 z-10' />
      </Link>
      <div>
        <h3 className='text-2xl font-bold mb-4 leading-tight'>{name}</h3>

        <p className='line-clamp-3 text-sm leading-6 text-gray-600 max-w-[70ch]'>
          {seo?.metaDescription}
        </p>
      </div>
    </article>
  );
};

const CaseStudies = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode;
  heading?: string;
  subHeading?: string;
}) => (
  <div>
    {heading && (
      <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl'>
        {heading}
      </h2>
    )}
    {subHeading && (
      <p className='mt-2 text-lg leading-8 text-gray-600'>{subHeading}</p>
    )}
    <div className='pt-6 space-y-6'>{children}</div>
  </div>
);

export const MoreCaseStudies = async ({
  skip,
  limit,
}: {
  skip: string;
  limit: number;
}) => {
  const { data } = await sanityFetch({
    query: moreCaseStudiesQuery,
    params: { skip, limit },
  });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <CaseStudies heading={`Recent Case Studies (${data?.length})`}>
      {data?.map((caseStudy: MoreCaseStudiesQueryResult[number]) => (
        <CaseStudy key={caseStudy._id} caseStudy={caseStudy} />
      ))}
    </CaseStudies>
  );
};

export const AllCaseStudies = async () => {
  const { data } = await sanityFetch({ query: allCaseStudiesQuery });

  if (!data || data.length === 0) {
    return notFound();
  }

  return (
    <CaseStudies
      heading='Recent Case Studies'
      subHeading={`${data.length === 1 ? 'This case study is' : `These ${data.length} case studies are`} populated from your Sanity Studio.`}
    >
      {data.map((caseStudy: AllCaseStudiesQueryResult[number]) => (
        <CaseStudy key={caseStudy._id} caseStudy={caseStudy} />
      ))}
    </CaseStudies>
  );
};
