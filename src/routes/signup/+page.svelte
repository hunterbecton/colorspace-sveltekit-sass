<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	import Button from '$lib/components/button/Button.svelte';
	import AuthForm from '$lib/components/form/AuthForm.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import { addToast } from '$lib/store/toastStore';

	let loading = false;

	export let form;

	const submitSignup: SubmitFunction = async () => {
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

<Seo title="Sign up" />
<AuthForm title="Sign up for ColorSpace" description="Enter your email and password below.">
	<form class="auth-form" action="?/signup" method="POST" use:enhance={submitSignup}>
		<Input
			value={form?.rest?.email ? form.rest.email.toString() : ''}
			label="Email"
			name="email"
			type="email"
			placeholder="Enter your email"
			errors={form?.fieldErrors?.email}
		/>
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
