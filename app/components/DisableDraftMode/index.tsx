'use client';

import { useTransition, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { disableDraftMode } from '@/app/actions';

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if we're in an iframe or popup window
    if (
      typeof window !== 'undefined' &&
      (window !== window.parent || !!window.opener)
    ) {
      setShouldRender(false);
    } else {
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <>
      <div className='fixed bottom-6 right-6 flex gap-6 p-4 bg-white text-black text-b-12 px-4 py-3 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 font-medium text-sm leading-normal backdrop-blur-sm bg-opacity-95 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-50'>
        <div className='flex flex-col justify-center gap-0.5 text-scale--2 '>
          <div>
            {pending
              ? 'Disabling draft mode...'
              : 'Sanity draft mode is enabled'}
          </div>
        </div>
        <div className='flex items-start text-scale--3 '>
          <button
            type='button'
            onClick={disable}
            className='bg-black text-white px-2 py-1 text-b-9 rounded-sm'
          >
            Disable
          </button>
        </div>
      </div>
    </>
  );
}
