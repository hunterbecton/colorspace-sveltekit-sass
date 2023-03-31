<script lang="ts">
	import '../app.scss';
	import { likeStore, addLike, removeLike } from '$lib/store/likeStore';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Nav from '$lib/components/nav/Nav.svelte';
	import Toast from '$lib/components/toast/Toast.svelte';
	import type { RealtimeChannel } from '@supabase/supabase-js';

	export let data;

	let likeSubscription: RealtimeChannel | null = null;

	$: ({ supabase, session } = data);

	page.subscribe(async () => {
		if (session && !likeSubscription) {
			supabase
				.from('palettes_likes')
				.select('id,palette')
				.match({ profile: session.user.id })
				.then(({ data }) => {
					if (data) {
						likeStore.set(data);
					}
				});

			likeSubscription = supabase
				.channel('likes')
				.on(
					'postgres_changes',
					{
						event: 'INSERT',
						schema: 'public',
						table: 'palettes_likes',
						filter: `profile=eq.${session.user.id}`
					},
					(payload) => addLike(payload.new.id, payload.new.palette)
				)
				.on(
					'postgres_changes',
					{
						event: 'DELETE',
						schema: 'public',
						table: 'palettes_likes',
						filter: `profile=eq.${session.user.id}`
					},
					(payload) => removeLike(payload.old.id)
				)
				.subscribe();
		}
	});

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
			supabase.removeAllChannels();
		};
	});
</script>

<Toast />
<Nav />
<main>
	<slot />
</main>
