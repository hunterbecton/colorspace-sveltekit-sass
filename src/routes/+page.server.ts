import { error } from '@sveltejs/kit';
import type { PaletteCard } from '$lib/types/types';

export const load = async ({ depends, locals: { supabase } }) => {
	depends('palettes');

	let { data: palettes, error: supabaseError } = await supabase
		.from('palettes')
		.select('id,palettes_colors(id,color(id,hex)),palettes_likes(count)')
		.returns<PaletteCard[]>();

	if (supabaseError) {
		error(500, supabaseError.message);
	}

	return { palettes };
};
