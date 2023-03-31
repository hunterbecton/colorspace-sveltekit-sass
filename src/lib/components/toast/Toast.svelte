<script>
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { toastStore, removeToast } from '$lib/store/toastStore';
	import Cancel from '../icon/Cancel.svelte';
</script>

{#if $toastStore}
	<div class="container">
		{#each $toastStore as { id, message } (id)}
			<div class="toast" role="alert" in:fade animate:flip={{ duration: 300 }}>
				<p>{message}</p>
				<button on:click={() => removeToast(id)} type="button"
					><Cancel class="toast-button" /><span>Close toast notification</span></button
				>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.container {
		display: flex;
		position: absolute;
		top: 1rem;
		right: 1rem;
		flex-direction: column-reverse;
		gap: 1rem;
		z-index: 30;
	}

	.toast {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		border: 1px solid $neutral-three;
		border-radius: 0.5rem;
		background-color: $neutral-one;
		padding: 0.75rem;
		width: 20rem;
		color: $neutral-nine;
		font-weight: 400;
		@include text-base;
	}

	:global(.toast-button) {
		width: 1rem;
		height: 1rem;
		color: $neutral-nine;
	}

	button {
		all: unset;
		flex-shrink: 0;
		cursor: pointer;
		border: 1px solid $neutral-three;
		border-radius: 0.5rem;
		background-color: $neutral-one;
		padding: 0.5rem;

		&:hover {
			background-color: $neutral-two;
		}

		&:focus-visible {
			outline-color: $brand-five;
			outline-style: solid;
			outline-width: 2px;
			outline-offset: 2px;
		}
	}

	span {
		@include sr-only;
	}
</style>
