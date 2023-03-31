<script lang="ts">
	import type { PaletteCard as PaletteCardType } from '$lib/types/types';
	import PaletteCard from './PaletteCard.svelte';

	export let palettes: PaletteCardType[];
</script>

<div>
	{#each palettes as { id, palettes_colors, palettes_likes }}
		<PaletteCard
			{id}
			palettes={palettes_colors}
			likes={palettes_likes[0].count}
			slug={`/palette/${id}`}
		/>
	{/each}
</div>

<style lang="scss">
	div {
		display: grid;
		grid-template-columns: minmax(auto, 14rem);
		justify-content: center;
		gap: 2rem;

		@include md {
			grid-template-columns: repeat(2, minmax(auto, 14rem));
		}

		@include lg {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
