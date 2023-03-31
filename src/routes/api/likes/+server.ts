import { error } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw error(401, { message: 'Unauthorized' });
	}

	const { palette_id }: { palette_id: number } = await request.json();

	const { error: supabaseError } = await supabase
		.from('palettes_likes')
		.insert({ profile: session.user.id, palette: palette_id });

	if (supabaseError) {
		throw error(500, supabaseError.message);
	}

	return new Response(JSON.stringify({ success: true }), { status: 200 });
};
