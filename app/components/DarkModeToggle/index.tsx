'use client';

import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const isDarkMode =
      document.documentElement.getAttribute('data-theme') === 'dark';
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    setIsDark(!isDark);

    // Save to localStorage
    if (newTheme === 'dark') {
      localStorage.theme = 'dark';
    } else {
      localStorage.theme = 'light';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className='flex w-3.5 aspect-square bg-green-900 dark:bg-green-50 rounded-full border-none cursor-pointer relative z-10'
      aria-label='Toggle dark mode'
    >
      {/* Ripples */}
      <div className='absolute w-3.5 aspect-square'>
        <div className='absolute w-full h-full rounded-full bg-green-900 dark:bg-green-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out]'></div>
        <div className='absolute w-full h-full rounded-full bg-green-900 dark:bg-green-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out_1s]'></div>
        <div className='absolute w-full h-full rounded-full bg-green-900 dark:bg-green-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out_2s]'></div>
      </div>
    </button>
  );
}
