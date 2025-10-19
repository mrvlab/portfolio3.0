import React from 'react';
import ResolvedLink from '@/app/components/ResolvedLink';
import { CaseDetailsBlock } from '../..';
import OpenLinkIcon from '@/app/components/Icons/OpenLinkIcon';

type ITitleWithLinkItem = NonNullable<
  Extract<CaseDetailsBlock, { _type: 'caseDetails' }>['detailsItems']
>[number] & { itemType: 'titleWithLink' };

type ITitleWithLink = {
  linkData: ITitleWithLinkItem['linkData'];
};

const TitleWithLink = ({ linkData }: ITitleWithLink) => {
  return (
    <div className='flex items-center justify-between gap-2 group'>
      {linkData?.link && linkData?.linkLabel && (
        <ResolvedLink
          className='flex-1'
          link={
            linkData.link
              ? {
                  _type: 'link',
                  linkType: linkData.link.linkType ?? undefined,
                  href: linkData.link.href ?? undefined,
                  openInNewTab: linkData.link.openInNewTab ?? undefined,
                }
              : null
          }
        >
          {linkData.linkLabel}
        </ResolvedLink>
      )}
      <OpenLinkIcon className='transition-all duration-300 group-hover:rotate-45' />
    </div>
  );
};

export default TitleWithLink;
