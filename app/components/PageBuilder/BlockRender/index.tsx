import React from 'react';
import { dataAttr } from '@/sanity/lib/utils';
import { HeaderQueryResult } from '@/sanity.types';
import Cta from '../../Cta';
import CaseDetails from '../../CaseDetails';
import Contributions from '../../Contributions';
import MediaGroup from '../../MediaGroup';
import NameHero from '../../NameHero';

type BlockType = {
  _type: string;
  _key: string;
  [key: string]: unknown;
};

type BlockProps = {
  index: number;
  block: BlockType;
  pageId: string;
  pageType: string;
  header?: HeaderQueryResult;
};

// Block registry - centralized component mapping
const blockRegistry = {
  callToAction: Cta,
  nameHero: NameHero,
  contributions: Contributions,
  caseDetails: CaseDetails,
  mediaGroup: MediaGroup,
} as const;

/**
 * Used by the <PageBuilder>, this component renders the component
 * that matches the block type based on Sanity schema.
 */
export default function BlockRenderer({
  block,
  index,
  pageId,
  pageType,
  header,
}: BlockProps) {
  const Component = blockRegistry[block._type as keyof typeof blockRegistry];

  if (!Component) {
    return (
      <div
        key={block._key}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        }).toString()}
        className='w-full bg-red-50 border border-red-200 text-center text-red-600 p-8 rounded'
      >
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    );
  }

  return (
    <div
      key={block._key}
      data-sanity={dataAttr({
        id: pageId,
        type: pageType,
        path: `pageBuilder[_key=="${block._key}"]`,
      }).toString()}
    >
      {/* @ts-expect-error - Component props are handled dynamically based on block type */}
      <Component block={block} index={index} header={header} />
    </div>
  );
}
