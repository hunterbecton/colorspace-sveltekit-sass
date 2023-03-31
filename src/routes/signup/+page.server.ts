import { z } from 'zod';
import { AuthError } from '@supabase/supabase-js';
import { fail, redirect, type Actions } from '@sveltejs/kit';

const signupSchema = z
	.object({
		email: z
			.string({ required_error: 'Email is required.' })
			.email({ message: 'Email must be a valid email address.' }),
		password: z
			.string({ required_error: 'Password is required.' })
			.min(8, { message: 'Password must be at least 8 characters.' })
			.max(32, { message: 'Password must be no more than 32 characters.' })
			.regex(new RegExp('.*[A-Z].*'), 'Password must contain one uppercase character.')
			.regex(new RegExp('.*[a-z].*'), 'Password must contain one lowercase character.')
			.regex(new RegExp('.*\\d.*'), 'Password must contain one number.')
			.regex(
				new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
				'Password must contain one special character.'
			)
			.trim(),
		passwordConfirm: z
			.string({ required_error: 'Password confirm is required' })
			.min(8, { message: 'Password must be at least 8 characters.' })
			.max(32, { message: 'Password must be no more than 32 characters.' })
			.regex(new RegExp('.*[A-Z].*'), 'Password must contain one uppercase character.')
			.regex(new RegExp('.*[a-z].*'), 'Password must contain one lowercase character.')
			.regex(new RegExp('.*\\d.*'), 'Password must contain one number.')
			.regex(
				new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
				'Password must contain one special character.'
			)
			.trim()
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and confirm password must match.',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and confirm password must match.',
				path: ['passwordConfirm']
			});
		}
	});

export const actions: Actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());

		const email = String(formData.email);
		const password = String(formData.password);

		const { password: stripPassword, passwordConfirm, ...rest } = formData;

		const validationResult = signupSchema.safeParse(formData);

		if (!validationResult.success) {
			const { fieldErrors } = validationResult.error.flatten();

			return fail(400, {
				rest,
				fieldErrors
			});
		}

		const { data, error: authError } = await supabase.auth.signUp({
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
