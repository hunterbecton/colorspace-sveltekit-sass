<script lang="ts">
	import type { Colors } from '$lib/types/types';
	import Button from '$lib/components/button/Button.svelte';

	export let color: Colors;

	$: hex = color.hex;
	$: hsl = color.hsl;
	$: rgb = color.rgb;
</script>

<div class="palette">
	<div class="detail">
		<div class="color" style="background-color: {hex}" />
	</div>
	<div class="divider" />
	<div class="detail">
		<Button class="color-button" as="copy" text={hex} size="small" variant="ghost" type="button" />
	</div>
	<div class="divider" />
	<div class="detail">
		<Button class="color-button" as="copy" text={rgb} size="small" variant="ghost" type="button" />
	</div>
	<div class="divider" />
	<div class="detail">
		<Button class="color-button" as="copy" text={hsl} size="small" variant="ghost" type="button" />
	</div>
</div>

<style lang="scss">
	.palette {
		flex: 1 1 auto;
		max-width: 13.375rem;

		@include md {
		}

		@include lg {
			max-width: none;
		}
	}

	.detail {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.color {
		margin: 0.5rem 0;
		border: 2px solid $neutral-nine;
		border-radius: 9999px;
		width: 2rem;
		height: 2rem;
	}

	.divider {
		margin: 0.5rem 0;
		background-color: $neutral-three;
		height: 1px;
	}
</style>
