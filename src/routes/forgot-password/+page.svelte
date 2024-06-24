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
				addToast('Check your email to reset password.');
				await invalidateAll();
			}

			await applyAction(result);
		};
	};
</script>

<Seo title="Forgot password" />
<AuthForm title="Forgot password" description="Enter your email to reset your password.">
	<form class="auth-form" action="?/reset" method="POST" use:enhance={submitReset}>
		<Input
			value={form?.rest?.email ? form.rest.email.toString() : ''}
			label="Email"
			name="email"
			type="email"
			placeholder="Enter your email"
			errors={form?.fieldErrors?.email}
		/>
		<Button
			class="auth-button"
			as="button"
			type="submit"
			disabled={loading}
			text={loading ? 'Submitting' : 'Submit'}
			variant="secondary"
		/>
		<p class="auth-cta">
			Don't have an account?
			<a class="auth-cta-link" href="/signup">Sign up</a>
		</p>
	</form>
</AuthForm>
