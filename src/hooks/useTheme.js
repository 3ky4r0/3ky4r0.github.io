import { useState, useEffect, useMemo } from 'react';

/**
 * Custom Hook: useTheme
 * Manages theme state (system, light, dark) and logic.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('op2fa_theme') || 'system';
  });

  useEffect(() => {
    localStorage.setItem('op2fa_theme', theme);
  }, [theme]);

  const activeTheme = useMemo(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }, [theme]);

  // Handle system theme changes
  useEffect(() => {
    if (theme !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => setTheme('system');
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [theme]);

  return { theme, setTheme, activeTheme };
};
