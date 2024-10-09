import type { RequestHandler, RequestEvent } from './$types';
import { json } from '@sveltejs/kit';
import { fetchAndInsertAnimeOfflineDB } from '$lib/server/anime-offline-database/update-db';

// TODO: Protect this endpoint and only allow access from users with admin permissions
export const GET = (async ({ request }: RequestEvent) => {
	try {
		await fetchAndInsertAnimeOfflineDB();
	} catch (error) {
		console.error(error);

		return json({ message: 'Error', error });
	}
	return json({ message: 'Success' });
}) satisfies RequestHandler;
