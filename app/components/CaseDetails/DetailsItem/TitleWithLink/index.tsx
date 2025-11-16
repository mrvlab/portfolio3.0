import React from 'react';
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
    <div className="flex items-center justify-between gap-2 group pointer-events-none">
      {linkData?.linkLabel && (
        <span className="flex-1">{linkData.linkLabel}</span>
      )}
      <OpenLinkIcon className="transition-all duration-300 group-hover:rotate-45" />
    </div>
  );
};

export default TitleWithLink;
