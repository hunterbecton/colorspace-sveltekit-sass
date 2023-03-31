<script lang="ts">
	export let title = '';
	export let description = '';
	let className = '';
	export { className as class };
</script>

<header class={className}>
	<h1>{title}</h1>
	<p>{description}</p>
</header>

<style lang="scss">
	header {
		text-align: center;

		@include lg {
			text-align: left;
		}
	}

	h1 {
		color: $neutral-nine;
		font-weight: 700;
		@include text-4xl;

		@include md {
			@include text-5xl;
		}

		@include lg {
			@include text-6xl;
		}
	}

	p {
		margin-top: 0.25rem;
		color: $neutral-seven;
		font-weight: 400;
		@include text-base;

		@include md {
			margin-top: 0.5rem;
			@include text-lg;
		}
	}
</style>
