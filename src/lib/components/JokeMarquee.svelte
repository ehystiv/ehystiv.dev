<script lang="ts">
	let { joke }: { joke: string } = $props();
</script>

<div
	class="flex overflow-hidden border-y-4 border-[var(--color-fg)] bg-[var(--color-accent)] py-3 whitespace-nowrap"
>
	<div class="animate-marquee-joke flex">
		<span class="px-4 font-mono text-xl font-bold text-[var(--color-bg)] uppercase">
			JOKE OF THE DAY: {joke} +++
		</span>
		<span class="px-4 font-mono text-xl font-bold text-[var(--color-bg)] uppercase">
			JOKE OF THE DAY: {joke} +++
		</span>
		<span class="px-4 font-mono text-xl font-bold text-[var(--color-bg)] uppercase">
			JOKE OF THE DAY: {joke} +++
		</span>
		<span class="px-4 font-mono text-xl font-bold text-[var(--color-bg)] uppercase">
			JOKE OF THE DAY: {joke} +++
		</span>
	</div>
</div>

<style>
	.animate-marquee-joke {
		animation: marquee-joke 30s linear infinite;
	}

	@keyframes marquee-joke {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
</style>
