import React from 'react';
import TableRow from '../TableRow';
import type { CaseDetailsBlock } from '../index';

type DetailsItem = NonNullable<CaseDetailsBlock['detailsItems']>[number];

interface TableSectionProps {
  items: DetailsItem[] | null | undefined;
}

const TableSection = ({ items }: TableSectionProps) => {
  if (!items) return null;

  return (
    <table className="flex flex-col h-fit w-full border-collapse">
      <tbody className="flex flex-col h-fit">
        {items.map((item, index) => (
          <TableRow key={item._key} item={item} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default TableSection;
