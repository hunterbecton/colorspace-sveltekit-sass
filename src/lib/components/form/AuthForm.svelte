<script lang="ts">
	import PageLayout from '$lib/components/layout/PageLayout.svelte';

	export let title = 'Log in to ColorSpace';
	export let description = 'Enter your email and password below.';
</script>

<PageLayout>
	<header>
		<h1>{title}</h1>
		<p>{description}</p>
	</header>
	<slot />
</PageLayout>

<style lang="scss">
	header {
		text-align: center;
	}

	h1 {
		color: $neutral-nine;
		font-weight: 700;
		@include text-2xl;

		@include md {
			@include text-3xl;
		}
	}

	p {
		margin-top: 0.25rem;
		color: $neutral-seven;
		font-weight: 400;
		@include text-xs;

		@include md {
			margin-top: 0.5rem;
			@include text-sm;
		}
	}

	:global(.auth-input) {
		margin-top: 1rem;

		@include md {
			margin-top: 1.5rem;
		}
	}

	:global(.auth-form) {
		margin: 1.5rem auto 0;
		border-radius: 0.5rem;
		background-color: $white;
		padding: 1.5rem;
		max-width: 25rem;

		@include md {
			margin-top: 2rem;
			padding: 2.5rem;
		}
	}

	:global(.auth-link) {
		float: right;
		margin-top: 0.75rem;
		color: $neutral-six;
		font-weight: 400;
		text-decoration: none;
		@include text-xs;

		&:hover {
			color: $brand-six;
		}

		&:focus {
			outline: none;
		}

		&:focus-visible {
			color: $brand-six;
			text-decoration: underline;
		}

		@include md {
			margin-top: 1rem;
			@include text-sm;
		}
	}

	:global(.auth-button) {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		width: 100%;
		@include text-sm;

		@include md {
			margin-top: 1.5rem;
			padding: 0.75rem 1.25rem;
			@include text-base;
		}
	}

	:global(.auth-cta) {
		margin-top: 1rem;
		color: $neutral-six;
		font-weight: 400;
		@include text-xs;

		@include md {
			margin-top: 1.5rem;
			@include text-sm;
		}
	}

	:global(.auth-cta a) {
		color: $brand-six;
		text-decoration: none;

		&:focus {
			outline: none;
		}

		&:focus-visible {
			text-decoration: underline;
		}
	}
</style>
