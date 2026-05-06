<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/state';
	import profilePic from '$lib/assets/profile_pic.png';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { locale } from '$lib/stores/lang';
	import { translations } from '$lib/translations';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import './layout.css';

	let { children } = $props();
	let currentTime = $state('');

	const derivedLocale = $derived<'it' | 'en'>(page.params.lang === 'en' ? 'en' : 'it');

	$effect(() => {
		locale.set(derivedLocale);
		document.documentElement.lang = derivedLocale;
	});

	if (!dev) {
		injectAnalytics();
		injectSpeedInsights();
	}

	const ogTitle = 'Stefano Bichicchi | Full Stack Developer';
	const ogDescription = $derived(translations[derivedLocale].footer.description);
	const canonicalUrl = $derived(page.url.href);
	const ogImageUrl = $derived(`${page.url.origin}${profilePic}`);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{ogTitle}</title>
	<meta name="description" content={ogDescription} />
	<meta name="author" content="Stefano Bichicchi" />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:title" content={ogTitle} />
	<meta property="og:description" content={ogDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={ogImageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={ogTitle} />
	<meta name="twitter:description" content={ogDescription} />
	<meta name="twitter:image" content={ogImageUrl} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header bind:currentTime />

	<main class="flex-1">
		{@render children()}
	</main>

	<Footer />
</div>
