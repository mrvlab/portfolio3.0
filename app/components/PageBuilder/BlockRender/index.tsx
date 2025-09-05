import React from 'react';
import { dataAttr } from '@/sanity/lib/utils';
import { HeaderQueryResult, GetPageQueryResult } from '@/sanity.types';
import Cta from '../../Cta';
import CaseDetailsComponent from '../../CaseDetails';
import ContributionsComponent from '../../Contributions';
import MediaGroupComponent from '../../MediaGroup';
import NameHeroComponent from '../../NameHero';

type IBlockType = NonNullable<
  NonNullable<GetPageQueryResult>['pageBuilder']
>[number];

type IBlockRenderer = {
  index: number;
  block: IBlockType;
  pageId: string;
  pageType: string;
  header?: HeaderQueryResult | null;
};

// Block registry - maps block types to their components
const BLOCK_COMPONENTS = {
  callToAction: Cta,
  nameHero: NameHeroComponent,
  contributions: ContributionsComponent,
  caseDetails: CaseDetailsComponent,
  mediaGroup: MediaGroupComponent,
} as const;

/**
 * Renders a single block based on its type from the Sanity schema.
 */
export default function BlockRenderer({
  block,
  index,
  pageId,
  pageType,
  header,
}: IBlockRenderer) {
  const Component =
    BLOCK_COMPONENTS[block._type as keyof typeof BLOCK_COMPONENTS];

  // Create data attributes for Sanity presentation tool
  const dataAttributes = dataAttr({
    id: pageId,
    type: pageType,
    path: `pageBuilder[_key=="${block._key}"]`,
  }).toString();

  // If component doesn't exist, show error message
  if (!Component) {
    return (
      <div
        key={block._key}
        data-sanity={dataAttributes}
        className='w-full bg-red-50 border border-red-200 text-center text-red-600 p-8 rounded'
      >
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    );
  }

  return (
    <div key={block._key} data-sanity={dataAttributes}>
      <Component
        block={block as never}
        index={index}
        header={header as never}
      />
    </div>
  );
}
