<script lang="ts">
	import logo from '$lib/assets/logo-removebg-preview.png';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { locale } from '$lib/stores/lang';
	import { translations } from '$lib/translations';

	let { currentTime = $bindable('') } = $props();

	const updateTime = () => {
		const now = new Date();
		currentTime = now.toLocaleTimeString($locale === 'it' ? 'it-IT' : 'en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
	};

	$effect(() => {
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});
</script>

<header class="border-brutal-thin border-t-0 border-r-0 border-b-4 border-l-0">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
		<!-- Logo / Name -->
		<a href={$locale === 'it' ? '/' : '/en'} class="group flex items-center gap-3 no-underline">
			<img
				src={logo}
				alt="ehystiv.dev logo"
				class="h-24 w-auto object-contain transition-transform duration-200 group-hover:scale-110"
			/>
			<div class="hidden sm:block">
				<span class="font-mono text-lg font-bold tracking-tight">EHYSTIV</span>
				<span class="font-mono text-lg font-bold tracking-tight text-[var(--color-accent)]"
					>.DEV</span
				>
			</div>
		</a>

		<!-- Navigation -->
		<nav class="flex items-center gap-6">
			<a
				href="#projects"
				class="font-mono text-sm font-bold tracking-wider uppercase transition-colors hover:text-[var(--color-accent)]"
			>
				{translations[$locale].nav.projects}
			</a>
			<a
				href="#inspirations"
				class="font-mono text-sm font-bold tracking-wider uppercase transition-colors hover:text-[var(--color-accent)]"
			>
				{translations[$locale].nav.inspirations}
			</a>
			<a
				href="#about"
				class="font-mono text-sm font-bold tracking-wider uppercase transition-colors hover:text-[var(--color-accent)]"
			>
				{translations[$locale].nav.about}
			</a>
			<a
				href="https://github.com/ehystiv"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-brutal hidden text-xs sm:inline-block"
			>
				{translations[$locale].nav.github}
			</a>

			<!-- Language Switcher -->
			{#if $locale === 'it'}
				<a
					href="/en"
					class="font-mono text-sm font-bold uppercase transition-colors hover:text-[var(--color-accent)]"
				>
					EN
				</a>
			{:else}
				<a
					href="/"
					class="font-mono text-sm font-bold uppercase transition-colors hover:text-[var(--color-accent)]"
				>
					IT
				</a>
			{/if}

			<!-- Theme Toggle -->
			<ThemeToggle />
		</nav>
	</div>

	<!-- Ticker / Time bar -->
	<div
		class="flex items-center justify-between border-t border-t-[var(--border-thin)] bg-[var(--color-fg)] px-6 py-1 text-[var(--color-bg)]"
	>
		<span class="font-mono text-xs tracking-widest uppercase">Full Stack Developer</span>
		<span class="font-mono text-xs tabular-nums">{currentTime}</span>
	</div>
</header>
