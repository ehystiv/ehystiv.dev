<script lang="ts">
	import logo from '$lib/assets/logo-removebg-preview.png';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { locale } from '$lib/stores/lang';
	import { translations } from '$lib/translations';

	let { currentTime = $bindable('') } = $props();
	let isMobileMenuOpen = $state(false);
	let headerEl = $state<HTMLElement | null>(null);
	let isSticky = $state(false);

	$effect(() => {
		if (!headerEl) return;
		const observer = new IntersectionObserver(([entry]) => {
			isSticky = !entry.isIntersecting;
		});
		observer.observe(headerEl);
		return () => observer.disconnect();
	});

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

<header bind:this={headerEl} class="border-brutal-thin border-t-0 border-r-0 border-b-4 border-l-0">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
		<!-- Logo / Name -->
		<a href={$locale === 'it' ? '/' : '/en'} class="group flex items-center gap-3 no-underline">
			<img
				src={logo}
				alt="ehystiv.dev logo"
				class="nav-logo h-24 w-auto object-contain transition-transform duration-200 group-hover:scale-110"
			/>
			<div class="hidden sm:block">
				<span class="font-mono text-lg font-bold tracking-tight">EHYSTIV</span>
				<span class="font-mono text-lg font-bold tracking-tight text-[var(--color-accent)]"
					>.DEV</span
				>
			</div>
		</a>

		<!-- Desktop Navigation -->
		<nav class="hidden items-center gap-6 md:flex">
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
				class="btn-brutal inline-block text-xs"
			>
				{translations[$locale].nav.github}
			</a>

			<!-- Language Switcher -->
			<a
				href={$locale === 'it' ? '/en' : '/'}
				class="font-mono text-sm font-bold uppercase transition-colors hover:text-[var(--color-accent)]"
			>
				{$locale === 'it' ? 'EN' : 'IT'}
			</a>

			<!-- Theme Toggle -->
			<ThemeToggle />
		</nav>

		<!-- Mobile Menu Button -->
		<div class="flex items-center gap-4 md:hidden">
			<ThemeToggle />
			<button
				class="btn-brutal px-3 py-2 text-sm"
				onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				aria-label="Toggle menu"
			>
				{#if isMobileMenuOpen}
					✕
				{:else}
					MENU
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Menu Overlay -->
	{#if isMobileMenuOpen}
		<div
			class="border-brutal-thin border-t-[var(--border-thin)] bg-[var(--color-bg)] p-6 md:hidden"
		>
			<nav class="flex flex-col gap-6 text-center">
				<a
					href="#projects"
					class="font-mono text-lg font-bold tracking-wider uppercase transition-colors hover:text-[var(--color-accent)]"
					onclick={() => (isMobileMenuOpen = false)}
				>
					{translations[$locale].nav.projects}
				</a>
				<a
					href="#inspirations"
					class="font-mono text-lg font-bold tracking-wider uppercase transition-colors hover:text-[var(--color-accent)]"
					onclick={() => (isMobileMenuOpen = false)}
				>
					{translations[$locale].nav.inspirations}
				</a>
				<a
					href="#about"
					class="font-mono text-lg font-bold tracking-wider uppercase transition-colors hover:text-[var(--color-accent)]"
					onclick={() => (isMobileMenuOpen = false)}
				>
					{translations[$locale].nav.about}
				</a>
				<a
					href="https://github.com/ehystiv"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-brutal mx-auto inline-block"
				>
					{translations[$locale].nav.github}
				</a>

				<div class="flex justify-center gap-4 border-t border-[var(--color-fg)] pt-4">
					<a
						href={$locale === 'it' ? '/en' : '/'}
						class="font-mono text-lg font-bold uppercase transition-colors hover:text-[var(--color-accent)]"
					>
						{$locale === 'it' ? 'Switch to EN' : 'Passa a IT'}
					</a>
				</div>
			</nav>
		</div>
	{/if}
</header>

<!-- Ticker / Time bar -->
<div
	class="sticky top-0 z-50 flex items-center justify-between border-b-4 border-[var(--color-fg)] bg-[var(--color-fg)] px-6 py-1 text-[var(--color-bg)]"
>
	<div class="ticker-wrapper">
		<div class={['ticker-inner', isSticky && 'ticker-active'].filter(Boolean).join(' ')}>
			<span class="ticker-item">FULL STACK WEB DEVELOPER</span>
			<span class="ticker-item">EHYSTIV.DEV</span>
			<span class="ticker-item">FULL STACK WEB DEVELOPER</span>
		</div>
	</div>
	<span class="font-mono text-xs tabular-nums">{currentTime}</span>
</div>

<style>
	:global(.dark) .nav-logo {
		filter: invert(1);
	}

	.ticker-wrapper {
		overflow: hidden;
		height: 1rem;
	}

	.ticker-active {
		animation: ticker-flip 10s ease-in-out infinite;
	}

	.ticker-item {
		display: block;
		font-family: var(--font-mono, monospace);
		font-size: 0.75rem;
		line-height: 1rem;
		letter-spacing: 0.1em;
		font-weight: 700;
	}

	@keyframes ticker-flip {
		0%,
		45% {
			transform: translateY(0);
		}
		50%,
		95% {
			transform: translateY(-33.333%);
		}
		100% {
			transform: translateY(-66.666%);
		}
	}
</style>
