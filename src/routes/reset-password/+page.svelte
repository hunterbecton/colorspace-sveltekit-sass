<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';

	import Button from '$lib/components/button/Button.svelte';
	import AuthForm from '$lib/components/form/AuthForm.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import { addToast } from '$lib/store/toastStore';

	let loading = false;

	export let form;

	const submitReset: SubmitFunction = async () => {
		loading = true;

		return async ({ result }) => {
			loading = false;

			if (result.type === 'failure' && result.data?.authError) {
				addToast(result.data?.authError);
			}

			if (result.type === 'success') {
				addToast('Password reset successfully.');
				await invalidateAll();
			}

			await applyAction(result);
		};
	};
</script>

<Seo title="Reset password" />
<AuthForm title="Reset your password" description="Enter your new password to reset.">
	<form class="auth-form" action="?/signup" method="POST" use:enhance={submitReset}>
		<Input
			value={form?.rest?.password ? form.rest.password.toString() : ''}
			class="auth-input"
			label="Password"
			name="password"
			type="password"
			placeholder="Enter your password"
			errors={form?.fieldErrors?.password}
		/>
		<Input
			value={form?.rest?.passwordConfirm ? form.rest.passwordConfirm.toString() : ''}
			class="auth-input"
			label="Confirm password"
			name="passwordConfirm"
			type="password"
			placeholder="Confirm your password"
			errors={form?.fieldErrors?.passwordConfirm}
		/>
		<Button
			class="auth-button"
			as="button"
			type="submit"
			disabled={loading}
			text={loading ? 'Submitting' : 'Sign up'}
			variant="secondary"
		/>
		<p class="auth-cta">
			Have an account?
			<a href="/login">Log in</a>
		</p>
	</form>
</AuthForm>
