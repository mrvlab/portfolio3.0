'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export default function DarkModeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.theme as Theme;
    setTheme(savedTheme || 'system');
  }, []);

  const toggleTheme = () => {
    let newTheme: Theme;

    if (theme === 'system') {
      newTheme = 'light';
    } else if (theme === 'light') {
      newTheme = 'dark';
    } else {
      newTheme = 'system';
    }

    setTheme(newTheme);

    if (newTheme === 'system') {
      localStorage.removeItem('theme');
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    } else {
      localStorage.theme = newTheme;
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      console.log(
        'DarkModeToggle: System theme changed to:',
        mediaQuery.matches ? 'dark' : 'light'
      );

      if (theme === 'system') {
        const isSystemDark = mediaQuery.matches;
        document.documentElement.classList.toggle('dark', isSystemDark);
        console.log('DarkModeToggle: Updated DOM to match system theme');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <button
        className='flex w-3.5 aspect-square bg-green-900 dark:bg-green-50 rounded-full border-none cursor-pointer relative z-10'
        aria-label='Loading theme...'
      >
        <div className='absolute w-3.5 aspect-square'>
          <div className='absolute w-full h-full rounded-full bg-green-900 dark:bg-green-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out]'></div>
          <div className='absolute w-full h-full rounded-full bg-green-900 dark:bg-green-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out_1s]'></div>
          <div className='absolute w-full h-full rounded-full bg-green-900 dark:bg-green-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out_2s]'></div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className='flex w-3.5 aspect-square bg-green-900 dark:bg-green-50 rounded-full border-none cursor-pointer relative z-10'
      aria-label={`Toggle theme (current: ${theme})`}
      title={`Current theme: ${theme}`}
    >
      <div className='absolute w-3.5 aspect-square'>
        <div className='absolute w-full h-full rounded-full bg-green-900 dark:bg-green-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out]'></div>
        <div className='absolute w-full h-full rounded-full bg-green-900 dark:bg-green-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out_1s]'></div>
        <div className='absolute w-full h-full rounded-full bg-green-900 dark:bg-green-50 opacity-30 animate-[growAndFade_3s_infinite_ease-out_2s]'></div>
      </div>
    </button>
  );
}
