import React from 'react';
import {
  HeaderQueryResult,
  CaseStudyQueryResult,
  RichText as SanityRichText,
} from '@/sanity.types';
import RichText from '../RichText/RichText';
import TableSection from './TableSection';

export type CaseDetailsBlock = Extract<
  NonNullable<NonNullable<CaseStudyQueryResult>['pageBuilder']>[number],
  { _type: 'caseDetails' }
>;

type ICaseDetails = {
  block: CaseDetailsBlock;
  index: number;
  header?: HeaderQueryResult;
};

const CaseDetails = ({ block }: ICaseDetails) => {
  if (!block) return null;

  const {
    title,
    descriptionLabel,
    description,
    detailsLabel,
    detailsItems,
    creditsLabel,
    creditsItems,
  } = block;

  return (
    <section className="flex flex-col pt-[10%] gap-10">
      <h1 className="text-scale-8 ">{title}</h1>
      <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:grid-rows-[auto_auto] md:gap-10 lg:grid-cols-3 lg:grid-rows-1">
        <div className="flex flex-col gap-6 text-scale--1 md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-2 lg:col-start-1 lg:col-span-1 lg:row-start-1 lg:row-span-1">
          <div className="sticky top-5 flex flex-col gap-6">
            {descriptionLabel && (
              <h2 className="text-scale-0 md:text-scale-1">
                {descriptionLabel}
              </h2>
            )}
            <div className="flex flex-col text-scale-0 md:text-scale-1 w-[90%] dark:text-white/60">
              {description && (
                <RichText content={description as unknown as SanityRichText} />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-scale-0 md:text-scale-1 md:col-start-2 md:col-span-1 md:row-start-1 md:row-span-1 lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:row-span-1">
          {detailsLabel && (
            <h3 className="text-scale-0 md:text-scale-1">{detailsLabel}</h3>
          )}
          <TableSection items={detailsItems} />
        </div>
        <div className="flex flex-col gap-5 text-scale-0 md:text-scale-1 md:col-start-2 md:col-span-1 md:row-start-2 md:row-span-1 lg:col-start-3 lg:col-span-1 lg:row-start-1 lg:row-span-1">
          {creditsLabel && (
            <h3 className="text-scale-0 md:text-scale-1">{creditsLabel}</h3>
          )}
          <TableSection items={creditsItems} />
        </div>
      </div>
    </section>
  );
};

export default CaseDetails;
