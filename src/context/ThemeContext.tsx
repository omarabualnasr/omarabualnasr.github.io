import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'paper' | 'ink';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'paper',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('personal_index_theme');
      if (saved === 'ink' || saved === 'paper') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'ink';
      }
    }
    return 'paper';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('personal_index_theme', theme);
    } catch {
      // LocalStorage access may be restricted
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'paper' ? 'ink' : 'paper'));
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
