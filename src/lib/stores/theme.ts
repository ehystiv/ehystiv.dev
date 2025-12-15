import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark' | 'system';

// Function to get the initial theme
const getInitialTheme = (): Theme => {
    if (!browser) return 'system';

    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
        return storedTheme;
    }

    return 'system';
};

export const theme = writable<Theme>(getInitialTheme());

let mediaQuery: MediaQueryList | null = null;

const applySystemTheme = () => {
    if (!browser) return;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

const handleSystemChange = (e: MediaQueryListEvent) => {
    if (e.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

// Subscribe to store changes to update the DOM and localStorage
theme.subscribe((value) => {
    if (!browser) return;

    localStorage.setItem('theme', value);

    // Remove existing listener if it exists
    if (mediaQuery) {
        mediaQuery.removeEventListener('change', handleSystemChange);
        mediaQuery = null;
    }

    if (value === 'system') {
        applySystemTheme();
        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleSystemChange);
    } else if (value === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

// Helper function to toggle theme
export const toggleTheme = () => {
    theme.update((current) => {
        if (current === 'light') return 'dark';
        if (current === 'dark') return 'system';
        return 'light';
    });
};
