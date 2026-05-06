<script lang="ts">
	import type { Interest } from '$lib/data/interests';
	import { locale } from '$lib/stores/lang';

	let { interest }: { interest: Interest } = $props();
</script>

<a
	href={interest.url}
	target="_blank"
	rel="noopener noreferrer"
	class="group border-brutal hover:shadow-brutal relative block h-full border-dashed bg-[var(--color-bg)] p-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:border-solid hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)]"
>
	<div class="mb-2 flex items-center justify-between">
		<h3
			class="font-mono text-lg font-bold tracking-wider uppercase group-hover:text-[var(--color-accent)]"
		>
			{interest.name}
		</h3>
		<span
			class="text-xl font-bold opacity-0 transition-opacity group-hover:text-[var(--color-accent)] group-hover:opacity-100"
			>↗</span
		>
	</div>

	<p
		class="mb-4 text-sm leading-relaxed text-[var(--color-muted)] group-hover:text-[var(--color-bg)]"
	>
		{interest.description[$locale]}
	</p>

	<div class="flex flex-wrap gap-2">
		{#each interest.tags as tag (tag)}
			<span
				class="tag text-[10px] group-hover:border-[var(--color-bg)] group-hover:bg-[var(--color-bg)] group-hover:text-[var(--color-fg)]"
			>
				{tag}
			</span>
		{/each}
	</div>
</a>
