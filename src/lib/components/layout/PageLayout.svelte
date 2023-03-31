<section>
	<slot />
</section>

<style lang="scss">
	section {
		padding: 2rem 1rem 4rem;

		@include md {
			padding: 2.5rem 1rem 5rem;
		}

		@include lg {
			padding: 3rem 1rem 6rem;
		}
	}
</style>
