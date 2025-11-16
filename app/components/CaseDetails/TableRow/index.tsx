import React from 'react';
import { useRouter } from 'next/navigation';
import { linkResolver } from '@/sanity/lib/utils';
import DetailsItem from '../DetailsItem';
import type { CaseDetailsBlock } from '../index';

type DetailsItem = NonNullable<CaseDetailsBlock['detailsItems']>[number];

const getLinkData = (item: DetailsItem) => {
  if (item.itemType !== 'titleWithLink' || !('linkData' in item)) {
    return null;
  }
  return item.linkData;
};

const resolveLinkUrl = (
  linkData: NonNullable<ReturnType<typeof getLinkData>>
) => {
  if (!linkData?.link) return null;

  const pageSlug = linkData.link.page?.slug?.current;
  const caseStudySlug = linkData.link.caseStudy?.slug?.current;

  const link = {
    _type: 'link' as const,
    linkType: linkData.link.linkType ?? undefined,
    href: linkData.link.href ?? undefined,
    ...(pageSlug && { page: pageSlug }),
    ...(caseStudySlug && { caseStudy: caseStudySlug }),
    openInNewTab: linkData.link.openInNewTab ?? undefined,
  } as Parameters<typeof linkResolver>[0];

  return linkResolver(link);
};

const isInternalUrl = (url: string | null): boolean => {
  if (!url) return false;
  return (
    url.startsWith('/') &&
    !url.startsWith('http://') &&
    !url.startsWith('https://')
  );
};

type ITableRow = {
  item: DetailsItem;
  index: number;
};

const TableRow = ({ item, index }: ITableRow) => {
  const router = useRouter();
  const isTitleWithLink = item.itemType === 'titleWithLink';
  const linkData = getLinkData(item);
  const linkUrl = linkData ? resolveLinkUrl(linkData) : null;
  const openInNewTab = linkData?.link?.openInNewTab ?? false;
  const isInternal = linkUrl ? isInternalUrl(linkUrl) : false;

  const handleClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (!isTitleWithLink || !linkUrl) return;

    e.preventDefault();

    if (openInNewTab) {
      window.open(linkUrl, '_blank', 'noopener,noreferrer');
    } else if (isInternal) {
      router.push(linkUrl);
    } else {
      window.location.href = linkUrl;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (!isTitleWithLink || !linkUrl) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent<HTMLTableRowElement>);
    }
  };

  const ariaLabel =
    isTitleWithLink && linkUrl
      ? linkData?.linkLabel || item.title || undefined
      : undefined;

  return (
    <tr
      className={`flex flex-1 gap-2.5 ${
        index === 0 ? 'border-t border-light-200 dark:border-white/20' : ''
      } ${
        isTitleWithLink
          ? 'group relative cursor-pointer transition-all duration-600 ease-out before:absolute before:left-0 before:bottom-0 before:h-[1.5px] before:w-full before:bg-light-200 dark:before:bg-white/20 after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-full after:bg-gray-600 dark:after:bg-white/60 after:origin-left after:scale-x-0 after:transition-all after:duration-300 hover:after:scale-x-100'
          : 'border-b border-light-200 dark:border-white/20'
      }`}
      onClick={isTitleWithLink && linkUrl ? handleClick : undefined}
      onKeyDown={isTitleWithLink && linkUrl ? handleKeyDown : undefined}
      role={isTitleWithLink && linkUrl ? 'button' : undefined}
      tabIndex={isTitleWithLink && linkUrl ? 0 : undefined}
      aria-label={ariaLabel}
    >
      <td className="py-3 font-medium flex-[1.4] xl:flex-1 align-top text-light-600 dark:text-white/60 relative z-0">
        {item.title}
      </td>
      <td className="py-3 align-top flex-2 xl:flex-1 relative z-0">
        <DetailsItem item={item} />
      </td>
    </tr>
  );
};

export default TableRow;
