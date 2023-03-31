import { z } from 'zod';
import { AuthError } from '@supabase/supabase-js';
import { fail, type Actions } from '@sveltejs/kit';
import { PUBLIC_HOST } from '$env/static/public';

const forgotPasswordSchema = z.object({
	email: z
		.string({ required_error: 'Email is required.' })
		.email({ message: 'Email must be a valid email address.' })
});

export const actions: Actions = {
	reset: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());

		const email = String(formData.email);

		const { ...rest } = formData;

		const validationResult = forgotPasswordSchema.safeParse(formData);

		if (!validationResult.success) {
			const { fieldErrors } = validationResult.error.flatten();

			return fail(400, {
				rest,
				fieldErrors
			});
		}

		const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${PUBLIC_HOST}/reset-password`
		});

		if (authError) {
			if (authError instanceof AuthError) {
				return fail(authError.status ?? 500, {
					rest,
					authError: authError.message
				});
			} else {
				return fail(500, {
					rest,
					authError: 'Server error. Please try again later.'
				});
			}
		}

		return { success: true };
	}
};
