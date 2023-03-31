<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';

	import Button from '$lib/components/button/Button.svelte';
	import AuthForm from '$lib/components/form/AuthForm.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import { addToast } from '$lib/store/toastStore';

	let loading = false;

	export let form;

	const submitLogin: SubmitFunction = async () => {
		loading = true;

		return async ({ result }) => {
			loading = false;

			if (result.type === 'failure' && result.data?.authError) {
				addToast(result.data?.authError);
			}

			await applyAction(result);
		};
	};
</script>

<Seo title="Login" />
<AuthForm>
	<form class="auth-form" action="?/login" method="POST" use:enhance={submitLogin}>
		<Input
			value={form?.rest.email ? form.rest.email.toString() : ''}
			label="Email"
			name="email"
			type="email"
			placeholder="Enter your email"
			errors={form?.fieldErrors?.email}
		/>
		<Input
			class="auth-input"
			label="Password"
			name="password"
			type="password"
			placeholder="Enter your password"
		/>
		<a href="/forgot-password" class="auth-link">Forgot your password?</a>
		<Button
			class="auth-button"
			as="button"
			type="submit"
			disabled={loading}
			text={loading ? 'Submitting' : 'Log in'}
			variant="secondary"
		/>
		<p class="auth-cta">
			Don't have an account?
			<a class="auth-cta-link" href="/signup">Sign up</a>
		</p>
	</form>
</AuthForm>
