<script lang="ts">
	import PageHeader from '$lib/components/header/PageHeader.svelte';
	import MaxWidth from '$lib/components/layout/MaxWidth.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import PaletteCardGrid from '$lib/components/palette/PaletteCardGrid.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';

	export let data;

	$: ({ palettes } = data);
</script>

<Seo title="Liked colors" />
<PageLayout>
	<MaxWidth>
		<PageHeader
			class="liked-header"
			title="Liked colors"
			description="My favorite color palettes."
		/>
		{#if palettes}
			<PaletteCardGrid {palettes} />
		{/if}
	</MaxWidth>
</PageLayout>

<style lang="scss">
	:global(.liked-header) {
		margin-bottom: 2rem;

		@include md {
			margin-bottom: 2.5rem;
		}

		@include lg {
			margin-bottom: 3rem;
		}
	}
</style>
