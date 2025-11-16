/**
 * Maps column span values to Tailwind grid classes
 * On mobile (default), always span full width. On desktop (md:), use the specified span
 */
export const getColumnSpanClass = (span: 1 | 2 | 12 | undefined): string => {
  if (!span) return 'col-span-full'; // Default to full width
  const spanMap: Record<1 | 2 | 12, string> = {
    1: 'col-span-1 md:col-span-1 lg:col-span-1',
    2: 'col-span-1 md:col-span-1 lg:col-span-2',
    12: 'col-span-full',
  };
  return spanMap[span] || 'col-span-full';
};

