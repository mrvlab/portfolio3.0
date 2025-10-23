import React from 'react';

const OpenLinkCircleIcon = ({
  color = 'var(--color-light-200)',
  hoverColor = 'var(--color-light-600)',
  darkColor,
  darkHoverColor,
  className,
}: {
  color?: string;
  hoverColor?: string;
  darkColor?: string;
  darkHoverColor?: string;
  className?: string;
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='17'
      height='17'
      fill='none'
      className={className}
      style={
        {
          '--icon-color': color,
          '--icon-hover-color': hoverColor,
          '--icon-dark-color': darkColor,
          '--icon-dark-hover-color': darkHoverColor,
        } as React.CSSProperties
      }
    >
      <path
        fill='var(--icon-color)'
        className={`transition-colors duration-300 group-hover:fill-[var(--icon-hover-color)] ${
          darkColor ? 'dark:fill-[var(--icon-dark-color)]' : ''
        } ${
          darkHoverColor
            ? 'dark:group-hover:fill-[var(--icon-dark-hover-color)]'
            : ''
        }`}
        d='M6.9375 5.7125c-.33137 0-.6.26863-.6.6s.26863.6.6.6v-1.2Zm3.75.6h.6c0-.33137-.2686-.6-.6-.6v.6Zm-.6 3.75c0 .3314.2686.6.6.6s.6-.2686.6-.6h-1.2Zm-4.19926.2007c-.23432.2344-.23432.6142 0 .8486.23431.2343.61421.2343.84852 0l-.84852-.8486ZM15.4 8.5c0 3.8108-3.0892 6.9-6.9 6.9v1.2c4.4735 0 8.1-3.6265 8.1-8.1h-1.2Zm-6.9 6.9c-3.81076 0-6.9-3.0892-6.9-6.9H.4c0 4.4735 3.62649 8.1 8.1 8.1v-1.2ZM1.6 8.5c0-3.81076 3.08924-6.9 6.9-6.9V.4C4.02649.4.4 4.02649.4 8.5h1.2Zm6.9-6.9c3.8108 0 6.9 3.08924 6.9 6.9h1.2c0-4.47351-3.6265-8.1-8.1-8.1v1.2ZM6.9375 6.9125h3.75v-1.2h-3.75v1.2Zm3.15-.6v3.75h1.2v-3.75h-1.2Zm-3.35074 4.7993 4.37504-4.37504-.8486-.84852-4.37496 4.37496.84852.8486Z'
      />
    </svg>
  );
};

export default OpenLinkCircleIcon;
