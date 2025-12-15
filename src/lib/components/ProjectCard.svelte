<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import { languageColors } from '$lib/data/projects';
	import { locale } from '$lib/stores/lang';

	let { project }: { project: Project } = $props();

	const langColor = $derived(languageColors[project.language] || '#666666');
</script>

<article class="group border-brutal hover-brutal bg-[var(--color-bg)] p-0">
	<!-- Header -->
	<div
		class="flex items-center justify-between border-b border-b-[var(--border-thick)] bg-[var(--color-fg)] px-4 py-2 text-[var(--color-bg)]"
	>
		<span class="font-mono text-sm font-bold tracking-wider uppercase">{project.name}</span>
		<div class="flex items-center gap-2">
			<span
				class="h-3 w-3 rounded-full"
				style="background-color: {langColor}"
				title={project.language}
			></span>
			<span class="font-mono text-xs">{project.language}</span>
		</div>
	</div>

	<!-- Content -->
	<div class="p-5">
		<p class="mb-4 text-sm leading-relaxed text-[var(--color-muted)]">
			{project.longDescription[$locale]}
		</p>

		<!-- Topics -->
		<div class="mb-5 flex flex-wrap gap-2">
			{#each project.topics as topic}
				<span class="tag text-[10px]">{topic}</span>
			{/each}
		</div>

		<!-- Actions -->
		<div class="flex items-center gap-3">
			<a
				href={project.githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="btn-brutal flex-1 text-center text-xs no-underline"
			>
				<span class="inline-flex items-center gap-2">
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
						/>
					</svg>
					GitHub
				</span>
			</a>
			{#if project.homepage}
				<a
					href={project.homepage}
					target="_blank"
					rel="noopener noreferrer"
					class="btn-brutal btn-brutal-filled flex-1 text-center text-xs no-underline"
				>
					Live Demo →
				</a>
			{/if}
		</div>
	</div>

	<!-- Featured badge -->
	{#if project.featured}
		<div
			class="absolute -top-2 -right-2 bg-[var(--color-accent)] px-2 py-1 font-mono text-[10px] font-bold text-[var(--color-bg)] uppercase"
		>
			★
		</div>
	{/if}
</article>

<style>
	article {
		position: relative;
	}
</style>
