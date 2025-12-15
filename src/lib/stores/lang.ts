import type { Locale } from '$lib/translations';
import { writable } from 'svelte/store';

export const locale = writable<Locale>('it');
