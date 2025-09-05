'use client';

import BlockRenderer from '../BlockRender';
import EmptyPageState from './EmptyPageState';
import { GetPageQueryResult, HeaderQueryResult } from '@/sanity.types';

type IPageBuilderPage = {
  page: GetPageQueryResult;
  header?: HeaderQueryResult;
};

/**
 * The PageBuilder component renders blocks from the `pageBuilder` field in the cms.
 */
export default function PageBuilderPage({ page, header }: IPageBuilderPage) {
  const pageBuilderSections = page?.pageBuilder || [];

  // If no page or no sections, show empty state
  if (!page || pageBuilderSections.length === 0) {
    return <EmptyPageState />;
  }

  // Render all blocks
  return (
    <>
      {pageBuilderSections.map((block, index: number) => (
        <BlockRenderer
          key={block._key}
          index={index}
          block={block}
          pageId={page._id}
          pageType={page._type}
          header={header}
        />
      ))}
    </>
  );
}
