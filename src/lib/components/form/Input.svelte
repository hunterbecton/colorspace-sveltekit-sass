<script lang="ts">
	export let placeholder: string = '';
	export let type = 'text';
	export let name = 'default';
	export let label = '';
	export let value = '';
	export let errors: string[] = [];
	let className = '';
	export { className as class };
</script>

<div class={className}>
	<label for={name}>{label}</label>
	<input id={name} value={value ?? ''} {type} {name} {placeholder} />
	{#if errors && errors.length > 0}
		<p id="email-error">
			{errors[0]}
		</p>
	{/if}
</div>

<style lang="scss">
	label {
		color: $neutral-seven;
		@include text-xs;

		@include md {
			@include text-sm;
		}
	}

	input {
		display: block;
		margin-top: 0.375rem;
		border-width: 1px;
		border-style: solid;
		border-color: $neutral-three;
		border-radius: 0.5rem;
		background-color: $neutral-one;
		padding: 0.5rem 1rem;
		width: 100%;
		color: $neutral-nine;
		font-weight: 400;
		@include text-sm;

		&::placeholder {
			color: $neutral-six;
		}

		&:focus {
			outline: 1px solid $brand-six;
			border-color: $brand-six;
		}

		@include md {
			margin-top: 0.5rem;
			padding: 0.75rem 1.25rem;
			@include text-base;
		}
	}

	p {
		margin-top: 0.5rem;
		color: $brand-six;
		font-weight: 400;
		@include text-xs;
	}
</style>
