import React, { useEffect, useState } from 'react';

export const ThemeContext = React.createContext({
    theme: '',
    toggleTheme: () => {},
});

export const ThemeContextProvider = ({ children }) => {
    const [ theme, setThemeState ] = useState('');

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setThemeState('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        return () => {};
    }, []);


    const toggleTheme = () => {
        const newTheme = theme === '' ? 'dark' : '';
        setThemeState(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};
