import React from 'react';
import { CaseDetailsBlock } from '..';
import TitleWithText from './TitleWithText';
import TitleWithReferences from './TitleWithReferences';
import TitleWithLink from './TitleWithLink';

type IDetailsItem = NonNullable<
  Extract<CaseDetailsBlock, { _type: 'caseDetails' }>['detailsItems']
>[number];

interface IDetailsItemProps {
  item: IDetailsItem;
}

const DetailsItem = ({ item }: IDetailsItemProps) => {
  switch (item.itemType) {
    case 'titleWithText':
      return <TitleWithText text={item.text} />;

    case 'titleWithReferences':
      return <TitleWithReferences tags={item.tags} />;

    case 'titleWithLink':
      return <TitleWithLink linkData={item.linkData} />;

    default:
      return null;
  }
};

export default DetailsItem;
