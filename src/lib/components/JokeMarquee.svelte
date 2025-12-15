<script lang="ts">
	export let joke: string;
</script>

<div
	class="flex overflow-hidden border-y-4 border-[var(--color-fg)] bg-[var(--color-accent)] py-3 whitespace-nowrap"
>
	<div class="animate-marquee flex">
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
	.animate-marquee {
		animation: marquee 30s linear infinite;
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}
</style>
