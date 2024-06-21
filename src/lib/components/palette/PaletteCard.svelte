<script lang="ts">
	import { page } from '$app/stores';
	import { goto, invalidate } from '$app/navigation';
	import type { PaletteCardColors } from '$lib/types/types';
	import Heart from '$lib/components/icon/Heart.svelte';
	import { likeStore } from '$lib/store/likeStore';
	import HeartLiked from '../icon/HeartLiked.svelte';

	export let palettes: PaletteCardColors[];
	export let likes = 0;
	export let slug = '/';
	export let id = 0;

	$: isLiked = $likeStore.find((like) => like.palette === id);

	const handleLike = async () => {
		if (!$page.data.session) {
			goto('/login');
		}

		if (isLiked) {
			await fetch(`/api/likes/${id}`, {
				method: 'DELETE'
			});
		} else {
			await fetch('/api/likes', {
				method: 'POST',
				body: JSON.stringify({
					palette_id: id
				})
			});
		}

		invalidate('palettes');
	};
</script>

<article class="card">
	<div class="colors">
		{#each palettes as { color: { hex } }}
			<div class="color" style="background-color: {hex}" />
		{/each}
	</div>
	<a href={slug}>
		<span> View palette </span>
	</a>
	<div class="overlay">
		<button type="button" on:click={handleLike}>
			{#if isLiked}
				<HeartLiked class="favorite-icon favorite-icon--liked" />
			{:else}
				<Heart class="favorite-icon" />
			{/if}
			{likes}
		</button>
	</div>
</article>

<style lang="scss">
	.card {
		height: 10.75rem;
		position: relative;
		border: 1px solid $neutral-three;
		border-radius: 0.5rem;
		background-color: $neutral-one;
		padding: 2rem 0.5rem 1rem;
	}

	.card:hover {
		.color {
			margin-right: calc(-1rem + 1px);
			margin-left: calc(-1rem + 1px);
		}
	}

	a {
		text-decoration: none;
		position: absolute;
		inset: 0;
		border-radius: 0.5rem;
	}

	a:focus-visible {
		outline-color: $brand-five;
		outline-style: solid;
		outline-width: 2px;
		outline-offset: 2px;
	}

	a span {
		@include sr-only;
	}

	.colors {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: auto;
		margin-left: auto;
		border-radius: 0.5rem;
		width: 100%;
		overflow: hiden;
		text-decoration: none;
	}

	.color {
		transition: all 0.3s ease;
		margin-right: -1rem;
		margin-left: -1rem;
		border: 2px solid $neutral-nine;
		border-radius: 9999px;
		width: 4rem;
		height: 4rem;
	}

	.overlay {
		z-index: 2;
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		padding: 1rem;
		pointer-events: none;
	}

	button {
		all: unset;
		display: flex;
		align-items: center;
		cursor: pointer;
		border: 1px solid $neutral-three;
		border-radius: 0.5rem;
		background-color: $neutral-one;
		padding: 0.25rem 0.5rem;
		color: $neutral-seven;
		pointer-events: auto;
	}

	:global(.favorite-icon) {
		margin-right: 0.25rem;
		width: 1rem;
		height: 1rem;
		color: $neutral-seven;
	}

	:global(.favorite-icon--liked) {
		color: $brand-five;
	}

	button:hover,
	button:focus-visible {
		background-color: $neutral-two;
	}

	button:focus-visible {
		outline-color: $brand-five;
		outline-style: solid;
		outline-width: 2px;
		outline-offset: 2px;
	}
</style>
