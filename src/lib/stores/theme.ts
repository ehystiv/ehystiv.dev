import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

// Function to get the initial theme
const getInitialTheme = (): Theme => {
    if (!browser) return 'light';

    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
        return storedTheme;
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    return 'light';
};

export const theme = writable<Theme>(getInitialTheme());

// Subscribe to store changes to update the DOM and localStorage
theme.subscribe((value) => {
    if (!browser) return;

    localStorage.setItem('theme', value);

    if (value === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

// Helper function to toggle theme
export const toggleTheme = () => {
    theme.update((current) => (current === 'light' ? 'dark' : 'light'));
};
