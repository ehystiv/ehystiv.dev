<script lang="ts">
	import InterestCard from '$lib/components/InterestCard.svelte';
	import JokeMarquee from '$lib/components/JokeMarquee.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { interests } from '$lib/data/interests';
	import { projects } from '$lib/data/projects';
	import { locale } from '$lib/stores/lang';
	import { translations } from '$lib/translations';
	import type { PageData } from './$types';

	export let data: PageData;

	const skills = [
		{ category: 'Backend', items: ['PHP', 'Laravel', 'NestJS', 'Node.js', 'Python'] },
		{ category: 'Frontend', items: ['Vue.js', 'Svelte', 'React', 'TypeScript', 'Tailwind'] },
		{ category: 'DevOps', items: ['Docker', 'Terraform', 'CI/CD', 'Linux'] },
		{ category: 'Database', items: ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB'] }
	];
</script>

<!-- Hero Section -->
<section class="relative overflow-hidden border-b-4 border-[var(--color-fg)]">
	<!-- Background pattern -->
	<div class="absolute inset-0 opacity-5">
		<div
			class="h-full w-full"
			style="background-image: repeating-linear-gradient(
				0deg,
				transparent,
				transparent 50px,
				var(--color-fg) 50px,
				var(--color-fg) 51px
			),
			repeating-linear-gradient(
				90deg,
				transparent,
				transparent 50px,
				var(--color-fg) 50px,
				var(--color-fg) 51px
			);"
		></div>
	</div>

	<div class="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
		<div class="max-w-4xl">
			<!-- Greeting -->
			<p class="mb-4 font-mono text-sm tracking-widest text-[var(--color-muted)] uppercase">
				{translations[$locale].hero.greeting}
			</p>

			<!-- Name -->
			<h1 class="mb-6 text-5xl leading-none font-bold md:text-7xl lg:text-8xl">
				STEFANO
				<br />
				<span class="text-[var(--color-accent)]">BICHICCHI</span>
			</h1>

			<!-- Role -->
			<div class="mb-8 flex items-center gap-4">
				<div class="h-1 w-16 bg-[var(--color-fg)]"></div>
				<p class="font-mono text-lg font-bold tracking-wider uppercase md:text-xl">
					{translations[$locale].hero.role}
				</p>
			</div>

			<!-- Description -->
			<p class="mb-10 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)] md:text-xl">
				{@html translations[$locale].hero.description}
			</p>

			<!-- CTAs -->
			<div class="flex flex-wrap gap-4">
				<a href="#projects" class="btn-brutal btn-brutal-filled">
					{translations[$locale].hero.cta_projects}
				</a>
				<a
					href="https://github.com/ehystiv"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-brutal"
				>
					{translations[$locale].hero.cta_github}
				</a>
			</div>
		</div>

		<!-- Decorative element -->
		<div
			class="absolute -right-20 -bottom-20 hidden h-64 w-64 border-[var(--border-thick)] border-[var(--color-fg)] bg-[var(--color-accent)] opacity-20 lg:block"
		></div>
	</div>
</section>

<!-- Projects Section -->
<section id="projects" class="scroll-mt-4 border-b-4 border-[var(--color-fg)]">
	<div class="mx-auto max-w-7xl px-6 py-20">
		<!-- Section header -->
		<div class="mb-12 flex items-end justify-between">
			<div>
				<p class="mb-2 font-mono text-sm tracking-widest text-[var(--color-muted)] uppercase">
					{translations[$locale].projects.pretitle}
				</p>
				<h2 class="text-4xl font-bold md:text-5xl">{translations[$locale].projects.title}</h2>
			</div>
			<div class="ml-8 hidden h-1 flex-1 bg-[var(--color-fg)] md:block"></div>
		</div>

		<!-- Projects grid -->
		<div class="grid gap-8 md:grid-cols-2">
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</div>

		<!-- View more -->
		<div class="mt-12 text-center">
			<a
				href="https://github.com/ehystiv?tab=repositories"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-brutal inline-block"
			>
				{translations[$locale].projects.view_all}
			</a>
		</div>
	</div>
</section>

<!-- Inspirations Section -->
<section
	id="inspirations"
	class="scroll-mt-4 border-b-4 border-[var(--color-fg)] bg-[var(--color-bg)]"
>
	<div class="mx-auto max-w-7xl px-6 py-20">
		<div class="mb-12">
			<p class="mb-2 font-mono text-sm tracking-widest text-[var(--color-muted)] uppercase">
				{translations[$locale].inspirations.pretitle}
			</p>
			<h2 class="text-4xl font-bold md:text-5xl">{translations[$locale].inspirations.title}</h2>
			<p class="mt-4 max-w-2xl text-[var(--color-muted)]">
				{translations[$locale].inspirations.description}
			</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each interests as interest}
				<InterestCard {interest} />
			{/each}
		</div>
	</div>
</section>

<JokeMarquee joke={data.joke} />

<!-- About Section -->
<section id="about" class="scroll-mt-4">
	<div class="mx-auto max-w-7xl px-6 py-20">
		<div class="grid gap-12 lg:grid-cols-2">
			<!-- About text -->
			<div>
				<p class="mb-2 font-mono text-sm tracking-widest text-[var(--color-muted)] uppercase">
					{translations[$locale].about.pretitle}
				</p>
				<h2 class="mb-8 text-4xl font-bold md:text-5xl">{translations[$locale].about.title}</h2>

				<div class="space-y-4 text-lg leading-relaxed text-[var(--color-muted)]">
					<p>{@html translations[$locale].about.p1}</p>
					<p>{@html translations[$locale].about.p2}</p>
					<p>{translations[$locale].about.p3}</p>
				</div>

				<!-- Contact CTA -->
				<div class="mt-8">
					<a href="mailto:stefano@bichicchi.it" class="btn-brutal btn-brutal-filled">
						{translations[$locale].about.cta_contact}
					</a>
				</div>
			</div>

			<!-- Skills -->
			<div class="border-brutal p-6">
				<h3 class="mb-6 font-mono text-xl font-bold uppercase">
					{translations[$locale].about.tech_stack}
				</h3>

				<div class="space-y-6">
					{#each skills as skillGroup}
						<div>
							<h4
								class="mb-3 font-mono text-sm font-bold tracking-wider text-[var(--color-accent)] uppercase"
							>
								{skillGroup.category}
							</h4>
							<div class="flex flex-wrap gap-2">
								{#each skillGroup.items as skill}
									<span class="tag">{skill}</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
