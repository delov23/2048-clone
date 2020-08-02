import React from 'react';
import { useState, createContext } from 'react';

export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

export const ThemeContext = createContext({
    theme: LIGHT_THEME,
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(LIGHT_THEME);

    const toggleTheme = () => {
        setTheme(theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
