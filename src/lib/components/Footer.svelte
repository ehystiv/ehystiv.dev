<script lang="ts">
	import { locale } from '$lib/stores/lang';
	import { translations, type Locale } from '$lib/translations';

	const currentYear = new Date().getFullYear();

	const t = $derived(translations[$locale as Locale]);

	const socials = [
		{ name: 'GitHub', url: 'https://github.com/ehystiv', icon: 'gh' },
		{ name: 'LinkedIn', url: 'https://linkedin.com/in/stefanobichicchi', icon: 'li' }
	];
</script>

<footer class="border-brutal-thin mt-auto border-t-4 border-r-0 border-b-0 border-l-0">
	<!-- Main footer content -->
	<div class="mx-auto max-w-7xl px-6 py-12">
		<div class="grid gap-8 md:grid-cols-3">
			<!-- Brand -->
			<div>
				<h3 class="mb-4 font-mono text-xl font-bold">
					EHYSTIV<span class="text-[var(--color-accent)]">.DEV</span>
				</h3>
				<p class="text-sm leading-relaxed text-[var(--color-muted)]">
					{t.footer.description}
				</p>
			</div>

			<!-- Quick Links -->
			<div>
				<h4 class="mb-4 font-mono text-sm font-bold tracking-wider uppercase">
					{t.footer.quick_links}
				</h4>
				<ul class="space-y-2">
					<li>
						<a
							href="#projects"
							class="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
						>
							→ {t.nav.projects}
						</a>
					</li>
					<li>
						<a
							href="#about"
							class="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
						>
							→ {t.nav.about}
						</a>
					</li>
					<li>
						<a
							href="mailto:stefano@bichicchi.it"
							class="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
						>
							→ {t.about.cta_contact}
						</a>
					</li>
				</ul>
			</div>

			<!-- Social -->
			<div>
				<h4 class="mb-4 font-mono text-sm font-bold tracking-wider uppercase">
					{t.footer.social}
				</h4>
				<div class="flex gap-3">
					{#each socials as social (social.name)}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							class="border-brutal flex h-12 w-12 items-center justify-center bg-[var(--color-bg)] font-mono text-xs font-bold uppercase no-underline transition-all duration-200 hover:bg-[var(--color-accent)] hover:text-black"
							title={social.name}
						>
							{social.icon}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Copyright bar -->
	<div
		class="overflow-hidden border-t border-t-[var(--border-thin)] bg-[var(--color-fg)] py-3 text-[var(--color-bg)]"
	>
		<div class="flex whitespace-nowrap">
			<!-- First copy -->
			<div class="animate-marquee flex items-center gap-8 pl-8">
				{#each Array(4) as _, i (i)}
					<span class="font-mono text-xs font-bold tracking-wider uppercase">
						© {currentYear} Stefano Bichicchi - FullStack Web Developer. {t.footer.rights}
					</span>
				{/each}
			</div>
			<!-- Second copy for seamless loop -->
			<div class="animate-marquee aria-hidden flex items-center gap-8 pl-8" aria-hidden="true">
				{#each Array(4) as _, i (i)}
					<span class="font-mono text-xs font-bold tracking-wider uppercase">
						© {currentYear} Stefano Bichicchi - FullStack Web Developer. {t.footer.rights}
					</span>
				{/each}
			</div>
		</div>
	</div>
</footer>
