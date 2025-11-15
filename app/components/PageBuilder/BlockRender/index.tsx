import React from 'react';
import { dataAttr } from '@/sanity/lib/utils';
import { HeaderQueryResult, GetPageQueryResult } from '@/sanity.types';
import Cta from '../../Cta';
import CaseDetailsComponent from '../../CaseDetails';
import ContributionsComponent from '../../Contributions';
import MediaGridComponent from '../../MediaGrid';
import NameHeroComponent from '../../NameHero';

type IBlockType = NonNullable<
  NonNullable<GetPageQueryResult>['pageBuilder']
>[number];

type IBlockRenderer = {
  index: number;
  block: IBlockType;
  pageId: string;
  pageType: string;
  pageSlug?: string;
  header?: HeaderQueryResult | null;
};

// Simple block registry - single source of truth for all blocks
const BLOCK_COMPONENTS = {
  callToAction: Cta,
  nameHero: NameHeroComponent,
  contributions: ContributionsComponent,
  caseDetails: CaseDetailsComponent,
  mediaGrid: MediaGridComponent,
} as const;

export default function BlockRenderer({
  block,
  index,
  pageId,
  pageType,
  pageSlug,
  header,
}: IBlockRenderer) {
  // Create data attributes for Sanity presentation tool
  const dataAttributes = dataAttr({
    id: pageId,
    type: pageType,
    path: `pageBuilder[_key=="${block._key}"]`,
  }).toString();

  const Component =
    BLOCK_COMPONENTS[block._type as keyof typeof BLOCK_COMPONENTS];

  if (!Component) {
    return (
      <div
        key={block._key}
        data-sanity={dataAttributes}
        className="w-full bg-red-50 border border-red-200 text-center text-red-600 p-8 rounded"
      >
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    );
  }

  return (
    <div
      key={block._key}
      data-sanity={dataAttributes}
      className={`grid ${pageSlug === '/' && block._type == 'contributions' ? 'lg:overflow-hidden lg:scrollbar-hide' : ''}`}
    >
      {/* @ts-expect-error - Dynamic component props are properly typed in individual components */}
      <Component block={block} index={index} header={header} />
    </div>
  );
}
