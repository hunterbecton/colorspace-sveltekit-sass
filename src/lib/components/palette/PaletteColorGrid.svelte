<script lang="ts">
	import type { Colors, PaletteDetails } from '$lib/types/types';
	import PaletteColor from './PaletteColor.svelte';

	export let palette: PaletteDetails;

	$: palettes_colors = palette.palettes_colors;
</script>

<div>
	{#each palettes_colors as { color }}
		<PaletteColor {color} />
	{/each}
</div>

<style lang="scss">
	div {
		display: flex;
		row-gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 4rem;

		@include md {
			margin-top: 5rem;
		}

		@include lg {
			margin-top: 6rem;
		}
	}
</style>
