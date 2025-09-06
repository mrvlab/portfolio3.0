import React from 'react';
import {
  CaseDetails as CaseDetailsType,
  HeaderQueryResult,
} from '@/sanity.types';
import { PortableText } from '@portabletext/react';

type ICaseDetails = {
  block: CaseDetailsType;
  index: number;
  header?: HeaderQueryResult;
};

const CaseDetails = ({ block }: ICaseDetails) => {
  if (!block) return null;

  const { title, descriptionLabel, description } = block;

  return (
    <section>
      <h2>{title}</h2>
      <h3>{descriptionLabel}</h3>
      <div>{description && <PortableText value={description} />}</div>
    </section>
  );
};

export default CaseDetails;
