import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const likeStore: Writable<App.LikeStore[]> = writable([]);

export const addLike = (id: number, palette: number) => {
	likeStore.update((currentLikes) => {
		return [...currentLikes, { id, palette }];
	});
};

export const removeLike = (id: number) => {
	likeStore.update((currentLikes) => {
		return currentLikes.filter((likes) => likes.id !== id);
	});
};
