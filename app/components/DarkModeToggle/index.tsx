'use client';

import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    localStorage.removeItem('theme');

    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    setIsDark(systemPrefersDark);
    setMounted(true);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
      document.documentElement.classList.toggle('dark', e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;

    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) {
    return (
      <button
        className='flex w-3.5 aspect-square bg-light-900 dark:bg-dark-50 rounded-full border-none cursor-pointer relative z-10'
        aria-label='Loading theme...'
      >
        <div className='absolute w-3.5 aspect-square'>
          <div className='absolute w-full h-full rounded-full bg-light-900 dark:bg-dark-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out]'></div>
          <div className='absolute w-full h-full rounded-full bg-light-900 dark:bg-dark-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out_1s]'></div>
          <div className='absolute w-full h-full rounded-full bg-light-900 dark:bg-dark-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out_2s]'></div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className='flex w-3.5 aspect-square bg-light-900 dark:bg-dark-50 rounded-full border-none cursor-pointer relative z-10'
      aria-label={`Toggle theme (current: ${isDark ? 'dark' : 'light'})`}
      title={`Current theme: ${isDark ? 'dark' : 'light'}`}
    >
      <div className='absolute w-3.5 aspect-square'>
        <div className='absolute w-full h-full rounded-full bg-light-900 dark:bg-dark-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out]'></div>
        <div className='absolute w-full h-full rounded-full bg-light-900 dark:bg-dark-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out_1s]'></div>
        <div className='absolute w-full h-full rounded-full bg-light-900 dark:bg-dark-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out_2s]'></div>
      </div>
    </button>
  );
}
