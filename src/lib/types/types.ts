import type { Database } from '../../DatabaseDefinitions';

export type Colors = Database['public']['Tables']['colors']['Row'];
export type Palettes = Database['public']['Tables']['palettes']['Row'];
export type PalettesColors = Database['public']['Tables']['palettes_colors']['Row'];
export type Profiles = Database['public']['Tables']['profiles']['Row'];
export type PalettesLikes = Database['public']['Tables']['palettes_likes'];

export type PaletteCardColors = Pick<PalettesColors, 'id' | 'color'> & {
	color: Pick<Colors, 'id' | 'hex'>;
};

export type PalettesLikesCount = [{ count: number }];

export type PaletteCard = Pick<Palettes, 'id'> & {
	palettes_colors: PaletteCardColors[];
	palettes_likes: PalettesLikesCount;
};

export type PaletteDetailsColors = Pick<PalettesColors, 'id' | 'color'> & {
	color: Colors;
};

export type PaletteDetails = {
	palettes_colors: PaletteDetailsColors[];
};
