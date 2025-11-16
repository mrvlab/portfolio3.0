/**
 * Calculates order classes for flip layout based on column configuration
 * - For 3 columns (span-1): reverses order (first becomes last, last becomes first)
 * - For 2 columns (span-2): swaps the two columns
 */
export const getColumnOrder = (
  flipLayout: boolean | undefined,
  columnSpan: 1 | 2 | 12 | undefined,
  columnIdx: number,
  totalColumns: number
): string => {
  if (!flipLayout) return '';

  // For 3 columns (span-1): reverse order (first becomes last, last becomes first)
  if (columnSpan === 1 && totalColumns === 3) {
    return `order-${totalColumns - columnIdx}`;
  }

  // For 2 columns (span-2): flip the order
  if (columnSpan === 2 && totalColumns === 2) {
    return columnIdx === 0 ? 'order-2' : 'order-1';
  }

  return '';
};

