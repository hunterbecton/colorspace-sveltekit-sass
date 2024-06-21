import { error } from '@sveltejs/kit';
import type { PaletteCard, PaletteDetails } from '$lib/types/types';

export const load = async ({ depends, params: { id }, locals: { supabase } }) => {
	depends('palettes');

	const fetchColors = async () => {
		let { data: palette, error: supabaseError } = await supabase
			.from('palettes')
			.select('palettes_colors(color(*))')
			.match({
				id
			})
			.returns<PaletteDetails[]>()
			.single();

		if (supabaseError) {
			error(500, supabaseError.message);
		}

		if (!palette) {
			error(404, 'Palette not found');
		}

		return palette;
	};

	const fetchRandomPalettes = async () => {
		let { data: palettes, error: supabaseError } = await supabase
			.from('random_palettes')
			.select('id,palettes_colors(id,color(id,hex)),palettes_likes(count)')
			.neq('id', id)
			.limit(4)
			.returns<PaletteCard[]>();

		if (supabaseError) {
			error(500, supabaseError.message);
		}

		return palettes;
	};

	return {
		palette: await fetchColors(),
		palettes: await fetchRandomPalettes()
	};
};
