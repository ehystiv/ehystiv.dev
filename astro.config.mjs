// @ts-check
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://ehystiv.dev',
	output: 'server',
	adapter: vercel({
		isr: {
			expiration: 60 * 60 * 6
		}
	}),
	i18n: {
		defaultLocale: 'it',
		locales: ['it', 'en'],
		routing: {
			prefixDefaultLocale: false
		}
	},
	redirects: {
		'/it': '/'
	},
	vite: {
		plugins: [tailwindcss()]
	}
});
