<script lang="ts">
	export let title = 'Color Palette Inspiration for the Web';
	export let description =
		'Get inspired for your next web design project with our vast collection of color palettes. Take the guesswork out of color selection and stand out!';
	export let keywords = 'web design, color palette, color inspiration';
	export let index = true;
</script>

<svelte:head>
	<title>ColorSpace | {title}</title>
	<meta name="title" content="ColorSpace | {title}" />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	{#if index}
		<meta name="robots" content="index, follow" />
	{:else}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
</svelte:head>
