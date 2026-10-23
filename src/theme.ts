export type Theme = 'light' | 'dark' | 'system';

// When set, the site always renders in this theme and the theme toggle is hidden.
// Set to null to restore the light/dark/system switcher.
export const FORCED_THEME: Exclude<Theme, 'system'> | null = 'dark';
