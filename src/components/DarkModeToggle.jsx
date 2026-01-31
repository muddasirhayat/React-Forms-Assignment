import { useState, useEffect } from 'react';
import { getTheme, setTheme } from '../utils/helpers';

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const currentTheme = getTheme();
        setIsDark(currentTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setTheme(newTheme);
        setIsDark(!isDark);
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl
                 border-2 border-slate-200 dark:border-slate-700 transition-all duration-300 
                 hover:scale-110 active:scale-95 z-50 group"
            aria-label="Toggle dark mode"
        >
            {isDark ? (
                <svg
                    className="w-6 h-6 text-yellow-500 group-hover:rotate-180 transition-transform duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ) : (
                <svg
                    className="w-6 h-6 text-slate-700 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            )}
        </button>
    );
};

export default DarkModeToggle;
