import { z } from 'zod';
import { AuthError } from '@supabase/supabase-js';
import { fail, redirect, type Actions } from '@sveltejs/kit';

const loginSchema = z.object({
	email: z
		.string({ required_error: 'Email is required.' })
		.email({ message: 'Email must be a valid email address.' })
});

export const actions: Actions = {
	login: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());

		const email = String(formData.email);
		const password = String(formData.password);

		const { password: stripPassword, ...rest } = formData;

		const validationResult = loginSchema.safeParse(formData);

		if (!validationResult.success) {
			const { fieldErrors } = validationResult.error.flatten();

			return fail(400, {
				rest,
				fieldErrors
			});
		}

		const { error: authError } = await supabase.auth.signInWithPassword({
			email,
			password
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

		throw redirect(303, '/');
	}
};
