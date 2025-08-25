'use client';

import { useEffect } from 'react';

export function ThemeScript() {
  if (typeof window !== 'undefined') {
    try {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      // Always prioritize system theme - remove any stored preference
      localStorage.removeItem('theme');

      // Apply system theme
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    } catch {
      // Fallback to system preference if localStorage fails
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    }
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {
      const systemPrefersDark = mediaQuery.matches;

      localStorage.removeItem('theme');

      document.documentElement.classList.toggle('dark', systemPrefersDark);

      console.log(
        'System theme changed to:',
        systemPrefersDark ? 'dark' : 'light'
      );
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    try {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      localStorage.removeItem('theme');
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    } catch {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    }

    return () =>
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  return null;
}
