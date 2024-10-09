import type { Actions } from './$types';

export const actions: Actions = {
	async default({ request }) {
		const data = await request.formData();
		const listId = data.get('listId') as string | null;
		const animeId = (data.get('animeId') as string) || '';

		if (!listId) {
			return { error: 'Missing listId' };
		}

		if (!animeId) {
			return { error: 'Missing animeId' };
		}

		return {
			listId,
			animeId,
		};
	},
};
