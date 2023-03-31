import { z } from 'zod';
import { AuthError } from '@supabase/supabase-js';
import { fail, type Actions } from '@sveltejs/kit';

const resetPasswordSchema = z
	.object({
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

		const password = String(formData.password);

		const { password: stripPassword, passwordConfirm, ...rest } = formData;

		const validationResult = resetPasswordSchema.safeParse(formData);

		if (!validationResult.success) {
			const { fieldErrors } = validationResult.error.flatten();

			return fail(400, {
				rest,
				fieldErrors
			});
		}

		const { data, error: authError } = await supabase.auth.updateUser({
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

		return { success: true };
	}
};
