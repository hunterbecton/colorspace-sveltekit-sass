import { error } from '@sveltejs/kit';

export const DELETE = async ({ params, locals: { supabase, safeGetSession } }) => {
	const session = await safeGetSession();

	if (!session) {
		error(401, { message: 'Unauthorized' });
	}

	const { id } = params;

	const { error: supabaseError } = await supabase
		.from('palettes_likes')
		.delete()
		.match({ profile: session.user.id, palette: id });

	if (supabaseError) {
		error(500, supabaseError.message);
	}

	return new Response(JSON.stringify({ success: true }), { status: 200 });
};
