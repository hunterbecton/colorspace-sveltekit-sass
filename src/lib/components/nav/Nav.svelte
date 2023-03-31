<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '../logo/Logo.svelte';
	import Button from '../button/Button.svelte';
	import MaxWidth from '../layout/MaxWidth.svelte';
</script>

<header>
	<MaxWidth>
		<div>
			<a href="/">
				<Logo class="logo" />
			</a>
			<nav>
				{#if $page.data.session}
					<a href="/likes" class="link">Likes</a>
					<form action="/api/logout" method="GET">
						<Button type="submit" size="small" as="button" text="Logout" />
					</form>
				{:else}
					<Button size="small" as="link" href="/login" text="Login" />
				{/if}
			</nav>
		</div>
	</MaxWidth>
</header>

<style lang="scss">
	header {
		padding: 2rem;
	}

	:global(.logo) {
		color: $neutral-nine;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	a {
		text-decoration: none;

		&:focus-visible {
			outline-color: $brand-five;
			outline-width: 2px;
			outline-offset: 2px;
		}
	}

	.link {
		color: $neutral-nine;
		font-weight: 400;
		@include text-sm;

		&:hover {
			color: $brand-six;
		}
	}
</style>
