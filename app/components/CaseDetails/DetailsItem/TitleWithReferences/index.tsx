import React from 'react';
import { CaseDetailsBlock } from '../..';

type ITitleWithReferencesItem = NonNullable<
  Extract<CaseDetailsBlock, { _type: 'caseDetails' }>['detailsItems']
>[number] & { itemType: 'titleWithReferences' };

type ITitleWithReferences = {
  tags: ITitleWithReferencesItem['tags'];
};

const TitleWithReferences = ({ tags }: ITitleWithReferences) => {
  return (
    <div>
      {tags && (
        <span>
          {tags.map((tag, index) => (
            <span key={tag._id}>
              {tag.name}
              {index < tags.length - 1 && ', '}
            </span>
          ))}
        </span>
      )}
    </div>
  );
};

export default TitleWithReferences;
