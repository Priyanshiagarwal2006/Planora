import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const [dark, setDark] = useState(false);

  // ✅ Load theme on app start
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('THEME');

      if (savedTheme !== null) {
        setDark(savedTheme === 'dark');
      }
    };

    loadTheme();
  }, []);

  // ✅ Save theme whenever changed
  useEffect(() => {
    AsyncStorage.setItem('THEME', dark ? 'dark' : 'light');
  }, [dark]);

  const toggleTheme = () => {
    setDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};