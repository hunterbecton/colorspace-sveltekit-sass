<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import MaxWidth from '$lib/components/layout/MaxWidth.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import PaletteCardGrid from '$lib/components/palette/PaletteCardGrid.svelte';
	import PaletteColorGrid from '$lib/components/palette/PaletteColorGrid.svelte';

	export let data;

	$: ({ palette, palettes } = data);
</script>

<PageLayout>
	<MaxWidth>
		<Button size="small" as="link" href="/likes" text="Back" />
		<PaletteColorGrid {palette} />
		{#if palettes}
			<div>
				<h2>More palettes</h2>
				<PaletteCardGrid {palettes} />
			</div>
		{/if}
	</MaxWidth>
</PageLayout>

<style lang="scss">
	div {
		margin-top: 4rem;

		@include md {
			margin-top: 5rem;
		}

		@include lg {
			margin-top: 6rem;
		}
	}

	h2 {
		margin-bottom: 2rem;
		color: $neutral-nine;
		font-weight: 700;
		text-align: center;
		@include text-xl;

		@include lg {
			text-align: left;
		}
	}
</style>
