import React from 'react';
import { CaseDetailsBlock } from '../..';

type ITitleWithTextItem = NonNullable<
  Extract<CaseDetailsBlock, { _type: 'caseDetails' }>['detailsItems']
>[number] & { itemType: 'titleWithText' };

type ITitleWithText = {
  text: ITitleWithTextItem['text'];
};

const TitleWithText = ({ text }: ITitleWithText) => {
  return <div>{text && <p>{text}</p>}</div>;
};

export default TitleWithText;
