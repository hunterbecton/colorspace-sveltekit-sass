<script lang="ts">
	import { copy } from 'svelte-copy';
	import { addToast } from '$lib/store/toastStore';

	export let text = '';
	export let href = '';
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let as: 'link' | 'button' | 'copy' = 'link';
	export let size: 'small' | 'base' | null = null;
	export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
	export let disabled: boolean | null | undefined = false;
	let className = '';
	export { className as class };
</script>

{#if as === 'link'}
	<a
		class="{className} button"
		class:button--primary={variant === 'primary'}
		class:button--secondary={variant === 'secondary'}
		class:button--ghost={variant === 'ghost'}
		class:button--small={size === 'small'}
		class:button--base={size === 'base'}
		{href}
	>
		{text}
	</a>
{/if}

{#if as === 'button'}
	<button
		class="{className} button"
		class:button--primary={variant === 'primary'}
		class:button--secondary={variant === 'secondary'}
		class:button--ghost={variant === 'ghost'}
		class:button--small={size === 'small'}
		class:button--base={size === 'base'}
		{type}
		{disabled}
		on:click
	>
		{text}
	</button>
{/if}

{#if as === 'copy'}
	<button
		class="{className} button"
		class:button--primary={variant === 'primary'}
		class:button--secondary={variant === 'secondary'}
		class:button--ghost={variant === 'ghost'}
		class:button--small={size === 'small'}
		class:button--base={size === 'base'}
		{type}
		{disabled}
		on:click
		use:copy={text}
		on:svelte-copy={() => addToast('Text copied!')}
		on:svelte-copy:error={(event) => addToast(`There was an error: ${event.detail.message}`)}
	>
		{text}
	</button>
{/if}

<style lang="scss">
	.button {
		cursor: pointer;
		border: 1px solid;
		border-radius: 0.5rem;
		font-weight: 400;
		text-decoration: none;

		&:focus-visible {
			outline-color: $brand-five;
			outline-style: solid;
			outline-width: 2px;
			outline-offset: 2px;
		}

		&:disabled {
			opacity: 0.5;
		}
	}

	.button--primary {
		border-color: $neutral-three;
		background-color: $neutral-one;
		color: $neutral-nine;

		&:hover {
			background-color: $neutral-two;
		}
	}

	.button--secondary {
		border-color: $brand-seven;
		background-color: $brand-six;
		color: $neutral-one;

		&:hover {
			background-color: $brand-seven;
		}
	}

	.button--ghost {
		border-color: transparent;
		background-color: $neutral-one;
		color: $neutral-nine;

		&:hover {
			background-color: $neutral-two;
		}
	}

	.button--small {
		padding: 0.5rem 1rem;
		@include text-sm;
	}

	.button--base {
		padding: 0.75rem 1.25rem;
		@include text-base;
	}
</style>
