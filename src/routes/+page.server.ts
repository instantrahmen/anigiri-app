// +page.server.ts

import { fetchAnimeThisSeason } from '$lib/api/anime';
export const load = async () => {
	const anime = await fetchAnimeThisSeason();

	return {
		name: 'svelte-kit',
		anime,
		// seasons
	};
};
