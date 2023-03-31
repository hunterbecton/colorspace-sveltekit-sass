<script lang="ts">
	import PageHeader from '$lib/components/header/PageHeader.svelte';
	import MaxWidth from '$lib/components/layout/MaxWidth.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import PaletteCardGrid from '$lib/components/palette/PaletteCardGrid.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';

	export let data;

	$: ({ palettes } = data);
</script>

<Seo />
<PageLayout>
	<MaxWidth>
		<PageHeader
			class="homepage-header"
			title="Trending colors"
			description="Color palette inspiration for the web."
		/>
		{#if palettes}
			<PaletteCardGrid {palettes} />
		{/if}
	</MaxWidth>
</PageLayout>

<style lang="scss">
	:global(.homepage-header) {
		margin-bottom: 2rem;

		@include md {
			margin-bottom: 2.5rem;
		}

		@include lg {
			margin-bottom: 3rem;
		}
	}
</style>
