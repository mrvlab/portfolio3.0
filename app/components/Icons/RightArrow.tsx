import React from 'react';

const RightArrow = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      className={className}
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m12.658 8.05 3.95 3.95m0 0-3.95 3.95m3.95-3.95H7.392'
      />
    </svg>
  );
};

export default RightArrow;
