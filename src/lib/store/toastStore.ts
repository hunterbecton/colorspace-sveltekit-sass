import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import type { Writable } from 'svelte/store';

export const toastStore: Writable<App.ToastStore[]> = writable([]);

export const addToast = (message: string) => {
	const id = uuidv4();

	toastStore.update((currentToasts) => {
		return [...currentToasts, { id, message }];
	});

	setTimeout(() => removeToast(id), 5000);
};

export const removeToast = (id: string) => {
	toastStore.update((currentToasts) => {
		return currentToasts.filter((toast) => toast.id !== id);
	});
};
