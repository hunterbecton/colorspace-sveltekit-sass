import { error, redirect } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase } }) => {
	const { error: supabaseError } = await supabase.auth.signOut();

	if (supabaseError) {
		 error(500, supabaseError.message);
	}

	 redirect(307, '/');
};
