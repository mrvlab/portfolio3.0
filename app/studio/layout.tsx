'use client';

import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Suppress React 19 compatibility warnings and Sanity patch errors
    const originalError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes(
          'React does not recognize the `schemaType` prop on a DOM element'
        ) ||
          args[0].includes(
            'Received `false` for a non-boolean attribute `focused`'
          ) ||
          args[0].includes(
            'Cannot apply deep operations on primitive values'
          ) ||
          args[0].includes(
            'Received patch with type "set" and path "progress"'
          ))
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return <div className={`lg:font-[0.75rem]`}>{children}</div>;
}
