<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { locale } from '$lib/stores/lang';
	import './layout.css';

	let { children } = $props();
	let currentTime = $state('');

	$effect(() => {
		const langParam = page.params.lang;
		if (langParam === 'en' || langParam === 'it') {
			$locale = langParam;
		} else {
			$locale = 'it';
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta
		name="description"
		content="Stefano Bichicchi - Full Stack Developer. Portfolio di progetti web con Laravel, Vue.js, NestJS, Python e più."
	/>
	<meta name="author" content="Stefano Bichicchi" />
	<meta property="og:title" content="Stefano Bichicchi - Full Stack Developer" />
	<meta
		property="og:description"
		content="Portfolio di progetti web con Laravel, Vue.js, NestJS, Python e più."
	/>
	<meta property="og:type" content="website" />
	<title>Stefano Bichicchi | Full Stack Developer</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header bind:currentTime />

	<main class="flex-1">
		{@render children()}
	</main>

	<Footer />
</div>
