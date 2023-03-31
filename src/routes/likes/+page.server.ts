import { error, redirect } from '@sveltejs/kit';
import type { PaletteCard } from '$lib/types/types';

export const load = async ({ depends, locals: { supabase, getSession } }) => {
	depends('palettes');

	const session = await getSession();

	if (!session) {
		throw redirect(301, '/');
	}

	let { data: palettes, error: supabaseError } = await supabase
		.from('palettes')
		.select(
			'id,palettes_colors(id,color(id,hex)),palettes_likes(count),palettes_likes_profile:palettes_likes!inner(profile)'
		)
		.match({ 'palettes_likes_profile.profile': session.user.id })
		.returns<PaletteCard[]>();

	if (supabaseError) {
		throw error(500, supabaseError.message);
	}

	return { palettes };
};
